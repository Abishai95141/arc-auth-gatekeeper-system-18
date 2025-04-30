
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Clock, Video, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/components/ui/sonner';

interface TalkEventPopoverProps {
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
  };
}

const TalkEventPopover: React.FC<TalkEventPopoverProps> = ({ talk }) => {
  const [isAttending, setIsAttending] = useState(false);
  
  const toggleAttending = () => {
    const newStatus = !isAttending;
    setIsAttending(newStatus);
    
    toast({
      title: newStatus ? "RSVP Confirmed" : "RSVP Cancelled",
      description: newStatus 
        ? "You're now registered for this talk" 
        : "You've cancelled your registration",
      duration: 3000
    });
  };
  
  const addToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: "Event has been added to your calendar",
      duration: 3000
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="md:w-3/4">
        <h3 className="text-xl font-semibold text-white mb-2">{talk.title}</h3>
        
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-8 w-8 border border-arc-accent/30">
            <AvatarImage src={talk.speaker.avatar} alt={talk.speaker.name} />
            <AvatarFallback className="bg-arc-accent/20 text-arc-accent">
              {talk.speaker.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-white">{talk.speaker.name}</span>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-300">
            <Clock className="h-4 w-4 mr-2 text-arc-accent" />
            <span>{format(talk.date, "MMMM d, yyyy 'at' h:mm a")}</span>
          </div>
          
          <div className="flex items-center text-gray-300">
            {talk.location === 'Virtual' ? (
              <Video className="h-4 w-4 mr-2 text-arc-accent" />
            ) : (
              <MapPin className="h-4 w-4 mr-2 text-arc-accent" />
            )}
            <span>{talk.location}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-300 text-sm">{talk.description}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {talk.tags.map(tag => (
            <Badge key={tag} className="bg-arc-accent/20 hover:bg-arc-accent/30 text-arc-accent">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="md:w-1/4 flex flex-col gap-3">
        <Button
          className={isAttending ? "bg-green-600 hover:bg-green-700" : "bg-arc-accent hover:bg-arc-accent/80"}
          onClick={toggleAttending}
        >
          {isAttending ? "Attending" : "RSVP"}
        </Button>
        
        <Button variant="outline" className="text-white" onClick={addToCalendar}>
          Add to Calendar
        </Button>
      </div>
    </div>
  );
};

export default TalkEventPopover;
