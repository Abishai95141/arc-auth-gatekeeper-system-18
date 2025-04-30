
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { getAllUsers, User, UserStatus } from '@/services/database';
import AdminLayout from '@/components/AdminLayout';
import { Search, UserCheck, UserMinus, UserPlus } from 'lucide-react';

type UserWithExtendedInfo = User & {
  role: string;
  lastLogin: string;
  activityScore: number;
}

const UsersManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserWithExtendedInfo[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserWithExtendedInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, roleFilter, statusFilter, users]);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const fetchedUsers = await getAllUsers();
      
      // Add mock extended user information
      const extendedUsers: UserWithExtendedInfo[] = fetchedUsers.map(user => ({
        ...user,
        role: ['Member', 'Ambassador', 'Moderator'][Math.floor(Math.random() * 3)],
        lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        activityScore: Math.floor(Math.random() * 100)
      }));
      
      setUsers(extendedUsers);
      setFilteredUsers(extendedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let result = [...users];
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        user => user.fullName.toLowerCase().includes(term) || 
                user.email.toLowerCase().includes(term)
      );
    }
    
    // Apply role filter
    if (roleFilter !== 'all') {
      result = result.filter(user => user.role === roleFilter);
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      // For demo purposes, consider 'approved' users as active, others as suspended
      const isActive = statusFilter === 'active';
      result = result.filter(user => {
        return isActive ? user.status === 'approved' : user.status !== 'approved';
      });
    }
    
    setFilteredUsers(result);
  };

  const handleChangeRole = (userId: string, newRole: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    toast.success(`User role changed to ${newRole}`);
  };

  const handleToggleStatus = (userId: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => {
        if (user.id === userId) {
          const newStatus = user.status === 'approved' ? ('suspended' as UserStatus) : ('approved' as UserStatus);
          return { ...user, status: newStatus };
        }
        return user;
      })
    );
    
    const user = users.find(u => u.id === userId);
    const newStatus = user?.status === 'approved' ? 'suspended' : 'approved';
    toast.success(`User ${newStatus === 'approved' ? 'activated' : 'deactivated'}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AdminLayout title="User Management">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-end mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 md:w-[400px]">
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Roles</SelectItem>
                    <SelectItem value="Member">Member</SelectItem>
                    <SelectItem value="Ambassador">Ambassador</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
              <p className="text-center text-muted-foreground">
                No users found matching your filters
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar>
                            <AvatarFallback>{getInitials(user.fullName)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{user.fullName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            user.role === 'Moderator' ? 'border-purple-400 text-purple-500' : 
                            user.role === 'Ambassador' ? 'border-blue-400 text-blue-500' : 
                            'border-gray-400 text-gray-500'
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          className={user.status === 'approved' ? 'border-green-400 text-green-500' : 'border-red-400 text-red-500'}
                        >
                          {user.status === 'approved' ? 'Active' : 'Suspended'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Select
                            value={user.role}
                            onValueChange={(value) => handleChangeRole(user.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Change Role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Member">Member</SelectItem>
                              <SelectItem value="Ambassador">Ambassador</SelectItem>
                              <SelectItem value="Moderator">Moderator</SelectItem>
                            </SelectContent>
                          </Select>
                          
                          <Button
                            variant={user.status === 'approved' ? 'destructive' : 'default'}
                            size="sm"
                            onClick={() => handleToggleStatus(user.id)}
                          >
                            {user.status === 'approved' ? (
                              <>
                                <UserMinus className="mr-1 h-4 w-4" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="mr-1 h-4 w-4" />
                                Activate
                              </>
                            )}
                          </Button>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <a href={`/users/${user.id}`}>
                              View Profile
                            </a>
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

export default UsersManagementPage;
