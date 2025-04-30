
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/sonner";
import { ArrowLeft, Save, Plus, X } from 'lucide-react';

const NewIdeaPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };
  
  const handleSaveDraft = async () => {
    if (!title) {
      toast.error('Please enter a title for your idea');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would save the draft to your backend
      console.log('Saving draft:', { title, description, tags });
      
      toast.success('Idea saved as draft');
      navigate('/ideas/mine');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save draft');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleSubmitIdea = async () => {
    if (!title) {
      toast.error('Please enter a title for your idea');
      return;
    }
    
    if (!description) {
      toast.error('Please provide a description');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Here you would submit the idea to your backend
      console.log('Submitting idea:', { title, description, tags });
      
      toast.success('Idea submitted for incubation');
      navigate('/ideas');
    } catch (error) {
      console.error(error);
      toast.error('Failed to submit idea');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          className="mb-6 text-gray-400 hover:text-white"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Button>
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">New Idea</h1>
        </div>
        
        <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm animate-fade-in">
          <CardHeader>
            <CardTitle className="text-white">Share Your Vision</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm text-white font-medium">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                id="title"
                placeholder="Give your idea a clear and compelling title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-black/60 border border-arc-accent/30 text-white"
              />
            </div>
            
            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm text-white font-medium">
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Describe your idea in detail. What problem does it solve? Who is it for? How might it work?"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={8}
                className="bg-black/60 border border-arc-accent/30 text-white resize-none"
              />
            </div>
            
            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm text-white font-medium">
                Tags
              </label>
              <div className="flex flex-wrap gap-2 p-2 rounded-md border border-arc-accent/30 bg-black/60">
                {tags.map(tag => (
                  <div key={tag} className="flex items-center space-x-1 text-sm bg-arc-accent/20 text-arc-accent px-2 py-1 rounded-full">
                    <span>{tag}</span>
                    <button 
                      type="button" 
                      onClick={() => handleRemoveTag(tag)}
                      className="text-arc-accent hover:text-white focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <div className="flex">
                  <Input
                    placeholder="Add tag..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagKeyPress}
                    className="border-0 bg-transparent text-white placeholder-gray-500 focus:outline-none focus:ring-0 text-sm w-24 min-w-0"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                    className="text-gray-400 hover:text-white p-0 h-auto"
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>
              <p className="text-xs text-gray-500">Add relevant tags to help others find your idea</p>
            </div>
            
            {/* File Attachments would go here */}
          </CardContent>
          <CardFooter className="flex justify-between border-t border-arc-accent/10 pt-6">
            <Button 
              variant="outline" 
              className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
              onClick={handleSaveDraft}
              disabled={isSubmitting}
            >
              <Save size={16} className="mr-2" />
              Save as Draft
            </Button>
            <Button 
              className="bg-gradient-to-r from-arc-primary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light transition-all duration-300"
              onClick={handleSubmitIdea}
              disabled={isSubmitting}
            >
              Submit for Incubation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AppLayout>
  );
};

export default NewIdeaPage;
