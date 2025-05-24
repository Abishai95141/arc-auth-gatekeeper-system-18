
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Profile, UserCredentials, loginWithSupabase, loginAdminWithSupabase, logoutWithSupabase } from '@/services/database';
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  userLogin: (credentials: UserCredentials) => Promise<void>;
  adminLogin: (credentials: UserCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to safely cast Supabase data to Profile type
function castToProfile(data: any): Profile {
  return {
    id: data.id,
    full_name: data.full_name,
    email: data.email,
    age: data.age,
    gender: data.gender,
    department: data.department,
    education_level: data.education_level,
    github_url: data.github_url,
    linkedin_url: data.linkedin_url,
    status: data.status as 'pending' | 'approved' | 'rejected',
    role: data.role as 'user' | 'admin',
    created_at: data.created_at,
  };
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize auth state and listen for changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session?.user?.id);
        
        if (session?.user) {
          setUser(session.user);
          
          // Fetch profile data
          try {
            const { data: profileData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) {
              console.error('Error fetching profile:', error);
              setProfile(null);
            } else {
              console.log('Profile loaded:', profileData.status, profileData.role);
              setProfile(castToProfile(profileData));
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          }
        } else {
          setUser(null);
          setProfile(null);
        }
        
        setIsLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session?.user?.id);
      // The onAuthStateChange will handle setting the state
    });

    return () => {
      console.log('Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const userLogin = async (credentials: UserCredentials) => {
    setIsLoading(true);
    try {
      console.log('User login attempt');
      const { user: authUser, profile: userProfile, message } = await loginWithSupabase(credentials);
      
      if (userProfile.status === 'approved') {
        // Auth state listener will handle setting user and profile
        navigate('/dashboard');
      } else {
        // Show message for pending/rejected users
        toast.error(message || 'Account status issue');
      }
    } catch (error) {
      console.error('Login error:', error);
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
      console.log('Admin login attempt');
      const { user: authUser, profile: adminProfile } = await loginAdminWithSupabase(credentials);
      
      // Auth state listener will handle setting user and profile
      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
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
    console.log('Logout initiated');
    try {
      await logoutWithSupabase();
      // Auth state listener will handle clearing user and profile
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
      // Force clear state even if logout fails
      setUser(null);
      setProfile(null);
      navigate('/login');
    }
  };

  const value = {
    user,
    profile,
    isLoading,
    isAuthenticated: !!user && profile?.status === 'approved',
    isAdminAuthenticated: !!user && profile?.role === 'admin',
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
