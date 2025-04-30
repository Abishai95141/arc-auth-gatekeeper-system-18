
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, Search, ChevronUp, MessageSquare, Lightbulb } from 'lucide-react';

// Mock data for ideas
const ideasData = [
  {
    id: 1,
    title: 'AI-Powered Code Review Assistant',
    description: 'A tool that uses machine learning to provide actionable code review comments and suggestions based on project-specific patterns.',
    author: 'Sarah Chen',
    createdAt: '2 days ago',
    status: 'Incubating',
    tags: ['AI', 'Developer Tools', 'Productivity'],
    upvotes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: 'Cross-platform Design System Builder',
    description: 'A tool to create, manage, and export design systems that work consistently across web, mobile, and desktop applications.',
    author: 'Miguel Rodriguez',
    createdAt: '4 days ago',
    status: 'Draft',
    tags: ['Design', 'UI/UX', 'Tooling'],
    upvotes: 16,
    comments: 5,
  },
  {
    id: 3,
    title: 'Open Source Mentorship Platform',
    description: 'A platform connecting new developers with mentors in open source projects, with guided contribution paths and achievement tracking.',
    author: 'Jamie Taylor',
    createdAt: '1 week ago',
    status: 'Spun-Off',
    tags: ['Open Source', 'Community', 'Education'],
    upvotes: 42,
    comments: 15,
  },
  {
    id: 4,
    title: 'Decentralized Package Registry',
    description: 'A peer-to-peer package registry for JavaScript libraries that ensures availability even if central services go down.',
    author: 'Akira Tanaka',
    createdAt: '2 weeks ago',
    status: 'Incubating',
    tags: ['Decentralization', 'JavaScript', 'Infrastructure'],
    upvotes: 31,
    comments: 12,
  },
  {
    id: 5,
    title: 'Accessibility Testing Automation',
    description: 'An automated testing framework specifically designed to catch accessibility issues during development.',
    author: 'Elena Petrova',
    createdAt: '3 weeks ago',
    status: 'Draft',
    tags: ['Accessibility', 'Testing', 'DevOps'],
    upvotes: 27,
    comments: 9,
  },
];

const IdeasPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500/20 text-gray-300';
      case 'Incubating': return 'bg-blue-500/20 text-blue-300';
      case 'Spun-Off': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-white">Ideas</h1>
            <p className="text-gray-400 mt-1">Explore and collaborate on community ideas</p>
          </div>
          <div className="flex space-x-3">
            <Link to="/ideas/mine">
              <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                My Ideas
              </Button>
            </Link>
            <Link to="/ideas/new">
              <Button className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light transition-all duration-300 flex items-center gap-2">
                <Lightbulb size={16} />
                New Idea
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search ideas..."
              className="pl-9 bg-black/40 border border-arc-accent/30 text-white placeholder-gray-400 focus:border-arc-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 flex items-center gap-2">
            <Filter size={16} />
            Filter
          </Button>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="bg-black/40 border border-arc-accent/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">All Ideas</TabsTrigger>
            <TabsTrigger value="trending" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Trending</TabsTrigger>
            <TabsTrigger value="incubating" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Incubating</TabsTrigger>
            <TabsTrigger value="draft" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Drafts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6 space-y-6 animate-fade-in">
            {ideasData.map((idea, index) => (
              <Card key={idea.id} className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm hover:bg-black/50 transition-all duration-200 overflow-hidden animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                <CardHeader className="pb-4">
                  <div className="flex justify-between">
                    <div className={`text-xs rounded-full px-2 py-0.5 ${getStatusColor(idea.status)}`}>
                      {idea.status}
                    </div>
                    <div className="text-xs text-gray-500">{idea.createdAt}</div>
                  </div>
                  <Link to={`/ideas/${idea.id}`}>
                    <CardTitle className="text-xl text-white hover:text-arc-accent transition-colors cursor-pointer">{idea.title}</CardTitle>
                  </Link>
                  <CardDescription className="text-sm text-gray-400">
                    By {idea.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm text-gray-300">
                  <p className="line-clamp-2">{idea.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {idea.tags.map(tag => (
                      <span key={tag} className="text-xs bg-arc-accent/10 text-arc-accent px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t border-arc-accent/10 pt-4">
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-4">
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-400 hover:text-white hover:bg-arc-accent/10">
                        <ChevronUp size={16} />
                        <span>{idea.upvotes}</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 text-gray-400 hover:text-white hover:bg-arc-accent/10">
                        <MessageSquare size={16} />
                        <span>{idea.comments}</span>
                      </Button>
                    </div>
                    <Link to={`/ideas/${idea.id}`}>
                      <Button variant="outline" size="sm" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
          
          {/* All other tab contents would be similar structure but with filtered data */}
          {['trending', 'incubating', 'draft'].map(tab => (
            <TabsContent key={tab} value={tab} className="mt-6">
              <div className="p-8 text-center">
                <h3 className="text-white text-lg mb-2">{tab.charAt(0).toUpperCase() + tab.slice(1)} Ideas</h3>
                <p className="text-gray-400">This tab would show {tab} ideas with similar cards as the "All" tab.</p>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default IdeasPage;
