
import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <Logo className="auth-logo" />
          <h1 className="auth-title">{title}</h1>
          <p className="auth-description">{description}</p>
        </div>
        <div className="auth-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
