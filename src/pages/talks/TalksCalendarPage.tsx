
import React from 'react';
import AppLayout from '@/components/AppLayout';

const TalksCalendarPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Tech Talks Calendar</h1>
        <p className="text-gray-400 mt-4">This page would show a calendar of upcoming tech talks</p>
      </div>
    </AppLayout>
  );
};

export default TalksCalendarPage;
