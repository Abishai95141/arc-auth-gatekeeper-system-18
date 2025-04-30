
import React from 'react';
import AppLayout from '@/components/AppLayout';

const NotificationsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Notifications</h1>
        <p className="text-gray-400 mt-4">This page would show your notifications and allow filtering</p>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
