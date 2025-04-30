
import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Lightbulb } from 'lucide-react';

const MyIdeasPage: React.FC = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white">My Ideas</h1>
            <p className="text-gray-400 mt-1">Manage your ideas and contributions</p>
          </div>
          <div>
            <Link to="/ideas/new">
              <Button className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light transition-all duration-300 flex items-center gap-2">
                <Lightbulb size={16} />
                New Idea
              </Button>
            </Link>
          </div>
        </div>
        
        <Tabs defaultValue="drafts" className="w-full">
          <TabsList className="bg-black/40 border border-arc-accent/30">
            <TabsTrigger value="drafts" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Drafts</TabsTrigger>
            <TabsTrigger value="submitted" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Submitted</TabsTrigger>
            <TabsTrigger value="participating" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Participating</TabsTrigger>
          </TabsList>
          
          <TabsContent value="drafts" className="mt-6">
            <div className="p-8 text-center">
              <h3 className="text-white text-lg mb-2">Draft Ideas</h3>
              <p className="text-gray-400">Ideas you've saved but haven't submitted for incubation yet.</p>
              <div className="mt-6">
                <Link to="/ideas/new">
                  <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                    Start a New Idea
                  </Button>
                </Link>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="submitted" className="mt-6">
            <div className="p-8 text-center">
              <h3 className="text-white text-lg mb-2">Submitted Ideas</h3>
              <p className="text-gray-400">Ideas you've submitted for community incubation.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="participating" className="mt-6">
            <div className="p-8 text-center">
              <h3 className="text-white text-lg mb-2">Participating Ideas</h3>
              <p className="text-gray-400">Ideas where you've commented or contributed.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default MyIdeasPage;
