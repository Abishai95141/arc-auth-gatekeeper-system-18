
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";

// User types
export type UserStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  fullName: string;
  email: string;
  age: number;
  gender: string;
  department: string;
  educationLevel: string;
  githubUrl: string;
  linkedinUrl: string;
  status: UserStatus;
  createdAt: Date;
}

export interface UserCredentials {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  department: string;
  educationLevel: string;
  githubUrl: string;
  linkedinUrl: string;
}

// Admin types
export interface Admin {
  id: string;
  email: string;
  name: string;
}

// Signup User
export async function signupUser(userData: SignupFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Save the signup request in the signup_requests table
    const { error } = await supabase.from('signup_requests').insert({
      full_name: userData.fullName,
      email: userData.email,
      password: userData.password, // In a real app, we'd hash this
      age: userData.age,
      gender: userData.gender,
      department: userData.department,
      education_level: userData.educationLevel,
      github_url: userData.githubUrl,
      linkedin_url: userData.linkedinUrl
    });
    
    if (error) throw error;
    
    return { success: true, message: 'Signup request submitted successfully!' };
  } catch (error: any) {
    console.error('Error during signup:', error);
    return { success: false, message: error.message || 'An unexpected error occurred' };
  }
}

// User Login
export async function loginUser(credentials: UserCredentials): Promise<{ user: User | null; message?: string }> {
  try {
    // First check if the user has a pending or rejected signup request
    const { data: signupData } = await supabase
      .from('signup_requests')
      .select('status')
      .eq('email', credentials.email)
      .single();
    
    if (signupData) {
      if (signupData.status === 'pending') {
        return { 
          user: null,
          message: 'Your account is pending approval. Please wait for an admin to accept your request.'
        };
      }
      
      if (signupData.status === 'rejected') {
        return { 
          user: null,
          message: 'Your signup request has been declined. Contact support for more information.'
        };
      }
    }

    // If not pending or rejected, try to sign in
    const { data, error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) throw error;

    if (data?.user) {
      // Get user profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id)
        .single();
      
      if (profileData) {
        const user: User = {
          id: profileData.id,
          fullName: profileData.full_name,
          email: profileData.email,
          age: profileData.age,
          gender: profileData.gender,
          department: profileData.department,
          educationLevel: profileData.education_level,
          githubUrl: profileData.github_url,
          linkedinUrl: profileData.linkedin_url,
          status: profileData.status,
          createdAt: new Date(profileData.created_at),
        };
        
        return { user };
      }
    }
    
    return { user: null, message: 'User profile not found' };
  } catch (error: any) {
    console.error('Error during login:', error);
    throw new Error(error.message || 'Invalid email or password');
  }
}

// Admin Login
export async function loginAdmin(credentials: UserCredentials): Promise<Admin> {
  try {
    // Check admin credentials in the admins table
    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', credentials.email)
      .eq('password', credentials.password) // In a real app, we'd compare hashed passwords
      .single();
    
    if (error || !data) {
      throw new Error('Invalid admin credentials. Please try again.');
    }
    
    const admin: Admin = {
      id: data.id,
      email: data.email,
      name: data.name
    };
    
    return admin;
  } catch (error: any) {
    console.error('Error during admin login:', error);
    throw new Error('Invalid admin credentials. Please try again.');
  }
}

// Get All Pending Users
export async function getAllPendingUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('signup_requests')
      .select('*')
      .eq('status', 'pending');
    
    if (error) throw error;
    
    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email,
      age: item.age,
      gender: item.gender,
      department: item.department,
      educationLevel: item.education_level,
      githubUrl: item.github_url,
      linkedinUrl: item.linkedin_url,
      status: item.status,
      createdAt: new Date(item.created_at),
    }));
  } catch (error) {
    console.error('Error fetching pending users:', error);
    return [];
  }
}

// Get All Users
export async function getAllUsers(): Promise<User[]> {
  try {
    // Get from signup_requests (includes all statuses)
    const { data, error } = await supabase
      .from('signup_requests')
      .select('*');
    
    if (error) throw error;
    
    return data.map((item: any) => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email,
      age: item.age,
      gender: item.gender,
      department: item.department,
      educationLevel: item.education_level,
      githubUrl: item.github_url,
      linkedinUrl: item.linkedin_url,
      status: item.status,
      createdAt: new Date(item.created_at),
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
}

// Approve User
export async function approveUser(userId: string): Promise<User> {
  try {
    // Get the user from signup_requests
    const { data: userData, error: fetchError } = await supabase
      .from('signup_requests')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (fetchError || !userData) throw new Error('User not found');
    
    // Update the status to approved
    const { error: updateError } = await supabase
      .from('signup_requests')
      .update({
        status: 'approved',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    // Create the authenticated user in Supabase auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true
    });
    
    if (authError) throw authError;
    
    const user: User = {
      id: userData.id,
      fullName: userData.full_name,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      department: userData.department,
      educationLevel: userData.education_level,
      githubUrl: userData.github_url,
      linkedinUrl: userData.linkedin_url,
      status: 'approved',
      createdAt: new Date(userData.created_at),
    };
    
    toast.success(`${user.fullName} has been approved`);
    return user;
  } catch (error: any) {
    console.error('Error approving user:', error);
    toast.error(`Error approving user: ${error.message}`);
    throw error;
  }
}

// Reject User
export async function rejectUser(userId: string): Promise<User> {
  try {
    // Get the user from signup_requests
    const { data: userData, error: fetchError } = await supabase
      .from('signup_requests')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (fetchError || !userData) throw new Error('User not found');
    
    // Update the status to rejected
    const { error: updateError } = await supabase
      .from('signup_requests')
      .update({
        status: 'rejected',
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', userId);
    
    if (updateError) throw updateError;
    
    const user: User = {
      id: userData.id,
      fullName: userData.full_name,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      department: userData.department,
      educationLevel: userData.education_level,
      githubUrl: userData.github_url,
      linkedinUrl: userData.linkedin_url,
      status: 'rejected',
      createdAt: new Date(userData.created_at),
    };
    
    toast.success(`${user.fullName} has been rejected`);
    return user;
  } catch (error: any) {
    console.error('Error rejecting user:', error);
    toast.error(`Error rejecting user: ${error.message}`);
    throw error;
  }
}
