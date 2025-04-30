
import React from 'react';
import AppLayout from '@/components/AppLayout';

const DocsPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Docs & Resources</h1>
        <p className="text-gray-400 mt-4">This page would list all community documentation and resources</p>
      </div>
    </AppLayout>
  );
};

export default DocsPage;
