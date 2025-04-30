
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, MessageSquare, FileText, User, Calendar, Search } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';

interface ProjectOverviewProps {
  project: any; // Using any for now, would define proper types in a real app
  isTeamLead: boolean;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({ project, isTeamLead }) => {
  const [pendingRequests, setPendingRequests] = useState(project.joinRequests);
  const [processing, setProcessing] = useState<{ [key: string]: boolean }>({});
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  
  // Function to handle request approval
  const handleApproveRequest = (requestId: string) => {
    setProcessing((prev) => ({ ...prev, [requestId]: true }));
    // In a real app, this would be an API call
    setTimeout(() => {
      setPendingRequests(pendingRequests.filter((req: any) => req.id !== requestId));
      setProcessing((prev) => ({ ...prev, [requestId]: false }));
      toast.success('Request approved');
    }, 1000);
  };
  
  // Function to handle request rejection
  const handleRejectRequest = (requestId: string) => {
    setProcessing((prev) => ({ ...prev, [requestId]: true }));
    // In a real app, this would be an API call
    setTimeout(() => {
      setPendingRequests(pendingRequests.filter((req: any) => req.id !== requestId));
      setProcessing((prev) => ({ ...prev, [requestId]: false }));
      toast.success('Request rejected');
    }, 1000);
  };
  
  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };
  
  // Function to format activity timestamp
  const formatActivityTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }
  };
  
  // Function to get icon for activity type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'task_completed':
      case 'task_assigned':
        return <Check className="h-5 w-5 text-green-400" />;
      case 'comment':
        return <MessageSquare className="h-5 w-5 text-blue-400" />;
      case 'file_upload':
        return <FileText className="h-5 w-5 text-amber-400" />;
      case 'member_joined':
        return <User className="h-5 w-5 text-purple-400" />;
      default:
        return null;
    }
  };
  
  // Find team member by ID
  const findTeamMember = (userId: string) => {
    return project.team.find((member: any) => member.id === userId) || {};
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content - Left Column (2/3 width on large screens) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Project Description */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>About This Project</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 whitespace-pre-line">{project.description}</p>
          </CardContent>
        </Card>
        
        {/* Milestones Timeline */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Milestones</CardTitle>
            {isTeamLead && (
              <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 h-8 px-3">
                Add Milestone
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-arc-accent/30"></div>
              
              <div className="space-y-4">
                {project.milestones.map((milestone: any, index: number) => (
                  <div key={milestone.id} className="flex items-start ml-2">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full border-2 border-black/40 flex items-center justify-center z-10 ${
                      milestone.completed ? 'bg-green-500' : 'bg-gray-700'
                    }`}>
                      {milestone.completed && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <div className="ml-3 pb-4">
                      <div className="flex items-center">
                        <h4 className={`text-base font-medium ${milestone.completed ? 'text-white' : 'text-gray-300'}`}>
                          {milestone.title}
                        </h4>
                        <Badge className="ml-2 text-xs" variant="outline">{new Date(milestone.date).toLocaleDateString()}</Badge>
                      </div>
                      {index < project.milestones.length - 1 && (
                        <div className="mt-1 flex items-center">
                          <div className="h-0.5 w-16 bg-arc-accent/20"></div>
                          <div className="ml-2 text-xs text-gray-500">
                            {Math.round((new Date(project.milestones[index + 1].date).getTime() - new Date(milestone.date).getTime()) / (1000 * 60 * 60 * 24))} days
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Activity Feed */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent updates and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.activity.map((activity: any) => {
                const actorMember = findTeamMember(activity.user);
                
                return (
                  <div key={activity.id} className="flex items-start">
                    <div className="flex-shrink-0">
                      <Avatar className="h-8 w-8 border border-arc-accent/30">
                        <AvatarImage src={actorMember.avatar} alt={actorMember.name} />
                        <AvatarFallback>{actorMember.name ? getInitials(actorMember.name) : '??'}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="flex mr-1.5">
                          {getActivityIcon(activity.type)}
                        </div>
                        <p className="text-sm text-gray-300">
                          <span className="font-medium text-white">{actorMember.name}</span> {activity.content}
                        </p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{formatActivityTime(activity.timestamp)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Right Sidebar (1/3 width on large screens) */}
      <div className="space-y-6">
        {/* Join Requests */}
        {isTeamLead && pendingRequests.length > 0 && (
          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Join Requests
                <Badge className="ml-1 h-5 w-5 rounded-full bg-arc-accent text-white">{pendingRequests.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {pendingRequests.map((request: any) => (
                  <div key={request.id} className="flex flex-col border border-dashed border-arc-accent/20 rounded-md p-3">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 border border-arc-accent/30">
                        <AvatarImage src={request.avatar} alt={request.name} />
                        <AvatarFallback>{getInitials(request.name)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-2">
                        <p className="text-sm font-medium text-white">{request.name}</p>
                        <p className="text-xs text-gray-400">{new Date(request.requestedAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    {request.message && (
                      <p className="mt-2 text-sm text-gray-300 italic">"{request.message}"</p>
                    )}
                    <div className="flex justify-end gap-2 mt-3">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-400 hover:bg-red-500/20 h-7 px-3"
                        onClick={() => handleRejectRequest(request.id)}
                        disabled={processing[request.id]}
                      >
                        <X className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-green-600/20 text-green-400 hover:bg-green-600/40 h-7 px-3"
                        onClick={() => handleApproveRequest(request.id)}
                        disabled={processing[request.id]}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Invite Members Button (for team leads) */}
        {isTeamLead && (
          <Dialog open={inviteModalOpen} onOpenChange={setInviteModalOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-arc-secondary to-arc-accent text-white transition-all duration-300 hover:from-arc-accent hover:to-arc-light">
                Invite Members
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border border-arc-accent/30 text-white">
              <DialogHeader>
                <DialogTitle>Invite Members</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Search for members to invite to your project team.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for members..."
                    className="w-full px-4 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
                  />
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                </div>
                
                <ScrollArea className="h-[200px]">
                  {/* Example search results */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-md hover:bg-arc-accent/10">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://i.pravatar.cc/150?img=${10 + i}`} />
                            <AvatarFallback>U{i}</AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <p className="text-sm font-medium">User Example {i}</p>
                            <p className="text-xs text-gray-400">Frontend Developer</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="h-7 px-3">Invite</Button>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <DialogFooter className="gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setInviteModalOpen(false)} 
                  className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => {
                    toast.success('Invitations sent successfully');
                    setInviteModalOpen(false);
                  }}
                  className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white"
                >
                  Send Invites
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      
        {/* Task Statistics */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Task Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Task Progress Statistics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-black/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-bold text-white">
                    {project.tasks.filter((t: any) => t.status === 'Done').length}
                  </p>
                  <p className="text-xs text-gray-400">Completed</p>
                </div>
                <div className="bg-black/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-bold text-white">
                    {project.tasks.filter((t: any) => t.status === 'In Progress').length}
                  </p>
                  <p className="text-xs text-gray-400">In Progress</p>
                </div>
                <div className="bg-black/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-bold text-white">
                    {project.tasks.filter((t: any) => t.status === 'To Do').length}
                  </p>
                  <p className="text-xs text-gray-400">To Do</p>
                </div>
                <div className="bg-black/30 rounded-md p-3 text-center">
                  <p className="text-2xl font-bold text-white">
                    {project.tasks.length}
                  </p>
                  <p className="text-xs text-gray-400">Total Tasks</p>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Overall Progress</span>
                  <span className="text-white font-medium">{project.progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-700/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-arc-secondary to-arc-accent rounded-full"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Related Projects */}
        {project.relatedProjects.length > 0 && (
          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Related Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {project.relatedProjects.map((relatedProject: any) => (
                  <div 
                    key={relatedProject.id} 
                    className="border border-arc-accent/10 rounded-md p-3 hover:bg-arc-accent/5 transition-colors"
                  >
                    <a href={`/projects/${relatedProject.id}`} className="block">
                      <p className="text-sm font-medium text-white hover:text-arc-accent">{relatedProject.title}</p>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-gray-400">{relatedProject.progress}% Complete</div>
                        <div className="h-1 w-16 bg-gray-700/30 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-arc-accent/60 rounded-full"
                            style={{ width: `${relatedProject.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Meeting Schedule */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>Next Meeting</CardTitle>
            <Button variant="outline" size="sm" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 h-7 px-3">
              <Calendar className="h-3.5 w-3.5 mr-1" />
              Schedule
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Calendar className="h-10 w-10 text-arc-accent/70 mb-2" />
              <p className="text-sm text-gray-300">No upcoming meetings scheduled</p>
              <p className="text-xs text-gray-500 mt-1">Click Schedule to set up your next team meeting</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectOverview;
