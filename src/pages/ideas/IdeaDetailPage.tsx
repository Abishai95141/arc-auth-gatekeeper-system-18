
import React from 'react';
import { useParams } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const IdeaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <AppLayout>
      <div className="container mx-auto py-8">
        <h1>Idea Detail Page for ID: {id}</h1>
        <Button className="mt-4">
          <Plus size={16} className="mr-2" />
          Add Comment
        </Button>
      </div>
    </AppLayout>
  );
};

export default IdeaDetailPage;
