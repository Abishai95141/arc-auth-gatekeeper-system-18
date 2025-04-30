
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
    <div className="min-h-screen bg-muted/30 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col">
        <header className="mb-8 flex items-center justify-between rounded-lg border bg-card p-4 shadow">
          <div className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <h1 className="text-xl font-bold">Builders Arc</h1>
          </div>
          
          <Button variant="outline" onClick={logout}>
            Log Out
          </Button>
        </header>

        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Welcome, {user.fullName}</CardTitle>
              <CardDescription>Your account is active</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Status: <span className="text-green-600 font-medium">Approved</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Member since: {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Join our next community gatherings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-md bg-muted/80 p-3">
                  <p className="font-medium">Monthly Tech Talk</p>
                  <p className="text-xs text-muted-foreground">May 15, 2025 • 6:00 PM</p>
                </div>
                <div className="rounded-md bg-muted/80 p-3">
                  <p className="font-medium">Hackathon Planning</p>
                  <p className="text-xs text-muted-foreground">June 3, 2025 • 5:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Access community resources</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Project Ideas
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Find Team Members
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Resource Library
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Community Updates</CardTitle>
            <CardDescription>Latest news from Builders Arc</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-1 font-medium">Welcome to Builders Arc!</h3>
                <p className="text-sm text-muted-foreground">
                  Thank you for joining our community. We're excited to have you with us!
                  Explore the platform to connect with other tech enthusiasts, join projects,
                  and share your knowledge.
                </p>
              </div>
              <div className="rounded-lg border bg-card p-4">
                <h3 className="mb-1 font-medium">New Project Framework Launched</h3>
                <p className="text-sm text-muted-foreground">
                  We've released our project collaboration framework to help teams work more effectively.
                  Check it out in the resources section!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="text-sm">View all updates</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
