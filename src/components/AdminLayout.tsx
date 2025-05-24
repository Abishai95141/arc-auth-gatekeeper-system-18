
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { Menu, X, User, LayoutDashboard, UserCheck, Users, Flag, BarChart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { getAllPendingUsers } from '@/services/database';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, profile } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState<number | null>(null);
  
  // Fetch pending count on mount
  React.useEffect(() => {
    const fetchPendingCount = async () => {
      try {
        const pendingUsers = await getAllPendingUsers();
        setPendingCount(pendingUsers.length);
      } catch (error) {
        console.error('Error fetching pending count:', error);
      }
    };
    
    fetchPendingCount();
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="admin-layout">
      <div className={`admin-sidebar transition-all duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center space-x-2 pb-6">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-bold">Builders Arc</span>
        </div>
        
        <nav className="space-y-1">
          <Link 
            to="/admin" 
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200 ${isActive('/admin') ? 'bg-white/20' : ''}`}
          >
            <LayoutDashboard className="h-4 w-4" />
            <span>Dashboard</span>
          </Link>
          
          <Link 
            to="/admin/signup-requests" 
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200 ${isActive('/admin/signup-requests') ? 'bg-white/20' : ''}`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Signup Requests</span>
            {pendingCount !== null && pendingCount > 0 && (
              <Badge variant="outline" className="ml-auto bg-purple-500 text-white border-none">
                {pendingCount}
              </Badge>
            )}
          </Link>
          
          <Link 
            to="/admin/users" 
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200 ${isActive('/admin/users') ? 'bg-white/20' : ''}`}
          >
            <Users className="h-4 w-4" />
            <span>User Management</span>
          </Link>
          
          <Link 
            to="/admin/moderation" 
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200 ${isActive('/admin/moderation') ? 'bg-white/20' : ''}`}
          >
            <Flag className="h-4 w-4" />
            <span>Content Moderation</span>
            <Badge variant="outline" className="ml-auto bg-red-500 text-white border-none">
              7
            </Badge>
          </Link>
          
          <Link 
            to="/admin/analytics" 
            className={`flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200 ${isActive('/admin/analytics') ? 'bg-white/20' : ''}`}
          >
            <BarChart className="h-4 w-4" />
            <span>Analytics</span>
          </Link>
        </nav>
        
        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-center space-x-2 px-3 py-2 text-sm">
            <div className="h-6 w-6 rounded-full bg-white/20"></div>
            <span className="text-white/80">{profile?.email}</span>
          </div>
          <Button 
            variant="outline" 
            className="w-full bg-white/10 text-white hover:bg-white/20" 
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
      
      <div className={`admin-content transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="admin-header">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleSidebar} 
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light hover:scale-[1.02] transition-all duration-200"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-gradient-to-r from-arc-secondary/40 to-arc-accent/40 text-white hover:from-arc-secondary hover:to-arc-accent hover:scale-[1.02] transition-all duration-200"
              >
                <User size={18} />
                Profile
              </Button>
            </Link>
          </div>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
