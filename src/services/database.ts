
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
  limit,
  addDoc
} from 'firebase/firestore';

const USERS_COLLECTION = 'users';

// Mock users database for development
let mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    fullName: 'Test User',
    department: 'Engineering',
    createdAt: new Date().toISOString(),
    status: 'approved',
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
  },
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
  // Updated to use the new admin credentials
  if (credentials.email === 'abishaioff@gmail.com' && credentials.password === 'Abi@2925') {
    return {
      id: 'admin1',
      email: credentials.email,
      fullName: 'Abishai Administrator',
      role: 'Admin',
      lastLogin: new Date().toISOString()
    };
  }
  
  throw new Error('Invalid admin credentials');
};

export const signupUser = async (data: SignupFormData): Promise<User> => {
  try {
    // Generate a unique ID for the new user
    const userId = Math.random().toString(36).substr(2, 9);
    
    // Create a new user object
    const newUser: User = {
      id: userId,
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
    
    // Add the new user to our mock database
    mockUsers.push(newUser);
    
    // In a real Firebase implementation, you'd do:
    // await addDoc(collection(db, USERS_COLLECTION), newUser);
    
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user account");
  }
};

export const getAllPendingUsers = async (): Promise<User[]> => {
  try {
    // In a real Firebase implementation, you would query Firestore
    const usersRef = collection(db, USERS_COLLECTION);
    const q = query(usersRef, where('status', '==', 'pending'));
    const querySnapshot = await getDocs(q);
    
    const users: User[] = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() } as User);
    });
    
    // For development, return our mock pending users
    return mockUsers.filter(user => user.status === 'pending');
  } catch (error) {
    console.error("Error fetching pending users:", error);
    // Fallback to mock data
    return mockUsers.filter(user => user.status === 'pending');
  }
};

export const approveUser = async (userId: string): Promise<void> => {
  try {
    // For Firebase implementation
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      status: 'approved',
    });
    
    // For mock data
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].status = 'approved';
    }
  } catch (error) {
    console.error("Error approving user:", error);
    throw error;
  }
};

export const rejectUser = async (userId: string): Promise<void> => {
  try {
    // For Firebase implementation
    const userRef = doc(db, USERS_COLLECTION, userId);
    await updateDoc(userRef, {
      status: 'rejected',
    });
    
    // For mock data
    const userIndex = mockUsers.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      mockUsers[userIndex].status = 'rejected';
    }
  } catch (error) {
    console.error("Error rejecting user:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  // This would typically be a call to a database or API
  return mockUsers.filter(user => user.status !== 'pending' && user.status !== 'rejected');
};
