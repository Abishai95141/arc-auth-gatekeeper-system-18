
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, X, Plus, Check } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import AppLayout from '@/components/AppLayout';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const domains = ["AI", "API", "Blockchain", "Community", "Developer Tools", "Edge Computing", "Mobile", "Storage", "UX/UI", "Data Science", "DevOps", "IoT", "Security", "Web3"];

const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domains: [] as string[],
    openToMembers: true,
    visibility: 'public',
    startDate: '',
    endDate: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleDomainToggle = (domain: string) => {
    setFormData(prev => {
      const domains = [...prev.domains];
      if (domains.includes(domain)) {
        return { ...prev, domains: domains.filter(d => d !== domain) };
      } else {
        return { ...prev, domains: [...domains, domain] };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title) {
      toast.error('Project title is required');
      return;
    }
    
    if (!formData.description) {
      toast.error('Project description is required');
      return;
    }
    
    if (formData.domains.length === 0) {
      toast.error('Please select at least one domain');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Project created successfully');
      navigate('/projects/1'); // In a real app, navigate to the newly created project
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-gray-400 hover:text-white"
            onClick={() => navigate('/projects')}
          >
            <ChevronLeft size={24} />
          </Button>
          <h1 className="text-2xl font-bold text-white">Start a New Project</h1>
        </div>
        
        {/* Form Card */}
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Create a new project and invite collaborators to help you build it.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Project Title */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter a descriptive title for your project"
                  className="bg-black/50 border-arc-accent/30 text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-500">
                  A concise and descriptive name that clearly communicates your project's purpose.
                </p>
              </div>
              
              {/* Project Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Project Description <span className="text-red-500">*</span>
                </label>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project, its goals, and what you're hoping to build"
                  rows={5}
                  className="bg-black/50 border-arc-accent/30 text-white placeholder:text-gray-500 resize-none"
                />
                <p className="text-xs text-gray-500">
                  Provide details about your project's purpose, goals, and implementation approach.
                </p>
              </div>
              
              {/* Project Domains */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-200">
                  Project Domains <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain) => (
                    <Badge
                      key={domain}
                      variant={formData.domains.includes(domain) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        formData.domains.includes(domain)
                          ? 'bg-arc-accent text-white'
                          : 'bg-transparent border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20'
                      }`}
                      onClick={() => handleDomainToggle(domain)}
                    >
                      {domain}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  Select all relevant domains that apply to your project (at least one).
                </p>
              </div>
              
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* Project Visibility */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Project Visibility
                  </label>
                  <Select 
                    value={formData.visibility} 
                    onValueChange={(value) => handleSelectChange('visibility', value)}
                  >
                    <SelectTrigger className="bg-black/50 border-arc-accent/30 text-white">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                      <SelectItem value="public" className="focus:bg-arc-accent/20">Public (Everyone)</SelectItem>
                      <SelectItem value="members" className="focus:bg-arc-accent/20">Members Only</SelectItem>
                      <SelectItem value="private" className="focus:bg-arc-accent/20">Private (Invite Only)</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Determine who can view your project.
                  </p>
                </div>
                
                {/* Team Membership */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Team Membership
                  </label>
                  <div className="flex gap-3">
                    <div 
                      className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                        formData.openToMembers 
                          ? 'border-arc-accent bg-arc-accent/20 text-white' 
                          : 'border-gray-700 text-gray-400 hover:border-arc-accent/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, openToMembers: true }))}
                    >
                      <div className="flex items-center">
                        {formData.openToMembers && (
                          <Check size={16} className="mr-1 text-green-400" />
                        )}
                        <span>Open to Join</span>
                      </div>
                    </div>
                    <div 
                      className={`flex-1 flex items-center justify-center p-3 border rounded-md cursor-pointer ${
                        !formData.openToMembers 
                          ? 'border-arc-accent bg-arc-accent/20 text-white' 
                          : 'border-gray-700 text-gray-400 hover:border-arc-accent/30'
                      }`}
                      onClick={() => setFormData(prev => ({ ...prev, openToMembers: false }))}
                    >
                      <div className="flex items-center">
                        {!formData.openToMembers && (
                          <Check size={16} className="mr-1 text-green-400" />
                        )}
                        <span>By Invitation</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Choose whether others can join freely or only by invitation.
                  </p>
                </div>
              </div>
              
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {/* Start Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Project Start Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="bg-black/50 border-arc-accent/30 text-white w-full"
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                
                {/* End Date */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">
                    Estimated Completion Date
                  </label>
                  <div className="relative">
                    <Input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="bg-black/50 border-arc-accent/30 text-white w-full"
                    />
                    <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
                onClick={() => navigate('/projects')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)]"
              >
                {isSubmitting ? 'Creating...' : 'Create Project'}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewProjectPage;
