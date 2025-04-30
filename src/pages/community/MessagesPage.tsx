
import React from 'react';
import AppLayout from '@/components/AppLayout';

const MessagesPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Messages</h1>
        <p className="text-gray-400 mt-4">This page would contain your messages and chats</p>
      </div>
    </AppLayout>
  );
};

export default MessagesPage;
