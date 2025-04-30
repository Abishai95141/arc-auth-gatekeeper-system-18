
// User interface definition
export interface User {
  id: string;
  email: string;
  fullName: string;
  age?: number;
  gender?: string;
  department?: string;
  educationLevel?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  createdAt: string;
  status?: string;
  role?: string;
  lastLogin?: string;
  activityScore?: number;
}

// Admin interface definition
export interface Admin {
  id: string;
  email: string;
  fullName: string;
  role: string;
  lastLogin: string;
}

// User credentials for login
export interface UserCredentials {
  email: string;
  password: string;
}

// Signup form data interface
export interface SignupFormData {
  email: string;
  password: string;
  fullName: string;
  department?: string;
  educationLevel?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  age?: number;
  gender?: string;
}

import { db } from '@/firebase';
import { 
  collection, 
  getDocs, 
  query, 
  where, 
  doc, 
  updateDoc,
  orderBy,
  limit
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

// Mock authentication functions
export const loginUser = async (credentials: UserCredentials): Promise<{ user: User, message?: string }> => {
  // For development, just return a mock user
  if (credentials.email === 'user@example.com' && credentials.password === 'password') {
    return {
      user: {
        id: '1',
        email: credentials.email,
        fullName: 'Test User',
        createdAt: new Date().toISOString(),
        status: 'approved',
        role: 'Member',
        lastLogin: new Date().toISOString()
      }
    };
  } else if (credentials.email === 'pending@example.com') {
    return { 
      user: {
        id: '3',
        email: credentials.email,
        fullName: 'Pending User',
        createdAt: new Date().toISOString(),
        status: 'pending',
        role: 'Member'
      },
      message: 'Your account is pending approval'
    };
  }
  
  throw new Error('Invalid email or password');
};

export const loginAdmin = async (credentials: UserCredentials): Promise<Admin> => {
  // For development, just return a mock admin
  if (credentials.email === 'admin@example.com' && credentials.password === 'admin') {
    return {
      id: 'admin1',
      email: credentials.email,
      fullName: 'Admin User',
      role: 'Admin',
      lastLogin: new Date().toISOString()
    };
  }
  
  throw new Error('Invalid admin credentials');
};

export const signupUser = async (data: SignupFormData): Promise<User> => {
  // For development, just return a mock response
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    email: data.email,
    fullName: data.fullName,
    department: data.department,
    educationLevel: data.educationLevel,
    githubUrl: data.githubUrl,
    linkedinUrl: data.linkedinUrl,
    age: data.age,
    gender: data.gender,
    createdAt: new Date().toISOString(),
    status: 'pending',
    role: 'Member'
  };
  
  return newUser;
};

export const getAllPendingUsers = async (): Promise<User[]> => {
  try {
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });
    
    return users;
  } catch (error) {
    console.error("Error fetching pending users:", error);
    
    // Return mock data for development
    return [
      {
        id: '3',
        email: 'pending1@example.com',
        fullName: 'Pending User 1',
        department: 'Marketing',
        educationLevel: 'Bachelor',
        githubUrl: 'https://github.com/pending1',
        linkedinUrl: 'https://linkedin.com/in/pending1',
        age: 28,
        gender: 'Female',
        createdAt: new Date().toISOString(),
        status: 'pending'
      },
      {
        id: '4',
        email: 'pending2@example.com',
        fullName: 'Pending User 2',
        department: 'Engineering',
        educationLevel: 'Master',
        githubUrl: 'https://github.com/pending2',
        linkedinUrl: 'https://linkedin.com/in/pending2',
        age: 32,
        gender: 'Male',
        createdAt: new Date().toISOString(),
        status: 'pending'
      }
    ];
  }
};

export const approveUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      status: 'approved',
    });
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};

export const rejectUser = async (userId: string): Promise<void> => {
  try {
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      status: 'rejected',
    });
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  // This would typically be a call to a database or API
  // For now, return mock data
  return [
    {
      id: '1',
      email: 'johndoe@example.com',
      fullName: 'John Doe',
      department: 'Engineering',
      createdAt: new Date().toISOString(),
      status: 'active',
      role: 'Member',
      lastLogin: new Date().toISOString(),
      activityScore: 85
    },
    {
      id: '2',
      email: 'janedoe@example.com',
      fullName: 'Jane Doe',
      department: 'Design',
      createdAt: new Date().toISOString(),
      status: 'active',
      role: 'Ambassador',
      lastLogin: new Date().toISOString(),
      activityScore: 92
    }
  ];
};
