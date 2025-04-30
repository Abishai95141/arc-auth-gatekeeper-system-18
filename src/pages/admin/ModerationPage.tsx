
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import AdminLayout from '@/components/AdminLayout';
import { Flag, Eye, AlertTriangle, Check } from 'lucide-react';

// Mock data for flagged content
const mockFlaggedContent = {
  ideas: [
    { id: '1', title: 'AI-powered content moderation system', author: 'Sarah Chen', authorId: 'user1', content: 'A system that uses AI to automatically detect inappropriate content without human intervention.', flaggedDate: '2024-04-25', flagReason: 'Duplicate content' },
    { id: '2', title: 'Blockchain for secure voting', author: 'James Wilson', authorId: 'user2', content: 'Using blockchain to create a secure, transparent voting system that prevents fraud.', flaggedDate: '2024-04-24', flagReason: 'Misleading information' },
  ],
  projects: [
    { id: '3', title: 'Neural Network Visualizer', author: 'Alex Johnson', authorId: 'user3', content: 'Interactive tool that visualizes neural networks during training.', flaggedDate: '2024-04-26', flagReason: 'Copyright violation' },
    { id: '4', title: 'Quantum Computing Simulator', author: 'Maya Patel', authorId: 'user4', content: 'A simulator that demonstrates quantum computing principles.', flaggedDate: '2024-04-23', flagReason: 'Inappropriate content' },
  ],
  docs: [
    { id: '5', title: 'Machine Learning Best Practices', author: 'David Wang', authorId: 'user5', content: 'Comprehensive guide to machine learning best practices and pitfalls to avoid.', flaggedDate: '2024-04-22', flagReason: 'Plagiarism' },
    { id: '6', title: 'API Documentation Guidelines', author: 'Emma Torres', authorId: 'user6', content: 'Standards for writing clear, useful API documentation.', flaggedDate: '2024-04-21', flagReason: 'Inaccurate information' },
  ],
  comments: [
    { id: '7', author: 'Robert Smith', authorId: 'user7', content: 'This project is a waste of resources. Nobody will ever use this garbage.', parentItem: 'Neural Network Visualizer', flaggedDate: '2024-04-25', flagReason: 'Offensive language' },
    { id: '8', author: 'Lisa Brown', authorId: 'user8', content: 'Check out my project instead, it\'s much better: [spam link]', parentItem: 'API Documentation Guidelines', flaggedDate: '2024-04-24', flagReason: 'Spam' },
    { id: '9', author: 'Kevin Zhang', authorId: 'user9', content: 'Your explanation is completely wrong. This wouldn\'t work at all in a real environment.', parentItem: 'Machine Learning Best Practices', flaggedDate: '2024-04-23', flagReason: 'Harassment' },
  ]
};

type FlaggedItem = {
  id: string;
  title?: string;
  author: string;
  authorId: string;
  content: string;
  flaggedDate: string;
  flagReason: string;
  parentItem?: string;
};

const ModerationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('ideas');
  const [flaggedItems, setFlaggedItems] = useState({
    ideas: [...mockFlaggedContent.ideas],
    projects: [...mockFlaggedContent.projects],
    docs: [...mockFlaggedContent.docs],
    comments: [...mockFlaggedContent.comments],
  });

  const handleDismissFlag = (id: string) => {
    setFlaggedItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof prev].filter(item => item.id !== id)
    }));
    toast.success('Flag dismissed');
  };

  const handleHideContent = (id: string) => {
    setFlaggedItems(prev => ({
      ...prev,
      [activeTab]: prev[activeTab as keyof typeof prev].filter(item => item.id !== id)
    }));
    toast.success('Content hidden');
  };

  const handleWarnUser = (authorId: string, author: string) => {
    // In a real app, this would send a warning to the user
    toast.success(`Warning sent to ${author}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <AdminLayout title="Content Moderation">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Flag size={20} className="text-red-500" />
            Flagged Content
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ideas" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="ideas" className="relative">
                Ideas
                {flaggedItems.ideas.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{flaggedItems.ideas.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="projects" className="relative">
                Projects
                {flaggedItems.projects.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{flaggedItems.projects.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="docs" className="relative">
                Docs
                {flaggedItems.docs.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{flaggedItems.docs.length}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="comments" className="relative">
                Comments
                {flaggedItems.comments.length > 0 && (
                  <Badge className="ml-2 bg-red-500">{flaggedItems.comments.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            {['ideas', 'projects', 'docs', 'comments'].map((tabKey) => (
              <TabsContent key={tabKey} value={tabKey} className="mt-0">
                {flaggedItems[tabKey as keyof typeof flaggedItems].length === 0 ? (
                  <div className="flex h-32 items-center justify-center rounded-md border border-dashed">
                    <p className="text-center text-muted-foreground">
                      No flagged {tabKey} to review
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Content</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead>Flagged On</TableHead>
                          <TableHead>Flag Reason</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {flaggedItems[tabKey as keyof typeof flaggedItems].map((item: FlaggedItem) => (
                          <TableRow key={item.id}>
                            <TableCell className="max-w-[300px]">
                              <div className="space-y-1">
                                {item.title && (
                                  <div className="font-medium">{item.title}</div>
                                )}
                                {item.parentItem && (
                                  <div className="text-xs text-muted-foreground">
                                    On: {item.parentItem}
                                  </div>
                                )}
                                <div className="line-clamp-2 text-sm text-muted-foreground">
                                  {item.content}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {getInitials(item.author)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{item.author}</span>
                              </div>
                            </TableCell>
                            <TableCell>{item.flaggedDate}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-red-400 text-red-500">
                                {item.flagReason}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDismissFlag(item.id)}
                                >
                                  <Check size={16} className="mr-1" />
                                  Dismiss
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-amber-600 hover:text-amber-800 hover:bg-amber-100"
                                  onClick={() => handleHideContent(item.id)}
                                >
                                  <Eye size={16} className="mr-1" />
                                  Hide
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-800 hover:bg-red-100"
                                  onClick={() => handleWarnUser(item.authorId, item.author)}
                                >
                                  <AlertTriangle size={16} className="mr-1" />
                                  Warn
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ModerationPage;
