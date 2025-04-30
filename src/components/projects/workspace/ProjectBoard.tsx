
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal, X, Calendar } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/components/ui/sonner';

// Drag and drop library integration would be used in a real app
// For now, we'll simulate dragging with click-based operations

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  assignees: string[];
  dueDate: string;
  labels: string[];
}

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface ProjectBoardProps {
  tasks: Task[];
  team: TeamMember[];
}

const ProjectBoard: React.FC<ProjectBoardProps> = ({ tasks: initialTasks, team }) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    description: '',
    status: 'To Do',
    assignees: [],
    dueDate: '',
    labels: []
  });
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  
  // Column definitions
  const columns = [
    { id: 'todo', title: 'To Do', status: 'To Do', color: 'bg-gray-500/20' },
    { id: 'in-progress', title: 'In Progress', status: 'In Progress', color: 'bg-blue-500/20' },
    { id: 'review', title: 'Review', status: 'Review', color: 'bg-purple-500/20' },
    { id: 'done', title: 'Done', status: 'Done', color: 'bg-green-500/20' },
  ];
  
  // Handle creating a new task
  const handleCreateTask = () => {
    if (!newTask.title) {
      toast.error('Task title is required');
      return;
    }
    
    const task: Task = {
      id: `t${Math.random().toString(36).substring(2, 9)}`,
      title: newTask.title || '',
      description: newTask.description || '',
      status: newTask.status || 'To Do',
      assignees: newTask.assignees || [],
      dueDate: newTask.dueDate || '',
      labels: newTask.labels || []
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      status: 'To Do',
      assignees: [],
      dueDate: '',
      labels: []
    });
    setIsAddingTask(false);
    toast.success('Task created successfully');
  };
  
  // Handle task drag start
  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };
  
  // Handle drag over column
  const handleDragOverColumn = (columnId: string) => {
    setDragOverColumn(columnId);
  };
  
  // Handle drop in column
  const handleDrop = (targetStatus: string) => {
    if (draggedTask) {
      // Update the task status
      const updatedTasks = tasks.map(task => 
        task.id === draggedTask.id 
          ? { ...task, status: targetStatus } 
          : task
      );
      setTasks(updatedTasks);
      setDraggedTask(null);
      setDragOverColumn(null);
      toast.success(`Task moved to ${targetStatus}`);
    }
  };
  
  // Cancel dragging
  const handleDragEnd = () => {
    setDraggedTask(null);
    setDragOverColumn(null);
  };
  
  // Delete a task
  const handleDeleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    toast.success('Task deleted');
  };
  
  // Get tasks for a specific column
  const getColumnTasks = (status: string) => {
    return tasks.filter(task => task.status === status);
  };
  
  // Get team member by ID
  const getTeamMember = (userId: string) => {
    return team.find(member => member.id === userId);
  };
  
  // Format date to a nice readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  // Check if a date is overdue
  const isOverdue = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date < today;
  };

  // Get color for label
  const getLabelColor = (label: string) => {
    const labelColors: { [key: string]: string } = {
      'infrastructure': 'bg-gray-500/20 text-gray-300',
      'backend': 'bg-blue-500/20 text-blue-300',
      'frontend': 'bg-purple-500/20 text-purple-300',
      'core': 'bg-amber-500/20 text-amber-300',
      'design': 'bg-pink-500/20 text-pink-300',
      'ml': 'bg-green-500/20 text-green-300',
      'docs': 'bg-cyan-500/20 text-cyan-300',
    };
    
    return labelColors[label] || 'bg-gray-500/20 text-gray-300';
  };
  
  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Task Board</h3>
        <Button
          onClick={() => setIsAddingTask(true)}
          className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light transition-all duration-300"
        >
          <Plus size={16} className="mr-1" /> Add Task
        </Button>
      </div>
      
      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto">
        {columns.map(column => (
          <div 
            key={column.id}
            className={`border border-arc-accent/20 rounded-lg overflow-hidden ${
              dragOverColumn === column.id ? 'border-arc-accent border-2' : ''
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOverColumn(column.id);
            }}
            onDragLeave={() => setDragOverColumn(null)}
            onDrop={() => handleDrop(column.status)}
          >
            {/* Column Header */}
            <div className={`${column.color} p-3 flex items-center justify-between`}>
              <h3 className="font-medium text-white">{column.title}</h3>
              <Badge variant="outline" className="border-white/30 text-white">
                {getColumnTasks(column.status).length}
              </Badge>
            </div>
            
            {/* Task Cards */}
            <div className="bg-black/40 p-3 min-h-[300px] h-full">
              {getColumnTasks(column.status).map(task => (
                <div 
                  key={task.id}
                  className={`mb-3 border border-arc-accent/20 rounded-md bg-black/40 p-3 shadow-sm cursor-grab hover:shadow-md hover:border-arc-accent/50 transition-all duration-200 ${
                    draggedTask?.id === task.id ? 'opacity-50 border-dashed' : ''
                  }`}
                  draggable
                  onDragStart={() => handleDragStart(task)}
                  onDragEnd={handleDragEnd}
                >
                  {/* Task Title and Actions */}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{task.title}</h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-gray-400 hover:text-white">
                          <MoreHorizontal size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-black/95 border-arc-accent/30 text-white">
                        <DropdownMenuItem className="cursor-pointer hover:bg-arc-accent/20">
                          Edit task
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-400 hover:bg-red-500/20 hover:text-red-300"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete task
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  {/* Task Description (if provided) */}
                  {task.description && (
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">{task.description}</p>
                  )}
                  
                  {/* Task Labels */}
                  {task.labels.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {task.labels.map(label => (
                        <Badge key={label} className={`text-xs ${getLabelColor(label)}`}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  {/* Task Footer - Due Date and Assignees */}
                  <div className="flex justify-between items-center mt-2">
                    {task.dueDate && (
                      <div className="flex items-center">
                        <Calendar size={12} className="text-gray-400 mr-1" />
                        <span className={`text-xs ${isOverdue(task.dueDate) ? 'text-red-400' : 'text-gray-400'}`}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>
                    )}
                    
                    {task.assignees.length > 0 && (
                      <div className="flex -space-x-1">
                        {task.assignees.map(assigneeId => {
                          const member = getTeamMember(assigneeId);
                          if (!member) return null;
                          
                          return (
                            <Avatar key={assigneeId} className="h-6 w-6 border border-black">
                              <AvatarImage src={member.avatar} alt={member.name} />
                              <AvatarFallback className="text-[10px]">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {getColumnTasks(column.status).length === 0 && (
                <div className="flex items-center justify-center h-20 border border-dashed border-arc-accent/20 rounded-md">
                  <p className="text-sm text-gray-500">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Add Task Dialog */}
      <Dialog open={isAddingTask} onOpenChange={setIsAddingTask}>
        <DialogContent className="bg-black/95 border-arc-accent/30 text-white">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription className="text-gray-400">
              Add a new task to your project board.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            {/* Task Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Task Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                placeholder="Enter task title"
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500"
              />
            </div>
            
            {/* Task Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                placeholder="Describe the task"
                rows={3}
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white placeholder:text-gray-500 resize-none"
              />
            </div>
            
            {/* Task Status */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Done">Done</option>
              </select>
            </div>
            
            {/* Due Date */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-black/50 border border-arc-accent/30 rounded-md text-white"
              />
            </div>
            
            {/* Assignees */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Assignees</label>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {team.map(member => (
                  <div 
                    key={member.id} 
                    className={`flex items-center space-x-2 p-2 rounded-md border cursor-pointer ${
                      newTask.assignees?.includes(member.id)
                        ? 'bg-arc-accent/20 border-arc-accent'
                        : 'border-gray-700 hover:border-arc-accent/30'
                    }`}
                    onClick={() => {
                      const assignees = newTask.assignees || [];
                      setNewTask({
                        ...newTask,
                        assignees: assignees.includes(member.id)
                          ? assignees.filter(id => id !== member.id)
                          : [...assignees, member.id]
                      });
                    }}
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-300 truncate">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Labels */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Labels</label>
              <div className="flex flex-wrap gap-2">
                {['infrastructure', 'backend', 'frontend', 'core', 'design', 'ml', 'docs'].map(label => (
                  <Badge
                    key={label}
                    variant={newTask.labels?.includes(label) ? "default" : "outline"}
                    className={`cursor-pointer ${
                      newTask.labels?.includes(label)
                        ? getLabelColor(label)
                        : 'bg-transparent border-gray-700 text-gray-400 hover:bg-gray-800'
                    }`}
                    onClick={() => {
                      const labels = newTask.labels || [];
                      setNewTask({
                        ...newTask,
                        labels: labels.includes(label)
                          ? labels.filter(l => l !== label)
                          : [...labels, label]
                      });
                    }}
                  >
                    {label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddingTask(false)}
              className="border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20"
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTask}
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white hover:from-arc-accent hover:to-arc-light"
            >
              Create Task
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectBoard;
