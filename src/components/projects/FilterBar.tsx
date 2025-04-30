
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterBarProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  domains: string[];
  selectedDomains: string[];
  handleDomainToggle: (domain: string) => void;
  stages: string[];
  selectedStage: string | null;
  handleStageChange: (stage: string) => void;
  teamSizes: string[];
  selectedTeamSize: string | null;
  handleTeamSizeChange: (size: string) => void;
  sortOptions: string[];
  sortBy: string;
  setSortBy: (option: string) => void;
  handleReset: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  handleSearch,
  domains,
  selectedDomains,
  handleDomainToggle,
  stages,
  selectedStage,
  handleStageChange,
  teamSizes,
  selectedTeamSize,
  handleTeamSizeChange,
  sortOptions,
  sortBy,
  setSortBy,
  handleReset,
}) => {
  const isMobile = useIsMobile();
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const hasFilters = selectedDomains.length > 0 || selectedStage !== null || selectedTeamSize !== null;
  
  // Calculate how many filters are active
  const activeFilterCount = (selectedDomains.length || 0) + (selectedStage ? 1 : 0) + (selectedTeamSize ? 1 : 0);
  
  return (
    <div className="space-y-4 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Bar */}
        <div className={`relative flex-grow transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-arc-accent/50 rounded-md' : ''}`}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search projects by title or description..."
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            className="pl-9 bg-black/40 border-arc-accent/30 text-white placeholder:text-gray-500"
          />
          {searchQuery && (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => {
                handleSearch({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
              }}
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Mobile Filters */}
        {isMobile && (
          <div className="flex gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 flex gap-2">
                  <Filter size={18} />
                  <span>Filters {activeFilterCount > 0 && <Badge className="ml-1 h-5 w-5 rounded-full bg-arc-accent text-white">{activeFilterCount}</Badge>}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="bg-black/95 border-t border-arc-accent/30 text-white">
                <SheetHeader>
                  <SheetTitle className="text-white">Filters</SheetTitle>
                </SheetHeader>
                <div className="py-4 space-y-6">
                  {/* Domain Tags */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Domains</h4>
                    <div className="flex flex-wrap gap-2">
                      {domains.map((domain) => (
                        <Badge
                          key={domain}
                          variant={selectedDomains.includes(domain) ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedDomains.includes(domain)
                              ? 'bg-arc-accent text-white'
                              : 'bg-transparent border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20'
                          }`}
                          onClick={() => handleDomainToggle(domain)}
                        >
                          {domain}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Project Stage */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Project Stage</h4>
                    <div className="flex flex-wrap gap-2">
                      {stages.map((stage) => (
                        <Badge
                          key={stage}
                          variant={selectedStage === stage ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedStage === stage
                              ? 'bg-arc-accent text-white'
                              : 'bg-transparent border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20'
                          }`}
                          onClick={() => handleStageChange(stage)}
                        >
                          {stage}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Team Size */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Team Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {teamSizes.map((size) => (
                        <Badge
                          key={size}
                          variant={selectedTeamSize === size ? "default" : "outline"}
                          className={`cursor-pointer ${
                            selectedTeamSize === size
                              ? 'bg-arc-accent text-white'
                              : 'bg-transparent border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20'
                          }`}
                          onClick={() => handleTeamSizeChange(size)}
                        >
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort By */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Sort By</h4>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full bg-black/40 border-arc-accent/30 text-white">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                        {sortOptions.map((option) => (
                          <SelectItem key={option} value={option} className="focus:bg-arc-accent/20 focus:text-white">
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <SheetFooter className="flex flex-row gap-3 sm:justify-end">
                  <Button 
                    variant="outline" 
                    className="border-arc-accent/30 text-white hover:bg-arc-accent/20"
                    onClick={handleReset}
                    disabled={!hasFilters && sortBy === "Recent"}
                  >
                    Reset
                  </Button>
                  <SheetClose asChild>
                    <Button className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white">Apply Filters</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            {/* Sort By Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-black/40 border-arc-accent/30 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option} className="focus:bg-arc-accent/20 focus:text-white">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {/* Desktop Filters */}
        {!isMobile && (
          <div className="flex gap-3">
            {/* Domain Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20 flex gap-2">
                  Domains {selectedDomains.length > 0 && <Badge className="ml-1 h-5 w-5 rounded-full bg-arc-accent text-white">{selectedDomains.length}</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-arc-accent/30 text-white w-56">
                <div className="py-2 px-3">
                  <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                    {domains.map((domain) => (
                      <Badge
                        key={domain}
                        variant={selectedDomains.includes(domain) ? "default" : "outline"}
                        className={`cursor-pointer ${
                          selectedDomains.includes(domain)
                            ? 'bg-arc-accent text-white'
                            : 'bg-transparent border-arc-accent/30 text-gray-300 hover:bg-arc-accent/20'
                        }`}
                        onClick={() => handleDomainToggle(domain)}
                      >
                        {domain}
                      </Badge>
                    ))}
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Stage Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                  Stage {selectedStage && <Badge className="ml-1 h-5 w-5 rounded-full bg-arc-accent text-white">1</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-arc-accent/30 text-white min-w-32">
                {stages.map((stage) => (
                  <DropdownMenuItem 
                    key={stage} 
                    onClick={() => handleStageChange(stage)}
                    className={`flex items-center cursor-pointer ${selectedStage === stage ? 'bg-arc-accent/20' : ''} hover:bg-arc-accent/30`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${selectedStage === stage ? 'bg-arc-accent' : 'bg-gray-600'}`}></div>
                    {stage}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Team Size Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-arc-accent/30 text-white hover:bg-arc-accent/20">
                  Team Size {selectedTeamSize && <Badge className="ml-1 h-5 w-5 rounded-full bg-arc-accent text-white">1</Badge>}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/95 border-arc-accent/30 text-white min-w-32">
                {teamSizes.map((size) => (
                  <DropdownMenuItem 
                    key={size} 
                    onClick={() => handleTeamSizeChange(size)}
                    className={`flex items-center cursor-pointer ${selectedTeamSize === size ? 'bg-arc-accent/20' : ''} hover:bg-arc-accent/30`}
                  >
                    <div className={`w-2 h-2 rounded-full mr-2 ${selectedTeamSize === size ? 'bg-arc-accent' : 'bg-gray-600'}`}></div>
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Sort By Dropdown */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px] bg-black/40 border-arc-accent/30 text-white">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-black/95 border-arc-accent/30 text-white">
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option} className="focus:bg-arc-accent/20 focus:text-white">
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Reset Button */}
            {(hasFilters || sortBy !== "Recent") && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleReset}
                className="text-gray-400 hover:bg-arc-accent/20 hover:text-white"
              >
                <X size={18} />
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Selected Filters (Desktop) */}
      {!isMobile && selectedDomains.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedDomains.map((domain) => (
            <Badge
              key={domain}
              variant="default"
              className="bg-arc-accent/20 text-arc-accent hover:bg-arc-accent/30"
            >
              {domain}
              <button
                className="ml-2 text-arc-accent hover:text-white"
                onClick={() => handleDomainToggle(domain)}
              >
                <X size={12} />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
