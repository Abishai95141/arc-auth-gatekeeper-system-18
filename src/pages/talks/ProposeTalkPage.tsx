
import React from 'react';
import AppLayout from '@/components/AppLayout';

const ProposeTalkPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Propose a Tech Talk</h1>
        <p className="text-gray-400 mt-4">This page would contain a form to propose a tech talk</p>
      </div>
    </AppLayout>
  );
};

export default ProposeTalkPage;
