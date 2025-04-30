
import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  ChevronUp,
  MessageSquare,
  Share,
  BookmarkPlus,
  Users,
  Calendar,
  Tag,
  ArrowRight,
  Star,
  ArrowLeft,
  ThumbsUp,
  Edit,
  CircleArrowRight,
  CircleArrowLeft,
  CircleCheck,
  Check,
  Lightbulb,
  Clock,
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

// Mock data for a single idea (would be fetched from API in a real app)
const mockIdea = {
  id: '1',
  title: 'AI-Powered Code Review Assistant',
  description: 'A tool that uses machine learning to provide actionable code review comments and suggestions based on project-specific patterns and best practices.\n\nThe tool would analyze the codebase to understand patterns, coding standards, and common issues, then provide personalized suggestions during code reviews. It could integrate with GitHub, GitLab, or Bitbucket and offer automatic fixes for common problems.\n\nKey features would include:\n\n- Pattern recognition from existing codebase\n- Custom rule creation\n- Automated fix suggestions\n- Code smell detection\n- Performance impact estimation\n- Integration with CI/CD pipelines',
  author: {
    id: '101',
    name: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Senior Developer'
  },
  createdAt: '2024-04-15T14:23:00Z',
  updatedAt: '2024-04-20T09:18:00Z',
  status: 'Incubating',
  tags: ['AI', 'Developer Tools', 'Productivity', 'Code Quality'],
  upvotes: 47,
  comments: 12,
  participants: 8,
  champion: {
    id: '102',
    name: 'Alex Rodriguez',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'Engineering Manager'
  },
  milestones: [
    { id: 'm1', title: 'Initial proposal submitted', date: '2024-04-15T14:23:00Z', completed: true },
    { id: 'm2', title: 'Discussion phase', date: '2024-04-18T00:00:00Z', completed: true },
    { id: 'm3', title: 'Champion assigned', date: '2024-04-20T09:18:00Z', completed: true },
    { id: 'm4', title: 'Incubation sprint', date: '2024-04-25T00:00:00Z', completed: false },
    { id: 'm5', title: 'Decision on project conversion', date: '2024-05-10T00:00:00Z', completed: false },
  ],
  incubationNotes: [
    { id: 'n1', author: 'Sarah Chen', content: 'We should consider what ML model would work best for this', color: 'bg-yellow-200' },
    { id: 'n2', author: 'Alex Rodriguez', content: 'Need to prioritize GitHub integration first', color: 'bg-green-200' },
    { id: 'n3', author: 'Maria Wong', content: 'Should we include a code quality score?', color: 'bg-blue-200' },
  ],
  comments: [
    {
      id: 'c1',
      author: {
        id: '103',
        name: 'David Kim',
        avatar: 'https://i.pravatar.cc/150?img=3'
      },
      content: 'I love this idea! We could also add support for custom linting rules specific to each project.',
      createdAt: '2024-04-16T10:12:00Z',
      replies: [
        {
          id: 'c1r1',
          author: {
            id: '101',
            name: 'Sarah Chen', 
            avatar: 'https://i.pravatar.cc/150?img=1'
          },
          content: 'Great suggestion, David! I agree that would make it much more flexible.',
          createdAt: '2024-04-16T11:03:00Z',
        }
      ]
    },
    {
      id: 'c2',
      author: {
        id: '104',
        name: 'Emma Wilson',
        avatar: 'https://i.pravatar.cc/150?img=4'
      },
      content: 'Has anyone looked into what existing ML models might be suitable for this use case?',
      createdAt: '2024-04-17T15:45:00Z',
      replies: []
    },
  ],
  relatedIdeas: [
    { id: '2', title: 'Automated Documentation Generator', status: 'Draft', upvotes: 18 },
    { id: '3', title: 'Integrated Code Performance Analyzer', status: 'Incubating', upvotes: 32 },
  ]
};

// Define wizard steps for the Convert to Project flow
const wizardSteps = [
  { id: 1, title: 'Confirm & Import' },
  { id: 2, title: 'Brainstorm & Scope' },
  { id: 3, title: 'Roles & Team' },
  { id: 4, title: 'Workspace Setup' },
  { id: 5, title: 'Completion' }
];

// Mock team members for assignment
const teamMembers = [
  { id: '101', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: '102', name: 'Alex Rodriguez', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: '103', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: '104', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: '105', name: 'James Taylor', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: '106', name: 'Maria Wong', avatar: 'https://i.pravatar.cc/150?img=6' },
];

const IdeaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [upvoted, setUpvoted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showConvertWizard, setShowConvertWizard] = useState(false);
  const [currentWizardStep, setCurrentWizardStep] = useState(1);
  const [includeIdeaContent, setIncludeIdeaContent] = useState(true);
  
  // Convert project wizard form state
  const [projectName, setProjectName] = useState(mockIdea.title);
  const [projectDesc, setProjectDesc] = useState(mockIdea.description);
  const [selectedBoardTemplate, setSelectedBoardTemplate] = useState('kanban');
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string>>({
    lead: mockIdea.champion?.id || '',
    developer: '',
    designer: '',
    qa: '',
    researcher: ''
  });
  
  // Toggles for workspace setup
  const [setupToggles, setSetupToggles] = useState({
    docsSpace: true,
    repoStub: true,
    assetFolder: true,
    notifyMentions: true,
    notifyAssignments: true
  });
  
  const idea = mockIdea; // In a real app, fetch idea by ID

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) {
      return 'just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return formatDate(dateString);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Draft': return 'bg-gray-500/20 text-gray-300';
      case 'Incubating': return 'bg-blue-500/20 text-blue-300';
      case 'Spun-Off': return 'bg-green-500/20 text-green-300';
      case 'Archived': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      // In a real app, post comment to API
      toast.success('Comment posted successfully!');
      setCommentText('');
    }
  };
  
  const handleUpvote = () => {
    setUpvoted(!upvoted);
    // In a real app, send upvote to API
  };
  
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // In a real app, send bookmark to API
    toast.success(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };
  
  const handleNominateChampion = () => {
    // In a real app, show champion selection dialog
    toast.info('Champion nomination feature coming soon!');
  };
  
  const handleShare = () => {
    // In a real app, copy link to clipboard or show share dialog
    toast.success('Link copied to clipboard!');
  };
  
  // Wizard navigation handlers
  const nextStep = () => {
    if (currentWizardStep < wizardSteps.length) {
      setCurrentWizardStep(currentWizardStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentWizardStep > 1) {
      setCurrentWizardStep(currentWizardStep - 1);
    }
  };
  
  const handleCreateProject = () => {
    // Final step, create project
    setCurrentWizardStep(5); // Move to completion step
    
    // In a real app, send project data to API
    setTimeout(() => {
      // After "creating" the project
      toast.success('Project created successfully!');
    }, 1500);
  };
  
  const handleCloseWizard = () => {
    setShowConvertWizard(false);
    setCurrentWizardStep(1);
    toast('Conversion cancelled');
  };
  
  const handleRoleSelection = (role: string, userId: string) => {
    setSelectedRoles(prev => ({
      ...prev,
      [role]: userId
    }));
  };
  
  const handleToggleChange = (toggle: string) => {
    setSetupToggles(prev => ({
      ...prev,
      [toggle]: !prev[toggle]
    }));
  };
  
  const handleGoToProject = () => {
    // In a real app, navigate to the newly created project
    navigate('/projects/new-project-id');
  };
  
  // Render the current wizard step
  const renderWizardStep = () => {
    switch (currentWizardStep) {
      case 1: // Confirm & Import
        return (
          <div className="space-y-6 py-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Convert Idea to Project</h2>
              <p className="text-gray-400">Let's transform this idea into a full-fledged project workspace.</p>
            </div>
            
            <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Idea Summary</h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Title</p>
                  <p className="text-white">{idea.title}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                    {idea.status}
                  </span>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Champion</p>
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={idea.champion?.avatar} alt={idea.champion?.name} />
                      <AvatarFallback>{idea.champion?.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="text-white">{idea.champion?.name}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Tags</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {idea.tags.map(tag => (
                      <span key={tag} className="bg-arc-accent/10 text-arc-accent/90 text-xs px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-400">Description Preview</p>
                  <p className="text-gray-300 line-clamp-3 mt-1">{idea.description}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center">
                <input
                  type="checkbox"
                  id="includeContent"
                  checked={includeIdeaContent}
                  onChange={() => setIncludeIdeaContent(!includeIdeaContent)}
                  className="rounded border-gray-600 text-arc-accent focus:ring-arc-accent/50 h-4 w-4"
                />
                <label htmlFor="includeContent" className="ml-2 text-white">
                  Import idea content, comments, and incubation notes
                </label>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleCloseWizard}>
                Cancel
              </Button>
              <Button 
                onClick={nextStep} 
                disabled={false}
                className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
              >
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case 2: // Brainstorm & Scope
        return (
          <div className="space-y-6 py-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Brainstorm & Scope</h2>
              <p className="text-gray-400">Define your project's scope and outline the key milestones.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Live Brainstorm Panel */}
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4 h-[500px] flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">Brainstorm</h3>
                  <div className="flex -space-x-2">
                    {teamMembers.slice(0, 3).map(member => (
                      <Avatar key={member.id} className="h-6 w-6 border-2 border-black">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    ))}
                    {teamMembers.length > 3 && (
                      <div className="h-6 w-6 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-black">
                        +{teamMembers.length - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex-1 bg-black/30 rounded-lg p-2 mb-4 overflow-hidden relative">
                  {/* This would be a whiteboard component in the real app */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-gray-500">Live Whiteboard (Collaborative)</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {idea.incubationNotes.map(note => (
                    <div key={note.id} className={`${note.color} text-gray-800 p-3 rounded shadow text-sm`}>
                      <p className="font-medium">{note.author}</p>
                      <p>{note.content}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex-1 bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2 text-sm" 
                    placeholder="Add note or chat message..."
                  />
                  <Button variant="outline" size="sm">Send</Button>
                </div>
              </div>
              
              {/* Right: Auto-Generated Outline */}
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4 h-[500px] overflow-y-auto">
                <h3 className="text-white font-medium mb-4">Project Outline</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Project Name</label>
                    <input 
                      type="text" 
                      value={projectName} 
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Description</label>
                    <textarea 
                      value={projectDesc} 
                      onChange={(e) => setProjectDesc(e.target.value)}
                      className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2 h-32"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Milestones</label>
                    <div className="space-y-2">
                      {idea.milestones.map((milestone, index) => (
                        <div key={milestone.id} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            defaultValue={milestone.title}
                            className="flex-1 bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2 text-sm"
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                            <Trash size={14} />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" className="w-full">
                        <Plus size={14} className="mr-1" /> Add Milestone
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
              <Button 
                variant="default"
                onClick={nextStep}
                className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
              >
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case 3: // Roles & Team
        return (
          <div className="space-y-6 py-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Roles & Team</h2>
              <p className="text-gray-400">Assign team members to key roles in your project.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Role cards */}
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Project Lead</h3>
                <select 
                  value={selectedRoles.lead} 
                  onChange={(e) => handleRoleSelection('lead', e.target.value)}
                  className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select Lead</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                {selectedRoles.lead && (
                  <div className="mt-2 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage 
                        src={teamMembers.find(m => m.id === selectedRoles.lead)?.avatar} 
                        alt="Selected member" 
                      />
                      <AvatarFallback>
                        {teamMembers.find(m => m.id === selectedRoles.lead)?.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {teamMembers.find(m => m.id === selectedRoles.lead)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Developer</h3>
                <select 
                  value={selectedRoles.developer} 
                  onChange={(e) => handleRoleSelection('developer', e.target.value)}
                  className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select Developer</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                {selectedRoles.developer && (
                  <div className="mt-2 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage 
                        src={teamMembers.find(m => m.id === selectedRoles.developer)?.avatar} 
                        alt="Selected member" 
                      />
                      <AvatarFallback>
                        {teamMembers.find(m => m.id === selectedRoles.developer)?.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {teamMembers.find(m => m.id === selectedRoles.developer)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Designer</h3>
                <select 
                  value={selectedRoles.designer} 
                  onChange={(e) => handleRoleSelection('designer', e.target.value)}
                  className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select Designer</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                {selectedRoles.designer && (
                  <div className="mt-2 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage 
                        src={teamMembers.find(m => m.id === selectedRoles.designer)?.avatar} 
                        alt="Selected member" 
                      />
                      <AvatarFallback>
                        {teamMembers.find(m => m.id === selectedRoles.designer)?.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {teamMembers.find(m => m.id === selectedRoles.designer)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">QA Engineer</h3>
                <select 
                  value={selectedRoles.qa} 
                  onChange={(e) => handleRoleSelection('qa', e.target.value)}
                  className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select QA</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                {selectedRoles.qa && (
                  <div className="mt-2 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage 
                        src={teamMembers.find(m => m.id === selectedRoles.qa)?.avatar} 
                        alt="Selected member" 
                      />
                      <AvatarFallback>
                        {teamMembers.find(m => m.id === selectedRoles.qa)?.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {teamMembers.find(m => m.id === selectedRoles.qa)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Researcher</h3>
                <select 
                  value={selectedRoles.researcher} 
                  onChange={(e) => handleRoleSelection('researcher', e.target.value)}
                  className="w-full bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2"
                >
                  <option value="">Select Researcher</option>
                  {teamMembers.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                  ))}
                </select>
                {selectedRoles.researcher && (
                  <div className="mt-2 flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage 
                        src={teamMembers.find(m => m.id === selectedRoles.researcher)?.avatar} 
                        alt="Selected member" 
                      />
                      <AvatarFallback>
                        {teamMembers.find(m => m.id === selectedRoles.researcher)?.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300">
                      {teamMembers.find(m => m.id === selectedRoles.researcher)?.name}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Invite panel */}
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-4">
                <h3 className="text-white font-medium mb-3">Invite More</h3>
                <div className="flex">
                  <input 
                    type="text" 
                    className="flex-1 bg-black/50 border border-arc-accent/30 text-white rounded-l-md px-3 py-2" 
                    placeholder="Search members..."
                  />
                  <Button className="rounded-l-none">Invite</Button>
                </div>
                
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    <Users size={14} className="mr-1" /> Auto-Assign Suggestions
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
              <Button 
                onClick={nextStep}
                className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
              >
                Next <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        );
        
      case 4: // Workspace Setup
        return (
          <div className="space-y-6 py-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">Workspace Setup</h2>
              <p className="text-gray-400">Configure your project workspace and notification preferences.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Board Template</h3>
                <div className="grid grid-cols-3 gap-3">
                  <div 
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      selectedBoardTemplate === 'kanban' 
                        ? 'border-arc-accent bg-arc-accent/10' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedBoardTemplate('kanban')}
                  >
                    <div className="bg-black/50 rounded h-16 flex items-center justify-center mb-2">
                      <span className="text-2xl text-gray-400">📋</span>
                    </div>
                    <p className="text-sm text-white">Kanban</p>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      selectedBoardTemplate === 'list' 
                        ? 'border-arc-accent bg-arc-accent/10' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedBoardTemplate('list')}
                  >
                    <div className="bg-black/50 rounded h-16 flex items-center justify-center mb-2">
                      <span className="text-2xl text-gray-400">📝</span>
                    </div>
                    <p className="text-sm text-white">List</p>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      selectedBoardTemplate === 'timeline' 
                        ? 'border-arc-accent bg-arc-accent/10' 
                        : 'border-gray-700 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedBoardTemplate('timeline')}
                  >
                    <div className="bg-black/50 rounded h-16 flex items-center justify-center mb-2">
                      <span className="text-2xl text-gray-400">📅</span>
                    </div>
                    <p className="text-sm text-white">Timeline</p>
                  </div>
                </div>
                
                <h3 className="text-white font-medium mt-6 mb-4">File Structure</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-gray-400" />
                      <span className="text-white">Docs space</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={setupToggles.docsSpace} 
                        onChange={() => handleToggleChange('docsSpace')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arc-accent/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-arc-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-gray-400" />
                      <span className="text-white">Repository stub</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={setupToggles.repoStub} 
                        onChange={() => handleToggleChange('repoStub')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arc-accent/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-arc-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText size={16} className="mr-2 text-gray-400" />
                      <span className="text-white">Asset folder</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={setupToggles.assetFolder} 
                        onChange={() => handleToggleChange('assetFolder')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arc-accent/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-arc-accent"></div>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/40 border border-arc-accent/20 rounded-lg p-6">
                <h3 className="text-white font-medium mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Mentions</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={setupToggles.notifyMentions} 
                        onChange={() => handleToggleChange('notifyMentions')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arc-accent/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-arc-accent"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white">Task assignments</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={setupToggles.notifyAssignments} 
                        onChange={() => handleToggleChange('notifyAssignments')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-arc-accent/50 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-arc-accent"></div>
                    </label>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-white font-medium mb-4">Project Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-400">Name:</span>
                      <span className="text-white ml-2">{projectName}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Board Template:</span>
                      <span className="text-white ml-2">{selectedBoardTemplate.charAt(0).toUpperCase() + selectedBoardTemplate.slice(1)}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Team Size:</span>
                      <span className="text-white ml-2">
                        {Object.values(selectedRoles).filter(Boolean).length} members
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Lead:</span>
                      <span className="text-white ml-2">
                        {selectedRoles.lead 
                          ? teamMembers.find(m => m.id === selectedRoles.lead)?.name 
                          : 'Not assigned'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={prevStep}>
                <ArrowLeft size={16} className="mr-2" /> Back
              </Button>
              <Button 
                onClick={handleCreateProject}
                className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
              >
                <Lightbulb size={16} className="mr-2" /> Create Project
              </Button>
            </div>
          </div>
        );
        
      case 5: // Completion
        return (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <Check size={32} className="text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Project Created!</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Your project has been successfully created from this idea. You can now start working with your team.
            </p>
            <div className="flex gap-4">
              <Button onClick={handleGoToProject} className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light">
                Go to Project
              </Button>
              <Button variant="outline" asChild>
                <Link to="/projects/mine">View My Projects</Link>
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="container pb-16 animate-fade-in">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/ideas">Ideas</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{idea.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-3xl font-bold text-white mr-2">{idea.title}</h1>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(idea.status)}`}>
                  {idea.status}
                </span>
              </div>
              <div className="flex items-center mt-2 flex-wrap">
                <div className="flex items-center">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src={idea.author.avatar} alt={idea.author.name} />
                    <AvatarFallback>{idea.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-300 text-sm">{idea.author.name}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-400 text-sm">{formatDate(idea.createdAt)}</span>
                {idea.champion && (
                  <>
                    <span className="mx-2 text-gray-500">•</span>
                    <div className="flex items-center">
                      <Badge variant="outline" className="bg-yellow-500/10 text-yellow-300 border-yellow-500/30">
                        <Star size={12} className="mr-1" /> Champion
                      </Badge>
                      <Avatar className="h-5 w-5 ml-1">
                        <AvatarImage src={idea.champion.avatar} alt={idea.champion.name} />
                        <AvatarFallback>{idea.champion.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                    </div>
                  </>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {idea.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-arc-accent/10 text-arc-accent/90 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                variant={upvoted ? "default" : "outline"}
                size="sm" 
                onClick={handleUpvote}
                className={upvoted ? "bg-arc-accent hover:bg-arc-accent/90" : ""}
              >
                <ChevronUp size={16} className="mr-1" /> Upvote {idea.upvotes + (upvoted ? 1 : 0)}
              </Button>
              <Button 
                variant="outline"
                size="sm"
                onClick={handleNominateChampion}
              >
                <Star size={16} className="mr-1" /> Nominate Champion
              </Button>
              <Dialog open={showConvertWizard} onOpenChange={setShowConvertWizard}>
                <DialogTrigger asChild>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
                  >
                    <ArrowRight size={16} className="mr-1" /> Convert to Project
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px]">
                  <div className="relative">
                    {/* Wizard Steps Indicator */}
                    {currentWizardStep < 5 && (
                      <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
                          {wizardSteps.slice(0, -1).map((step) => (
                            <React.Fragment key={step.id}>
                              <div 
                                className={`flex flex-col items-center ${
                                  step.id < currentWizardStep 
                                    ? 'text-arc-accent' 
                                    : step.id === currentWizardStep 
                                      ? 'text-white' 
                                      : 'text-gray-500'
                                }`}
                              >
                                <div 
                                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                    step.id < currentWizardStep 
                                      ? 'bg-arc-accent text-white' 
                                      : step.id === currentWizardStep 
                                        ? 'bg-arc-accent/20 text-white border border-arc-accent' 
                                        : 'bg-gray-800 text-gray-500'
                                  }`}
                                >
                                  {step.id < currentWizardStep ? <Check size={16} /> : step.id}
                                </div>
                                <span className="text-xs mt-1">{step.title}</span>
                              </div>
                              {step.id < wizardSteps.length - 1 && (
                                <div 
                                  className={`h-0.5 flex-1 mx-2 ${
                                    step.id < currentWizardStep ? 'bg-arc-accent' : 'bg-gray-700'
                                  }`}
                                ></div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Current Step Content */}
                    {renderWizardStep()}
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant={bookmarked ? "default" : "outline"} size="sm" onClick={handleBookmark}>
                <BookmarkPlus size={16} />
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-400">
            <div className="flex items-center mr-4">
              <ChevronUp size={16} className="mr-1" /> {idea.upvotes} upvotes
            </div>
            <div className="flex items-center mr-4">
              <MessageSquare size={16} className="mr-1" /> {idea.comments.length} comments
            </div>
            <div className="flex items-center">
              <Users size={16} className="mr-1" /> {idea.participants} participants
            </div>
          </div>
          
          <Separator className="my-6 bg-arc-accent/20" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <Tabs defaultValue="overview" onValueChange={setActiveTab}>
              <TabsList className="bg-black/40 border border-arc-accent/30">
                <TabsTrigger value="overview" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="incubation" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">
                  Incubation Space
                </TabsTrigger>
                <TabsTrigger value="comments" className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400">
                  Comments ({idea.comments.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="pt-6 animate-fade-in">
                <div className="prose prose-invert max-w-none">
                  {idea.description.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="incubation" className="pt-6 animate-fade-in">
                <div className="bg-black/30 border border-arc-accent/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Incubation Space</h3>
                    <div className="flex -space-x-2">
                      {teamMembers.slice(0, 3).map(member => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-background">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {teamMembers.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white border-2 border-background">
                          +{teamMembers.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-80 bg-black/50 rounded-lg border border-gray-700 mb-6 p-4 flex items-center justify-center">
                    <p className="text-gray-500">Interactive Whiteboard (Collaborative)</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {idea.incubationNotes.map(note => (
                      <div key={note.id} className={`${note.color} text-gray-800 p-4 rounded-lg shadow-md`}>
                        <p className="font-medium">{note.author}</p>
                        <p>{note.content}</p>
                      </div>
                    ))}
                    <div className="flex border border-dashed border-gray-600 rounded-lg p-4 items-center justify-center text-gray-400 hover:border-arc-accent hover:text-arc-accent cursor-pointer transition-colors">
                      <Plus size={20} className="mr-2" /> Add Note
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      className="flex-1 bg-black/50 border border-arc-accent/30 text-white rounded-md px-3 py-2" 
                      placeholder="Add a comment or note..."
                    />
                    <Button>Post</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="comments" className="pt-6 animate-fade-in">
                <div className="space-y-6">
                  {/* Add comment form */}
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="w-full bg-black/40 border border-arc-accent/30 rounded-lg p-4 text-white placeholder-gray-500 min-h-[100px]"
                      placeholder="Add a comment..."
                    />
                    <div className="flex justify-end mt-2">
                      <Button type="submit" disabled={!commentText.trim()}>
                        Post Comment
                      </Button>
                    </div>
                  </form>
                  
                  {/* Comments list */}
                  {idea.comments.map(comment => (
                    <div key={comment.id} className="bg-black/30 border border-arc-accent/20 rounded-lg p-4">
                      <div className="flex">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                          <AvatarFallback>{comment.author.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center">
                            <p className="font-medium text-white">{comment.author.name}</p>
                            <span className="text-xs text-gray-400 ml-2">{formatRelativeTime(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-300 mt-1">{comment.content}</p>
                          <div className="flex mt-2">
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                              Like
                            </Button>
                          </div>
                          
                          {/* Replies */}
                          {comment.replies.length > 0 && (
                            <div className="pl-4 border-l border-gray-700 mt-3 space-y-3">
                              {comment.replies.map(reply => (
                                <div key={reply.id} className="flex">
                                  <Avatar className="h-6 w-6 mr-2">
                                    <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                                    <AvatarFallback>{reply.author.name.substring(0, 2)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="flex items-center">
                                      <p className="font-medium text-white text-sm">{reply.author.name}</p>
                                      <span className="text-xs text-gray-400 ml-2">{formatRelativeTime(reply.createdAt)}</span>
                                    </div>
                                    <p className="text-gray-300 text-sm mt-1">{reply.content}</p>
                                    <div className="flex mt-1">
                                      <Button variant="ghost" size="sm" className="text-xs h-5 px-2">Like</Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24 space-y-6">
              {/* Champion Panel */}
              <Card className="bg-black/40 border-arc-accent/30">
                <CardContent className="p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center">
                    <Star size={16} className="text-yellow-400 mr-2" /> Champion
                  </h3>
                  
                  {idea.champion ? (
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-3">
                        <AvatarImage src={idea.champion.avatar} alt={idea.champion.name} />
                        <AvatarFallback>{idea.champion.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{idea.champion.name}</p>
                        <p className="text-sm text-gray-400">{idea.champion.role}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <Star size={32} className="mx-auto text-gray-500 mb-2" />
                      <p className="text-sm text-gray-400 mb-3">No champion assigned yet</p>
                      <Button size="sm" onClick={handleNominateChampion}>
                        <Star size={16} className="mr-1" />
                        Nominate Champion
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Idea Milestones */}
              <Card className="bg-black/40 border-arc-accent/30">
                <CardContent className="p-5">
                  <h3 className="font-medium text-white mb-3 flex items-center">
                    <Clock size={16} className="mr-2" /> Idea Timeline
                  </h3>
                  
                  <div className="space-y-4">
                    {idea.milestones.map((milestone, index) => (
                      <div 
                        key={milestone.id}
                        className={`pl-4 border-l-2 ${
                          milestone.completed 
                            ? 'border-arc-accent' 
                            : 'border-gray-700'
                        } relative`}
                      >
                        <div 
                          className={`absolute -left-1.5 top-1.5 rounded-full w-3 h-3 ${
                            milestone.completed 
                              ? 'bg-arc-accent' 
                              : 'bg-gray-700 border border-gray-600'
                          }`}
                        />
                        <p className="text-sm text-white">{milestone.title}</p>
                        <p className="text-xs text-gray-400">{formatDate(milestone.date)}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Ideas */}
              <Card className="bg-black/40 border-arc-accent/30">
                <CardContent className="p-5">
                  <h3 className="font-medium text-white mb-3">Related Ideas</h3>
                  
                  <div className="space-y-3">
                    {idea.relatedIdeas.map(relatedIdea => (
                      <Link 
                        key={relatedIdea.id}
                        to={`/ideas/${relatedIdea.id}`}
                        className="flex items-center p-2 rounded-md hover:bg-gray-800/50 transition-colors"
                      >
                        <Lightbulb size={16} className="mr-2 text-gray-400" />
                        <div className="flex-1">
                          <p className="text-sm text-white">{relatedIdea.title}</p>
                          <div className="flex items-center mt-1">
                            <span className={`text-xs rounded-full px-1.5 py-0.5 ${getStatusColor(relatedIdea.status)}`}>
                              {relatedIdea.status}
                            </span>
                            <span className="text-xs text-gray-400 ml-2">
                              <ChevronUp size={12} className="inline mr-1" /> {relatedIdea.upvotes}
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Metrics Summary */}
              <Card className="bg-black/40 border-arc-accent/30">
                <CardContent className="p-5">
                  <h3 className="font-medium text-white mb-3">Metrics</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Created</span>
                      <span className="text-white">{formatDate(idea.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated</span>
                      <span className="text-white">{formatRelativeTime(idea.updatedAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status</span>
                      <span className={`${getStatusColor(idea.status)}`}>{idea.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Upvotes</span>
                      <span className="text-white">{idea.upvotes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Comments</span>
                      <span className="text-white">{idea.comments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Participants</span>
                      <span className="text-white">{idea.participants}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
};

export default IdeaDetailPage;
