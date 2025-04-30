
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Star, MessageSquare } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CircularProgressBar } from './CircularProgressBar';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  progress: number;
  status: string;
  lead: TeamMember;
  team: TeamMember[];
  domain: string[];
  activity: number;
  isOpen: boolean;
  createdAt: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isJoining, setIsJoining] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  
  const handleJoinRequest = () => {
    setIsJoining(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      setIsJoining(false);
      setHasRequested(true);
    }, 1000);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning': return 'bg-yellow-500/20 text-yellow-300';
      case 'In Progress': return 'bg-blue-500/20 text-blue-300';
      case 'Review': return 'bg-purple-500/20 text-purple-300';
      case 'Completed': return 'bg-green-500/20 text-green-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  return (
    <div 
      className="border border-arc-accent/20 bg-black/40 rounded-lg overflow-hidden transition-all duration-300 
      hover:border-arc-accent hover:translate-y-[-4px] hover:shadow-lg hover:shadow-arc-accent/20 animate-fade-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <img 
              src={project.lead.avatar} 
              alt={project.lead.name} 
              className="w-8 h-8 rounded-full border border-arc-accent/30"
            />
            <span className="text-sm text-gray-400">Led by {project.lead.name}</span>
          </div>
          <Badge className={`${getStatusColor(project.status)}`}>
            {project.status}
          </Badge>
        </div>
        
        {/* Title and Description */}
        <Link to={`/projects/${project.id}`} className="group">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-arc-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>
        </Link>
        
        <div className="flex-grow">
          {/* Domain Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.domain.map((tag) => (
              <Badge key={tag} variant="outline" className="border-arc-accent/30 text-gray-300 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Footer - Progress and Team */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4">
            <CircularProgressBar progress={project.progress} />
            
            <div className="flex -space-x-2 relative z-0">
              {project.team.slice(0, 4).map((member) => (
                <TooltipProvider key={member.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative">
                        <img 
                          src={member.avatar} 
                          alt={member.name} 
                          className="w-8 h-8 rounded-full border-2 border-black/40 transition-transform hover:scale-110 hover:z-10"
                        />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{member.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
              {project.team.length > 4 && (
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-arc-accent/30 text-white text-xs font-medium border-2 border-black/40">
                  +{project.team.length - 4}
                </div>
              )}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-between gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="flex-1 border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20 hover:text-white group"
            >
              <Link to={`/projects/${project.id}`} className="flex items-center justify-center gap-1 w-full">
                <span>View</span>
              </Link>
            </Button>
            
            {project.isOpen && (
              <Button 
                variant="default" 
                size="sm" 
                className={`flex-1 ${
                  hasRequested
                    ? 'bg-arc-accent/20 text-gray-300'
                    : 'bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light'
                } transition-all duration-300`}
                onClick={handleJoinRequest}
                disabled={isJoining || hasRequested}
              >
                {isJoining ? 'Sending...' : hasRequested ? 'Requested' : 'Join'}
              </Button>
            )}
          </div>
          
          {/* Activity indicator (visible on hover) */}
          <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center justify-center text-xs text-gray-400">
              <MessageSquare size={14} className="mr-1 text-arc-accent" />
              <span>{project.activity} updates this week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
