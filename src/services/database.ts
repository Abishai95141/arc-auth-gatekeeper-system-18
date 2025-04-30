import { toast } from "@/components/ui/sonner";

// User types
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

// Mock database
let users: User[] = [
  {
    id: '1',
    fullName: 'Test User',
    email: 'user@test.com',
    age: 25,
    gender: 'Male',
    department: 'Computer Science',
    educationLevel: 'Bachelor',
    githubUrl: 'https://github.com/testuser',
    linkedinUrl: 'https://linkedin.com/in/testuser',
    status: 'approved',
    createdAt: new Date('2023-01-01'),
  },
  {
    id: '2',
    fullName: 'Pending User',
    email: 'pending@test.com',
    age: 30,
    gender: 'Female',
    department: 'Engineering',
    educationLevel: 'Master',
    githubUrl: 'https://github.com/pendinguser',
    linkedinUrl: 'https://linkedin.com/in/pendinguser',
    status: 'pending',
    createdAt: new Date('2023-02-01'),
  },
  {
    id: '3',
    fullName: 'Rejected User',
    email: 'rejected@test.com',
    age: 28,
    gender: 'Other',
    department: 'Design',
    educationLevel: 'PhD',
    githubUrl: 'https://github.com/rejecteduser',
    linkedinUrl: 'https://linkedin.com/in/rejecteduser',
    status: 'rejected',
    createdAt: new Date('2023-03-01'),
  }
];

const admins = [
  {
    id: '1',
    email: 'abishaioff@gmail.com',
    name: 'Admin User',
  }
];

// Password storage (not secure, just for demo)
const userPasswords = new Map([
  ['user@test.com', 'password123'],
  ['pending@test.com', 'password123'],
  ['rejected@test.com', 'password123'],
]);

const adminPasswords = new Map([
  ['abishaioff@gmail.com', 'Abi@2925'],
]);

// Helper functions
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// User operations
export async function signupUser(userData: SignupFormData): Promise<User> {
  await delay(1000); // Simulate API delay
  
  // Check if user already exists
  if (users.some(user => user.email === userData.email)) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    id: Math.random().toString(36).substring(7),
    fullName: userData.fullName,
    email: userData.email,
    age: userData.age,
    gender: userData.gender,
    department: userData.department,
    educationLevel: userData.educationLevel,
    githubUrl: userData.githubUrl,
    linkedinUrl: userData.linkedinUrl,
    status: 'pending',
    createdAt: new Date(),
  };

  // Store password
  userPasswords.set(userData.email, userData.password);
  
  // Add user to database
  users = [...users, newUser];
  
  return newUser;
}

export async function loginUser(credentials: UserCredentials): Promise<{ user: User, message?: string }> {
  await delay(800); // Simulate API delay
  
  const user = users.find(user => user.email === credentials.email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  const storedPassword = userPasswords.get(credentials.email);
  
  if (storedPassword !== credentials.password) {
    throw new Error('Invalid email or password');
  }
  
  if (user.status === 'pending') {
    return { 
      user,
      message: 'Your account is pending approval. Please wait for an admin to accept your request.'
    };
  }
  
  if (user.status === 'rejected') {
    return { 
      user,
      message: 'Your signup request has been declined. Contact support for more information.'
    };
  }
  
  return { user };
}

export async function loginAdmin(credentials: UserCredentials): Promise<Admin> {
  await delay(800); // Simulate API delay
  
  const admin = admins.find(admin => admin.email === credentials.email);
  
  if (!admin) {
    throw new Error('Invalid admin credentials. Please try again.');
  }
  
  const storedPassword = adminPasswords.get(credentials.email);
  
  if (storedPassword !== credentials.password) {
    throw new Error('Invalid admin credentials. Please try again.');
  }
  
  return admin;
}

export async function getAllPendingUsers(): Promise<User[]> {
  await delay(500); // Simulate API delay
  return users.filter(user => user.status === 'pending');
}

export async function getAllUsers(): Promise<User[]> {
  await delay(500); // Simulate API delay
  return users;
}

export async function approveUser(userId: string): Promise<User> {
  await delay(800); // Simulate API delay
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    status: 'approved' as UserStatus,
  };
  
  users = [
    ...users.slice(0, userIndex),
    updatedUser,
    ...users.slice(userIndex + 1),
  ];
  
  toast.success(`${updatedUser.fullName} has been approved`);
  return updatedUser;
}

export async function rejectUser(userId: string): Promise<User> {
  await delay(800); // Simulate API delay
  
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    throw new Error('User not found');
  }
  
  const updatedUser = {
    ...users[userIndex],
    status: 'rejected' as UserStatus,
  };
  
  users = [
    ...users.slice(0, userIndex),
    updatedUser,
    ...users.slice(userIndex + 1),
  ];
  
  toast.success(`${updatedUser.fullName} has been rejected`);
  return updatedUser;
}
