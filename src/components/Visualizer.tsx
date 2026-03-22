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
    <div className="flex items-end justify-center w-full h-[45vh] gap-1 px-4 overflow-hidden">
      {array.map((value, idx) => {
        let barColor = 'bg-zinc-700'; // Default
        
        if (swapping.includes(idx)) {
          barColor = 'bg-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)]'; // Swapping (vibrant pink)
        } else if (comparing.includes(idx)) {
          barColor = 'bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)]'; // Comparing (neon purple)
        } else if (sorted.includes(idx)) {
          barColor = 'bg-emerald-500'; // Sorted (emerald green)
        }

        return (
          <div
            key={idx}
            className={`flex-1 min-w-[2px] rounded-t-sm transition-all duration-150 ease-out ${barColor}`}
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
