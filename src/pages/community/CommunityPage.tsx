import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Globe, Filter, X, UserPlus, MessageSquare, Mail, Plus } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/sonner";

// Mock data for community members
const members = [
  {
    id: 'user1',
    name: 'Alex Johnson',
    role: 'Full Stack Developer',
    avatar: null,
    skills: ['React', 'Node.js', 'GraphQL'],
    badges: ['Ambassador', 'Contributor'],
    online: true,
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about open source and mentoring. Specializing in React, Node.js, and GraphQL. Building tools that make developers\' lives easier.',
    github: 'https://github.com/alexjdev',
    linkedin: 'https://linkedin.com/in/alexjdev',
  },
  {
    id: 'user2',
    name: 'Sarah Chen',
    role: 'UX Designer',
    avatar: null,
    skills: ['UI/UX', 'Figma', 'User Research'],
    badges: ['Innovator'],
    online: false,
    location: 'New York, NY',
    bio: 'UX designer with 5 years of experience creating intuitive digital experiences. Passionate about accessibility and inclusive design.',
    github: 'https://github.com/sarahchenux',
    linkedin: 'https://linkedin.com/in/sarahchenux',
  },
  {
    id: 'user3',
    name: 'Marcus Williams',
    role: 'DevOps Engineer',
    avatar: null, 
    skills: ['Kubernetes', 'AWS', 'CI/CD'],
    badges: ['Mentor'],
    online: true,
    location: 'Austin, TX',
    bio: 'DevOps engineer specializing in cloud infrastructure and automation. Helping teams ship faster with confidence.',
    github: 'https://github.com/marcusw',
    linkedin: 'https://linkedin.com/in/marcuswdevops',
  },
  {
    id: 'user4',
    name: 'Priya Patel',
    role: 'Mobile Developer',
    avatar: null,
    skills: ['Flutter', 'React Native', 'Firebase'],
    badges: ['Contributor'],
    online: false,
    location: 'Chicago, IL',
    bio: 'Mobile developer creating cross-platform apps with Flutter and React Native. Passionate about building beautiful, performant mobile experiences.',
    github: 'https://github.com/priyapmobile',
    linkedin: 'https://linkedin.com/in/priyapmobile',
  },
  {
    id: 'user5',
    name: 'David Kim',
    role: 'Backend Engineer',
    avatar: null,
    skills: ['Python', 'Django', 'PostgreSQL'],
    badges: [],
    online: true,
    location: 'Seattle, WA',
    bio: 'Backend engineer focused on building scalable, maintainable systems. Experience with Python, Django, and database optimization.',
    github: 'https://github.com/davidkimdev',
    linkedin: 'https://linkedin.com/in/davidkimdev',
  },
  {
    id: 'user6',
    name: 'Emma Rodriguez',
    role: 'AI Researcher',
    avatar: null,
    skills: ['Machine Learning', 'TensorFlow', 'NLP'],
    badges: ['Innovator', 'Mentor'],
    online: false,
    location: 'Boston, MA',
    bio: 'AI researcher specializing in natural language processing and machine learning. Working to make AI systems more accessible and ethical.',
    github: 'https://github.com/emmarodai',
    linkedin: 'https://linkedin.com/in/emmarodai',
  },
];

// Mock data for focus circles
const focusCircles = [
  {
    id: 'circle1',
    name: 'AI Hackers',
    description: 'Exploring practical applications of AI in software development',
    members: 18,
    memberAvatars: ['user1', 'user6', 'user3'],
    isMember: false
  },
  {
    id: 'circle2',
    name: 'Full-Stack Friday',
    description: 'Weekly discussions on full-stack development best practices',
    members: 24,
    memberAvatars: ['user1', 'user2', 'user4'],
    isMember: true
  },
  {
    id: 'circle3',
    name: 'Mobile Mavens',
    description: 'Building beautiful and performant mobile experiences',
    members: 15,
    memberAvatars: ['user4', 'user5'],
    isMember: false
  },
  {
    id: 'circle4',
    name: 'DevOps Guild',
    description: 'Sharing infrastructure and deployment automation strategies',
    members: 12,
    memberAvatars: ['user3', 'user5'],
    isMember: false
  },
  {
    id: 'circle5',
    name: 'Design Systems',
    description: 'Creating cohesive, reusable design components',
    members: 20,
    memberAvatars: ['user2', 'user4'],
    isMember: false
  }
];

// Component for member cards
const MemberCard: React.FC<{member: typeof members[0], onProfileClick: (id: string) => void}> = ({ member, onProfileClick }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  
  const handleFollowToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFollowing(!isFollowing);
    
    if (!isFollowing) {
      toast(`Following ${member.name}`);
    }
  };
  
  const handleMessageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast(`Messaging ${member.name}`);
  };
  
  return (
    <Card 
      className="border border-arc-accent/20 bg-black/40 shadow-md backdrop-blur-sm hover:border-arc-accent/50 
      hover:shadow-lg hover:translate-y-[-2px] transition-all duration-200 cursor-pointer overflow-hidden"
      onClick={() => onProfileClick(member.id)}
    >
      <CardContent className="p-4">
        <div className="flex flex-col items-center">
          <div className="relative">
            <Avatar className="h-20 w-20 border-2 border-arc-accent/30">
              {member.avatar ? (
                <AvatarImage src={member.avatar} alt={member.name} />
              ) : (
                <AvatarFallback className="bg-gradient-to-br from-arc-secondary to-arc-accent text-white text-xl">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              )}
            </Avatar>
            {member.online && (
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-black" />
            )}
          </div>
          
          <h3 className="mt-3 text-lg font-medium text-white">{member.name}</h3>
          <span className="text-sm text-gray-400">{member.role}</span>
          
          <div className="mt-2 flex flex-wrap gap-1 justify-center">
            {member.skills.slice(0, 3).map((skill) => (
              <Badge key={skill} variant="outline" className="bg-arc-accent/10 text-arc-accent border-arc-accent/30 text-xs">
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="mt-3 flex flex-wrap gap-1 justify-center">
            {member.badges.map((badge) => (
              <Badge key={badge} className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white text-xs">
                {badge}
              </Badge>
            ))}
          </div>
          
          <div className="mt-4 flex w-full justify-between">
            <Button 
              variant={isFollowing ? "secondary" : "outline"} 
              size="sm" 
              className={isFollowing ? 
                "bg-arc-accent/20 text-white border-arc-accent/30" : 
                "text-arc-accent border-arc-accent/30"
              }
              onClick={handleFollowToggle}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-arc-accent/10"
              onClick={handleMessageClick}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for focus circle cards
const FocusCircleCard: React.FC<{circle: typeof focusCircles[0]}> = ({ circle }) => {
  const [isMember, setIsMember] = useState(circle.isMember);
  
  const handleJoinToggle = () => {
    setIsMember(!isMember);
    
    if (!isMember) {
      toast(`Joined ${circle.name} circle`);
    }
  };
  
  return (
    <Card className="border border-arc-accent/20 bg-black/40 shadow-md backdrop-blur-sm h-[200px] flex flex-col">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-md font-medium text-white">{circle.name}</h3>
          <Badge variant="outline" className="bg-transparent border-arc-accent/30 text-gray-400 text-xs">
            {circle.members} members
          </Badge>
        </div>
        
        <p className="text-sm text-gray-400 mb-3">{circle.description}</p>
        
        <div className="flex -space-x-2 mb-4">
          {circle.memberAvatars.slice(0, 3).map((memberId, i) => {
            const member = members.find(m => m.id === memberId);
            return member ? (
              <Avatar key={memberId} className="border-2 border-black h-8 w-8">
                <AvatarFallback className="bg-gradient-to-br from-arc-secondary to-arc-accent text-white text-xs">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            ) : null;
          })}
          {circle.members > 3 && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-arc-accent/10 text-arc-accent text-xs border-2 border-black">
              +{circle.members - 3}
            </div>
          )}
        </div>
        
        <div className="mt-auto flex gap-2">
          <Button 
            variant={isMember ? "secondary" : "outline"} 
            size="sm" 
            className={isMember ? 
              "flex-1 bg-arc-accent/20 text-white border-arc-accent/30" : 
              "flex-1 text-arc-accent border-arc-accent/30"
            }
            onClick={handleJoinToggle}
          >
            {isMember ? "Enter Circle" : "Join Circle"}
          </Button>
          {isMember && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-white hover:bg-arc-accent/10"
              onClick={() => toast(`Opening chat for ${circle.name}`)}
            >
              <MessageSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const CommunityPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [filters, setFilters] = useState<{
    skills: string[];
    badges: string[];
    location: string;
  }>({
    skills: [],
    badges: [],
    location: ''
  });
  
  const [introduction, setIntroduction] = useState('');
  
  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const handleProfileClick = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member) {
      setSelectedMember(member);
      setShowProfileDialog(true);
    }
  };
  
  const handleIntroductionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (introduction.trim()) {
      toast("Introduction shared with community");
      setIntroduction('');
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        {/* Hero section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Community</h1>
          <p className="text-gray-400 mt-1">Connect. Collaborate. Grow Together.</p>
        </div>
        
        {/* New member introduction */}
        <div className="bg-gradient-to-r from-arc-secondary/30 to-arc-accent/30 rounded-lg p-4 mb-8 border border-arc-accent/20 backdrop-blur-sm">
          <form onSubmit={handleIntroductionSubmit} className="flex gap-3 items-center">
            <div className="flex-grow">
              <Input 
                placeholder="👋 Introduce yourself to the community..."
                value={introduction}
                onChange={e => setIntroduction(e.target.value)}
                className="bg-black/50 border-arc-accent/30 text-white"
              />
            </div>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-arc-secondary to-arc-accent hover:from-arc-accent hover:to-arc-light text-white transition-all duration-300"
              disabled={!introduction.trim()}
            >
              Share
            </Button>
          </form>
        </div>
        
        {/* Stats and search bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="flex gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-arc-accent" />
              <span className="text-gray-400">Members: <span className="text-white font-medium">{members.length}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Globe size={18} className="text-arc-accent" />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-green-500"></span>
              </div>
              <span className="text-gray-400">Online: <span className="text-white font-medium">{members.filter(m => m.online).length}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} className="text-arc-accent" />
              <span className="text-gray-400">Circles: <span className="text-white font-medium">{focusCircles.length}</span></span>
            </div>
          </div>
          
          <div className="flex w-full md:w-auto flex-1 md:flex-initial max-w-md gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search members by name, role, or skills..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 bg-black/50 border-arc-accent/30 text-white"
              />
              {searchQuery && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 text-gray-400 hover:text-white"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
            
            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="outline" size="icon" className="border-arc-accent/30">
                  <Filter className="h-4 w-4 text-arc-accent" />
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 bg-black/80 border-arc-accent/30 backdrop-blur-md">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-white">Filter members</h4>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Skills</p>
                    <div className="flex flex-wrap gap-1">
                      {['React', 'Node.js', 'UI/UX', 'DevOps', 'Mobile'].map(skill => (
                        <Badge 
                          key={skill} 
                          variant={filters.skills.includes(skill) ? "default" : "outline"}
                          className={filters.skills.includes(skill) 
                            ? "bg-arc-accent text-white cursor-pointer" 
                            : "bg-transparent border-arc-accent/30 text-gray-400 cursor-pointer hover:text-white"
                          }
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              skills: prev.skills.includes(skill) 
                                ? prev.skills.filter(s => s !== skill)
                                : [...prev.skills, skill]
                            }))
                          }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Badges</p>
                    <div className="flex flex-wrap gap-1">
                      {['Ambassador', 'Mentor', 'Contributor', 'Innovator'].map(badge => (
                        <Badge 
                          key={badge} 
                          variant={filters.badges.includes(badge) ? "default" : "outline"}
                          className={filters.badges.includes(badge) 
                            ? "bg-arc-accent text-white cursor-pointer" 
                            : "bg-transparent border-arc-accent/30 text-gray-400 cursor-pointer hover:text-white"
                          }
                          onClick={() => {
                            setFilters(prev => ({
                              ...prev,
                              badges: prev.badges.includes(badge) 
                                ? prev.badges.filter(b => b !== badge)
                                : [...prev.badges, badge]
                            }))
                          }}
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {(filters.skills.length > 0 || filters.badges.length > 0) && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs text-gray-400"
                      onClick={() => setFilters({ skills: [], badges: [], location: '' })}
                    >
                      Clear all filters
                    </Button>
                  )}
                </div>
              </HoverCardContent>
            </HoverCard>
          </div>
        </div>
        
        {/* Tab navigation */}
        <Tabs defaultValue="members" className="mb-8">
          <TabsList className="bg-black/40 border border-arc-accent/30">
            <TabsTrigger value="members" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Members</TabsTrigger>
            <TabsTrigger value="circles" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">Focus Circles</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="mt-6">
            {/* Member directory grid */}
            {filteredMembers.length === 0 ? (
              <div className="flex flex-col items-center py-16 text-center">
                <div className="rounded-full bg-arc-accent/10 p-4 mb-4">
                  <Users size={32} className="text-arc-accent" />
                </div>
                <h3 className="text-lg font-medium text-white mb-1">No members found</h3>
                <p className="text-gray-400 max-w-md mb-4">Try adjusting your search or filters to find community members.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setFilters({ skills: [], badges: [], location: '' });
                  }}
                  className="border-arc-accent/30 text-arc-accent"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMembers.map((member) => (
                  <MemberCard key={member.id} member={member} onProfileClick={handleProfileClick} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="circles" className="mt-6">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Focus Circles</h2>
              <Button className="bg-gradient-to-r from-arc-secondary to-arc-accent hover:from-arc-accent hover:to-arc-light text-white transition-all duration-300">
                <Plus className="mr-1 h-4 w-4" />
                Create Circle
              </Button>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {focusCircles.map((circle) => (
                  <CarouselItem key={circle.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <FocusCircleCard circle={circle} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </TabsContent>
        </Tabs>
        
        {/* Profile Dialog */}
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="bg-black/80 border-arc-accent/30 backdrop-blur-lg max-w-2xl">
            {selectedMember && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl text-white">{selectedMember.name}</DialogTitle>
                  <DialogDescription className="text-arc-accent">{selectedMember.role}</DialogDescription>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                  <div className="flex flex-col items-center space-y-3">
                    <Avatar className="h-24 w-24 border-2 border-arc-accent/30">
                      {selectedMember.avatar ? (
                        <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                      ) : (
                        <AvatarFallback className="bg-gradient-to-br from-arc-secondary to-arc-accent text-white text-2xl">
                          {selectedMember.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center text-sm text-gray-400">
                        <span>📍 {selectedMember.location}</span>
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-arc-accent border-arc-accent/30"
                        >
                          <UserPlus className="mr-1 h-3.5 w-3.5" />
                          Follow
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-arc-accent border-arc-accent/30"
                        >
                          <Mail className="mr-1 h-3.5 w-3.5" />
                          Message
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">About</h3>
                      <p className="text-white text-sm">{selectedMember.bio}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Skills</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedMember.skills.map(skill => (
                          <Badge 
                            key={skill} 
                            variant="outline" 
                            className="bg-arc-accent/10 text-arc-accent border-arc-accent/30 cursor-pointer hover:bg-arc-accent/20"
                          >
                            {skill} 
                            <span className="ml-1 text-xs">+</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-400 mb-1">Badges</h3>
                      <div className="flex flex-wrap gap-1">
                        {selectedMember.badges.map(badge => (
                          <Badge 
                            key={badge} 
                            className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white"
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3 text-sm">
                      {selectedMember.github && (
                        <a 
                          href={selectedMember.github} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-arc-accent hover:text-arc-light transition-colors"
                        >
                          GitHub
                        </a>
                      )}
                      {selectedMember.linkedin && (
                        <a 
                          href={selectedMember.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-arc-accent hover:text-arc-light transition-colors"
                        >
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-2">
                  <Link to={`/users/${selectedMember.id}`}>
                    <Button className="w-full bg-gradient-to-r from-arc-secondary to-arc-accent hover:from-arc-accent hover:to-arc-light text-white transition-all duration-300">
                      View Full Profile
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AppLayout>
  );
};

export default CommunityPage;
