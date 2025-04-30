
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User, Admin, loginUser, loginAdmin, UserCredentials } from '@/services/database';
import { toast } from "@/components/ui/sonner";
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  admin: Admin | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  userLogin: (credentials: UserCredentials) => Promise<void>;
  adminLogin: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for stored auth on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('arc_user');
    const storedAdmin = localStorage.getItem('arc_admin');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('arc_user');
      }
    }

    if (storedAdmin) {
      try {
        setAdmin(JSON.parse(storedAdmin));
      } catch (e) {
        localStorage.removeItem('arc_admin');
      }
    }

    setIsLoading(false);
  }, []);

  const userLogin = async (credentials: UserCredentials) => {
    setIsLoading(true);
    try {
      const { user, message } = await loginUser(credentials);
      
      if (user) {
        setUser(user);
        localStorage.setItem('arc_user', JSON.stringify(user));
        navigate('/dashboard');
      } else {
        // Show message for pending/rejected users but don't log them in
        toast.error(message || 'Account status issue');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (credentials: UserCredentials) => {
    setIsLoading(true);
    try {
      const adminUser = await loginAdmin(credentials);
      setAdmin(adminUser);
      localStorage.setItem('arc_admin', JSON.stringify(adminUser));
      navigate('/admin');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    // Sign out from Supabase auth
    await supabase.auth.signOut();
    
    // Clear local state
    setUser(null);
    setAdmin(null);
    localStorage.removeItem('arc_user');
    localStorage.removeItem('arc_admin');
    navigate('/login');
  };

  const value = {
    user,
    admin,
    isLoading,
    isAuthenticated: !!user,
    isAdminAuthenticated: !!admin,
    userLogin,
    adminLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
