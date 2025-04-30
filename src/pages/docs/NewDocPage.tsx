import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, ChevronDown, Image, Code, FileText, X, Trash, 
  Bold, Italic, Underline, Link as LinkIcon, List, ListOrdered, 
  Save, Eye, Clock, Users, Tag, Check 
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';

// Define block types
type BlockType = 'text' | 'heading' | 'code' | 'image' | 'divider';

interface Block {
  id: string;
  type: BlockType;
  content: string;
  language?: string; // For code blocks
  level?: 1 | 2 | 3; // For headings
}

const generateId = () => `block_${Math.random().toString(36).substr(2, 9)}`;

// Mock user data for co-authors
const users = [
  { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Lead Developer' },
  { id: '2', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=7', role: 'Frontend Engineer' },
  { id: '3', name: 'Sarah Williams', avatar: 'https://i.pravatar.cc/150?img=4', role: 'UX Designer' },
  { id: '4', name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=8', role: 'Backend Developer' },
  { id: '5', name: 'Emma Thompson', avatar: 'https://i.pravatar.cc/150?img=11', role: 'Product Manager' },
];

// Available templates
const templates = [
  { id: 'template_1', name: 'Blank Document', description: 'Start with a clean slate' },
  { id: 'template_2', name: 'Tutorial Template', description: 'Step-by-step guide structure' },
  { id: 'template_3', name: 'API Documentation', description: 'Structure for documenting APIs' },
  { id: 'template_4', name: 'Q&A Format', description: 'Question and answer format' },
];

// Available categories/tags
const availableTags = [
  'React', 'Vue', 'Angular', 'JavaScript', 'TypeScript', 'CSS', 'HTML', 'Node.js',
  'API', 'Database', 'UI/UX', 'Testing', 'DevOps', 'Mobile', 'Backend', 'Frontend'
];

const NewDocPage: React.FC = () => {
  const { toast } = useToast();
  const [blocks, setBlocks] = useState<Block[]>([
    { id: generateId(), type: 'heading', content: 'Untitled Document', level: 1 },
    { id: generateId(), type: 'text', content: 'Start writing your document here...' }
  ]);
  
  const [title, setTitle] = useState('Untitled Document');
  const [docType, setDocType] = useState('Tutorial');
  const [selectedTemplate, setSelectedTemplate] = useState('template_1');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [coAuthors, setCoAuthors] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [isAutosaving, setIsAutosaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);

  // Add a new block after the given block ID
  const addBlockAfter = (blockId: string, type: BlockType) => {
    const blockIndex = blocks.findIndex(b => b.id === blockId);
    if (blockIndex === -1) return;

    const newBlock: Block = {
      id: generateId(),
      type,
      content: '',
      ...(type === 'heading' ? { level: 2 } : {}),
      ...(type === 'code' ? { language: 'javascript' } : {})
    };

    const updatedBlocks = [...blocks];
    updatedBlocks.splice(blockIndex + 1, 0, newBlock);
    setBlocks(updatedBlocks);
    
    // Trigger autosave
    triggerAutosave();
  };

  // Update a block's content
  const updateBlockContent = (blockId: string, content: string) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, content } : block
    ));
    
    const currentBlock = blocks.find(block => block.id === blockId);
    if (currentBlock && currentBlock.type === 'heading' && currentBlock.level === 1) {
      setTitle(content);
    }
    
    // Trigger autosave
    triggerAutosave();
  };

  // Remove a block
  const removeBlock = (blockId: string) => {
    // Don't remove if it's the only block left
    if (blocks.length <= 1) return;
    
    setBlocks(blocks.filter(block => block.id !== blockId));
    
    // Trigger autosave
    triggerAutosave();
  };

  // Change block type
  const changeBlockType = (blockId: string, newType: BlockType) => {
    setBlocks(blocks.map(block => 
      block.id === blockId 
        ? { ...block, type: newType, ...(newType === 'heading' ? { level: 2 } : {}) } 
        : block
    ));
    
    // Trigger autosave
    triggerAutosave();
  };

  // Handle tag selection
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // Handle co-author selection
  const toggleCoAuthor = (userId: string) => {
    if (coAuthors.includes(userId)) {
      setCoAuthors(coAuthors.filter(id => id !== userId));
    } else {
      setCoAuthors([...coAuthors, userId]);
    }
  };

  // Get selected co-authors with their details
  const getSelectedCoAuthors = () => {
    return users.filter(user => coAuthors.includes(user.id));
  };

  // Change heading level
  const changeHeadingLevel = (blockId: string, level: 1 | 2 | 3) => {
    setBlocks(blocks.map(block => 
      block.id === blockId && block.type === 'heading' 
        ? { ...block, level } 
        : block
    ));
    
    // Trigger autosave
    triggerAutosave();
  };

  // Change code language
  const changeCodeLanguage = (blockId: string, language: string) => {
    setBlocks(blocks.map(block => 
      block.id === blockId && block.type === 'code' 
        ? { ...block, language } 
        : block
    ));
    
    // Trigger autosave
    triggerAutosave();
  };

  // Autosave functionality
  const triggerAutosave = () => {
    setIsAutosaving(true);
    
    setTimeout(() => {
      setIsAutosaving(false);
      toast({
        title: "Draft saved",
        description: "Your document has been saved as a draft",
      });
    }, 800);
  };

  // Handle publish
  const handlePublish = () => {
    setIsPublishing(true);
    
    setTimeout(() => {
      setIsPublishing(false);
      toast({
        title: "Document published!",
        description: "Your document has been successfully published",
      });
      // In a real application, we would redirect to the published doc
    }, 1500);
  };

  // Load a template
  const loadTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
    
    // For demonstration, we'll just set up a simple template structure
    if (templateId === 'template_2') { // Tutorial template
      setBlocks([
        { id: generateId(), type: 'heading', content: 'Tutorial Title', level: 1 },
        { id: generateId(), type: 'text', content: 'Introduction and overview of what this tutorial covers...' },
        { id: generateId(), type: 'heading', content: 'Prerequisites', level: 2 },
        { id: generateId(), type: 'text', content: 'List what the reader should know before starting...' },
        { id: generateId(), type: 'heading', content: 'Step 1', level: 2 },
        { id: generateId(), type: 'text', content: 'Instructions for the first step...' },
        { id: generateId(), type: 'code', content: '// Example code here', language: 'javascript' },
      ]);
    } else if (templateId === 'template_3') { // API Documentation
      setBlocks([
        { id: generateId(), type: 'heading', content: 'API Documentation', level: 1 },
        { id: generateId(), type: 'text', content: 'Overview of the API and its purpose...' },
        { id: generateId(), type: 'heading', content: 'Authentication', level: 2 },
        { id: generateId(), type: 'text', content: 'How to authenticate with the API...' },
        { id: generateId(), type: 'heading', content: 'Endpoints', level: 2 },
        { id: generateId(), type: 'heading', content: 'GET /resource', level: 3 },
        { id: generateId(), type: 'text', content: 'Description of this endpoint...' },
        { id: generateId(), type: 'code', content: 'fetch("https://api.example.com/resource")', language: 'javascript' },
      ]);
    } else if (templateId === 'template_4') { // Q&A Format
      setBlocks([
        { id: generateId(), type: 'heading', content: 'Frequently Asked Questions', level: 1 },
        { id: generateId(), type: 'text', content: 'Introduction to this Q&A document...' },
        { id: generateId(), type: 'heading', content: 'Question 1?', level: 2 },
        { id: generateId(), type: 'text', content: 'Answer to the first question...' },
        { id: generateId(), type: 'heading', content: 'Question 2?', level: 2 },
        { id: generateId(), type: 'text', content: 'Answer to the second question...' },
      ]);
    } else {
      // Blank template
      setBlocks([
        { id: generateId(), type: 'heading', content: 'Untitled Document', level: 1 },
        { id: generateId(), type: 'text', content: 'Start writing your document here...' }
      ]);
    }
    
    // Update title based on first heading
    setTitle(blocks[0].content);
    
    toast({
      title: "Template loaded",
      description: `Template "${templates.find(t => t.id === templateId)?.name}" has been applied`,
    });
  };

  // Render a single block in edit mode
  const renderEditableBlock = (block: Block) => {
    const isActive = selectedBlock === block.id;
    
    switch (block.type) {
      case 'heading':
        return (
          <div 
            className={`relative group mb-4 ${isActive ? 'ring-2 ring-arc-accent rounded-md' : ''}`}
            onClick={() => setSelectedBlock(block.id)}
          >
            {isActive && (
              <div className="absolute -left-10 top-1/2 transform -translate-y-1/2 flex flex-col space-y-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => changeHeadingLevel(block.id, 1)}
                      >
                        <span className="text-xs font-bold">H1</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Heading 1</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => changeHeadingLevel(block.id, 2)}
                      >
                        <span className="text-xs font-bold">H2</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Heading 2</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => changeHeadingLevel(block.id, 3)}
                      >
                        <span className="text-xs font-bold">H3</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Heading 3</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            
            <div className={`${block.level === 1 ? 'text-3xl' : block.level === 2 ? 'text-2xl' : 'text-xl'} font-bold mb-2`}>
              <Input
                value={block.content}
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                className="border-0 bg-transparent p-0 focus-visible:ring-0 font-bold"
                placeholder={`Heading ${block.level}`}
              />
            </div>
            
            {isActive && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => removeBlock(block.id)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'text':
        return (
          <div 
            className={`relative group mb-4 ${isActive ? 'ring-2 ring-arc-accent rounded-md' : ''}`}
            onClick={() => setSelectedBlock(block.id)}
          >
            {isActive && (
              <div className="absolute -left-10 top-4 flex flex-col space-y-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {}}
                      >
                        <Bold size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Bold</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {}}
                      >
                        <Italic size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Italic</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => {}}
                      >
                        <LinkIcon size={14} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p>Add Link</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
            
            <Textarea
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
              className="min-h-[100px] border-0 bg-transparent p-0 focus-visible:ring-0"
              placeholder="Start writing..."
            />
            
            {isActive && (
              <div className="absolute right-0 top-4 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => changeBlockType(block.id, 'code')}
                >
                  <Code size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => changeBlockType(block.id, 'heading')}
                >
                  <span className="text-xs font-bold">H</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0"
                  onClick={() => removeBlock(block.id)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'code':
        return (
          <div 
            className={`relative group mb-4 ${isActive ? 'ring-2 ring-arc-accent rounded-md' : ''}`}
            onClick={() => setSelectedBlock(block.id)}
          >
            {isActive && (
              <div className="absolute -left-10 top-4">
                <Select
                  value={block.language}
                  onValueChange={(value) => changeCodeLanguage(block.id, value)}
                >
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="bash">Bash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="bg-black rounded-lg p-4 overflow-x-auto border border-gray-700">
              <Textarea
                value={block.content}
                onChange={(e) => updateBlockContent(block.id, e.target.value)}
                className="min-h-[100px] font-mono text-sm border-0 bg-transparent p-0 focus-visible:ring-0 text-gray-300"
                placeholder="// Enter code here"
              />
            </div>
            
            {isActive && (
              <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-black/50"
                  onClick={() => changeBlockType(block.id, 'text')}
                >
                  <FileText size={14} />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-black/50"
                  onClick={() => removeBlock(block.id)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            )}
          </div>
        );
        
      case 'image':
        return (
          <div 
            className={`relative group mb-4 ${isActive ? 'ring-2 ring-arc-accent rounded-md' : ''}`}
            onClick={() => setSelectedBlock(block.id)}
          >
            <div className="bg-black/30 border-2 border-dashed border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center">
              <Image size={32} className="text-gray-500 mb-2" />
              <p className="text-gray-400 mb-2">Click to upload an image</p>
              <p className="text-gray-500 text-sm">SVG, PNG, JPG or GIF (max. 2MB)</p>
              <Input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  // In a real app, we'd handle file upload here
                  console.log('File selected:', e.target.files?.[0]);
                }}
              />
              <Button variant="outline" size="sm" className="mt-4">
                Browse Files
              </Button>
            </div>
            
            {isActive && (
              <div className="absolute right-2 top-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-black/50"
                  onClick={() => removeBlock(block.id)}
                >
                  <Trash size={14} />
                </Button>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // Render block in preview mode
  const renderPreviewBlock = (block: Block) => {
    switch (block.type) {
      case 'heading':
        return block.level === 1 ? (
          <h1 key={block.id} className="text-3xl font-bold text-white mb-4">{block.content}</h1>
        ) : block.level === 2 ? (
          <h2 key={block.id} className="text-2xl font-bold text-white mb-3">{block.content}</h2>
        ) : (
          <h3 key={block.id} className="text-xl font-bold text-white mb-2">{block.content}</h3>
        );
        
      case 'text':
        return (
          <p key={block.id} className="text-gray-200 mb-4 leading-relaxed">{block.content}</p>
        );
        
      case 'code':
        return (
          <div key={block.id} className="mb-6">
            <div className="bg-black rounded-lg p-4 overflow-x-auto border border-gray-700">
              <pre className="text-sm text-gray-300">
                <code>{block.content}</code>
              </pre>
            </div>
          </div>
        );
        
      case 'image':
        return (
          <div key={block.id} className="mb-6">
            <div className="bg-black/30 border-2 border-dashed border-gray-600 rounded-lg p-8 flex flex-col items-center justify-center">
              <p className="text-gray-400">Image placeholder</p>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  // Add block button
  const AddBlockButton = ({ blockId }: { blockId: string }) => (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 -mt-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 w-8 rounded-full p-0 bg-arc-accent/20 border-arc-accent hover:bg-arc-accent/40">
              <Plus size={16} />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid gap-2">
              <h4 className="text-sm font-medium">Add Block</h4>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => addBlockAfter(blockId, 'text')}
              >
                <FileText size={16} className="mr-2" /> Text
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => addBlockAfter(blockId, 'heading')}
              >
                <span className="text-sm font-bold mr-2">H</span> Heading
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => addBlockAfter(blockId, 'code')}
              >
                <Code size={16} className="mr-2" /> Code
              </Button>
              <Button 
                variant="ghost" 
                className="justify-start"
                onClick={() => addBlockAfter(blockId, 'image')}
              >
                <Image size={16} className="mr-2" /> Image
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );

  return (
    <AppLayout>
      <div className="container pb-16 animate-fade-in">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/docs">Docs & Resources</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Document</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header with Tools */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white">Create New Document</h1>
            <div className="flex items-center text-sm text-gray-400 mt-1">
              {isAutosaving ? (
                <span className="flex items-center">
                  <Clock size={14} className="mr-1 animate-pulse" /> Saving...
                </span>
              ) : (
                <span className="flex items-center">
                  <Clock size={14} className="mr-1" /> Last saved just now
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-4 lg:mt-0">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'editor' | 'preview')}>
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  Save Draft
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save as Draft</DialogTitle>
                  <DialogDescription>
                    Your document will be saved as a draft and you can continue editing it later.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-gray-300">
                    Document Title: <strong>{title}</strong>
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    Content: {blocks.length} blocks
                  </p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={triggerAutosave}>Save Draft</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  {isPublishing ? 'Publishing...' : 'Publish'}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Publish Document</DialogTitle>
                  <DialogDescription>
                    Your document will be published and visible to all users.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Title</label>
                    <Input
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter document title"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Document Type</label>
                    <Select value={docType} onValueChange={setDocType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Tutorial">Tutorial</SelectItem>
                        <SelectItem value="Template">Template</SelectItem>
                        <SelectItem value="Q&A">Q&A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Tags</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedTags.map(tag => (
                        <div 
                          key={tag}
                          className="flex items-center bg-arc-accent/20 text-arc-accent/90 text-xs px-2 py-1 rounded-full border border-arc-accent/30"
                        >
                          {tag}
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-4 w-4 p-0 ml-1"
                            onClick={() => toggleTag(tag)}
                          >
                            <X size={12} />
                          </Button>
                        </div>
                      ))}
                      
                      {selectedTags.length < 5 && (
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 text-xs px-2"
                            >
                              <Plus size={12} className="mr-1" /> Add Tag
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-64 max-h-48 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-1">
                              {availableTags
                                .filter(tag => !selectedTags.includes(tag))
                                .map(tag => (
                                  <Button
                                    key={tag}
                                    variant="ghost"
                                    size="sm"
                                    className="justify-start"
                                    onClick={() => toggleTag(tag)}
                                  >
                                    <Tag size={12} className="mr-1" /> {tag}
                                  </Button>
                                ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button onClick={handlePublish}>
                      Publish Document
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Document Metadata */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20">
              <h3 className="font-medium text-white mb-3">Document Template</h3>
              <div className="space-y-2">
                <Select value={selectedTemplate} onValueChange={loadTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-400 mt-1">
                  {templates.find(t => t.id === selectedTemplate)?.description}
                </p>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20">
              <h3 className="font-medium text-white mb-3">Document Settings</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Type</label>
                  <Select value={docType} onValueChange={setDocType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tutorial">Tutorial</SelectItem>
                      <SelectItem value="Template">Template</SelectItem>
                      <SelectItem value="Q&A">Q&A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-300 block mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <div 
                        key={tag}
                        className="flex items-center bg-arc-accent/20 text-arc-accent/90 text-xs px-2 py-1 rounded-full border border-arc-accent/30"
                      >
                        {tag}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-4 w-4 p-0 ml-1"
                          onClick={() => toggleTag(tag)}
                        >
                          <X size={12} />
                        </Button>
                      </div>
                    ))}
                    
                    {selectedTags.length < 5 && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-6 text-xs px-2"
                        onClick={() => {
                          // Simple way to add a tag for this demo
                          const tag = availableTags.find(t => !selectedTags.includes(t));
                          if (tag) toggleTag(tag);
                        }}
                      >
                        <Plus size={12} className="mr-1" /> Add
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20">
              <h3 className="font-medium text-white mb-3">Collaborators</h3>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1">
                  {getSelectedCoAuthors().map(author => (
                    <Avatar key={author.id} className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-arc-accent" onClick={() => toggleCoAuthor(author.id)}>
                      <img src={author.avatar} alt={author.name} title={author.name} />
                    </Avatar>
                  ))}
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                        <Plus size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Collaborators</DialogTitle>
                        <DialogDescription>
                          Select team members to collaborate on this document
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4 space-y-4 max-h-64 overflow-y-auto">
                        {users.map(user => (
                          <div
                            key={user.id}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${coAuthors.includes(user.id) ? 'bg-arc-accent/20' : 'hover:bg-muted'}`}
                            onClick={() => toggleCoAuthor(user.id)}
                          >
                            <Avatar className="h-10 w-10 mr-3">
                              <img src={user.avatar} alt={user.name} />
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{user.name}</p>
                              <p className="text-xs text-gray-400">{user.role}</p>
                            </div>
                            <div className="flex items-center">
                              {coAuthors.includes(user.id) ? (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full bg-arc-accent/20">
                                  <Check size={16} />
                                </Button>
                              ) : (
                                <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full">
                                  <Plus size={16} />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => {}}>
                          Done
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                
                <div>
                  <p className="text-xs text-gray-400">
                    {getSelectedCoAuthors().length === 0
                      ? 'No collaborators added'
                      : `${getSelectedCoAuthors().length} collaborator${getSelectedCoAuthors().length === 1 ? '' : 's'}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Editor Area */}
          <div className="flex-1">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg border border-arc-accent/10 min-h-[600px]">
              <div className="p-6">
                {activeTab === 'editor' ? (
                  <div className="space-y-1">
                    {blocks.map((block, index) => (
                      <div key={block.id} className="relative group">
                        {renderEditableBlock(block)}
                        <AddBlockButton blockId={block.id} />
                      </div>
                    ))}
                    
                    {/* Add new block at end button */}
                    <div className="flex justify-center mt-8">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline">
                            <Plus size={16} className="mr-2" /> Add Block
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-64">
                          <div className="grid gap-2">
                            <h4 className="text-sm font-medium">Add Block</h4>
                            <Button 
                              variant="ghost" 
                              className="justify-start"
                              onClick={() => addBlockAfter(blocks[blocks.length - 1].id, 'text')}
                            >
                              <FileText size={16} className="mr-2" /> Text
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="justify-start"
                              onClick={() => addBlockAfter(blocks[blocks.length - 1].id, 'heading')}
                            >
                              <span className="text-sm font-bold mr-2">H</span> Heading
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="justify-start"
                              onClick={() => addBlockAfter(blocks[blocks.length - 1].id, 'code')}
                            >
                              <Code size={16} className="mr-2" /> Code
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="justify-start"
                              onClick={() => addBlockAfter(blocks[blocks.length - 1].id, 'image')}
                            >
                              <Image size={16} className="mr-2" /> Image
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                ) : (
                  // Preview mode
                  <article className="prose prose-lg prose-invert max-w-none">
                    {blocks.map(renderPreviewBlock)}
                  </article>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default NewDocPage;
