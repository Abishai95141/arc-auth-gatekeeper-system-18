
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, MessageSquare, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const MainNavigation: React.FC = () => {
  const { logout, user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-arc-accent/20 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Logo className="h-8 w-8" />
            <span className="text-lg font-bold text-white">Builders Arc</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search ideas, projects, docs, members..."
              className="h-10 w-64 rounded-md bg-black/40 border border-arc-accent/30 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:border-arc-accent focus:outline-none focus:ring-1 focus:ring-arc-accent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
          {/* Main Nav Links */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/ideas" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-arc-accent/20")}>
                  Ideas
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/projects" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-arc-accent/20")}>
                  Projects
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/docs" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-arc-accent/20")}>
                  Docs
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/talks" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-arc-accent/20")}>
                  Tech Talks
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/community" className={cn(navigationMenuTriggerStyle(), "bg-transparent text-white hover:bg-arc-accent/20")}>
                  Community
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Icon Links */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
              <Link to="/notifications">
                <Bell size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
              <Link to="/messages">
                <MessageSquare size={20} />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
              <Link to="/profile">
                <User size={20} />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full text-white hover:bg-arc-accent/20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 z-50 flex flex-col gap-4 bg-black/95 p-4 border-b border-arc-accent/20 backdrop-blur-md animate-fade-in md:hidden">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-10 w-full rounded-md bg-black/40 border border-arc-accent/30 pl-9 pr-4 text-sm text-white placeholder-gray-400 focus:border-arc-accent focus:outline-none focus:ring-1 focus:ring-arc-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <Link to="/ideas" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-arc-accent/20">Ideas</Link>
            <Link to="/projects" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-arc-accent/20">Projects</Link>
            <Link to="/docs" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-arc-accent/20">Docs</Link>
            <Link to="/talks" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-arc-accent/20">Tech Talks</Link>
            <Link to="/community" className="rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-arc-accent/20">Community</Link>
            
            <div className="flex justify-around border-t border-arc-accent/20 pt-4">
              <Link to="/notifications">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
                  <Bell size={20} />
                </Button>
              </Link>
              <Link to="/messages">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
                  <MessageSquare size={20} />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="rounded-full text-white hover:bg-arc-accent/20">
                  <User size={20} />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default MainNavigation;
