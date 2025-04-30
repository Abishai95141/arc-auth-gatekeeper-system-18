
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AdminLayout from '@/components/AdminLayout';
import { getAllPendingUsers, User } from '@/services/database';
import { Link } from 'react-router-dom';
import { Users, Flag, BarChart, User as UserIcon, Shield } from 'lucide-react';

const AdminHomePage: React.FC = () => {
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data
  const [flaggedContent, setFlaggedContent] = useState(7);
  const [activeUsers, setActiveUsers] = useState(132);
  const [totalContent, setTotalContent] = useState(267);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

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

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Pending Signups Widget */}
        <Card className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 border-purple-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users size={20} className="text-purple-400" />
              Pending Signups
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{isLoading ? '...' : pendingUsers.length}</div>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link to="/admin/signup-requests">
                Review Requests
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Flagged Content Widget */}
        <Card className="bg-gradient-to-br from-amber-900/40 to-amber-800/40 border-amber-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Flag size={20} className="text-amber-400" />
              Flagged Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-4">{flaggedContent}</div>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link to="/admin/moderation">
                Review Flags
              </Link>
            </Button>
          </CardContent>
        </Card>
        
        {/* Quick Stats Widget */}
        <Card className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-700/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart size={20} className="text-blue-400" />
              Platform Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-4">
              <div>
                <div className="text-sm text-muted-foreground">Active Users</div>
                <div className="text-2xl font-bold">{activeUsers}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Total Content</div>
                <div className="text-2xl font-bold">{totalContent}</div>
              </div>
            </div>
            <Button asChild variant="secondary" size="sm" className="w-full">
              <Link to="/admin/analytics">
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Links */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Frequent admin tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
              <Link to="/admin/users">
                <UserIcon size={24} />
                <div>Review Users</div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
              <Link to="/admin/moderation">
                <Shield size={24} />
                <div>Moderate Content</div>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-24 flex flex-col gap-2">
              <Link to="/admin/analytics">
                <BarChart size={24} />
                <div>Site Analytics</div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Signups */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Recent Signup Requests</CardTitle>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/signup-requests">
              View All
            </Link>
          </Button>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingUsers.slice(0, 5).map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>
                        {new Date(user.createdAt).toLocaleDateString()}
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

export default AdminHomePage;
