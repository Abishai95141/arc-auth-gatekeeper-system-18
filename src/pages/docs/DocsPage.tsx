
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Grid, List, Filter, Star, Eye, MessageSquare, Plus, FileText, Calendar, X } from 'lucide-react';
import AppLayout from '@/components/AppLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data for documents
const documents = [
  {
    id: '1',
    title: 'Getting Started with React',
    author: 'Jane Smith',
    authorAvatar: 'https://i.pravatar.cc/150?img=1',
    type: 'Tutorial',
    tags: ['React', 'Frontend', 'Beginners'],
    excerpt: 'A comprehensive guide for beginners to get started with React and build their first component.',
    updatedAt: '2024-04-25',
    views: 1243,
    endorsements: 48,
    comments: 12
  },
  {
    id: '2',
    title: 'API Integration Best Practices',
    author: 'John Doe',
    authorAvatar: 'https://i.pravatar.cc/150?img=2',
    type: 'Q&A',
    tags: ['API', 'Backend', 'Integration'],
    excerpt: 'Learn how to properly integrate external APIs into your application with proper error handling.',
    updatedAt: '2024-04-22',
    views: 987,
    endorsements: 36,
    comments: 8
  },
  {
    id: '3',
    title: 'Project Setup Template',
    author: 'Alex Johnson',
    authorAvatar: 'https://i.pravatar.cc/150?img=3',
    type: 'Template',
    tags: ['Setup', 'Configuration', 'Tooling'],
    excerpt: 'A reusable template for setting up new projects with all the necessary tooling and configuration.',
    updatedAt: '2024-04-20',
    views: 756,
    endorsements: 29,
    comments: 5
  },
  {
    id: '4',
    title: 'Advanced TypeScript Patterns',
    author: 'Sarah Williams',
    authorAvatar: 'https://i.pravatar.cc/150?img=4',
    type: 'Tutorial',
    tags: ['TypeScript', 'Advanced', 'Patterns'],
    excerpt: 'Discover advanced TypeScript patterns that will help you write more maintainable and type-safe code.',
    updatedAt: '2024-04-18',
    views: 632,
    endorsements: 25,
    comments: 7
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox',
    author: 'Mike Taylor',
    authorAvatar: 'https://i.pravatar.cc/150?img=5',
    type: 'Q&A',
    tags: ['CSS', 'Grid', 'Flexbox', 'Layout'],
    excerpt: 'Understanding when to use CSS Grid versus Flexbox for different layout requirements.',
    updatedAt: '2024-04-15',
    views: 1087,
    endorsements: 42,
    comments: 15
  },
  {
    id: '6',
    title: 'State Management with Redux',
    author: 'Emily Chen',
    authorAvatar: 'https://i.pravatar.cc/150?img=6',
    type: 'Tutorial',
    tags: ['Redux', 'State Management', 'React'],
    excerpt: 'A deep dive into managing application state effectively using Redux in React applications.',
    updatedAt: '2024-04-10',
    views: 876,
    endorsements: 33,
    comments: 9
  }
];

const DocTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'Tutorial':
      return <FileText className="h-4 w-4 text-blue-400" />;
    case 'Template':
      return <FileText className="h-4 w-4 text-green-400" />;
    case 'Q&A':
      return <MessageSquare className="h-4 w-4 text-amber-400" />;
    default:
      return <FileText className="h-4 w-4 text-gray-400" />;
  }
};

const DocsPage: React.FC = () => {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('recent');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Filter documents based on search and filters
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(doc.type);
    
    const matchesTags = selectedTags.length === 0 || 
                        doc.tags.some(tag => selectedTags.includes(tag));
    
    return matchesSearch && matchesType && matchesTags;
  });
  
  // Sort documents
  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === 'endorsed') {
      return b.endorsements - a.endorsements;
    } else if (sortBy === 'viewed') {
      return b.views - a.views;
    }
    return 0;
  });

  const toggleDocType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setSelectedTags([]);
    setSearchQuery('');
  };

  // Get all unique tags from documents
  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags)));
  const docTypes = ['Tutorial', 'Template', 'Q&A'];

  return (
    <AppLayout>
      <div className="container animate-fade-in">
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
              <BreadcrumbPage>Docs & Resources</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Docs & Resources</h1>
            <p className="text-gray-400 mt-1">Discover and share knowledge</p>
          </div>
          <Button asChild className="rounded-full bg-gradient-to-r from-arc-secondary to-arc-accent hover:from-arc-accent hover:to-arc-secondary">
            <Link to="/docs/new"><Plus size={18} className="mr-1"/> New Document</Link>
          </Button>
        </div>

        {/* Search and Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search docs, tutorials, Q&A..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-black/40 border-arc-accent/30"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`${viewType === 'grid' ? 'bg-arc-accent/20 text-white' : 'bg-transparent'}`}
              onClick={() => setViewType('grid')}
            >
              <Grid size={18} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`${viewType === 'list' ? 'bg-arc-accent/20 text-white' : 'bg-transparent'}`}
              onClick={() => setViewType('list')}
            >
              <List size={18} />
            </Button>
            <div className="hidden md:block">
              <Button
                variant="outline"
                size="sm"
                className={`${showFilters ? 'bg-arc-accent/20 text-white' : 'bg-transparent'}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-1" /> Filters
              </Button>
            </div>
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter size={18} className="mr-1" /> Filters
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Filter Documents</DrawerTitle>
                    <DrawerDescription>Apply filters to narrow down your results</DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2">
                    {/* Mobile Filter Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Document Type</h3>
                        <div className="flex flex-wrap gap-2">
                          {docTypes.map((type) => (
                            <Button
                              key={type}
                              variant="outline"
                              size="sm"
                              className={`${selectedTypes.includes(type) ? 'bg-arc-accent/20 border-arc-accent' : ''}`}
                              onClick={() => toggleDocType(type)}
                            >
                              {type}
                              {selectedTypes.includes(type) && <X className="ml-1 h-3 w-3" />}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                          {allTags.map((tag) => (
                            <Button
                              key={tag}
                              variant="outline"
                              size="sm"
                              className={`${selectedTags.includes(tag) ? 'bg-arc-accent/20 border-arc-accent' : ''}`}
                              onClick={() => toggleTag(tag)}
                            >
                              {tag}
                              {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium mb-2">Sort By</h3>
                        <Tabs defaultValue={sortBy} onValueChange={(value) => setSortBy(value)}>
                          <TabsList className="grid grid-cols-3 w-full">
                            <TabsTrigger value="recent">Recent</TabsTrigger>
                            <TabsTrigger value="endorsed">Top Endorsed</TabsTrigger>
                            <TabsTrigger value="viewed">Most Viewed</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                      <Button onClick={clearFilters} variant="ghost" size="sm" className="w-full">
                        Clear All Filters
                      </Button>
                    </div>
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button>Apply Filters</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Sort: {sortBy === 'recent' ? 'Recent' : sortBy === 'endorsed' ? 'Top Endorsed' : 'Most Viewed'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSortBy('recent')}>Most Recent</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('endorsed')}>Most Endorsed</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('viewed')}>Most Viewed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop Filter Panel */}
        {showFilters && (
          <div className="hidden md:block mb-6 p-4 bg-black/40 rounded-lg border border-arc-accent/20 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Filters</h3>
              <Button onClick={clearFilters} variant="ghost" size="sm">
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Document Type</h4>
                <div className="flex flex-wrap gap-2">
                  {docTypes.map((type) => (
                    <Button
                      key={type}
                      variant="outline"
                      size="sm"
                      className={`${selectedTypes.includes(type) ? 'bg-arc-accent/20 border-arc-accent' : ''}`}
                      onClick={() => toggleDocType(type)}
                    >
                      {type}
                      {selectedTypes.includes(type) && <X className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                  {allTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="outline"
                      size="sm"
                      className={`${selectedTags.includes(tag) ? 'bg-arc-accent/20 border-arc-accent' : ''}`}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                      {selectedTags.includes(tag) && <X className="ml-1 h-3 w-3" />}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Last Updated</h4>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar size={16} className="mr-1" /> Select Date
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Document List */}
        {sortedDocuments.length > 0 ? (
          <>
            {viewType === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedDocuments.map((doc) => (
                  <Link to={`/docs/${doc.id}`} key={doc.id}>
                    <Card className="h-full border-border/50 bg-black/40 hover:border-arc-accent/70 hover:shadow-lg hover:shadow-arc-accent/20 transition-all duration-200 overflow-hidden group">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center space-x-2">
                            <div className="flex-shrink-0">
                              <img src={doc.authorAvatar} alt={doc.author} className="h-8 w-8 rounded-full" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-300">{doc.author}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DocTypeIcon type={doc.type} />
                            <span className="text-xs text-gray-400">{doc.type}</span>
                          </div>
                        </div>
                        <CardTitle className="mt-2 group-hover:text-arc-accent transition-colors">
                          {doc.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <p className="text-sm text-gray-300 line-clamp-2">{doc.excerpt}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {doc.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-1 text-xs rounded-full bg-arc-accent/10 text-arc-accent/90 border border-arc-accent/30"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <div className="flex justify-between items-center w-full text-xs text-gray-400">
                          <p>Updated {new Date(doc.updatedAt).toLocaleDateString()}</p>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center">
                              <Eye size={14} className="mr-1" /> {doc.views}
                            </span>
                            <span className="flex items-center">
                              <Star size={14} className="mr-1" /> {doc.endorsements}
                            </span>
                            <span className="flex items-center">
                              <MessageSquare size={14} className="mr-1" /> {doc.comments}
                            </span>
                          </div>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <Table className="border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="hidden md:table-cell">Type</TableHead>
                    <TableHead className="hidden md:table-cell">Tags</TableHead>
                    <TableHead className="hidden md:table-cell">Updated</TableHead>
                    <TableHead>Stats</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedDocuments.map((doc) => (
                    <TableRow 
                      key={doc.id} 
                      className="hover:bg-arc-accent/10 cursor-pointer"
                      onClick={() => window.location.href = `/docs/${doc.id}`}
                    >
                      <TableCell className="font-medium">{doc.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <img src={doc.authorAvatar} alt={doc.author} className="h-6 w-6 rounded-full" />
                          <span className="hidden md:inline">{doc.author}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center space-x-1">
                          <DocTypeIcon type={doc.type} />
                          <span>{doc.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-0.5 text-xs rounded-full bg-arc-accent/10 text-arc-accent/90 border border-arc-accent/30"
                            >
                              {tag}
                            </span>
                          ))}
                          {doc.tags.length > 2 && <span className="text-xs text-gray-400">+{doc.tags.length - 2}</span>}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(doc.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="flex items-center text-xs">
                            <Eye size={14} className="mr-1" /> {doc.views}
                          </span>
                          <span className="flex items-center text-xs">
                            <Star size={14} className="mr-1" /> {doc.endorsements}
                          </span>
                          <span className="flex items-center text-xs">
                            <MessageSquare size={14} className="mr-1" /> {doc.comments}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-arc-accent/20 p-3 mb-4">
              <FileText className="h-10 w-10 text-arc-accent" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No documents found</h2>
            <p className="text-gray-400 mb-4">
              {searchQuery || selectedTypes.length > 0 || selectedTags.length > 0
                ? "No documents match your current filters."
                : "Be the first to create a document and share your knowledge."}
            </p>
            {(searchQuery || selectedTypes.length > 0 || selectedTags.length > 0) && (
              <Button onClick={clearFilters} variant="outline">
                Clear Filters
              </Button>
            )}
            {!searchQuery && selectedTypes.length === 0 && selectedTags.length === 0 && (
              <Button asChild>
                <Link to="/docs/new"><Plus size={18} className="mr-1"/> Create Document</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default DocsPage;
