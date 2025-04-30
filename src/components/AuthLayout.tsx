
import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, description }) => {
  return (
    <div 
      className="auth-container" 
      style={{
        backgroundImage: "url('/lovable-uploads/64e151b4-922b-4077-970d-e8e8d73e48c7.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
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
