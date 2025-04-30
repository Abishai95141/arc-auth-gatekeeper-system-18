
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Search } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import ProjectCard from '@/components/projects/ProjectCard';

// Mock data for user's projects
const myProjectsData = [
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
];

const MyProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState(myProjectsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Projects</h1>
            <p className="text-gray-400">Projects you lead or contribute to</p>
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

        {/* Search */}
        <div className="relative animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search your projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 py-2 bg-black/40 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
          />
        </div>
        
        {/* View Selector */}
        <div className="flex items-center justify-between animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-arc-accent border-b-2 border-arc-accent py-2">All ({projects.length})</Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white py-2">Leading (1)</Button>
            <Button variant="ghost" className="text-gray-400 hover:text-white py-2">Contributing (1)</Button>
          </div>
          <Link to="/projects" className="text-sm text-arc-accent hover:underline">
            Browse All Projects
          </Link>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="border border-arc-accent/20 bg-black/40 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-arc-accent/30 rounded-lg bg-black/20 animate-fade-in">
            <img 
              src="/path/to/empty-state.svg" 
              alt="No projects found" 
              className="w-32 h-32 mb-6 opacity-70"
            />
            <h3 className="text-xl font-semibold text-white mb-2">No projects found</h3>
            <p className="text-gray-400 text-center mb-6 max-w-md">
              {searchQuery 
                ? "We couldn't find any projects matching your search." 
                : "You haven't joined any projects yet."}
            </p>
            <Link to="/projects/new">
              <Button 
                className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                  transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.03]
                  shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] flex gap-2"
              >
                <Plus size={18} />
                Create Your First Project
              </Button>
            </Link>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MyProjectsPage;
