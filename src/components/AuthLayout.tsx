
import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-blue-900 flex flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Logo className="h-12 w-12" />
          </div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
