
import React from 'react';
import AppLayout from '@/components/AppLayout';

const NewDocPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Create New Doc</h1>
        <p className="text-gray-400 mt-4">This page would contain a document editor</p>
      </div>
    </AppLayout>
  );
};

export default NewDocPage;
