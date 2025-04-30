
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/AdminLayout';
import { getAllUsers, getAllPendingUsers, approveUser, rejectUser, User } from '@/services/database';

const AdminDashboardPage: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchPendingUsers = async () => {
      setIsLoading(true);
      try {
        const users = await getAllPendingUsers();
        setPendingUsers(users);
      } catch (error) {
        console.error('Error fetching pending users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPendingUsers();
  }, []);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  const handleApproveUser = async () => {
    if (!selectedUser) return;
    
    setIsProcessing(true);
    try {
      await approveUser(selectedUser.id);
      setPendingUsers(pendingUsers.filter(user => user.id !== selectedUser.id));
      setIsUserDialogOpen(false);
    } catch (error) {
      console.error('Error approving user:', error);
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRejectUser = async () => {
    if (!selectedUser) return;
    
    setIsProcessing(true);
    try {
      await rejectUser(selectedUser.id);
      setPendingUsers(pendingUsers.filter(user => user.id !== selectedUser.id));
      setIsUserDialogOpen(false);
    } catch (error) {
      console.error('Error rejecting user:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="status-badge-pending">Pending</span>;
      case 'approved':
        return <span className="status-badge-approved">Approved</span>;
      case 'rejected':
        return <span className="status-badge-rejected">Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Approval Requests ({pendingUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : pendingUsers.length === 0 ? (
              <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                <p className="text-center text-muted-foreground">
                  No pending approval requests
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Requested On</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.fullName}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.department}</TableCell>
                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewUser(user)}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Total Members
                </div>
                <div className="text-2xl font-bold">32</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Approved This Month
                </div>
                <div className="text-2xl font-bold">8</div>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <div className="text-sm font-medium text-muted-foreground">
                  Pending Requests
                </div>
                <div className="text-2xl font-bold">{pendingUsers.length}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>User Request Details</DialogTitle>
            <DialogDescription>
              Review this application before making a decision.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium">Full Name</p>
                  <p className="text-sm">{selectedUser.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Age</p>
                  <p className="text-sm">{selectedUser.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Gender</p>
                  <p className="text-sm">{selectedUser.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Department / Field</p>
                  <p className="text-sm">{selectedUser.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Education Level</p>
                  <p className="text-sm">{selectedUser.educationLevel}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium">GitHub Profile</p>
                <a 
                  href={selectedUser.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {selectedUser.githubUrl}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium">LinkedIn Profile</p>
                <a 
                  href={selectedUser.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {selectedUser.linkedinUrl}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium">Requested Date</p>
                <p className="text-sm">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsUserDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectUser}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Reject"}
            </Button>
            <Button
              variant="default"
              onClick={handleApproveUser}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Approve"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminDashboardPage;
