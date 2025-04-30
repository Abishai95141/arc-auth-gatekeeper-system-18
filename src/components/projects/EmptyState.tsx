
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Filter, Search } from 'lucide-react';

interface EmptyStateProps {
  handleReset: () => void;
  hasFilters: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({ handleReset, hasFilters }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-arc-accent/30 rounded-lg bg-black/20 animate-fade-in">
      {hasFilters ? (
        <>
          <Filter size={48} className="text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No matching projects found</h3>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            We couldn't find any projects that match your current filters. 
            Try adjusting your search criteria or clear filters to see more projects.
          </p>
          <Button 
            onClick={handleReset} 
            className="bg-arc-accent/20 text-white hover:bg-arc-accent/40 transition-colors"
          >
            Clear All Filters
          </Button>
        </>
      ) : (
        <>
          <Search size={48} className="text-gray-500 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No projects yet</h3>
          <p className="text-gray-400 text-center mb-6 max-w-md">
            Be the first to start an innovative project and invite others to collaborate.
            Share your ideas and bring them to life with the community.
          </p>
          <Link to="/projects/new">
            <Button 
              className="bg-gradient-to-r from-arc-secondary to-arc-accent text-white 
                transition-all duration-300 ease-out hover:from-arc-accent hover:to-arc-light hover:scale-[1.03]
                shadow-lg hover:shadow-[0_4px_20px_rgba(139,92,246,0.5)] flex gap-2"
            >
              <Plus size={18} />
              Start Your First Project
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};

export default EmptyState;
