
import React from 'react';
import AppLayout from '@/components/AppLayout';

const MyDocsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">My Docs</h1>
        <p className="text-gray-400 mt-4">This page would list your documentation drafts</p>
      </div>
    </AppLayout>
  );
};

export default MyDocsPage;
