
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-arc-primary to-arc-accent opacity-50 blur-sm"></div>
    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-arc-primary to-arc-accent text-white">
      <span className="text-xl font-bold">BA</span>
    </div>
  </div>
);

export default Logo;
