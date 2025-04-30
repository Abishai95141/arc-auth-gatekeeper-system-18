
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/AdminLayout';
import { getAllUsers, getAllPendingUsers, approveUser, rejectUser, User } from '@/services/database';
import { 
  Users, AlertTriangle, Lightbulb, FolderGit2, 
  FileText, Calendar, TrendingUp, Bell, ArrowUpRight,
  Plus, ChevronRight, BadgeCheck, ShieldAlert, RefreshCw
} from 'lucide-react';

const AdminDashboardPage: React.FC = () => {
  const { toast } = useToast();
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
      toast({
        title: "User Approved",
        description: `${selectedUser.fullName} has been approved successfully.`,
      });
    } catch (error) {
      console.error('Error approving user:', error);
      toast({
        title: "Error",
        description: "Failed to approve user. Please try again.",
        variant: "destructive",
      });
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
      toast({
        title: "User Rejected",
        description: `${selectedUser.fullName}'s application has been rejected.`,
      });
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast({
        title: "Error",
        description: "Failed to reject user. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Pending</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 hover:bg-green-600">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 hover:bg-red-600">Rejected</Badge>;
      default:
        return null;
    }
  };

  const events = [
    { type: "Flag", content: "Comment flagged: inappropriate language in Project: AI Newsletter", time: "2 min ago", icon: AlertTriangle, color: "text-red-400" },
    { type: "New", content: "New idea submitted: 'Blockchain for Community Governance'", time: "15 min ago", icon: Lightbulb, color: "text-yellow-400" },
    { type: "Update", content: "Project milestone completed: 'ML Model Training'", time: "1 hour ago", icon: FolderGit2, color: "text-green-400" },
    { type: "Review", content: "Doc review requested: 'API Authentication Guide'", time: "3 hours ago", icon: FileText, color: "text-blue-400" },
    { type: "RSVP", content: "Talk attendance threshold reached: 'Web3 Essentials'", time: "5 hours ago", icon: Calendar, color: "text-purple-400" },
    { type: "Alert", content: "System error: Email notification service degraded", time: "6 hours ago", icon: ShieldAlert, color: "text-red-500" },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid gap-6">
        {/* Key Metrics Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-white">Key Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-400" />
                  Total Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">134</p>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+12% from last month</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-yellow-400" />
                  Pending Signups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">{pendingUsers.length}</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-yellow-400" />
                  <span>Needs approval</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Lightbulb className="mr-2 h-5 w-5 text-blue-400" />
                  Active Ideas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">27</p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <BadgeCheck className="h-3 w-3 mr-1 text-blue-400" />
                  <span>8 in incubation phase</span>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-800 border-gray-700 text-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-400" />
                  New Flags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold mb-1">5</p>
                <div className="flex items-center text-xs text-red-400">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  <span>+3 from yesterday</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        
        {/* Quick Actions Section */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              className="h-auto py-6 bg-gradient-to-r from-purple-900 to-purple-700 hover:from-purple-800 hover:to-purple-600 flex flex-col items-center text-white"
              onClick={() => setIsUserDialogOpen(true && pendingUsers.length > 0)}
            >
              <Users className="h-6 w-6 mb-2" />
              <span className="text-md font-bold">Approve Users</span>
              <span className="text-xs">{pendingUsers.length} pending</span>
            </Button>
            
            <Button 
              className="h-auto py-6 bg-gradient-to-r from-blue-900 to-blue-700 hover:from-blue-800 hover:to-blue-600 flex flex-col items-center text-white"
            >
              <Flag className="h-6 w-6 mb-2" />
              <span className="text-md font-bold">Moderation Queue</span>
              <span className="text-xs">5 items flagged</span>
            </Button>
            
            <Button 
              className="h-auto py-6 bg-gradient-to-r from-amber-900 to-amber-700 hover:from-amber-800 hover:to-amber-600 flex flex-col items-center text-white"
            >
              <Megaphone className="h-6 w-6 mb-2" />
              <span className="text-md font-bold">Create Announcement</span>
              <span className="text-xs">Site-wide banner</span>
            </Button>
            
            <Button 
              className="h-auto py-6 bg-gradient-to-r from-green-900 to-green-700 hover:from-green-800 hover:to-green-600 flex flex-col items-center text-white"
            >
              <Lightbulb className="h-6 w-6 mb-2" />
              <span className="text-md font-bold">Launch Idea Sprint</span>
              <span className="text-xs">Time-boxed challenge</span>
            </Button>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Pending Approvals Card */}
          <Card className="bg-gray-800 border-gray-700 text-white md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg text-white">Pending Approval Requests</CardTitle>
                <CardDescription className="text-gray-400">
                  Review and approve new member applications
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <RefreshCw size={16} className="mr-2" />
                Refresh
              </Button>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-12 w-full bg-gray-700" />
                  <Skeleton className="h-12 w-full bg-gray-700" />
                  <Skeleton className="h-12 w-full bg-gray-700" />
                </div>
              ) : pendingUsers.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-gray-700">
                  <p className="text-center text-gray-400">
                    No pending approval requests
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="text-gray-400">Name</TableHead>
                        <TableHead className="text-gray-400">Email</TableHead>
                        <TableHead className="text-gray-400">Department</TableHead>
                        <TableHead className="text-gray-400">Requested On</TableHead>
                        <TableHead className="text-right text-gray-400">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingUsers.slice(0, 5).map((user) => (
                        <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800">
                          <TableCell className="font-medium text-white">{user.fullName}</TableCell>
                          <TableCell className="text-gray-300">{user.email}</TableCell>
                          <TableCell className="text-gray-300">{user.department}</TableCell>
                          <TableCell className="text-gray-300">
                            {new Date(user.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewUser(user)}
                              className="text-purple-400 hover:text-purple-300 hover:bg-gray-700"
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  {pendingUsers.length > 5 && (
                    <div className="pt-3 text-center">
                      <Button 
                        variant="outline" 
                        className="text-sm bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700"
                      >
                        View All
                        <ChevronRight size={16} className="ml-1" />
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Alerts Feed Card */}
          <Card className="bg-gray-800 border-gray-700 text-white">
            <CardHeader>
              <CardTitle className="text-lg text-white">Activity Feed</CardTitle>
              <CardDescription className="text-gray-400">
                Recent events in the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
                {events.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-5 border-b border-gray-700 last:border-0 last:pb-0 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <event.icon className={`h-5 w-5 mt-0.5 ${event.color}`} />
                    <div>
                      <p className="text-sm font-medium text-white">{event.content}</p>
                      <p className="text-xs text-gray-400">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>User Request Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Review this application before making a decision.
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-sm font-medium text-gray-400">Full Name</p>
                  <p className="text-sm text-white">{selectedUser.fullName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-sm text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Age</p>
                  <p className="text-sm text-white">{selectedUser.age}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Gender</p>
                  <p className="text-sm text-white">{selectedUser.gender}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Department / Field</p>
                  <p className="text-sm text-white">{selectedUser.department}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Education Level</p>
                  <p className="text-sm text-white">{selectedUser.educationLevel}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400">GitHub Profile</p>
                <a 
                  href={selectedUser.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  {selectedUser.githubUrl}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400">LinkedIn Profile</p>
                <a 
                  href={selectedUser.linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-purple-400 hover:text-purple-300"
                >
                  {selectedUser.linkedinUrl}
                </a>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-400">Requested Date</p>
                <p className="text-sm text-white">
                  {new Date(selectedUser.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button 
              variant="outline" 
              onClick={() => setIsUserDialogOpen(false)}
              className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectUser}
              disabled={isProcessing}
              className="bg-red-600 hover:bg-red-700"
            >
              {isProcessing ? "Processing..." : "Reject"}
            </Button>
            <Button
              variant="default"
              onClick={handleApproveUser}
              disabled={isProcessing}
              className="bg-purple-600 hover:bg-purple-700"
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
