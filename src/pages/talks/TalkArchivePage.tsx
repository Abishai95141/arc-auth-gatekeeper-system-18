
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/AppLayout';
import TalkCard from '@/components/talks/TalkCard';

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
  },
  {
    id: '7',
    title: 'Machine Learning for Beginners',
    date: new Date(2025, 1, 25, 14, 30), // February 25, 2025, 2:30 PM
    speaker: {
      name: 'Robert Chang',
      avatar: '/placeholder.svg'
    },
    location: 'Virtual',
    tags: ['Machine Learning', 'AI', 'Data Science'],
    description: 'An introduction to machine learning concepts and applications.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  },
  {
    id: '8',
    title: 'Modern CSS Techniques',
    date: new Date(2025, 1, 18, 11, 0), // February 18, 2025, 11:00 AM
    speaker: {
      name: 'Sarah Wilson',
      avatar: '/placeholder.svg'
    },
    location: 'Main Auditorium',
    tags: ['CSS', 'Web Development', 'Frontend'],
    description: 'Explore modern CSS techniques for building responsive web applications.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  },
  {
    id: '9',
    title: 'Cybersecurity Fundamentals',
    date: new Date(2025, 1, 10, 15, 0), // February 10, 2025, 3:00 PM
    speaker: {
      name: 'James Harris',
      avatar: '/placeholder.svg'
    },
    location: 'Virtual',
    tags: ['Cybersecurity', 'InfoSec', 'Security'],
    description: 'Learn fundamental principles of cybersecurity and best practices.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  },
  {
    id: '10',
    title: 'The Future of Cloud Computing',
    date: new Date(2025, 0, 28, 14, 0), // January 28, 2025, 2:00 PM
    speaker: {
      name: 'Patricia Miller',
      avatar: '/placeholder.svg'
    },
    location: 'Innovation Lab',
    tags: ['Cloud', 'Infrastructure', 'Future Tech'],
    description: 'Exploring trends and innovations in cloud computing.',
    recording: 'https://example.com/recording',
    slides: 'https://example.com/slides'
  }
];

const TalkArchivePage: React.FC = () => {
  const navigate = useNavigate();

  // Navigate to talk detail
  const goToTalkDetail = (id: string) => {
    navigate(`/talks/${id}`);
  };

  // Navigate back to upcoming talks
  const goToUpcomingTalks = () => {
    navigate('/talks/upcoming');
  };

  // Navigate to propose talk page
  const goToProposeTalk = () => {
    navigate('/talks/new');
  };

  return (
    <AppLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Tech Talks Archive</h1>
            <p className="text-gray-400 mt-1">Past talks with recordings and resources</p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search archives..."
                className="pl-10 pr-4 py-2 w-64 rounded-md bg-black/40 border border-arc-accent/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-arc-accent"
              />
            </div>
            
            {/* Back to Upcoming Button */}
            <Button 
              variant="outline" 
              className="text-white"
              onClick={goToUpcomingTalks}
            >
              View Upcoming Talks
            </Button>
            
            {/* Propose Talk Button */}
            <Button onClick={goToProposeTalk} className="bg-arc-accent hover:bg-arc-accent/80 text-white flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Propose a Talk</span>
            </Button>
          </div>
        </div>
        
        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="secondary" size="sm" className="bg-accent/20 text-white hover:bg-accent/30">
            All Topics
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            Frontend
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            Backend
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            DevOps
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            AI & ML
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            Security
          </Button>
          <Button variant="outline" size="sm" className="text-white hover:bg-accent/20">
            Cloud
          </Button>
        </div>
        
        {/* Past Talks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPastTalks.map(talk => (
            <div 
              key={talk.id} 
              className="bg-black/40 rounded-lg border border-arc-accent/30 shadow-lg backdrop-blur-sm overflow-hidden hover:border-arc-accent transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="aspect-video bg-black/60 relative flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <Button variant="ghost" className="text-white hover:text-arc-accent z-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
                  </svg>
                </Button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="font-semibold text-lg line-clamp-1">{talk.title}</h3>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-8 w-8 rounded-full bg-arc-accent/20 overflow-hidden">
                    <img src={talk.speaker.avatar} alt={talk.speaker.name} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{talk.speaker.name}</p>
                    <p className="text-gray-400 text-xs">{format(talk.date, 'MMMM d, yyyy')}</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {talk.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-xs bg-arc-accent/20 text-arc-accent px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                  {talk.tags.length > 2 && (
                    <span className="text-xs bg-arc-accent/10 text-arc-accent/70 px-2 py-0.5 rounded">
                      +{talk.tags.length - 2}
                    </span>
                  )}
                </div>
                
                <div className="flex space-x-2 mt-4">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="flex-1 bg-arc-accent/20 hover:bg-arc-accent/30"
                    onClick={() => goToTalkDetail(talk.id)}
                  >
                    Watch Recording
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => goToTalkDetail(talk.id)}
                  >
                    View Slides
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State (shown if no past talks) */}
        {mockPastTalks.length === 0 && (
          <div className="text-center py-16 bg-black/40 rounded-lg border border-arc-accent/30">
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-white mb-2">No archived talks yet</h3>
              <p className="text-gray-400 mb-6">Check back after some upcoming talks have taken place.</p>
              <Button 
                className="bg-arc-accent hover:bg-arc-accent/80"
                onClick={goToUpcomingTalks}
              >
                View Upcoming Talks
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default TalkArchivePage;

// Helper function to format dates (similar to date-fns format but simplified)
function format(date: Date, formatStr: string) {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return formatStr
    .replace('MMMM', months[date.getMonth()])
    .replace('d', date.getDate().toString())
    .replace('yyyy', date.getFullYear().toString());
}
