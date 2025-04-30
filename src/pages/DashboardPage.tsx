
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/Logo';

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col">
        <header className="mb-8 flex items-center justify-between rounded-lg border border-arc-accent/20 bg-black/40 p-4 shadow-lg backdrop-blur-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-bold text-white">Builders Arc</h1>
          </div>
          
          <Button 
            variant="outline" 
            className="border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
            onClick={logout}
          >
            Log Out
          </Button>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in">
            <CardHeader>
              <CardTitle className="text-white">Welcome, {user.fullName}</CardTitle>
              <CardDescription className="text-gray-300">Your account is active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-gray-300">
                  Status: <span className="text-green-400 font-medium">Approved</span>
                </p>
                <p className="text-sm text-gray-300">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <CardTitle className="text-white">Upcoming Events</CardTitle>
              <CardDescription className="text-gray-300">Join our next community gatherings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-arc-secondary/20 border border-arc-accent/10 p-3">
                  <p className="font-medium text-white">Monthly Tech Talk</p>
                  <p className="text-xs text-gray-400">May 15, 2025 • 6:00 PM</p>
                </div>
                <div className="rounded-md bg-arc-secondary/20 border border-arc-accent/10 p-3">
                  <p className="font-medium text-white">Hackathon Planning</p>
                  <p className="text-xs text-gray-400">June 3, 2025 • 5:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="text-white">Quick Links</CardTitle>
              <CardDescription className="text-gray-300">Access community resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full justify-start border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              >
                Project Ideas
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              >
                Find Team Members
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-arc-accent/30 text-white hover:bg-arc-accent/20 hover:text-white transition-all duration-200"
              >
                Resource Library
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardHeader>
            <CardTitle className="text-white">Community Updates</CardTitle>
            <CardDescription className="text-gray-300">Latest news from Builders Arc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border border-arc-accent/10 bg-black/30 p-4">
                <h3 className="mb-1 font-medium text-white">Welcome to Builders Arc!</h3>
                <p className="text-sm text-gray-300">
                  Thank you for joining our community. We're excited to have you with us!
                  Explore the platform to connect with other tech enthusiasts, join projects,
                  and share your knowledge.
                </p>
              </div>
              <div className="rounded-lg border border-arc-accent/10 bg-black/30 p-4">
                <h3 className="mb-1 font-medium text-white">New Project Framework Launched</h3>
                <p className="text-sm text-gray-300">
                  We've released our project collaboration framework to help teams work more effectively.
                  Check it out in the resources section!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="text-sm text-gray-300 hover:text-white hover:bg-arc-accent/20 transition-colors duration-200">View all updates</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
