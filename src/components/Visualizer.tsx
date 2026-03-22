'use client';

import React from 'react';

interface VisualizerProps {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

const Visualizer: React.FC<VisualizerProps> = ({
  array,
  comparing,
  swapping,
  sorted,
}) => {
  const maxVal = Math.max(...array, 1);

  return (
    <div className="relative flex items-end justify-center w-full h-[45vh] gap-1 px-4 overflow-hidden rounded-2xl bg-zinc-950/20 shadow-inner">
      {/* Background Hero Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
      
      {array.map((value, idx) => {
        let barColor = 'bg-zinc-800'; // Muted Default
        
        if (swapping.includes(idx)) {
          barColor = 'bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.7)] z-10'; // Branding Pink
        } else if (comparing.includes(idx)) {
          barColor = 'bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.7)] z-10'; // Branding Indigo
        } else if (sorted.includes(idx)) {
          barColor = 'bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.3)]'; // Success Emerald
        }

        return (
          <div
            key={idx}
            className={`flex-1 min-w-[2px] rounded-t-lg transition-all duration-200 ease-out border-t border-white/10 ${barColor}`}
            style={{
              height: `${(value / maxVal) * 100}%`,
            }}
          />
        );
      })}
    </div>
  );
};

export default Visualizer;
