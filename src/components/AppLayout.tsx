
import React from 'react';
import MainNavigation from './MainNavigation';
import Footer from './Footer';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNavigation />
      <main className="flex-1 container py-8 animate-fade-in">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
