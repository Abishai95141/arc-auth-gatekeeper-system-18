
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';

const IdeaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <AppLayout>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold text-white">Idea Detail Page</h1>
        <p className="text-gray-400 mt-4">This page would show details for idea ID: {id}</p>
      </div>
    </AppLayout>
  );
};

export default IdeaDetailPage;
