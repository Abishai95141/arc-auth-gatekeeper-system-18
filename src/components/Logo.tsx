
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`relative ${className}`}>
    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-arc-primary via-arc-accent to-arc-light opacity-80 blur-sm"></div>
    <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-arc-primary via-arc-accent to-arc-light text-white overflow-hidden">
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-white/10 rounded-full"></div>
      {/* Bevel effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-50 rounded-t-full" style={{ height: '50%' }}></div>
      {/* Logo image */}
      <img 
        src="/lovable-uploads/0f4a44f5-a6f9-4c0c-b55b-e5efc017ea50.png" 
        alt="Builders Arc" 
        className="w-3/4 h-3/4 object-contain relative z-10"
      />
    </div>
  </div>
);

export default Logo;
