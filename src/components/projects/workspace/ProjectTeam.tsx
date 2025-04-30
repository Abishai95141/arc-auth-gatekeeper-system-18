
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from '@/components/ui/sonner';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface ProjectTeamProps {
  team: TeamMember[];
  isTeamLead: boolean;
}

const ProjectTeam: React.FC<ProjectTeamProps> = ({ team, isTeamLead }) => {
  const [members, setMembers] = useState(team);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ sender: string, content: string, timestamp: Date }[]>([]);
  
  const roles = ['Team Lead', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'ML Engineer', 'QA Engineer', 'DevOps'];
  
  const handleRoleChange = (memberId: string, newRole: string) => {
    const updatedMembers = members.map(member => 
      member.id === memberId ? { ...member, role: newRole } : member
    );
    setMembers(updatedMembers);
    toast.success(`Role updated to ${newRole}`);
  };
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    setMessages([...messages, {
      sender: 'You',
      content: message,
      timestamp: new Date()
    }]);
    setMessage('');
    
    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        sender: members[0].name,
        content: 'Thanks for your message! I'll check this out soon.',
        timestamp: new Date()
      }]);
    }, 1500);
  };
  
  const handleBookMentorship = () => {
    toast.success('Mentorship session booked successfully!');
    setIsBookingOpen(false);
  };
  
  return (
    <div className="space-y-6">
      {/* Team Members List */}
      <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Project team and their roles</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {members.map((member) => (
              <div 
                key={member.id} 
                className="flex items-center justify-between p-3 rounded-lg border border-arc-accent/10 bg-black/30 hover:bg-black/50 transition-colors"
              >
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 border border-arc-accent/30">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="font-medium text-white">{member.name}</p>
                    {member.role === 'Team Lead' ? (
                      <Badge className="mt-1 bg-arc-accent/20 text-arc-accent">Team Lead</Badge>
                    ) : (
                      <p className="text-sm text-gray-400">{member.role}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {/* Role selector (only for team lead) */}
                  {isTeamLead && member.role !== 'Team Lead' && (
                    <Select 
                      value={member.role}
                      onValueChange={(value) => handleRoleChange(member.id, value)}
                    >
                      <SelectTrigger className="w-[180px] bg-black/40 border-arc-accent/30 h-8 text-sm">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                        {roles.filter(r => r !== 'Team Lead').map((role) => (
                          <SelectItem key={role} value={role} className="focus:bg-arc-accent/20">
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-arc-accent/20 h-8 w-8">
                    <MessageSquare size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Communication Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Team Chat</CardTitle>
            <CardDescription>Send a message to all team members</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light flex items-center justify-center gap-2"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageSquare size={18} />
              Open Team Chat
            </Button>
          </CardContent>
        </Card>
        
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Book a Mentorship Session</CardTitle>
            <CardDescription>Get guidance from project ambassadors</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full border border-arc-accent/30 bg-arc-accent/20 text-white hover:bg-arc-accent/40 flex items-center justify-center gap-2"
              onClick={() => setIsBookingOpen(true)}
            >
              <Calendar size={18} />
              Schedule Session
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Team Chat Dialog */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogContent className="bg-black/95 border-arc-accent/30 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle>Team Chat</DialogTitle>
            <DialogDescription className="text-gray-400">
              Communicate with your team members
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="h-[300px] overflow-y-auto border border-arc-accent/20 rounded-md p-3 bg-black/40">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-gray-500 text-center">
                  <div>
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((msg, index) => (
                    <div 
                      key={index} 
                      className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === 'You' 
                          ? 'bg-arc-accent/30 text-white' 
                          : 'bg-gray-700/30 text-gray-200'
                      }`}>
                        <p className="text-sm font-medium">{msg.sender}</p>
                        <p className="mt-1">{msg.content}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button 
                onClick={handleSendMessage} 
                className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
              >
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Mentorship Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="bg-black/95 border-arc-accent/30 text-white">
          <DialogHeader>
            <DialogTitle>Book a Mentorship Session</DialogTitle>
            <DialogDescription className="text-gray-400">
              Schedule time with a project ambassador for guidance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Mentor selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Select Mentor</label>
              <Select defaultValue="ambassador1">
                <SelectTrigger className="w-full bg-black/40 border-arc-accent/30">
                  <SelectValue placeholder="Select a mentor" />
                </SelectTrigger>
                <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                  <SelectItem value="ambassador1" className="focus:bg-arc-accent/20">
                    Michael Chen - Senior Developer
                  </SelectItem>
                  <SelectItem value="ambassador2" className="focus:bg-arc-accent/20">
                    Jessica Wong - Product Lead
                  </SelectItem>
                  <SelectItem value="ambassador3" className="focus:bg-arc-accent/20">
                    David Park - ML Specialist
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Date selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Select Date</label>
              <input 
                type="date" 
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {/* Time selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Select Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'].map((time) => (
                  <Button
                    key={time}
                    variant="outline"
                    className="border-arc-accent/30 bg-transparent hover:bg-arc-accent/20"
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Discussion topic */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Discussion Topic</label>
              <textarea
                placeholder="Briefly describe what you'd like to discuss..."
                rows={3}
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500 resize-none"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsBookingOpen(false)}
              className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookMentorship}
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
            >
              Book Session
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectTeam;
