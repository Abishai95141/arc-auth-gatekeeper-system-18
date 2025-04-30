
import React, { useState } from 'react';
import { Search, Filter, Plus, Star, Users, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AppLayout from '@/components/AppLayout';
import ProjectCard from '@/components/projects/ProjectCard';
import FilterBar from '@/components/projects/FilterBar';
import EmptyState from '@/components/projects/EmptyState';

// Mock data for projects
const projectsData = [
  {
    id: 1,
    title: 'AI Code Reviewer',
    description: 'Building an intelligent code review assistant that learns from feedback and provides actionable suggestions for code improvement.',
    progress: 65,
    status: 'In Progress',
    lead: {
      id: 'u1',
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    team: [
      { id: 'u1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 'u2', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 'u3', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 'u4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 'u5', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    domain: ['AI', 'Developer Tools'],
    activity: 12,
    isOpen: true,
    createdAt: '2025-03-15',
  },
  {
    id: 2,
    title: 'GraphQL API Explorer',
    description: 'An interactive explorer for GraphQL APIs that visualizes schema relationships and allows for real-time query testing and optimization.',
    progress: 30,
    status: 'Planning',
    lead: {
      id: 'u2',
      name: 'Alex Johnson',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    team: [
      { id: 'u2', name: 'Alex Johnson', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 'u6', name: 'James Smith', avatar: 'https://i.pravatar.cc/150?img=6' },
    ],
    domain: ['API', 'Developer Tools'],
    activity: 5,
    isOpen: true,
    createdAt: '2025-04-02',
  },
  {
    id: 3,
    title: 'Community Forum Redesign',
    description: 'Redesigning the community forum with improved UX, better search capabilities, and integrated analytics to increase engagement.',
    progress: 90,
    status: 'Review',
    lead: {
      id: 'u3',
      name: 'Maria Garcia',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    team: [
      { id: 'u3', name: 'Maria Garcia', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 'u7', name: 'Olivia Brown', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 'u8', name: 'William Jones', avatar: 'https://i.pravatar.cc/150?img=8' },
    ],
    domain: ['UX/UI', 'Community'],
    activity: 8,
    isOpen: false,
    createdAt: '2025-02-20',
  },
  {
    id: 4,
    title: 'Mobile Edge Computing Framework',
    description: 'Building a lightweight framework for leveraging edge computing in mobile applications to reduce latency and improve offline capabilities.',
    progress: 15,
    status: 'Planning',
    lead: {
      id: 'u4',
      name: 'David Kim',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    team: [
      { id: 'u4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=4' },
      { id: 'u9', name: 'Sophia Martinez', avatar: 'https://i.pravatar.cc/150?img=9' },
    ],
    domain: ['Mobile', 'Edge Computing'],
    activity: 3,
    isOpen: true,
    createdAt: '2025-04-10',
  },
  {
    id: 5,
    title: 'Decentralized Data Storage',
    description: 'Creating a secure, distributed storage solution using blockchain technology to ensure data integrity and user ownership.',
    progress: 45,
    status: 'In Progress',
    lead: {
      id: 'u5',
      name: 'Emma Wilson',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    team: [
      { id: 'u5', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 'u10', name: 'Lucas Taylor', avatar: 'https://i.pravatar.cc/150?img=10' },
      { id: 'u11', name: 'Isabella Anderson', avatar: 'https://i.pravatar.cc/150?img=11' },
      { id: 'u12', name: 'Noah Thomas', avatar: 'https://i.pravatar.cc/150?img=12' },
    ],
    domain: ['Blockchain', 'Storage'],
    activity: 7,
    isOpen: true,
    createdAt: '2025-03-05',
  },
];

const domains = ["AI", "API", "Blockchain", "Community", "Developer Tools", "Edge Computing", "Mobile", "Storage", "UX/UI"];
const stages = ["Planning", "In Progress", "Review", "Completed"];
const teamSizes = ["1-3", "4-7", "8+"];
const sortOptions = ["Recent", "Active", "Popular", "Near Deadline"];

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState(projectsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState<string | null>(null);
  const [selectedTeamSize, setSelectedTeamSize] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("Recent");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // In a real app, we'd debounce this and make API calls
  };

  const handleDomainToggle = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      setSelectedDomains(selectedDomains.filter(d => d !== domain));
    } else {
      setSelectedDomains([...selectedDomains, domain]);
    }
  };

  const handleStageChange = (stage: string) => {
    setSelectedStage(stage === selectedStage ? null : stage);
  };

  const handleTeamSizeChange = (size: string) => {
    setSelectedTeamSize(size === selectedTeamSize ? null : size);
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedDomains([]);
    setSelectedStage(null);
    setSelectedTeamSize(null);
    setSortBy("Recent");
  };

  const filteredProjects = projects.filter(project => {
    // Search query filter
    if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Domain filter
    if (selectedDomains.length > 0 && !project.domain.some(d => selectedDomains.includes(d))) {
      return false;
    }
    
    // Stage filter
    if (selectedStage && project.status !== selectedStage) {
      return false;
    }
    
    // Team size filter
    if (selectedTeamSize) {
      const teamCount = project.team.length;
      if (selectedTeamSize === '1-3' && (teamCount < 1 || teamCount > 3)) return false;
      if (selectedTeamSize === '4-7' && (teamCount < 4 || teamCount > 7)) return false;
      if (selectedTeamSize === '8+' && teamCount < 8) return false;
    }
    
    return true;
  });

  // Sort projects based on selected sort option
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "Recent":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "Active":
        return b.activity - a.activity;
      case "Popular":
        return b.team.length - a.team.length;
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
            <p className="text-gray-400">Discover and collaborate on innovative tech projects</p>
          </div>
          <Link to="/projects/new">
            <Button className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
              transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.03]
              shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] flex gap-2">
              <Plus size={18} />
              Start Project
            </Button>
          </Link>
        </div>

        {/* Search and Filter Bar */}
        <FilterBar 
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          domains={domains}
          selectedDomains={selectedDomains}
          handleDomainToggle={handleDomainToggle}
          stages={stages}
          selectedStage={selectedStage}
          handleStageChange={handleStageChange}
          teamSizes={teamSizes}
          selectedTeamSize={selectedTeamSize}
          handleTeamSizeChange={handleTeamSizeChange}
          sortOptions={sortOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          handleReset={handleReset}
        />

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border border-arc-accent/20 bg-black/40 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            handleReset={handleReset}
            hasFilters={!!searchQuery || selectedDomains.length > 0 || !!selectedStage || !!selectedTeamSize}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default ProjectsPage;
