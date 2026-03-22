'use client';

import React from 'react';
import { AlgorithmData } from '@/data/algorithms';

interface AlgorithmInfoProps {
  data: AlgorithmData;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ data }) => {
  return (
    <div className="mt-2 bg-zinc-900/50 backdrop-blur-md border border-zinc-800 rounded-xl p-4 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="flex-1">
          <h2 className="text-xl font-bold text-zinc-100 mb-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
            {data.name}
          </h2>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-2xl">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 min-w-full lg:min-w-[440px]">
          <ComplexityCard 
            label="Worst Case" 
            value={data.worstCase} 
            why={data.whyWorst}
            color="border-pink-500/20 text-pink-400 hover:border-pink-500/40" 
          />
          <ComplexityCard 
            label="Average Case" 
            value={data.averageCase} 
            why={data.whyAverage}
            color="border-purple-500/20 text-purple-400 hover:border-purple-500/40" 
          />
          <ComplexityCard 
            label="Best Case" 
            value={data.bestCase} 
            why={data.whyBest}
            color="border-emerald-500/20 text-emerald-400 hover:border-emerald-500/40" 
          />
          <ComplexityCard 
            label="Space" 
            value={data.spaceComplexity} 
            why="The extra memory space required by the algorithm relative to the input size."
            color="border-indigo-500/20 text-indigo-400 hover:border-indigo-500/40" 
          />
        </div>
      </div>
    </div>
  );
};

interface ComplexityCardProps {
  label: string;
  value: string;
  why: string;
  color: string;
}

const ComplexityCard: React.FC<ComplexityCardProps> = ({ label, value, why, color }) => (
  <div className={`group relative flex flex-col p-4 rounded-xl border bg-zinc-950/50 transition-all duration-300 ${color}`}>
    <span className="text-[10px] uppercase tracking-wider font-semibold opacity-60 mb-1">
      {label}
    </span>
    <span className="text-base font-mono font-bold whitespace-nowrap">
      {value}
    </span>
    
    {/* Explanation Overlay on Hover */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-zinc-900 rounded-xl p-3 flex items-center justify-center text-center pointer-events-none border border-current/20">
      <p className="text-[10px] leading-tight text-zinc-300 font-medium">
        {why}
      </p>
    </div>
  </div>
);

export default AlgorithmInfo;
