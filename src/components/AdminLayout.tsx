
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, admin } = useAuth();
  
  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-indigo-950 text-white md:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-white/10 px-4">
            <Logo className="h-8 w-8 mr-2" />
            <span className="text-lg font-bold">Builders Arc</span>
          </div>
          
          <nav className="flex flex-col gap-2 p-4">
            <Link 
              to="/admin" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              Dashboard
            </Link>
            <Link 
              to="/admin/users" 
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/10"
            >
              All Users
            </Link>
          </nav>
          
          <div className="mt-auto p-4">
            <div className="mb-2 rounded-md bg-indigo-900 p-3">
              <div className="text-xs text-white/70">Logged in as</div>
              <div className="text-sm font-medium">{admin?.email}</div>
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
      </div>
      
      <div className="flex flex-col">
        <header className="flex h-16 items-center gap-4 border-b bg-gray-50 px-6">
          <h1 className="text-xl font-bold">{title}</h1>
          
          <div className="ml-auto md:hidden">
            <Button variant="ghost" size="icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
