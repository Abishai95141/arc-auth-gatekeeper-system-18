import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, Clock, Star, MessageSquare, Share, Eye, Download, 
  Mail, ChevronRight, ChevronLeft, BookmarkPlus, Edit, ThumbsUp, ThumbsDown, Copy
} from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock document data
const documentDetails = {
  id: '1',
  title: 'Getting Started with React',
  authors: [
    { id: '1', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Lead Developer' },
    { id: '2', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=7', role: 'Frontend Engineer' }
  ],
  type: 'Tutorial',
  publishedAt: '2024-04-25T10:30:00Z',
  updatedAt: '2024-04-27T14:15:00Z',
  tags: ['React', 'Frontend', 'Beginners', 'Web Development'],
  rating: 4.8,
  totalRatings: 58,
  views: 1243,
  endorsements: 48,
  comments: 12,
  sections: [
    {
      id: 's1',
      type: 'heading',
      content: 'Introduction to React',
    },
    {
      id: 's2',
      type: 'text',
      content: 'React is a JavaScript library for building user interfaces. It\'s maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.',
    },
    {
      id: 's3',
      type: 'heading',
      content: 'Setting Up Your Environment',
    },
    {
      id: 's4',
      type: 'text',
      content: 'Before you start, make sure you have Node.js installed on your machine. You can check if Node is installed by running node -v in your terminal. If it\'s not installed, download and install it from the official website.',
    },
    {
      id: 's5',
      type: 'code',
      language: 'bash',
      content: '# Create a new React app using create-react-app\nnpx create-react-app my-app\ncd my-app\nnpm start',
    },
    {
      id: 's6',
      type: 'heading',
      content: 'Creating Your First Component',
    },
    {
      id: 's7',
      type: 'text',
      content: 'React components are the building blocks of React applications. A component is a self-contained module that renders some output. We\'ll start by creating a simple functional component.',
    },
    {
      id: 's8',
      type: 'code',
      language: 'jsx',
      content: 'import React from \'react\';\n\nfunction Greeting(props) {\n  return <h1>Hello, {props.name}!</h1>;\n}\n\nexport default Greeting;',
    },
    {
      id: 's9',
      type: 'text',
      content: 'You can then use this component in your app.js file:',
    },
    {
      id: 's10',
      type: 'code',
      language: 'jsx',
      content: 'import React from \'react\';\nimport Greeting from \'./Greeting\';\n\nfunction App() {\n  return (\n    <div className="App">\n      <Greeting name="World" />\n    </div>\n  );\n}\n\nexport default App;',
    },
    {
      id: 's11',
      type: 'heading',
      content: 'Managing State',
    },
    {
      id: 's12',
      type: 'text',
      content: 'One of the most powerful features of React is its state management. State allows React components to change their output over time in response to user actions, network responses, and anything else.',
    },
    {
      id: 's13',
      type: 'code',
      language: 'jsx',
      content: 'import React, { useState } from \'react\';\n\nfunction Counter() {\n  // Declare a new state variable, which we\\\'ll call "count"\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}',
    },
  ],
  versions: [
    { id: 'v1', date: '2024-04-25', author: 'Jane Smith', description: 'Initial publish' },
    { id: 'v2', date: '2024-04-26', author: 'Mike Johnson', description: 'Added code examples' },
    { id: 'v3', date: '2024-04-27', author: 'Jane Smith', description: 'Fixed typos and improved clarity' },
  ],
  questions: [
    {
      id: 'q1',
      user: { name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=8' },
      date: '2024-04-25',
      question: 'How do I handle API calls in React?',
      answer: 'For API calls in React, you can use the fetch API or libraries like axios. Typically, you would make the API call in a useEffect hook or in a function triggered by user interaction.',
      upvotes: 12,
      downvotes: 1,
    },
    {
      id: 'q2',
      user: { name: 'Sarah Jones', avatar: 'https://i.pravatar.cc/150?img=9' },
      date: '2024-04-26',
      question: 'What is the best practice for managing global state?',
      answer: 'For small to medium applications, React Context API with useReducer can be sufficient. For larger applications, consider using state management libraries like Redux, MobX, or Zustand.',
      upvotes: 8,
      downvotes: 2,
    },
  ],
  relatedDocs: [
    { id: '2', title: 'React Hooks Deep Dive', type: 'Tutorial' },
    { id: '3', title: 'State Management with Context API', type: 'Tutorial' },
    { id: '4', title: 'Performance Optimization in React', type: 'Q&A' },
  ],
  attachments: [
    { name: 'react-cheatsheet.pdf', size: '1.2 MB', type: 'PDF' },
    { name: 'component-examples.zip', size: '3.5 MB', type: 'ZIP' },
  ],
};

// Mock comments
const comments = [
  {
    id: 'c1',
    sectionId: 's8',
    user: { name: 'David Wilson', avatar: 'https://i.pravatar.cc/150?img=10' },
    date: '2024-04-26T12:23:00Z',
    content: 'Great explanation of functional components. It might be worth mentioning React.FC type for TypeScript users.',
    replies: [
      {
        id: 'c1r1',
        user: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=1' },
        date: '2024-04-26T13:45:00Z',
        content: 'Good point, David! I\'ll add that in the next update.',
      }
    ]
  },
  {
    id: 'c2',
    sectionId: 's13',
    user: { name: 'Emma Thompson', avatar: 'https://i.pravatar.cc/150?img=11' },
    date: '2024-04-27T09:17:00Z',
    content: 'This useState example is so clear! Might be good to add a note about the rules of hooks as well.',
    replies: []
  }
];

const DocDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('content');
  const [showComments, setShowComments] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [helpful, setHelpful] = useState<boolean | null>(null);
  
  // Find document with matching ID
  // In a real app, you would fetch this from an API
  const doc = documentDetails; // For demo purposes, we're using the mock data directly
  
  if (!doc) {
    return (
      <AppLayout>
        <div className="container flex flex-col items-center justify-center py-16">
          <FileText className="h-16 w-16 text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Document Not Found</h1>
          <p className="text-gray-400 mb-6">The document you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/docs">Back to Documents</Link>
          </Button>
        </div>
      </AppLayout>
    );
  }
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { 
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };
  
  const handleRating = (rating: number) => {
    setUserRating(rating);
    // In a real app, you would send this rating to the server
    alert(`You rated this document ${rating} stars!`);
  };
  
  const handleHelpful = (isHelpful: boolean) => {
    setHelpful(isHelpful);
    // In a real app, you would send this feedback to the server
  };
  
  const renderDocSection = (section: any) => {
    switch (section.type) {
      case 'heading':
        return (
          <div key={section.id} className="group relative mt-8 mb-4">
            <h2 className="text-2xl font-bold text-white" id={section.id}>{section.content}</h2>
            <button 
              onClick={() => setShowComments(true)} 
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Add comment"
            >
              <MessageSquare size={16} className="text-arc-accent" />
            </button>
          </div>
        );
      case 'text':
        return (
          <div key={section.id} className="group relative my-4">
            <p className="text-gray-200 leading-relaxed">{section.content}</p>
            <button 
              onClick={() => setShowComments(true)} 
              className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Add comment"
            >
              <MessageSquare size={16} className="text-arc-accent" />
            </button>
          </div>
        );
      case 'code':
        return (
          <div key={section.id} className="group relative my-6">
            <div className="bg-black rounded-lg p-4 overflow-x-auto border border-gray-700">
              <pre className="text-sm text-gray-300">
                <code>{section.content}</code>
              </pre>
            </div>
            <button 
              onClick={() => setShowComments(true)} 
              className="absolute -left-8 top-8 opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Add comment"
            >
              <MessageSquare size={16} className="text-arc-accent" />
            </button>
          </div>
        );
      default:
        return null;
    }
  };
  
  const getCommentsBySection = (sectionId: string) => {
    return comments.filter(comment => comment.sectionId === sectionId);
  };
  
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
              <BreadcrumbPage>{doc.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">{doc.title}</h1>
              
              <div className="flex items-center mt-2 flex-wrap gap-2">
                <div className="flex -space-x-2">
                  {doc.authors.map(author => (
                    <HoverCard key={author.id}>
                      <HoverCardTrigger>
                        <Avatar className="h-8 w-8 border-2 border-background">
                          <img src={author.avatar} alt={author.name} />
                        </Avatar>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-60">
                        <div className="flex justify-between space-x-4">
                          <Avatar>
                            <img src={author.avatar} alt={author.name} />
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{author.name}</h4>
                            <p className="text-xs text-muted-foreground">{author.role}</p>
                            <div className="flex items-center pt-2">
                              <Button
                                variant="outline"
                                className="rounded-full text-xs px-3 py-1 h-auto"
                                size="sm"
                              >
                                Follow
                              </Button>
                            </div>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">Updated {formatDate(doc.updatedAt)}</span>
                <div className="flex items-center">
                  <span className="flex items-center text-yellow-400">
                    {Array(5).fill(0).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < Math.round(doc.rating) ? "currentColor" : "none"}
                      />
                    ))}
                  </span>
                  <span className="text-gray-400 text-sm ml-1">({doc.totalRatings})</span>
                </div>
                <div className="hidden md:flex items-center space-x-2 ml-2">
                  <span className="bg-arc-accent/10 text-arc-accent/90 text-xs px-2 py-1 rounded-full border border-arc-accent/30">
                    {doc.type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <BookmarkPlus size={16} className="mr-1" /> Fork
              </Button>
              <Button variant="outline" size="sm">
                <Mail size={16} className="mr-1" /> Request Review
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Share size={16} className="mr-1" /> Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Copy size={16} className="mr-1" /> Copy Link
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download size={16} className="mr-1" /> Download PDF
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download size={16} className="mr-1" /> Download MD
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" size="sm">
                <BookmarkPlus size={16} />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            {doc.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-arc-accent/10 text-arc-accent/90 border border-arc-accent/30"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex items-center mt-4 text-sm text-gray-400">
            <div className="flex items-center mr-4">
              <Eye size={16} className="mr-1" /> {doc.views} views
            </div>
            <div className="flex items-center mr-4">
              <Star size={16} className="mr-1" /> {doc.endorsements} endorsements
            </div>
            <div className="flex items-center">
              <MessageSquare size={16} className="mr-1" /> {doc.comments} comments
            </div>
          </div>
          
          <Separator className="my-6 bg-arc-accent/20" />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-3/4">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="qa">Q&A ({doc.questions.length})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="pt-6">
                <article className="prose prose-lg prose-invert max-w-none">
                  {doc.sections.map(renderDocSection)}
                </article>
                
                <div className="mt-12 border-t border-arc-accent/20 pt-6">
                  <h3 className="text-xl font-semibold text-white mb-4">Was this document helpful?</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      variant={helpful === true ? "default" : "outline"}
                      onClick={() => handleHelpful(true)}
                      className={helpful === true ? "bg-green-500 hover:bg-green-600" : ""}
                    >
                      <ThumbsUp size={16} className="mr-2" /> Yes, it was helpful
                    </Button>
                    <Button
                      variant={helpful === false ? "default" : "outline"}
                      onClick={() => handleHelpful(false)}
                      className={helpful === false ? "bg-red-500 hover:bg-red-600" : ""}
                    >
                      <ThumbsDown size={16} className="mr-2" /> No, needs improvement
                    </Button>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-white mb-2">Rate this document</h3>
                    <div className="flex items-center gap-1">
                      {Array(5).fill(0).map((_, i) => (
                        <button
                          key={i}
                          onClick={() => handleRating(i + 1)}
                          className={`p-1 transition-all ${userRating && i < userRating ? 'text-yellow-400 transform scale-110' : 'text-gray-400 hover:text-yellow-400'}`}
                        >
                          <Star size={24} fill={userRating && i < userRating ? "currentColor" : "none"} />
                        </button>
                      ))}
                      {userRating && <span className="ml-2 text-sm text-gray-300">You rated this {userRating} stars</span>}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="qa" className="pt-6">
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">Questions & Answers</h3>
                    <Button>
                      <MessageSquare size={16} className="mr-2" /> Ask a Question
                    </Button>
                  </div>
                  
                  {doc.questions.map(question => (
                    <div key={question.id} className="bg-black/30 rounded-lg p-6 border border-arc-accent/20">
                      <div className="flex items-start mb-3">
                        <img src={question.user.avatar} alt={question.user.name} className="h-10 w-10 rounded-full mr-3" />
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium text-white">{question.user.name}</h4>
                            <span className="text-xs text-gray-400 ml-2">{formatDate(question.date)}</span>
                          </div>
                          <p className="text-lg font-medium text-white mt-1">{question.question}</p>
                        </div>
                      </div>
                      
                      <div className="ml-12 mt-3 p-4 bg-gray-800/50 rounded-lg">
                        <p className="text-gray-200">{question.answer}</p>
                        <div className="flex items-center mt-3 space-x-4 text-sm">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp size={14} className="mr-1" /> Helpful ({question.upvotes})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ThumbsDown size={14} className="mr-1" /> Not Helpful ({question.downvotes})
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare size={14} className="mr-1" /> Comment
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {doc.questions.length === 0 && (
                    <div className="text-center py-10">
                      <MessageSquare size={40} className="mx-auto text-gray-400 mb-4" />
                      <h4 className="text-lg font-medium text-white mb-2">No questions yet</h4>
                      <p className="text-gray-400 mb-4">Be the first to ask a question about this document</p>
                      <Button>
                        <MessageSquare size={16} className="mr-2" /> Ask a Question
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20 mb-6">
                <h3 className="font-medium text-white mb-3">Table of Contents</h3>
                <nav className="space-y-1">
                  {doc.sections
                    .filter(section => section.type === 'heading')
                    .map((section) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="block text-sm text-gray-300 hover:text-white hover:bg-arc-accent/10 rounded px-2 py-1 transition-colors"
                      >
                        {section.content}
                      </a>
                    ))}
                </nav>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20 mb-6">
                <h3 className="font-medium text-white mb-3">Related Documents</h3>
                <div className="space-y-3">
                  {doc.relatedDocs.map(relatedDoc => (
                    <Link
                      key={relatedDoc.id}
                      to={`/docs/${relatedDoc.id}`}
                      className="flex items-start text-sm hover:bg-arc-accent/10 rounded p-2 transition-colors"
                    >
                      <FileText size={16} className="mr-2 mt-1 flex-shrink-0 text-gray-400" />
                      <div>
                        <p className="text-gray-200">{relatedDoc.title}</p>
                        <p className="text-xs text-gray-400">{relatedDoc.type}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              
              {doc.attachments.length > 0 && (
                <div className="bg-black/30 rounded-lg p-4 border border-arc-accent/20 mb-6">
                  <h3 className="font-medium text-white mb-3">Attachments</h3>
                  <div className="space-y-2">
                    {doc.attachments.map((attachment, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm bg-black/40 rounded p-2"
                      >
                        <div className="flex items-center">
                          <FileText size={16} className="mr-2 text-gray-400" />
                          <span className="text-gray-300">{attachment.name}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs text-gray-400 mr-2">{attachment.size}</span>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Download size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <Button
                onClick={() => setShowVersions(true)}
                variant="outline"
                className="w-full justify-between mb-4"
              >
                <span className="flex items-center">
                  <Clock size={16} className="mr-2" /> Version History
                </span>
                <ChevronRight size={16} />
              </Button>
              
              <Button
                onClick={() => setShowComments(true)}
                variant="outline"
                className="w-full justify-between"
              >
                <span className="flex items-center">
                  <MessageSquare size={16} className="mr-2" /> Comments
                </span>
                <ChevronRight size={16} />
              </Button>
            </div>
          </aside>
        </div>
      </div>
      
      {/* Version History Drawer */}
      <Drawer open={showVersions} onOpenChange={setShowVersions}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Version History</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-4">
              {doc.versions.map((version, index) => (
                <div 
                  key={version.id}
                  className={`border-l-2 ${index === 0 ? 'border-arc-accent' : 'border-gray-600'} pl-4 py-2`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-white">{version.description}</p>
                      <p className="text-xs text-gray-400">By {version.author} on {version.date}</p>
                    </div>
                    <Button variant="ghost" size="sm" disabled={index !== 0}>
                      {index === 0 ? 'Current' : 'Restore'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DrawerContent>
      </Drawer>
      
      {/* Comments Drawer */}
      <Drawer open={showComments} onOpenChange={setShowComments}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle>Comments</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            {comments.length > 0 ? (
              <div className="space-y-6">
                {comments.map(comment => {
                  // Find the section this comment refers to
                  const section = doc.sections.find(s => s.id === comment.sectionId);
                  
                  return (
                    <div key={comment.id} className="border-b border-gray-700 pb-4">
                      <div className="bg-gray-800/50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-gray-300 italic">
                          {section?.type === 'code' 
                            ? 'Code block: ' + section.language
                            : section?.content?.substring(0, 100) + '...'}
                        </p>
                      </div>
                      
                      <div className="flex items-start mb-2">
                        <img 
                          src={comment.user.avatar} 
                          alt={comment.user.name} 
                          className="h-8 w-8 rounded-full mr-2"
                        />
                        <div>
                          <div className="flex items-center">
                            <p className="text-sm font-medium text-white">{comment.user.name}</p>
                            <span className="text-xs text-gray-400 ml-2">{formatDate(comment.date)}</span>
                          </div>
                          <p className="text-sm text-gray-200 mt-1">{comment.content}</p>
                          
                          <div className="flex items-center mt-2 space-x-2">
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                              <ThumbsUp size={12} className="mr-1" /> Helpful
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-10 mt-2 space-y-3">
                          {comment.replies.map(reply => (
                            <div key={reply.id} className="flex items-start">
                              <img 
                                src={reply.user.avatar} 
                                alt={reply.user.name} 
                                className="h-6 w-6 rounded-full mr-2"
                              />
                              <div>
                                <div className="flex items-center">
                                  <p className="text-xs font-medium text-white">{reply.user.name}</p>
                                  <span className="text-xs text-gray-400 ml-2">{formatDate(reply.date)}</span>
                                </div>
                                <p className="text-xs text-gray-300 mt-1">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-300">No comments yet</p>
                <p className="text-sm text-gray-400 mt-1">Be the first to comment on this document</p>
              </div>
            )}
          </div>
        </DrawerContent>
      </Drawer>
    </AppLayout>
  );
};

export default DocDetailPage;
