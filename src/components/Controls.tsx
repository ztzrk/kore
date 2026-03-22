'use client';

import React from 'react';

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
    <div className="flex flex-wrap items-center justify-center gap-8 px-8 py-6 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl backdrop-blur-sm">
      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onRandomize}
          disabled={isRunning}
          className="px-6 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium text-sm text-zinc-100 active:scale-95"
        >
          Generate New Array
        </button>
        {isRunning ? (
          <button
            onClick={onStop}
            className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 transition-all font-semibold text-sm text-white shadow-lg shadow-red-500/20 active:scale-95 border border-red-500/50"
          >
            Cancel Sorting
          </button>
        ) : (
          <button
            onClick={onStart}
            disabled={isRunning}
            className="px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-sm text-white shadow-lg shadow-indigo-500/20 active:scale-95 border border-indigo-500/50"
          >
            Start {algorithm}
          </button>
        )}
      </div>

      {/* Sliders */}
      <div className="flex gap-8">
        <div className="flex flex-col gap-2 min-w-[140px]">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-1">
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
            className="w-full accent-indigo-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="flex flex-col gap-2 min-w-[140px]">
          <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-1">
            Speed
          </label>
          <input
            type="range"
            min="1"
            max="100"
            step="1"
            value={speed}
            onChange={(e) => onSpeedChange(parseInt(e.target.value))}
            className="w-full accent-indigo-500 h-1 bg-zinc-800 rounded-lg cursor-pointer"
          />
        </div>
      </div>

      {/* Algorithm Selector */}
      <div className="flex flex-col gap-2 min-w-[180px]">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold px-1">
          Algorithm
        </label>
        <select
          value={algorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          disabled={isRunning}
          className="bg-zinc-800 text-zinc-200 text-sm px-4 py-2 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all appearance-none cursor-pointer"
        >
          <optgroup label="Simple Sorts">
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Selection Sort">Selection Sort</option>
            <option value="Insertion Sort">Insertion Sort</option>
          </optgroup>
          <optgroup label="Efficient Sorts">
            <option value="Quick Sort">Quick Sort</option>
            <option value="Merge Sort">Merge Sort</option>
            <option value="Heap Sort">Heap Sort</option>
          </optgroup>
          <optgroup label="Distribution Sorts">
            <option value="Counting Sort">Counting Sort</option>
            <option value="Radix Sort">Radix Sort</option>
            <option value="Bucket Sort">Bucket Sort</option>
          </optgroup>
          <optgroup label="Exotic Sorts">
            <option value="Shell Sort">Shell Sort</option>
            <option value="Cocktail Shaker Sort">Cocktail Shaker Sort</option>
            <option value="Comb Sort">Comb Sort</option>
          </optgroup>
          <optgroup label="Fun Sorts">
            <option value="Bogo Sort">Bogo Sort</option>
          </optgroup>
        </select>
      </div>
    </div>
  );
};

export default Controls;
