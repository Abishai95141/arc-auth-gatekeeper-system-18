
import React from 'react';
import AppLayout from '@/components/AppLayout';

const UpcomingTalksPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Upcoming Tech Talks</h1>
        <p className="text-gray-400 mt-4">This page would list upcoming tech talks with RSVP options</p>
      </div>
    </AppLayout>
  );
};

export default UpcomingTalksPage;
