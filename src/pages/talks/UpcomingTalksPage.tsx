
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Search, List, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/AppLayout';
import TalkCard from '@/components/talks/TalkCard';

// Mock data for tech talks (same as in TalksCalendarPage)
const mockTalks = [
  {
    id: '1',
    title: 'Introduction to React Hooks',
    date: new Date(2025, 3, 15, 14, 0), // April 15, 2025, 2:00 PM
    speaker: {
      name: 'Alex Johnson',
      avatar: '/placeholder.svg'
    },
    location: 'Virtual',
    tags: ['React', 'Frontend', 'Hooks'],
    description: 'Learn how to use React Hooks effectively in your applications.'
  },
  {
    id: '2',
    title: 'GraphQL vs REST',
    date: new Date(2025, 3, 18, 15, 30), // April 18, 2025, 3:30 PM
    speaker: {
      name: 'Samantha Chen',
      avatar: '/placeholder.svg'
    },
    location: 'Main Auditorium',
    tags: ['API', 'GraphQL', 'REST'],
    description: 'A comparison between GraphQL and REST API approaches.'
  },
  {
    id: '3',
    title: 'Building Scalable Microservices',
    date: new Date(2025, 3, 22, 11, 0), // April 22, 2025, 11:00 AM
    speaker: {
      name: 'Michael Roberts',
      avatar: '/placeholder.svg'
    },
    location: 'Virtual',
    tags: ['Microservices', 'Architecture', 'Scaling'],
    description: 'Strategies for building and scaling microservices architecture.'
  },
  {
    id: '4',
    title: 'AI in Product Development',
    date: new Date(2025, 3, 28, 16, 0), // April 28, 2025, 4:00 PM
    speaker: {
      name: 'Emily Wong',
      avatar: '/placeholder.svg'
    },
    location: 'Innovation Lab',
    tags: ['AI', 'Product Development'],
    description: 'Exploring how AI is transforming the product development lifecycle.'
  }
];

// Mock past talks
const mockPastTalks = [
  {
    id: '5',
    title: 'DevOps Best Practices',
    date: new Date(2025, 2, 20, 13, 0), // March 20, 2025, 1:00 PM
    speaker: {
      name: 'David Lee',
      avatar: '/placeholder.svg'
    },
    location: 'Virtual',
    tags: ['DevOps', 'CI/CD', 'Automation'],
    description: 'Learn the best practices for implementing DevOps in your organization.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  },
  {
    id: '6',
    title: 'Web3 and the Future of the Internet',
    date: new Date(2025, 2, 15, 16, 0), // March 15, 2025, 4:00 PM
    speaker: {
      name: 'Jessica Martinez',
      avatar: '/placeholder.svg'
    },
    location: 'Main Auditorium',
    tags: ['Web3', 'Blockchain', 'Future Tech'],
    description: 'An exploration of Web3 technologies and how they might shape the future internet.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  }
];

const UpcomingTalksPage: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to calendar view
  const goToCalendarView = () => {
    navigate('/talks');
  };

  // Navigate to propose talk page
  const goToProposeTalk = () => {
    navigate('/talks/new');
  };
  
  // Navigate to talk detail
  const goToTalkDetail = (id: string) => {
    navigate(`/talks/${id}`);
  };
  
  // Navigate to archive
  const goToArchive = () => {
    navigate('/talks/archive');
  };

  return (
    <AppLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Tech Talks</h1>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search talks, speakers..."
                className="pl-10 pr-4 py-2 w-64 rounded-md bg-black/40 border border-arc-accent/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-arc-accent"
              />
            </div>
            
            {/* View Toggle */}
            <div className="bg-black/40 rounded-md border border-arc-accent/30 p-1 flex">
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-400 hover:text-white" onClick={goToCalendarView}>
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 bg-arc-accent/20 text-white">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </Button>
            </div>
            
            {/* Propose Talk Button */}
            <Button onClick={goToProposeTalk} className="bg-arc-accent hover:bg-arc-accent/80 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Propose a Talk</span>
            </Button>
          </div>
        </div>
        
        {/* Upcoming Talks Section */}
        <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">Upcoming Talks</h2>
          
          <div className="space-y-4">
            {mockTalks.length > 0 ? (
              mockTalks.map(talk => (
                <TalkCard 
                  key={talk.id} 
                  talk={talk} 
                  onClick={() => goToTalkDetail(talk.id)} 
                />
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 mb-4">No upcoming talks scheduled.</p>
                <Button 
                  variant="outline" 
                  className="text-arc-accent hover:bg-arc-accent/20"
                  onClick={goToProposeTalk}
                >
                  Propose a Tech Talk
                </Button>
              </div>
            )}
          </div>
        </div>
        
        {/* Past Talks Preview Section */}
        <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Recent Past Talks</h2>
            <Button 
              variant="ghost" 
              className="text-arc-accent hover:bg-arc-accent/20"
              onClick={goToArchive}
            >
              View All Archives
            </Button>
          </div>
          
          <div className="space-y-4">
            {mockPastTalks.length > 0 ? (
              mockPastTalks.map(talk => (
                <TalkCard 
                  key={talk.id} 
                  talk={talk} 
                  isPast={true} 
                  onClick={() => goToTalkDetail(talk.id)} 
                />
              ))
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-400">No past talks available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default UpcomingTalksPage;
