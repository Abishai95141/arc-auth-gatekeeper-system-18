
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';
import { 
  Menu, X, User, LayoutDashboard, Users, Flag, 
  Lightbulb, FolderGit2, FileText, Calendar, 
  CircleUser, Award, BarChart, MessageSquare, 
  Megaphone, Settings, Search, Bell
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const navigationItems = [
  { name: 'Dashboard Home', href: '/admin', icon: LayoutDashboard },
  { name: 'User Management', href: '/admin/users', icon: Users },
  { name: 'Content Moderation', href: '/admin/moderation', icon: Flag },
  { name: 'Ideas Oversight', href: '/admin/ideas', icon: Lightbulb },
  { name: 'Projects Oversight', href: '/admin/projects', icon: FolderGit2 },
  { name: 'Docs Review', href: '/admin/docs', icon: FileText },
  { name: 'Tech Talks Management', href: '/admin/talks', icon: Calendar },
  { name: 'Community Circles', href: '/admin/circles', icon: CircleUser },
  { name: 'Gamification & Badges', href: '/admin/badges', icon: Award },
  { name: 'Analytics & Reports', href: '/admin/analytics', icon: BarChart },
  { name: 'Feedback & Bug Reports', href: '/admin/feedback', icon: MessageSquare },
  { name: 'Announcements', href: '/admin/announcements', icon: Megaphone },
  { name: 'Settings & Logs', href: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, admin } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="admin-layout min-h-screen bg-gray-900 text-white flex">
      <div 
        className={`admin-sidebar bg-gray-800 transition-all duration-300 ease-in-out fixed h-full z-30
          ${sidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'}`}
      >
        <div className="overflow-y-auto h-full flex flex-col">
          <div className="flex items-center space-x-2 p-4 h-16">
            {(sidebarOpen || !sidebarOpen && window.innerWidth >= 768) && (
              <>
                <Logo className="h-8 w-8 flex-shrink-0" />
                {sidebarOpen && <span className="text-lg font-bold">Builders Arc</span>}
              </>
            )}
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/admin' && location.pathname.startsWith(item.href));
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                    isActive 
                      ? "bg-purple-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
          
          <div className="p-4 border-t border-gray-700">
            <div className="mb-2 flex items-center space-x-2 px-3 py-2 text-sm text-white/80">
              <User className="h-5 w-5 text-gray-400" />
              {sidebarOpen && <span>{admin?.email}</span>}
            </div>
            <Button 
              variant="outline" 
              className={cn(
                "w-full bg-gray-700 text-white hover:bg-gray-600 border-gray-600",
                !sidebarOpen && "justify-center p-2"
              )}
              onClick={logout}
            >
              {sidebarOpen ? "Logout" : ""}
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className={`admin-content transition-all duration-300 ease-in-out flex-1 
          ${sidebarOpen ? 'md:ml-64' : 'ml-0 md:ml-16'}`}
      >
        <div className="admin-header bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleSidebar} 
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              aria-label="Toggle sidebar"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </Button>
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Global search */}
            <div className="hidden md:flex relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search across admin..." 
                className="bg-gray-700 border-gray-600 text-white pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
              />
            </div>
            
            {/* Notifications */}
            <Button 
              variant="outline" 
              size="icon"
              className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 relative"
            >
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* Profile */}
            <Link to="/admin/profile">
              <Button 
                variant="outline" 
                className="flex items-center gap-2 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                <User size={18} />
                <span className="hidden md:inline">Profile</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
