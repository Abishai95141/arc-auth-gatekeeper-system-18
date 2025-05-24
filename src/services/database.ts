import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { User as SupabaseUser } from '@supabase/supabase-js';

// Profile type matching the Supabase profiles table
export interface Profile {
  id: string;
  full_name: string;
  email: string;
  age: number | null;
  gender: string | null;
  department: string | null;
  education_level: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  status: 'pending' | 'approved' | 'rejected';
  role: 'user' | 'admin';
  created_at: string;
}

// Keep existing types for compatibility
export type UserStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

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

// Helper function to convert Profile to User for backward compatibility
function profileToUser(profile: Profile): User {
  return {
    id: profile.id,
    fullName: profile.full_name,
    email: profile.email,
    age: profile.age || 0,
    gender: profile.gender || '',
    department: profile.department || '',
    educationLevel: profile.education_level || '',
    githubUrl: profile.github_url || '',
    linkedinUrl: profile.linkedin_url || '',
    status: profile.status as UserStatus,
    createdAt: new Date(profile.created_at),
  };
}

// Supabase-based functions
export async function signupWithSupabase(userData: SignupFormData): Promise<{ user: SupabaseUser; profile: Profile }> {
  console.log('Starting signup process with Supabase');
  
  // Step 1: Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: userData.email,
    password: userData.password,
  });

  if (authError) {
    console.error('Auth signup error:', authError);
    throw new Error(authError.message);
  }

  if (!authData.user) {
    throw new Error('User creation failed');
  }

  console.log('Auth user created successfully:', authData.user.id);

  // Step 2: Create profile
  const profileData = {
    id: authData.user.id,
    full_name: userData.fullName,
    email: userData.email,
    age: userData.age,
    gender: userData.gender,
    department: userData.department,
    education_level: userData.educationLevel,
    github_url: userData.githubUrl,
    linkedin_url: userData.linkedinUrl,
    status: 'pending' as const,
    role: 'user' as const,
  };

  const { data: profileResult, error: profileError } = await supabase
    .from('profiles')
    .insert(profileData)
    .select()
    .single();

  if (profileError) {
    console.error('Profile creation error:', profileError);
    // Clean up auth user if profile creation fails
    await supabase.auth.admin.deleteUser(authData.user.id);
    throw new Error(`Profile creation failed: ${profileError.message}`);
  }

  console.log('Profile created successfully');
  return { user: authData.user, profile: profileResult };
}

export async function loginWithSupabase(credentials: UserCredentials): Promise<{ user: SupabaseUser; profile: Profile; message?: string }> {
  console.log('Starting login process with Supabase');
  
  // Step 1: Authenticate with Supabase
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password,
  });

  if (authError) {
    console.error('Auth login error:', authError);
    throw new Error('Invalid email or password');
  }

  if (!authData.user) {
    throw new Error('Login failed');
  }

  console.log('Auth login successful:', authData.user.id);

  // Step 2: Fetch profile
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profileError) {
    console.error('Profile fetch error:', profileError);
    await supabase.auth.signOut();
    throw new Error('Profile not found');
  }

  console.log('Profile fetched:', profile.status, profile.role);

  // Step 3: Check profile status
  if (profile.status === 'pending') {
    await supabase.auth.signOut();
    return { 
      user: authData.user,
      profile,
      message: 'Your account is pending approval. Please wait for an admin to accept your request.'
    };
  }

  if (profile.status === 'rejected') {
    await supabase.auth.signOut();
    return { 
      user: authData.user,
      profile,
      message: 'Your signup request has been declined. Contact support for more information.'
    };
  }

  return { user: authData.user, profile };
}

export async function loginAdminWithSupabase(credentials: UserCredentials): Promise<{ user: SupabaseUser; profile: Profile }> {
  console.log('Starting admin login process');
  
  const { user, profile, message } = await loginWithSupabase(credentials);
  
  if (message) {
    throw new Error(message);
  }

  if (profile.role !== 'admin') {
    await supabase.auth.signOut();
    throw new Error('Invalid admin credentials. Please try again.');
  }

  return { user, profile };
}

export async function logoutWithSupabase(): Promise<void> {
  console.log('Logging out from Supabase');
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Logout error:', error);
    throw new Error(error.message);
  }
}

export async function getAllPendingUsersFromSupabase(): Promise<User[]> {
  console.log('Fetching pending users from Supabase');
  
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('status', 'pending')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching pending users:', error);
    throw new Error('Failed to fetch pending users');
  }

  return profiles.map(profileToUser);
}

export async function getAllUsersFromSupabase(): Promise<User[]> {
  console.log('Fetching all users from Supabase');
  
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }

  return profiles.map(profileToUser);
}

export async function approveUserInSupabase(userId: string): Promise<User> {
  console.log('Approving user in Supabase:', userId);
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({ status: 'approved' })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error approving user:', error);
    throw new Error('Failed to approve user');
  }

  const user = profileToUser(profile);
  toast.success(`${user.fullName} has been approved`);
  return user;
}

export async function rejectUserInSupabase(userId: string): Promise<User> {
  console.log('Rejecting user in Supabase:', userId);
  
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({ status: 'rejected' })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    console.error('Error rejecting user:', error);
    throw new Error('Failed to reject user');
  }

  const user = profileToUser(profile);
  toast.success(`${user.fullName} has been rejected`);
  return user;
}

// Legacy functions for backward compatibility - delegate to Supabase versions
export async function signupUser(userData: SignupFormData): Promise<User> {
  const { profile } = await signupWithSupabase(userData);
  return profileToUser(profile);
}

export async function loginUser(credentials: UserCredentials): Promise<{ user: User, message?: string }> {
  try {
    const { profile, message } = await loginWithSupabase(credentials);
    return { user: profileToUser(profile), message };
  } catch (error) {
    throw error;
  }
}

export async function loginAdmin(credentials: UserCredentials): Promise<Admin> {
  const { profile } = await loginAdminWithSupabase(credentials);
  return {
    id: profile.id,
    email: profile.email,
    name: profile.full_name,
  };
}

export async function getAllPendingUsers(): Promise<User[]> {
  return getAllPendingUsersFromSupabase();
}

export async function getAllUsers(): Promise<User[]> {
  return getAllUsersFromSupabase();
}

export async function approveUser(userId: string): Promise<User> {
  return approveUserInSupabase(userId);
}

export async function rejectUser(userId: string): Promise<User> {
  return rejectUserInSupabase(userId);
}
