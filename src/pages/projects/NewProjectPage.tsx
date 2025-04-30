
import React from 'react';
import AppLayout from '@/components/AppLayout';

const NewProjectPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">New Project</h1>
        <p className="text-gray-400 mt-4">This page would contain a project creation wizard</p>
      </div>
    </AppLayout>
  );
};

export default NewProjectPage;
