
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Plus, Eye, Upload, Edit, Clock, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

interface File {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
}

interface WikiSection {
  id: string;
  title: string;
  content: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

interface Wiki {
  id: string;
  title: string;
  sections: WikiSection[];
}

interface ProjectFilesProps {
  files: File[];
  wiki: Wiki;
}

const ProjectFiles: React.FC<ProjectFilesProps> = ({ files: initialFiles, wiki: initialWiki }) => {
  const [files, setFiles] = useState(initialFiles);
  const [wiki, setWiki] = useState(initialWiki);
  const [activeTab, setActiveTab] = useState('files');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [editWikiModalOpen, setEditWikiModalOpen] = useState(false);
  const [selectedWikiSection, setSelectedWikiSection] = useState<WikiSection | null>(null);
  const [editedWikiContent, setEditedWikiContent] = useState('');
  
  // File type icons and colors
  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-400" />;
      case 'image':
        return <Eye className="text-blue-400" />;
      case 'figma':
        return <FileText className="text-purple-400" />;
      case 'markdown':
        return <FileText className="text-green-400" />;
      default:
        return <FileText className="text-gray-400" />;
    }
  };
  
  const handleUploadFile = () => {
    // In a real app, this would handle file uploads
    toast.success('File uploaded successfully');
    setUploadModalOpen(false);
  };
  
  const handleEditWiki = (section: WikiSection) => {
    setSelectedWikiSection(section);
    setEditedWikiContent(section.content);
    setEditWikiModalOpen(true);
  };
  
  const handleSaveWikiChanges = () => {
    if (!selectedWikiSection) return;
    
    const updatedSections = wiki.sections.map(section =>
      section.id === selectedWikiSection.id
        ? { 
            ...section, 
            content: editedWikiContent,
            lastUpdatedBy: 'u1', // Current user in a real app
            lastUpdatedAt: new Date().toISOString()
          }
        : section
    );
    
    setWiki({
      ...wiki,
      sections: updatedSections
    });
    
    setEditWikiModalOpen(false);
    toast.success('Wiki section updated');
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Format file size
  const formatFileSize = (size: string) => {
    return size;
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-black/40 border border-arc-accent/20 p-1">
          <TabsTrigger 
            value="files" 
            className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
          >
            Files
          </TabsTrigger>
          <TabsTrigger 
            value="wiki" 
            className="data-[state=active]:bg-arc-accent/20 data-[state=active]:text-white text-gray-400"
          >
            Wiki
          </TabsTrigger>
        </TabsList>
        
        {/* Files Tab */}
        <TabsContent value="files">
          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>Documentation, assets, and other resources</CardDescription>
              </div>
              <Button
                className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
                onClick={() => setUploadModalOpen(true)}
              >
                <Upload size={16} className="mr-1" />
                Upload File
              </Button>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500 text-center">
                  <FileText size={48} className="mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-white mb-1">No files yet</h3>
                  <p className="text-sm text-gray-400 mb-4">Upload project files to share with your team</p>
                  <Button 
                    variant="outline"
                    className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
                    onClick={() => setUploadModalOpen(true)}
                  >
                    <Plus size={16} className="mr-1" />
                    Upload Your First File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Search and Filter Bar */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex-grow">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <input
                        type="text"
                        placeholder="Search files..."
                        className="w-full pl-9 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[150px] bg-black/40 border-arc-accent/30">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                        <SelectItem value="all" className="focus:bg-arc-accent/20">All Types</SelectItem>
                        <SelectItem value="pdf" className="focus:bg-arc-accent/20">PDF</SelectItem>
                        <SelectItem value="image" className="focus:bg-arc-accent/20">Images</SelectItem>
                        <SelectItem value="figma" className="focus:bg-arc-accent/20">Figma</SelectItem>
                        <SelectItem value="markdown" className="focus:bg-arc-accent/20">Markdown</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Files Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-arc-accent/20">
                        <tr>
                          <th className="text-left py-3 font-medium text-sm text-gray-400">Name</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-400">Type</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-400">Size</th>
                          <th className="text-left py-3 font-medium text-sm text-gray-400">Uploaded</th>
                          <th className="text-right py-3 font-medium text-sm text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {files.map((file) => (
                          <tr key={file.id} className="border-b border-arc-accent/10 hover:bg-black/20 transition-colors">
                            <td className="py-3">
                              <div className="flex items-center">
                                {getFileIcon(file.type)}
                                <span className="ml-2 text-white">{file.name}</span>
                              </div>
                            </td>
                            <td className="py-3">
                              <Badge variant="outline" className="border-arc-accent/30 text-gray-300 capitalize">
                                {file.type}
                              </Badge>
                            </td>
                            <td className="py-3 text-gray-400">{formatFileSize(file.size)}</td>
                            <td className="py-3 text-gray-400">{formatDate(file.uploadedAt)}</td>
                            <td className="py-3 text-right">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-arc-accent/20 h-8 w-8 p-0">
                                <Download size={16} />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Wiki Tab */}
        <TabsContent value="wiki">
          <Card className="border border-arc-accent/20 bg-black/40 shadow-lg backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{wiki.title}</CardTitle>
                <CardDescription>Project documentation and knowledge base</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Select defaultValue="current">
                  <SelectTrigger className="w-[140px] bg-black/40 border-arc-accent/30 h-8 text-sm">
                    <SelectValue placeholder="Version" />
                  </SelectTrigger>
                  <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                    <SelectItem value="current" className="focus:bg-arc-accent/20">
                      Current
                    </SelectItem>
                    <SelectItem value="v2" className="focus:bg-arc-accent/20">
                      April 20, 2025
                    </SelectItem>
                    <SelectItem value="v1" className="focus:bg-arc-accent/20">
                      March 15, 2025
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 h-8 px-3">
                  <Plus size={14} className="mr-1" />
                  Add Section
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {wiki.sections.map((section) => (
                  <div key={section.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-white">{section.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock size={12} className="mr-1" />
                          <span>Updated {formatDate(section.lastUpdatedAt)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-gray-400 hover:text-white hover:bg-arc-accent/20 h-8 w-8 p-0"
                          onClick={() => handleEditWiki(section)}
                        >
                          <Edit size={14} />
                        </Button>
                      </div>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <div className="rounded-md bg-black/20 p-4 border border-arc-accent/10 text-gray-300 prose-headings:text-white prose-a:text-arc-accent prose-code:bg-black/30 prose-code:text-gray-200">
                        <pre className="whitespace-pre-wrap font-sans">{section.content}</pre>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Upload File Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="bg-black/95 border-arc-accent/30 text-white">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription className="text-gray-400">
              Share a file with your project team
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-arc-accent/30 rounded-lg p-8 bg-black/30">
              <Upload size={36} className="text-gray-400 mb-4" />
              <p className="text-sm text-gray-300 mb-2">Drag and drop your file here</p>
              <p className="text-xs text-gray-500 mb-4">Or click to browse</p>
              <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                Browse Files
              </Button>
            </div>
            
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-200">File Name</label>
                <input 
                  type="text" 
                  placeholder="Enter file name"
                  className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-200">Description (optional)</label>
                <textarea 
                  placeholder="Add a description for this file"
                  rows={2}
                  className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500 resize-none"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setUploadModalOpen(false)}
              className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUploadFile}
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Wiki Modal */}
      <Dialog open={editWikiModalOpen} onOpenChange={setEditWikiModalOpen}>
        <DialogContent className="bg-black/95 border-arc-accent/30 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Wiki Section</DialogTitle>
            <DialogDescription className="text-gray-400">
              {selectedWikiSection?.title}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <textarea 
                value={editedWikiContent}
                onChange={(e) => setEditedWikiContent(e.target.value)}
                rows={15}
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500">
                Use Markdown formatting for headings, links, code blocks, and more.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditWikiModalOpen(false)}
              className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveWikiChanges}
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectFiles;
