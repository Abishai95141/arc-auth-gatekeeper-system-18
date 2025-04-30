// Add the 'role' property to the User interface
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
    throw error;
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
