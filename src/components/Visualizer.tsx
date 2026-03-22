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
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none animate-pulse duration-[4000ms]" />
      
      {array.map((value, idx) => {
        let barColor = 'bg-zinc-800/80';
        let glow = '';
        
        if (swapping.includes(idx)) {
          barColor = 'bg-pink-400';
          glow = 'shadow-[0_0_25px_rgba(236,72,153,0.9)] z-20 scale-y-[1.02]';
        } else if (comparing.includes(idx)) {
          barColor = 'bg-indigo-400';
          glow = 'shadow-[0_0_25px_rgba(99,102,241,0.9)] z-20 scale-y-[1.02]';
        } else if (sorted.includes(idx)) {
          barColor = 'bg-emerald-400';
          glow = 'shadow-[0_0_15px_rgba(52,211,153,0.4)]';
        }

        return (
          <div
            key={idx}
            className={`flex-1 min-w-[2px] rounded-t-lg transition-all duration-200 ease-out border-t border-white/20 ${barColor} ${glow}`}
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
