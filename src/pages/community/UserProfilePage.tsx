
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, MessageSquare, Plus, Award } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

// Mock profile data
const mockProfile = {
  id: "user123",
  fullName: "Alex Johnson",
  username: "alexj",
  bio: "Full-stack developer passionate about open source and mentoring. Specializing in React, Node.js, and GraphQL. Building tools that make developers' lives easier.",
  avatarUrl: null,
  joinedDate: "2023-08-12T00:00:00Z",
  location: "San Francisco, CA",
  company: "TechInnovate",
  website: "https://alexjdev.com",
  skills: [
    { name: "React", endorsements: 24 },
    { name: "Node.js", endorsements: 18 },
    { name: "GraphQL", endorsements: 12 },
    { name: "TypeScript", endorsements: 15 },
    { name: "UI/UX", endorsements: 8 },
  ],
  interests: ["Open Source", "Developer Tools", "AI", "Education", "Mobile Development"],
  badges: [
    { name: "Core Contributor", description: "Contributed to 10+ projects", icon: "🌟" },
    { name: "Mentor", description: "Helped 5+ community members", icon: "👨‍🏫" },
    { name: "Idea Champion", description: "Had 3+ ideas move to projects", icon: "💡" },
  ],
  activity: [
    { type: "idea", title: "Cross-platform Design System Builder", date: "2 days ago", action: "submitted" },
    { type: "comment", title: "On 'AI-Powered Code Review Assistant'", date: "3 days ago", action: "commented" },
    { type: "project", title: "GraphQL API Explorer", date: "1 week ago", action: "joined" },
    { type: "doc", title: "Getting Started with WebAssembly", date: "2 weeks ago", action: "published" },
  ],
  projects: [
    { id: "proj1", name: "GraphQL API Explorer", role: "Contributor", members: 5 },
    { id: "proj2", name: "React Component Library", role: "Lead", members: 3 },
  ],
  ideas: [
    { id: "idea1", title: "Cross-platform Design System Builder", status: "Draft", upvotes: 16 },
    { id: "idea2", title: "Developer Experience Metrics Tool", status: "Incubating", upvotes: 28 },
  ],
  docs: [
    { id: "doc1", title: "Getting Started with WebAssembly", views: 342, endorsements: 24 },
    { id: "doc2", title: "Advanced React Patterns", views: 518, endorsements: 47 },
  ]
};

const UserProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    // In a real app, fetch the user profile by ID
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setProfile(mockProfile);
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const isCurrentUserProfile = currentUser && currentUser.id === id;
  
  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };
  
  const handleEndorseSkill = (skill: string) => {
    console.log(`Endorsed ${skill}`);
    // Would update the skill endorsement count via API
  };
  
  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse text-arc-accent">Loading profile...</div>
        </div>
      </AppLayout>
    );
  }
  
  if (!profile) {
    return (
      <AppLayout>
        <div className="text-center py-12">
          <h2 className="text-xl text-white">User not found</h2>
          <p className="text-gray-400 mt-2">The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </AppLayout>
    );
  }
  
  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="profile-header mb-8 bg-black/40 border border-arc-accent/20 rounded-lg p-6 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="profile-avatar">
              {profile.avatarUrl ? (
                <img src={profile.avatarUrl} alt={profile.fullName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <span>{profile.fullName.charAt(0)}</span>
              )}
            </div>
            
            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-white">{profile.fullName}</h1>
                  <p className="text-gray-400">@{profile.username}</p>
                </div>
                
                <div className="mt-4 sm:mt-0 flex gap-3">
                  {!isCurrentUserProfile && (
                    <>
                      <Button 
                        variant="outline" 
                        className={`border-arc-accent/30 ${isFollowing ? 'bg-arc-accent/20 text-white' : 'text-white hover:bg-arc-accent/20'}`}
                        onClick={handleFollowToggle}
                      >
                        {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
                      >
                        <MessageSquare size={16} className="mr-2" />
                        Message
                      </Button>
                    </>
                  )}
                  
                  {isCurrentUserProfile && (
                    <Link to="/settings">
                      <Button 
                        variant="outline" 
                        className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
                      >
                        Edit Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
              
              <div className="mt-4 max-w-xl">
                <p className="text-white">{profile.bio}</p>
              </div>
              
              <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-400">
                {profile.location && (
                  <div>
                    <span>📍 {profile.location}</span>
                  </div>
                )}
                {profile.company && (
                  <div>
                    <span>🏢 {profile.company}</span>
                  </div>
                )}
                {profile.website && (
                  <div>
                    <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-arc-accent hover:underline">
                      🔗 {profile.website.replace(/(^\w+:|^)\/\//, '')}
                    </a>
                  </div>
                )}
                <div>
                  <span>🗓️ Joined {new Date(profile.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="mb-8 flex flex-wrap gap-4">
          {profile.badges.map((badge: any, index: number) => (
            <div key={index} className="bg-gradient-to-r from-arc-primary/20 to-arc-accent/20 border border-arc-accent/30 rounded-lg p-3 flex items-center space-x-3 backdrop-blur-sm">
              <div className="text-2xl">{badge.icon}</div>
              <div>
                <h3 className="font-medium text-white">{badge.name}</h3>
                <p className="text-xs text-gray-400">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Skills & Interests */}
          <div className="space-y-6">
            <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Skills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {profile.skills.map((skill: any, index: number) => (
                  <div key={index} className="flex justify-between items-center group">
                    <span className="text-white">{skill.name}</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 mr-2">{skill.endorsements}</span>
                      {!isCurrentUserProfile && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEndorseSkill(skill.name)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-white hover:bg-arc-accent/10 p-1 h-auto"
                        >
                          <Award size={16} />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            
            <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {profile.interests.map((interest: string, index: number) => (
                    <div key={index} className="text-sm bg-arc-accent/10 text-arc-accent px-2 py-1 rounded-full">
                      {interest}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Content & Activity */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="bg-black/40 border border-arc-accent/30">
                <TabsTrigger value="activity" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Activity</TabsTrigger>
                <TabsTrigger value="projects" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Projects</TabsTrigger>
                <TabsTrigger value="ideas" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Ideas</TabsTrigger>
                <TabsTrigger value="docs" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Docs</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="mt-6 space-y-4">
                {profile.activity.map((item: any, index: number) => (
                  <div key={index} className="border-l-2 border-arc-accent pl-4 py-2 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                    <p className="text-sm">
                      <span className="text-white">{item.action} </span>
                      <span className="text-arc-accent">{item.title}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="projects" className="mt-6 space-y-4">
                {profile.projects.map((project: any, index: number) => (
                  <Card key={index} className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm hover:bg-black/50 transition-all duration-200 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                    <CardHeader className="pb-3">
                      <Link to={`/projects/${project.id}`}>
                        <CardTitle className="text-lg text-white hover:text-arc-accent transition-colors cursor-pointer">{project.name}</CardTitle>
                      </Link>
                      <CardDescription className="flex justify-between items-center">
                        <span>Role: {project.role}</span>
                        <span>{project.members} members</span>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Link to={`/projects/${project.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          View Project
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="ideas" className="mt-6 space-y-4">
                {profile.ideas.map((idea: any, index: number) => (
                  <Card key={index} className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm hover:bg-black/50 transition-all duration-200 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between">
                        <div className={`text-xs rounded-full px-2 py-0.5 ${
                          idea.status === 'Draft' ? 'bg-gray-500/20 text-gray-300' : 
                          idea.status === 'Incubating' ? 'bg-blue-500/20 text-blue-300' : 
                          'bg-green-500/20 text-green-300'
                        }`}>
                          {idea.status}
                        </div>
                        <div className="text-xs text-gray-500">
                          <span className="flex items-center">
                            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                              <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                            </svg>
                            {idea.upvotes} upvotes
                          </span>
                        </div>
                      </div>
                      <Link to={`/ideas/${idea.id}`}>
                        <CardTitle className="text-lg text-white hover:text-arc-accent transition-colors cursor-pointer">{idea.title}</CardTitle>
                      </Link>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Link to={`/ideas/${idea.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          View Idea
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="docs" className="mt-6 space-y-4">
                {profile.docs.map((doc: any, index: number) => (
                  <Card key={index} className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm hover:bg-black/50 transition-all duration-200 animate-fade-in" style={{animationDelay: `${index * 0.05}s`}}>
                    <CardHeader className="pb-3">
                      <Link to={`/docs/${doc.id}`}>
                        <CardTitle className="text-lg text-white hover:text-arc-accent transition-colors cursor-pointer">{doc.title}</CardTitle>
                      </Link>
                      <CardDescription className="flex justify-between items-center">
                        <span>{doc.views} views</span>
                        <span>{doc.endorsements} endorsements</span>
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <Link to={`/docs/${doc.id}`}>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/10">
                          Read Doc
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UserProfilePage;
