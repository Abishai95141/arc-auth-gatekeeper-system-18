
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Star, ChevronRight, Edit, Users, Check, X, Plus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import AppLayout from '@/components/AppLayout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectOverview from '@/components/projects/workspace/ProjectOverview';
import ProjectBoard from '@/components/projects/workspace/ProjectBoard';
import ProjectTeam from '@/components/projects/workspace/ProjectTeam';
import ProjectFiles from '@/components/projects/workspace/ProjectFiles';

// Mock data for project details
const projectData = {
  id: 1,
  title: 'AI Code Reviewer',
  description: 'Building an intelligent code review assistant that learns from feedback and provides actionable suggestions for code improvement. The system will analyze code structure, identify potential bugs, suggest optimizations, and help maintain consistent code style across projects.',
  progress: 65,
  status: 'In Progress',
  lead: {
    id: 'u1',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Team Lead'
  },
  team: [
    { id: 'u1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Team Lead' },
    { id: 'u2', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Backend Developer' },
    { id: 'u3', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=3', role: 'ML Engineer' },
    { id: 'u4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=4', role: 'UI/UX Designer' },
    { id: 'u5', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Frontend Developer' },
  ],
  domain: ['AI', 'Developer Tools', 'Machine Learning'],
  createdAt: '2025-03-15',
  updatedAt: '2025-04-25',
  joinRequests: [
    { id: 'r1', userId: 'u6', name: 'James Smith', avatar: 'https://i.pravatar.cc/150?img=6', message: 'I have experience in NLP and would love to contribute to this project.', requestedAt: '2025-04-20' },
    { id: 'r2', userId: 'u7', name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=7', message: 'Frontend developer with 5+ years experience. Excited about this project!', requestedAt: '2025-04-22' },
  ],
  milestones: [
    { id: 'm1', title: 'Project Kickoff', date: '2025-03-15', completed: true },
    { id: 'm2', title: 'MVP Features', date: '2025-04-30', completed: false },
    { id: 'm3', title: 'Beta Testing', date: '2025-06-15', completed: false },
    { id: 'm4', title: 'Public Launch', date: '2025-07-30', completed: false },
  ],
  tasks: [
    { 
      id: 't1', 
      title: 'Set up CI/CD pipeline', 
      description: 'Configure GitHub Actions for automated testing and deployment', 
      status: 'Done', 
      assignees: ['u1', 'u2'], 
      dueDate: '2025-03-30',
      labels: ['infrastructure']
    },
    { 
      id: 't2', 
      title: 'Build code parsing module', 
      description: 'Create a module that can parse different programming languages and extract AST', 
      status: 'In Progress', 
      assignees: ['u2'], 
      dueDate: '2025-04-15',
      labels: ['backend', 'core']
    },
    { 
      id: 't3', 
      title: 'Train initial ML model', 
      description: 'Train the model on sample code reviews to identify patterns', 
      status: 'In Progress', 
      assignees: ['u3'], 
      dueDate: '2025-04-20',
      labels: ['ml', 'core']
    },
    { 
      id: 't4', 
      title: 'Design UI mockups', 
      description: 'Create wireframes and high-fidelity designs for the reviewer interface', 
      status: 'To Do', 
      assignees: ['u4'], 
      dueDate: '2025-05-01',
      labels: ['design', 'frontend']
    },
    { 
      id: 't5', 
      title: 'Implement feedback collection', 
      description: 'Create a system to collect user feedback on review suggestions', 
      status: 'To Do', 
      assignees: ['u5'], 
      dueDate: '2025-05-10',
      labels: ['frontend']
    },
    { 
      id: 't6', 
      title: 'Write documentation', 
      description: 'Create comprehensive documentation for the API and usage', 
      status: 'To Do', 
      assignees: [], 
      dueDate: '2025-05-15',
      labels: ['docs']
    },
  ],
  activity: [
    { id: 'a1', type: 'task_completed', user: 'u1', content: 'completed task "Set up CI/CD pipeline"', timestamp: '2025-04-22T14:32:00Z' },
    { id: 'a2', type: 'comment', user: 'u3', content: 'The initial ML model is showing promising results. We might need to collect more training data.', timestamp: '2025-04-21T09:15:00Z' },
    { id: 'a3', type: 'file_upload', user: 'u4', content: 'uploaded "UI mockups v1.fig"', timestamp: '2025-04-20T16:45:00Z' },
    { id: 'a4', type: 'task_assigned', user: 'u2', content: 'assigned task "Build code parsing module" to Alex Johnson', timestamp: '2025-04-18T11:20:00Z' },
    { id: 'a5', type: 'member_joined', user: 'u5', content: 'Emma Wilson joined the project', timestamp: '2025-04-15T13:10:00Z' },
  ],
  files: [
    { id: 'f1', name: 'Project Roadmap.pdf', type: 'pdf', size: '1.2 MB', uploadedBy: 'u1', uploadedAt: '2025-03-16T10:30:00Z' },
    { id: 'f2', name: 'Architecture Diagram.png', type: 'image', size: '842 KB', uploadedBy: 'u2', uploadedAt: '2025-03-20T14:45:00Z' },
    { id: 'f3', name: 'UI mockups v1.fig', type: 'figma', size: '4.7 MB', uploadedBy: 'u4', uploadedAt: '2025-04-20T16:45:00Z' },
    { id: 'f4', name: 'ML Model Documentation.md', type: 'markdown', size: '356 KB', uploadedBy: 'u3', uploadedAt: '2025-04-21T09:30:00Z' },
  ],
  wiki: {
    id: 'w1',
    title: 'Project Wiki',
    sections: [
      {
        id: 'ws1',
        title: 'Getting Started',
        content: '# Welcome to the AI Code Reviewer Project\n\nThis wiki contains essential information about the project, its architecture, and how to contribute.\n\n## Project Goals\n\n- Create an AI-powered code review assistant\n- Improve code quality and consistency\n- Reduce manual review effort\n\n## Setup Instructions\n\n1. Clone the repository\n2. Install dependencies\n3. Run the development server',
        lastUpdatedBy: 'u1',
        lastUpdatedAt: '2025-03-18T08:20:00Z'
      },
      {
        id: 'ws2',
        title: 'Architecture Overview',
        content: '# System Architecture\n\n## Components\n\n1. **Code Parser**: Processes source code into Abstract Syntax Trees\n2. **ML Engine**: Analyzes code and generates suggestions\n3. **Frontend**: User interface for reviewing suggestions\n4. **API**: Connects the frontend and backend services\n\n```mermaid\ngraph TD\n    A[Code Input] --> B[Code Parser]\n    B --> C[ML Engine]\n    C --> D[Suggestions API]\n    D --> E[Frontend]\n```',
        lastUpdatedBy: 'u2',
        lastUpdatedAt: '2025-04-01T11:45:00Z'
      }
    ]
  },
  relatedProjects: [
    { id: 2, title: 'GraphQL API Explorer', progress: 30 },
    { id: 5, title: 'Decentralized Data Storage', progress: 45 }
  ]
};

const ProjectWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState(projectData);
  const [activeTab, setActiveTab] = useState('overview');
  const [isStarred, setIsStarred] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  
  // In a real app, we would fetch the project data based on the ID
  
  const handleStarProject = () => {
    setIsStarred(!isStarred);
    toast.success(isStarred ? 'Project removed from favorites' : 'Project added to favorites');
  };
  
  const handleLeaveProject = () => {
    // In a real app, this would call an API to remove the user from the project
    setIsLeaving(true);
    setTimeout(() => {
      toast.success('You have left the project');
      // Navigate to projects page
    }, 1000);
  };
  
  const isTeamLead = project.lead.id === 'u1'; // In a real app, check against current user ID

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Breadcrumbs & Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center text-sm text-gray-400">
            <Link to="/dashboard" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={16} className="mx-1" />
            <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
            <ChevronRight size={16} className="mx-1" />
            <span className="text-white">{project.title}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className={`border-arc-accent/30 ${isStarred ? 'bg-arc-accent/20 text-white' : 'text-gray-300'} hover:bg-arc-accent/30`}
              onClick={handleStarProject}
            >
              <Star size={16} className={`mr-1 ${isStarred ? 'fill-arc-accent text-arc-accent' : ''}`} />
              {isStarred ? 'Starred' : 'Star'}
            </Button>
            
            {isTeamLead ? (
              <Button
                variant="outline"
                size="sm"
                className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
              >
                <Link to={`/projects/${id}/edit`} className="flex items-center">
                  <Edit size={16} className="mr-1" />
                  Edit Project
                </Link>
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="border-arc-accent/30 text-gray-300 hover:bg-red-500/20"
                onClick={handleLeaveProject}
                disabled={isLeaving}
              >
                {isLeaving ? 'Leaving...' : 'Leave Project'}
              </Button>
            )}
          </div>
        </div>
        
        {/* Project Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Badge className="bg-blue-500/20 text-blue-300">{project.status}</Badge>
                <span className="text-sm text-gray-400">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-400">
                  Last updated {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex -space-x-2">
                {project.team.slice(0, 3).map((member) => (
                  <div key={member.id} className="relative group">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full border-2 border-black/40 transition-transform group-hover:scale-110"
                    />
                    {member.id === project.lead.id && (
                      <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-arc-accent text-white text-[8px] flex items-center justify-center">
                        👑
                      </div>
                    )}
                  </div>
                ))}
                {project.team.length > 3 && (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-arc-accent/30 text-white text-xs font-medium border-2 border-black/40">
                    +{project.team.length - 3}
                  </div>
                )}
              </div>
              <div className="ml-3 text-sm text-gray-400">
                {project.team.length} {project.team.length === 1 ? 'member' : 'members'}
              </div>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.domain.map((tag) => (
              <Badge key={tag} variant="outline" className="border-arc-accent/30 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-black/40 border border-arc-accent/20 p-1">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="board" 
              className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
            >
              Board
            </TabsTrigger>
            <TabsTrigger 
              value="team" 
              className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
            >
              Team
            </TabsTrigger>
            <TabsTrigger 
              value="files" 
              className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
            >
              Files & Wiki
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <ProjectOverview project={project} isTeamLead={isTeamLead} />
          </TabsContent>
          
          <TabsContent value="board" className="space-y-6">
            <ProjectBoard tasks={project.tasks} team={project.team} />
          </TabsContent>
          
          <TabsContent value="team" className="space-y-6">
            <ProjectTeam team={project.team} isTeamLead={isTeamLead} />
          </TabsContent>
          
          <TabsContent value="files" className="space-y-6">
            <ProjectFiles files={project.files} wiki={project.wiki} />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default ProjectWorkspacePage;
