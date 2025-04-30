
import React, { useState } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Calendar as CalendarIcon, Search, List, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import AppLayout from '@/components/AppLayout';
import { useNavigate } from 'react-router-dom';
import TalkEventPopover from '@/components/talks/TalkEventPopover';

// Mock data for tech talks
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

const TalksCalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTalk, setSelectedTalk] = useState<any | null>(null);
  const navigate = useNavigate();

  // Filter talks for the selected date
  const talksOnDate = (date: Date | undefined) => {
    if (!date) return [];
    return mockTalks.filter(talk => 
      talk.date.getDate() === date.getDate() &&
      talk.date.getMonth() === date.getMonth() &&
      talk.date.getFullYear() === date.getFullYear()
    );
  };

  // Handler for date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    const talks = talksOnDate(date);
    if (talks.length > 0) {
      setSelectedTalk(talks[0]);
    } else {
      setSelectedTalk(null);
    }
  };

  // Handler for month navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setDate(prev => direction === 'prev' ? subMonths(prev, 1) : addMonths(prev, 1));
  };

  // Navigate to list view
  const goToListView = () => {
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
              <Button variant="ghost" size="sm" className="flex items-center gap-2 bg-arc-accent/20 text-white">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Calendar</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-gray-400 hover:text-white" onClick={goToListView}>
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
        
        {/* Calendar Section */}
        <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">{format(date, 'MMMM yyyy')}</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigateMonth('prev')}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => navigateMonth('next')}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          {/* Calendar Component with Event Indicators */}
          <div className="pointer-events-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={date}
              onMonthChange={setDate}
              className="p-3 pointer-events-auto"
              modifiers={{
                event: (date) => {
                  return mockTalks.some(talk => 
                    talk.date.getDate() === date.getDate() &&
                    talk.date.getMonth() === date.getMonth() &&
                    talk.date.getFullYear() === date.getFullYear()
                  );
                },
              }}
              modifiersStyles={{
                event: {
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'var(--accent)',
                  position: 'relative',
                },
              }}
            />
          </div>
          
          {/* Event Detail Popover */}
          {selectedTalk && (
            <div className="mt-6 p-4 bg-muted rounded-md border border-arc-accent/30">
              <TalkEventPopover talk={selectedTalk} />
            </div>
          )}
          
          {/* Empty State */}
          {!selectedTalk && selectedDate && (
            <div className="mt-6 p-4 bg-muted rounded-md border border-arc-accent/30 text-center">
              <p className="text-gray-400">No talks scheduled for this date.</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2 text-arc-accent hover:bg-arc-accent/20"
                onClick={goToProposeTalk}
              >
                Propose a talk for this date
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default TalksCalendarPage;
