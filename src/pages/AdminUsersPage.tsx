
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import AdminLayout from '@/components/AdminLayout';
import { getAllUsers, User } from '@/services/database';
import { 
  User as UserIcon, Search, Filter, MoreHorizontal, 
  Edit, Eye, ShieldAlert, UserCheck, Trash, Download,
  Mail, CheckCircle, XCircle, AlertCircle, User2, Plus
} from 'lucide-react';

const AdminUsersPage: React.FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('all');
  const [currentAction, setCurrentAction] = useState<'view' | 'edit' | 'role'>('view');
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Error fetching users",
          description: "Failed to load user data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);

  useEffect(() => {
    let filtered = users;
    
    // Apply status filter
    if (selectedTab !== 'all') {
      filtered = filtered.filter(user => user.status === selectedTab);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        user => 
          user.fullName.toLowerCase().includes(query) || 
          user.email.toLowerCase().includes(query) ||
          user.department?.toLowerCase().includes(query) || 
          user.educationLevel?.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(filtered);
  }, [searchQuery, selectedTab, users]);

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setCurrentAction('view');
    setIsUserDialogOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setCurrentAction('edit');
    setIsUserDialogOpen(true);
  };

  const handleChangeRole = (user: User) => {
    setSelectedUser(user);
    setSelectedRole(user.role || 'Member');
    setCurrentAction('role');
    setIsUserDialogOpen(true);
  };

  const handleRoleChange = () => {
    if (!selectedUser) return;
    
    // This would normally update the user role in the database
    toast({
      title: "Role Updated",
      description: `${selectedUser.fullName}'s role has been changed to ${selectedRole}.`,
    });
    
    setIsUserDialogOpen(false);
  };

  const handleDeactivateUser = (user: User) => {
    // This would normally deactivate the user in the database
    toast({
      title: "User Deactivated",
      description: `${user.fullName}'s account has been deactivated.`,
    });
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

  const renderRoleBadge = (role: string = 'Member') => {
    switch (role) {
      case 'Admin':
        return <Badge className="bg-purple-600 hover:bg-purple-700">Admin</Badge>;
      case 'Moderator':
        return <Badge className="bg-blue-500 hover:bg-blue-600">Moderator</Badge>;
      case 'Ambassador':
        return <Badge className="bg-indigo-500 hover:bg-indigo-600">Ambassador</Badge>;
      case 'Member':
      default:
        return <Badge className="bg-gray-500 hover:bg-gray-600">Member</Badge>;
    }
  };

  return (
    <AdminLayout title="User Management">
      <Card className="bg-gray-800 border-gray-700 text-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white">User Management</CardTitle>
            <CardDescription className="text-gray-400">
              Manage all users in the Builders Arc community
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-white border-gray-600 bg-gray-700 hover:bg-gray-600"
            >
              <Download size={16} className="mr-2" />
              Export
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Plus size={16} className="mr-2" />
              Add User
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <Tabs 
              value={selectedTab} 
              onValueChange={setSelectedTab} 
              className="w-full md:w-auto"
            >
              <TabsList className="grid grid-cols-4 w-full sm:w-[500px] bg-gray-700">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  All Users
                </TabsTrigger>
                <TabsTrigger 
                  value="approved" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger 
                  value="pending" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  Pending
                </TabsTrigger>
                <TabsTrigger 
                  value="rejected" 
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300"
                >
                  Inactive
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex w-full md:w-auto gap-2">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                />
              </div>
              <Button variant="outline" className="border-gray-600 bg-gray-700 text-white hover:bg-gray-600">
                <Filter size={16} className="mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full bg-gray-700" />
              <Skeleton className="h-12 w-full bg-gray-700" />
              <Skeleton className="h-12 w-full bg-gray-700" />
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-gray-800 border-gray-700">
                    <TableHead className="text-gray-400">Name</TableHead>
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Role</TableHead>
                    <TableHead className="text-gray-400">Department</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Joined Date</TableHead>
                    <TableHead className="text-right text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length === 0 ? (
                    <TableRow className="hover:bg-gray-800 border-gray-700">
                      <TableCell colSpan={7} className="text-center py-4 text-gray-400">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-gray-800 border-gray-700">
                        <TableCell className="font-medium text-white">
                          <div className="flex items-center">
                            <div className="h-8 w-8 rounded-full bg-gray-700 mr-2 flex items-center justify-center">
                              <UserIcon size={16} className="text-gray-400" />
                            </div>
                            {user.fullName}
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-300">{user.email}</TableCell>
                        <TableCell>{renderRoleBadge(user.role)}</TableCell>
                        <TableCell className="text-gray-300">{user.department || 'N/A'}</TableCell>
                        <TableCell>{renderStatusBadge(user.status)}</TableCell>
                        <TableCell className="text-gray-300">{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewUser(user)}
                              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <Eye size={16} />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditUser(user)}
                              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <Edit size={16} />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleChangeRole(user)}
                              className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-700"
                            >
                              <ShieldAlert size={16} />
                              <span className="sr-only">Change Role</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeactivateUser(user)}
                              className="h-8 w-8 text-gray-400 hover:text-red-400 hover:bg-gray-700"
                            >
                              <Trash size={16} />
                              <span className="sr-only">Deactivate</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="border-t border-gray-700 py-4 flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Showing <span className="font-medium">{filteredUsers.length}</span> of{" "}
            <span className="font-medium">{users.length}</span> users
          </div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="bg-gray-800 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle>
              {currentAction === 'view' && "User Details"}
              {currentAction === 'edit' && "Edit User"}
              {currentAction === 'role' && "Change User Role"}
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              {currentAction === 'view' && "Complete information about this user."}
              {currentAction === 'edit' && "Update user information."}
              {currentAction === 'role' && "Update user role and permissions."}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && currentAction === 'view' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                <div className="h-16 w-16 rounded-full bg-gray-700 flex items-center justify-center">
                  <User2 size={32} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{selectedUser.fullName}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    {renderRoleBadge(selectedUser.role)}
                    {renderStatusBadge(selectedUser.status)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-400">Email</p>
                  <p className="text-sm text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Department</p>
                  <p className="text-sm text-white">{selectedUser.department || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Age</p>
                  <p className="text-sm text-white">{selectedUser.age || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Gender</p>
                  <p className="text-sm text-white">{selectedUser.gender || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Education Level</p>
                  <p className="text-sm text-white">{selectedUser.educationLevel || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-400">Joined Date</p>
                  <p className="text-sm text-white">
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
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
                  {selectedUser.githubUrl || 'N/A'}
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
                  {selectedUser.linkedinUrl || 'N/A'}
                </a>
              </div>

              <DialogFooter className="flex gap-2 sm:justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsUserDialogOpen(false)}
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Close
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-700 text-white hover:bg-gray-700"
                  onClick={() => handleEditUser(selectedUser)}
                >
                  <Edit size={16} className="mr-2" />
                  Edit User
                </Button>
                <Button
                  variant="default"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    toast({
                      title: "Email Sent",
                      description: `A message has been sent to ${selectedUser.fullName}.`,
                    });
                  }}
                >
                  <Mail size={16} className="mr-2" />
                  Contact User
                </Button>
              </DialogFooter>
            </div>
          )}

          {selectedUser && currentAction === 'role' && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 pb-4">
                <div className="h-12 w-12 rounded-full bg-gray-700 flex items-center justify-center">
                  <User2 size={24} className="text-gray-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedUser.fullName}</h3>
                  <p className="text-sm text-gray-400">{selectedUser.email}</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Current Role</label>
                <div className="flex items-center space-x-2">
                  {renderRoleBadge(selectedUser.role)}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">New Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600 text-white">
                    <SelectGroup>
                      <SelectLabel className="text-gray-400">Available Roles</SelectLabel>
                      <SelectItem value="Member">Member</SelectItem>
                      <SelectItem value="Ambassador">Ambassador</SelectItem>
                      <SelectItem value="Moderator">Moderator</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400">Role Permissions</h4>
                <div className="space-y-2 text-sm">
                  {selectedRole === 'Member' && (
                    <>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Create and comment on content</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Join projects and circles</div>
                      <div className="flex items-center"><XCircle className="h-4 w-4 mr-2 text-red-400" /> No moderation controls</div>
                      <div className="flex items-center"><XCircle className="h-4 w-4 mr-2 text-red-400" /> No admin access</div>
                    </>
                  )}
                  {selectedRole === 'Ambassador' && (
                    <>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> All Member permissions</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Lead community circles</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Highlight community content</div>
                      <div className="flex items-center"><XCircle className="h-4 w-4 mr-2 text-red-400" /> Limited moderation controls</div>
                    </>
                  )}
                  {selectedRole === 'Moderator' && (
                    <>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> All Ambassador permissions</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Full moderation controls</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Review flagged content</div>
                      <div className="flex items-center"><XCircle className="h-4 w-4 mr-2 text-red-400" /> No system settings access</div>
                    </>
                  )}
                  {selectedRole === 'Admin' && (
                    <>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> All Moderator permissions</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Full system administration</div>
                      <div className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-500" /> Manage users and roles</div>
                      <div className="flex items-center"><AlertCircle className="h-4 w-4 mr-2 text-yellow-400" /> Access to all settings and logs</div>
                    </>
                  )}
                </div>
              </div>

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsUserDialogOpen(false)}
                  className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-700"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  onClick={handleRoleChange}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <UserCheck size={16} className="mr-2" />
                  Update Role
                </Button>
              </DialogFooter>
            </div>
          )}

          {/* Edit user form would go here for currentAction === 'edit' */}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminUsersPage;
