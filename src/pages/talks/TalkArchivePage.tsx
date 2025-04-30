
import React from 'react';
import AppLayout from '@/components/AppLayout';

const TalkArchivePage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Tech Talks Archive</h1>
        <p className="text-gray-400 mt-4">This page would list past tech talks with recordings</p>
      </div>
    </AppLayout>
  );
};

export default TalkArchivePage;
