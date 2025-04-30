
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Mic, FileText, Clock, Users, ChevronLeft, X, Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import AppLayout from '@/components/AppLayout';
import { cn } from '@/lib/utils';

const availableSlots = [
  { id: '1', date: new Date(2025, 3, 20), times: ['10:00', '14:00', '16:00'] },
  { id: '2', date: new Date(2025, 3, 22), times: ['11:00', '15:30'] },
  { id: '3', date: new Date(2025, 3, 25), times: ['09:00', '13:30', '16:30'] },
  { id: '4', date: new Date(2025, 3, 28), times: ['10:30', '14:30'] },
];

// Predefined list of topic tags
const topicTags = [
  'Frontend', 'Backend', 'DevOps', 'AI', 'Machine Learning', 'Security',
  'Cloud', 'Architecture', 'Mobile', 'UI/UX', 'Blockchain', 'Web3',
  'React', 'Node.js', 'Python', 'Docker', 'Kubernetes', 'AWS',
  'TypeScript', 'Database', 'GraphQL', 'Testing', 'Agile', 'Career'
];

const ProposeTalkPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [bio, setBio] = useState('');
  const [coSpeakers, setCoSpeakers] = useState<{name: string, email: string}[]>([]);
  const [newCoSpeakerName, setNewCoSpeakerName] = useState('');
  const [newCoSpeakerEmail, setNewCoSpeakerEmail] = useState('');
  
  // Available times for the selected date
  const availableTimes = date
    ? availableSlots.find(slot => 
        slot.date.getDate() === date.getDate() && 
        slot.date.getMonth() === date.getMonth() && 
        slot.date.getFullYear() === date.getFullYear())?.times || []
    : [];
  
  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // Add co-speaker
  const addCoSpeaker = () => {
    if (newCoSpeakerName && newCoSpeakerEmail) {
      setCoSpeakers([...coSpeakers, { name: newCoSpeakerName, email: newCoSpeakerEmail }]);
      setNewCoSpeakerName('');
      setNewCoSpeakerEmail('');
    }
  };
  
  // Remove co-speaker
  const removeCoSpeaker = (index: number) => {
    setCoSpeakers(coSpeakers.filter((_, i) => i !== index));
  };
  
  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !abstract || !date || !timeSlot || !bio) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    // Submit form
    toast({
      title: "Talk proposal submitted!",
      description: "Your proposal has been received and is under review."
    });
    
    // Redirect to calendar page
    setTimeout(() => {
      navigate('/talks');
    }, 1500);
  };
  
  // Save draft
  const saveDraft = () => {
    toast({
      title: "Draft saved",
      description: "Your talk proposal has been saved as a draft."
    });
  };
  
  // Cancel and go back
  const cancelProposal = () => {
    navigate('/talks');
  };

  return (
    <AppLayout>
      <div className="p-8 animate-fade-in">
        <div className="flex items-center mb-8 gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white"
            onClick={cancelProposal}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-white">Propose a Tech Talk</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {/* Talk Information Section */}
            <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <Mic className="h-5 w-5 text-arc-accent mr-2" />
                <h2 className="text-xl font-semibold text-white">Talk Information</h2>
              </div>
              
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    Talk Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                    placeholder="Enter a concise, descriptive title"
                    required
                  />
                </div>
                
                {/* Abstract */}
                <div>
                  <label htmlFor="abstract" className="block text-sm font-medium text-gray-300 mb-1">
                    Abstract <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                    placeholder="Describe your talk and what attendees will learn"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-400 mt-1">Aim for 100-300 words that clearly explain the talk's purpose and key takeaways.</p>
                </div>
                
                {/* Topic Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Topic Tags <span className="text-gray-400 text-xs">(select up to 5)</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {topicTags.map(tag => (
                      <Badge 
                        key={tag}
                        className={cn(
                          "cursor-pointer",
                          selectedTags.includes(tag) 
                            ? "bg-arc-accent hover:bg-arc-accent/80" 
                            : "bg-black/40 hover:bg-black/60"
                        )}
                        onClick={() => toggleTag(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Scheduling Section */}
            <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <Clock className="h-5 w-5 text-arc-accent mr-2" />
                <h2 className="text-xl font-semibold text-white">Scheduling</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Date Picker */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "MMMM d, yyyy") : <span>Select a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 z-[100]" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                        modifiers={{
                          available: (date) => {
                            return availableSlots.some(slot => 
                              slot.date.getDate() === date.getDate() && 
                              slot.date.getMonth() === date.getMonth() && 
                              slot.date.getFullYear() === date.getFullYear()
                            );
                          },
                        }}
                        modifiersStyles={{
                          available: {
                            fontWeight: 'bold',
                            color: 'var(--accent)',
                          },
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-xs text-gray-400 mt-1">Dates with available slots are highlighted</p>
                </div>
                
                {/* Time Slot Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time Slot <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {availableTimes.length > 0 ? (
                      availableTimes.map(time => (
                        <Button
                          key={time}
                          type="button"
                          variant={timeSlot === time ? "default" : "outline"}
                          className={timeSlot === time ? "bg-arc-accent" : ""}
                          onClick={() => setTimeSlot(time)}
                        >
                          {time}
                        </Button>
                      ))
                    ) : (
                      <p className="text-gray-400 col-span-3">Select a date to see available time slots</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-300">Each talk session is scheduled for 45 minutes including Q&A</p>
              </div>
            </div>
            
            {/* Speaker Information */}
            <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <Users className="h-5 w-5 text-arc-accent mr-2" />
                <h2 className="text-xl font-semibold text-white">Speaker Information</h2>
              </div>
              
              <div className="space-y-6">
                {/* Speaker Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">
                    Speaker Bio <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                    placeholder="Brief professional bio and relevant experience"
                    required
                  ></textarea>
                </div>
                
                {/* Co-Speakers */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Co-Speakers <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  
                  {/* Co-Speaker List */}
                  {coSpeakers.length > 0 && (
                    <div className="mb-4 space-y-2">
                      {coSpeakers.map((speaker, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-black/20 rounded-md border border-arc-accent/20">
                          <div>
                            <p className="text-white font-medium">{speaker.name}</p>
                            <p className="text-gray-400 text-sm">{speaker.email}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => removeCoSpeaker(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Add Co-Speaker Form */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-end">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        value={newCoSpeakerName}
                        onChange={(e) => setNewCoSpeakerName(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                        placeholder="Name"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="email"
                        value={newCoSpeakerEmail}
                        onChange={(e) => setNewCoSpeakerEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                        placeholder="Email"
                      />
                    </div>
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addCoSpeaker}
                        disabled={!newCoSpeakerName || !newCoSpeakerEmail}
                        className="w-full"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Supporting Materials */}
            <div className="bg-black/40 rounded-lg border border-arc-accent/30 p-6 shadow-lg backdrop-blur-sm">
              <div className="flex items-center mb-6">
                <FileText className="h-5 w-5 text-arc-accent mr-2" />
                <h2 className="text-xl font-semibold text-white">Supporting Materials</h2>
              </div>
              
              <div className="space-y-4">
                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slide Deck or Supporting Materials <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-arc-accent/30 rounded-md p-6 text-center">
                    <input
                      type="file"
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-2">
                        <div className="mx-auto h-12 w-12 rounded-full bg-arc-accent/20 flex items-center justify-center">
                          <Plus className="h-6 w-6 text-arc-accent" />
                        </div>
                        <div className="text-sm text-gray-300">
                          <span className="text-arc-accent font-medium">Click to upload</span> or drag and drop
                        </div>
                        <p className="text-xs text-gray-400">
                          PDF, PPTX, or DOC (max. 20MB)
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
                
                {/* External Links */}
                <div>
                  <label htmlFor="links" className="block text-sm font-medium text-gray-300 mb-1">
                    External Resources <span className="text-gray-400 text-xs">(optional)</span>
                  </label>
                  <input
                    id="links"
                    type="text"
                    className="w-full px-4 py-2 rounded-md bg-black/40 border border-arc-accent/30 text-white focus:outline-none focus:ring-2 focus:ring-arc-accent"
                    placeholder="GitHub repo, demo links, or other resources (comma separated)"
                  />
                </div>
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                className="order-1 sm:order-none"
                onClick={cancelProposal}
              >
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                className="bg-arc-accent/20 hover:bg-arc-accent/30"
                onClick={saveDraft}
              >
                Save Draft
              </Button>
              <Button 
                type="submit" 
                className="bg-arc-accent hover:bg-arc-accent/80"
              >
                Submit Proposal
              </Button>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
};

export default ProposeTalkPage;
