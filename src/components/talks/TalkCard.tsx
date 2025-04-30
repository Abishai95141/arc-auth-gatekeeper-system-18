
import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Video, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';

interface TalkCardProps {
  talk: {
    id: string;
    title: string;
    date: Date;
    speaker: {
      name: string;
      avatar: string;
    };
    location: string;
    tags: string[];
    description: string;
    recording?: string;
    slides?: string;
  };
  isPast?: boolean;
  onClick: () => void;
}

const TalkCard: React.FC<TalkCardProps> = ({ talk, isPast = false, onClick }) => {
  const [isAttending, setIsAttending] = React.useState(false);
  
  const toggleAttending = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const newStatus = !isAttending;
    setIsAttending(newStatus);
    
    toast(newStatus ? "RSVP Confirmed" : "RSVP Cancelled", {
      description: newStatus 
        ? "You're now registered for this talk" 
        : "You've cancelled your registration",
      duration: 3000
    });
  };
  
  const addToCalendar = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    toast("Added to Calendar", {
      description: "Event has been added to your calendar",
      duration: 3000
    });
  };
  
  const viewRecording = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };
  
  const viewSlides = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <div 
      className="bg-black/40 rounded-lg border border-arc-accent/30 p-4 shadow-lg backdrop-blur-sm cursor-pointer hover:border-arc-accent transition-all duration-200 hover:scale-[1.01] hover:shadow-arc-accent/20"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          <h3 className="text-xl font-semibold text-white mb-2">{talk.title}</h3>
          
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <Avatar className="h-8 w-8 border border-arc-accent/30">
              <AvatarImage src={talk.speaker.avatar} alt={talk.speaker.name} />
              <AvatarFallback className="bg-arc-accent/20 text-arc-accent">
                {talk.speaker.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-white">{talk.speaker.name}</span>
            
            <div className="flex items-center text-gray-300 text-sm ml-auto">
              <CalendarIcon className="h-4 w-4 mr-1 text-arc-accent" />
              <span>{format(talk.date, 'MMM d, yyyy')}</span>
            </div>
            
            <div className="flex items-center text-gray-300 text-sm">
              <Clock className="h-4 w-4 mr-1 text-arc-accent" />
              <span>{format(talk.date, 'h:mm a')}</span>
            </div>
          </div>
          
          <div className="mb-3 flex items-center text-gray-300 text-sm">
            {talk.location === 'Virtual' ? (
              <>
                <Video className="h-4 w-4 mr-1 text-arc-accent" />
                <span>Virtual Session</span>
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-1 text-arc-accent" />
                <span>{talk.location}</span>
              </>
            )}
          </div>
          
          <div className="mb-3">
            <p className="text-gray-300 text-sm line-clamp-2">{talk.description}</p>
          </div>
          
          <div className="flex flex-wrap gap-1 mb-1">
            {talk.tags.slice(0, 3).map(tag => (
              <Badge key={tag} className="bg-arc-accent/20 hover:bg-arc-accent/30 text-arc-accent text-xs">
                {tag}
              </Badge>
            ))}
            {talk.tags.length > 3 && (
              <Badge className="bg-arc-accent/10 text-arc-accent/70 text-xs">
                +{talk.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
        
        <div className="md:w-1/4 flex flex-col gap-2 justify-center">
          {isPast ? (
            <>
              <Button
                variant="secondary"
                className="bg-arc-accent/20 hover:bg-arc-accent/30"
                onClick={viewRecording}
              >
                Watch Recording
              </Button>
              <Button
                variant="outline"
                className="text-white"
                onClick={viewSlides}
              >
                View Slides
              </Button>
            </>
          ) : (
            <>
              <Button
                className={isAttending ? "bg-green-600 hover:bg-green-700" : "bg-arc-accent hover:bg-arc-accent/80"}
                onClick={toggleAttending}
              >
                {isAttending ? "Attending" : "RSVP"}
              </Button>
              <Button
                variant="outline"
                className="text-white"
                onClick={addToCalendar}
              >
                Add to Calendar
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TalkCard;
