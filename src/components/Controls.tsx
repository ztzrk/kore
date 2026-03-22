'use client';

import React from 'react';

import AlgorithmSelect from './AlgorithmSelect';

interface ControlsProps {
  onRandomize: () => void;
  onStart: () => void;
  onStop: () => void;
  size: number;
  onSizeChange: (newSize: number) => void;
  speed: number;
  onSpeedChange: (newSpeed: number) => void;
  isRunning: boolean;
  algorithm: string;
  onAlgorithmChange: (algo: string) => void;
}

const Controls: React.FC<ControlsProps> = ({
  onRandomize,
  onStart,
  onStop,
  size,
  onSizeChange,
  speed,
  onSpeedChange,
  isRunning,
  algorithm,
  onAlgorithmChange,
}) => {
  return (
    <div className="relative z-20 flex flex-wrap items-center justify-center gap-8 px-8 py-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl backdrop-blur-sm">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRandomize}
          disabled={isRunning}
          className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-xs text-zinc-300 active:scale-95 border border-zinc-700/50"
        >
          Generate New
        </button>
        {isRunning ? (
          <button
            onClick={onStop}
            className="px-6 py-2.5 rounded-lg bg-pink-600 hover:bg-pink-500 transition-all font-bold text-xs text-white shadow-lg shadow-pink-500/20 active:scale-95 border border-pink-400/50"
          >
            Cancel Sorting
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xs text-white shadow-lg shadow-indigo-500/20 active:scale-95 border border-indigo-400/50"
          >
            Start {algorithm}
          </button>
        )}
      </div>

      {/* Sliders */}
      <div className="flex gap-6">
        <div className="flex flex-col gap-1.5 min-w-[120px]">
          <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold px-1">
            Array Size
          </label>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            disabled={isRunning}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-500 border border-zinc-700/30"
          />
        </div>

        <div className="flex flex-col gap-1.5 min-w-[120px]">
          <label className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold px-1">
            Speed
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-500 border border-zinc-700/30"
          />
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="flex flex-col gap-2 min-w-[220px]">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-1">
          Select Choreography
        </label>
        <AlgorithmSelect
          value={algorithm}
          onChange={onAlgorithmChange}
          disabled={isRunning}
        />
      </div>
    </div>
  );
};

export default Controls;
