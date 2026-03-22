'use client';

import React, { useState, useRef, useEffect } from 'react';

interface AlgorithmSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const ALGORITHM_GROUPS = [
  {
    label: "Simple Sorts",
    options: ["Bubble Sort", "Selection Sort", "Insertion Sort"]
  },
  {
    label: "Efficient Sorts",
    options: ["Quick Sort", "Merge Sort", "Heap Sort"]
  },
  {
    label: "Distribution Sorts",
    options: ["Counting Sort", "Radix Sort", "Bucket Sort"]
  },
  {
    label: "Exotic Sorts",
    options: ["Shell Sort", "Cocktail Shaker Sort", "Comb Sort"]
  },
  {
    label: "Fun Sorts",
    options: ["Bogo Sort"]
  }
];

export default function AlgorithmSelect({ value, onChange, disabled }: AlgorithmSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    if (isOpen) {
      // Check if we should open upward
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - rect.bottom;
        const menuHeight = 350; // Max height we expect
        if (spaceBelow < menuHeight && rect.top > menuHeight) {
          setOpenUpward(true);
        } else {
          setOpenUpward(false);
        }
      }
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative min-w-[220px]">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl border transition-all duration-300 ${
          isOpen 
            ? 'bg-zinc-800/80 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' 
            : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="text-sm font-medium text-zinc-200">{value}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${isOpen ? 'rotate-180 text-indigo-400' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className={`absolute left-0 w-full overflow-hidden bg-zinc-900/95 border border-zinc-800 rounded-xl shadow-2xl backdrop-blur-xl z-50 animate-in fade-in duration-300 ${
          openUpward 
            ? 'bottom-full mb-2 slide-in-from-bottom-4' 
            : 'top-full mt-2 slide-in-from-top-4'
        }`}>
          <div className="max-h-[min(350px,40vh)] overflow-y-auto custom-scrollbar">
            {ALGORITHM_GROUPS.map((group) => (
              <div key={group.label} className="px-2 pb-2 mb-2 border-b border-zinc-800/50 last:border-0 last:mb-0 last:pb-0">
                <div className="px-3 py-1.5 text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
                  {group.label}
                </div>
                {group.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      onChange(option);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center justify-between group ${
                      value === option 
                        ? 'bg-indigo-500/10 text-indigo-400 font-bold' 
                        : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                    }`}
                  >
                    <span>{option}</span>
                    {value === option && (
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,1)]" />
                    )}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3f3f46;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #52525b;
        }
      `}</style>
    </div>
  );
}
