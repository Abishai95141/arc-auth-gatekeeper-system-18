
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, admin } = useAuth();
  
  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <div className="flex items-center space-x-2 pb-6">
          <Logo className="h-8 w-8" />
          <span className="text-lg font-bold">Builders Arc</span>
        </div>
        
        <nav className="space-y-1">
          <a 
            href="/admin" 
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            Dashboard
          </a>
          <a 
            href="/admin/users" 
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            All Users
          </a>
        </nav>
        
        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-center space-x-2 px-3 py-2 text-sm">
            <div className="h-6 w-6 rounded-full bg-white/20"></div>
            <span>{admin?.email}</span>
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
      
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="text-2xl font-bold">{title}</h1>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
