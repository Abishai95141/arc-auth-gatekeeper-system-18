
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
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2" />
            </svg>
            <span>Dashboard</span>
          </a>
          <a 
            href="/admin/users" 
            className="flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span>All Users</span>
          </a>
        </nav>
        
        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-center space-x-2 px-3 py-2 text-sm">
            <div className="h-6 w-6 rounded-full bg-white/20"></div>
            <span className="text-white/80">{admin?.email}</span>
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
