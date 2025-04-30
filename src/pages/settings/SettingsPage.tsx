
import React from 'react';
import AppLayout from '@/components/AppLayout';

const SettingsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 mt-4">This page would contain account settings, preferences, and security options</p>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
