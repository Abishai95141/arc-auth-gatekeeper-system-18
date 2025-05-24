
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/sonner';
import { Skeleton } from '@/components/ui/skeleton';
import AdminLayout from '@/components/AdminLayout';
import { getAllPendingUsersFromSupabase, approveUserInSupabase, rejectUserInSupabase, User } from '@/services/database';
import { ExternalLink, Check, X } from 'lucide-react';

const SignupRequestsPage: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    console.log('Fetching pending users');
    setIsLoading(true);
    try {
      const users = await getAllPendingUsersFromSupabase();
      console.log('Pending users fetched:', users.length);
      setPendingUsers(users);
    } catch (error) {
      console.error('Error fetching pending users:', error);
      toast.error('Failed to load pending signup requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(userId)) {
        newSelection.delete(userId);
      } else {
        newSelection.add(userId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === pendingUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(pendingUsers.map(user => user.id)));
    }
  };

  const handleApproveUser = async (userId: string) => {
    console.log('Approving user:', userId);
    setIsProcessing(true);
    try {
      await approveUserInSupabase(userId);
      setPendingUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success('User approved successfully');
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Failed to approve user');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRejectUser = async (userId: string) => {
    console.log('Rejecting user:', userId);
    setIsProcessing(true);
    try {
      await rejectUserInSupabase(userId);
      setPendingUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      toast.success('User request rejected');
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleApproveAll = async () => {
    if (selectedUsers.size === 0) return;
    console.log('Approving multiple users:', selectedUsers.size);
    setIsProcessing(true);
    try {
      const promises = Array.from(selectedUsers).map(id => approveUserInSupabase(id));
      await Promise.all(promises);
      setPendingUsers(prevUsers => prevUsers.filter(user => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
      toast.success(`${selectedUsers.size} users approved successfully`);
    } catch (error) {
      console.error('Error approving users:', error);
      toast.error('Failed to approve some users');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleRejectAll = async () => {
    if (selectedUsers.size === 0) return;
    console.log('Rejecting multiple users:', selectedUsers.size);
    setIsProcessing(true);
    try {
      const promises = Array.from(selectedUsers).map(id => rejectUserInSupabase(id));
      await Promise.all(promises);
      setPendingUsers(prevUsers => prevUsers.filter(user => !selectedUsers.has(user.id)));
      setSelectedUsers(new Set());
      toast.success(`${selectedUsers.size} user requests rejected`);
    } catch (error) {
      console.error('Error rejecting users:', error);
      toast.error('Failed to reject some users');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AdminLayout title="Signup Requests">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Pending Signup Requests ({pendingUsers.length})</CardTitle>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleApproveAll} 
              disabled={selectedUsers.size === 0 || isProcessing}
              className="flex gap-1"
            >
              <Check size={16} />
              Approve All Selected
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleRejectAll} 
              disabled={selectedUsers.size === 0 || isProcessing}
              className="flex gap-1"
            >
              <X size={16} />
              Reject All Selected
            </Button>
          </div>
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
                No pending signup requests
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40px]">
                      <Checkbox 
                        checked={pendingUsers.length > 0 && selectedUsers.size === pendingUsers.length} 
                        onCheckedChange={handleSelectAll} 
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>GitHub</TableHead>
                    <TableHead>LinkedIn</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox 
                          checked={selectedUsers.has(user.id)} 
                          onCheckedChange={() => handleSelectUser(user.id)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{user.educationLevel}</TableCell>
                      <TableCell>
                        <a 
                          href={user.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink size={14} />
                          GitHub
                        </a>
                      </TableCell>
                      <TableCell>
                        <a 
                          href={user.linkedinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-1 text-blue-500 hover:text-blue-700"
                        >
                          <ExternalLink size={14} />
                          LinkedIn
                        </a>
                      </TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleApproveUser(user.id)}
                            disabled={isProcessing}
                            className="text-green-600 hover:text-green-800 hover:bg-green-100"
                          >
                            <Check size={16} />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRejectUser(user.id)}
                            disabled={isProcessing}
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <X size={16} />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default SignupRequestsPage;
