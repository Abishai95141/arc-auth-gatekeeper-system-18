
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import AppLayout from '@/components/AppLayout';
import { Bell, MessageSquare, User, Plus, FileText, Calendar, Lightbulb } from 'lucide-react';

// Mock data for the dashboard
const whatsnewData = [
  {
    type: 'idea',
    title: 'AI-Powered Code Review Assistant',
    author: 'Sarah Chen',
    timeAgo: '2 hours ago',
    snippet: 'A tool that uses machine learning to provide actionable code review comments...',
    upvotes: 12,
    comments: 4,
  },
  {
    type: 'project',
    title: 'GraphQL API Explorer',
    author: 'Michael Johnson',
    timeAgo: '5 hours ago',
    snippet: 'Just shipped v1.2 with visual query builder and response formatter...',
    upvotes: 8,
    comments: 3,
  },
  {
    type: 'doc',
    title: 'Getting Started with WebAssembly',
    author: 'Emma Rodriguez',
    timeAgo: '1 day ago',
    snippet: 'A comprehensive guide to using WebAssembly in modern web applications...',
    upvotes: 24,
    comments: 7,
  },
  {
    type: 'talk',
    title: 'The Future of Edge Computing',
    author: 'David Kim',
    timeAgo: '2 days ago',
    snippet: 'Join us for an exploration of edge computing trends and practical applications...',
    date: 'May 15, 2025',
    attending: 45,
  },
];

const tasksData = [
  {
    id: 1,
    title: 'Review PR for Authentication Flow',
    project: 'GraphQL API Explorer',
    due: '2 days',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Complete User Persona Documentation',
    project: 'Community Forum Redesign',
    due: 'tomorrow',
    priority: 'medium',
  },
  {
    id: 3,
    title: 'RSVP to "Advanced TypeScript Patterns" talk',
    project: null,
    due: '3 days',
    priority: 'low',
  },
];

const focusCircleData = [
  {
    member: 'Alex Wong',
    action: 'shared a new resource',
    content: 'Top 10 React Performance Optimization Tips',
    timeAgo: '3 hours ago',
  },
  {
    member: 'Maria Garcia',
    action: 'completed a challenge',
    content: 'Build a Responsive Grid System from Scratch',
    timeAgo: '1 day ago',
  },
  {
    member: 'James Smith',
    action: 'asked a question',
    content: 'What\'s the best approach for handling auth with GraphQL?',
    timeAgo: '2 days ago',
    responses: 4,
  },
];

const DashboardPage: React.FC = () => {
  const { profile } = useAuth();
  
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'idea': return <Lightbulb size={16} className="text-yellow-400" />;
      case 'project': return <FileText size={16} className="text-blue-400" />;
      case 'doc': return <FileText size={16} className="text-green-400" />;
      case 'talk': return <Calendar size={16} className="text-purple-400" />;
      default: return null;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {profile?.full_name}</h1>
            <p className="text-gray-400 mt-1">Here's what's happening in your builder community</p>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 md:mt-0">
            <Button className="bg-gradient-to-r from-arc-primary to-arc-accent text-white rounded-md px-4 py-2 hover:from-arc-accent hover:to-arc-light transition-all duration-300 flex gap-2">
              <Bell size={18} />
              <span>Notifications</span>
            </Button>
            <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 flex gap-2">
              <MessageSquare size={18} />
              <span>Messages</span>
            </Button>
          </div>
        </div>
        
        {/* Main Dashboard Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - What's New Feed */}
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-white">What's New</h2>
            <div className="space-y-4">
              {whatsnewData.map((item, index) => (
                <Card key={index} className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm hover:bg-black/50 transition-all duration-200 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(item.type)}
                        <span className="text-sm text-gray-400 capitalize">{item.type}</span>
                      </div>
                      <span className="text-xs text-gray-500">{item.timeAgo}</span>
                    </div>
                    <CardTitle className="text-lg text-white mt-1">{item.title}</CardTitle>
                    <CardDescription className="text-sm text-gray-400">
                      By {item.author}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-300">
                    <p>{item.snippet}</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <div className="flex justify-between w-full">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          View {item.type === 'talk' ? 'Details' : 'Full'}
                        </Button>
                        {item.upvotes !== undefined && (
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                            Upvote ({item.upvotes})
                          </Button>
                        )}
                      </div>
                      {item.comments !== undefined && (
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          Comment ({item.comments})
                        </Button>
                      )}
                      {item.date !== undefined && (
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          RSVP ({item.attending} attending)
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
              <div className="flex justify-center">
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                  View More
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - My Tasks, Focus Circle, Quick Add */}
          <div className="space-y-6">
            {/* My Tasks */}
            <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in">
              <CardHeader>
                <CardTitle className="text-white">My Tasks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {tasksData.map((task, index) => (
                  <div key={index} className="rounded-md border border-arc-accent/10 bg-black/60 p-3 hover:bg-black/80 transition-all duration-200">
                    <p className="font-medium text-white mb-1">{task.title}</p>
                    {task.project && (
                      <p className="text-xs text-gray-400 mb-2">{task.project}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <div className={`text-xs rounded-full px-2 py-0.5 ${
                        task.priority === 'high' ? 'bg-red-500/20 text-red-300' : 
                        task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-300' : 
                        'bg-green-500/20 text-green-300'
                      }`}>
                        {task.priority}
                      </div>
                      <p className="text-xs text-gray-400">Due {task.due}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-arc-accent/10">
                  View All Tasks
                </Button>
              </CardFooter>
            </Card>
            
            {/* Focus Circle */}
            <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="text-white">Focus Circle</CardTitle>
                <CardDescription>Activity from your cohort</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {focusCircleData.map((activity, index) => (
                  <div key={index} className="border-l-2 border-arc-accent pl-3 py-1">
                    <p className="text-sm">
                      <span className="font-medium text-arc-accent">{activity.member}</span>{' '}
                      <span className="text-gray-400">{activity.action}</span>
                    </p>
                    <p className="text-sm text-white">{activity.content}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-gray-500">{activity.timeAgo}</span>
                      {activity.responses && (
                        <span className="text-xs text-gray-400">{activity.responses} responses</span>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full border-arc-accent/30 bg-arc-accent/20 text-white hover:bg-arc-accent/40">
                  Join Discussion
                </Button>
              </CardFooter>
            </Card>
            
            {/* Quick Add */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <Link to="/ideas/new">
                <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-arc-accent/20 bg-gradient-to-br from-arc-primary/30 to-arc-accent/30 hover:from-arc-primary/40 hover:to-arc-accent/40 transition-all duration-300 p-4 text-center hover:scale-[1.02]">
                  <Lightbulb size={24} className="text-yellow-400 mb-2" />
                  <span className="text-sm font-medium text-white">New Idea</span>
                </div>
              </Link>
              <Link to="/projects/new">
                <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-arc-accent/20 bg-gradient-to-br from-arc-secondary/30 to-arc-primary/30 hover:from-arc-secondary/40 hover:to-arc-primary/40 transition-all duration-300 p-4 text-center hover:scale-[1.02]">
                  <FileText size={24} className="text-blue-400 mb-2" />
                  <span className="text-sm font-medium text-white">New Project</span>
                </div>
              </Link>
              <Link to="/docs/new">
                <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-arc-accent/20 bg-gradient-to-br from-arc-accent/30 to-arc-light/30 hover:from-arc-accent/40 hover:to-arc-light/40 transition-all duration-300 p-4 text-center hover:scale-[1.02]">
                  <FileText size={24} className="text-green-400 mb-2" />
                  <span className="text-sm font-medium text-white">New Doc</span>
                </div>
              </Link>
              <Link to="/talks/new">
                <div className="flex flex-col items-center justify-center h-32 rounded-lg border border-arc-accent/20 bg-gradient-to-br from-arc-light/30 to-arc-secondary/30 hover:from-arc-light/40 hover:to-arc-secondary/40 transition-all duration-300 p-4 text-center hover:scale-[1.02]">
                  <Calendar size={24} className="text-purple-400 mb-2" />
                  <span className="text-sm font-medium text-white">Propose Talk</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
