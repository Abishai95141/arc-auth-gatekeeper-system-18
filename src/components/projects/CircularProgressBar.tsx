
import React from 'react';

interface CircularProgressBarProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

export const CircularProgressBar: React.FC<CircularProgressBarProps> = ({ 
  progress, 
  size = 40, 
  strokeWidth = 4 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;
  
  // Linear gradient colors based on progress
  const getGradientColors = () => {
    if (progress < 30) return { start: '#FFA07A', end: '#FF8C00' };  // Reddish-orange
    if (progress < 70) return { start: '#FFFF99', end: '#FFCC33' };  // Yellow-gold
    return { start: '#A5D6A7', end: '#4CAF50' };  // Green
  };
  
  const colors = getGradientColors();
  
  return (
    <div className="flex items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.start} />
            <stop offset="100%" stopColor={colors.end} />
          </linearGradient>
        </defs>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="rgba(255, 255, 255, 0.1)"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="url(#progress-gradient)"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Text in the middle */}
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          fontSize="12"
          fontWeight="bold"
          fill="white"
        >
          {`${progress}%`}
        </text>
      </svg>
      <span className="text-sm text-gray-400">Complete</span>
    </div>
  );
};
