'use client';

import React, { useState, useEffect } from 'react';
import Visualizer from '@/components/Visualizer';
import Controls from '@/components/Controls';
import { useSorting } from '@/hooks/useSorting';
import { AnimationStep } from '@/types/sorting';
import { bubbleSort } from '@/utils/algorithms/bubbleSort';
import { quickSort } from '@/utils/algorithms/quickSort';
import { selectionSort } from '@/utils/algorithms/selectionSort';
import { insertionSort } from '@/utils/algorithms/insertionSort';
import { mergeSort } from '@/utils/algorithms/mergeSort';
import { heapSort } from '@/utils/algorithms/heapSort';
import { shellSort } from '@/utils/algorithms/shellSort';
import { cocktailShakerSort } from '@/utils/algorithms/cocktailShakerSort';
import { combSort } from '@/utils/algorithms/combSort';
import { countingSort } from '@/utils/algorithms/countingSort';
import { radixSort } from '@/utils/algorithms/radixSort';
import { bucketSort } from '@/utils/algorithms/bucketSort';
import { bogoSort } from '@/utils/algorithms/bogoSort';
import { algorithmsData } from '@/data/algorithms';
import Logo from '@/components/ui/Logo';
import AlgorithmInfo from '@/components/AlgorithmInfo';

export default function Home() {
  const [size, setSize] = useState(60);
  const {
    array,
    comparing,
    swapping,
    sorted,
    isRunning,
    startSorting,
    stopSorting,
    resetArray,
    speed,
    setSpeed,
  } = useSorting({ initialSize: size, initialSpeed: 80 });

  const [algorithm, setAlgorithm] = useState('Bubble Sort');

  // Sync size changes to the hook
  useEffect(() => {
    resetArray(size);
  }, [size, resetArray]);

  const handleStart = () => {
    const algorithms: Record<string, (arr: number[]) => AnimationStep[]> = {
      'Bubble Sort': bubbleSort,
      'Quick Sort': quickSort,
      'Selection Sort': selectionSort,
      'Insertion Sort': insertionSort,
      'Merge Sort': mergeSort,
      'Heap Sort': heapSort,
      'Shell Sort': shellSort,
      'Cocktail Shaker Sort': cocktailShakerSort,
      'Comb Sort': combSort,
      'Counting Sort': countingSort,
      'Radix Sort': radixSort,
      'Bucket Sort': bucketSort,
      'Bogo Sort': bogoSort,
    };

    if (algorithms[algorithm]) {
      const animations = algorithms[algorithm]([...array]);
      startSorting(animations);
    }
  };

  return (
    <main className="min-h-screen bg-transparent text-zinc-100 flex flex-col items-center selection:bg-indigo-500/30">
      {/* Header */}
      <header className="w-full py-4 px-8 flex items-center justify-between bg-zinc-950/10 border-b border-white/5 backdrop-blur-sm z-10">
        <div className="flex items-center gap-8">
          <Logo className="h-10 hover:scale-105 transition-transform duration-500" />
          <p className="hidden sm:flex text-zinc-500 text-[10px] font-bold tracking-[0.5em] uppercase border-l border-zinc-800/50 pl-8 h-5 items-center">
            The choreography of data
          </p>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">Status</span>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]' : 'bg-zinc-700'}`} />
              <span className="text-xs font-mono font-bold text-zinc-400">
                {isRunning ? 'RUNNING' : 'IDLE'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center gap-6 p-6">
        <Visualizer
          array={array}
          comparing={comparing}
          swapping={swapping}
          sorted={sorted}
        />
        
        <Controls
          onRandomize={() => resetArray(size)}
          onStart={handleStart}
          onStop={stopSorting}
          size={size}
          onSizeChange={setSize}
          speed={speed}
          onSpeedChange={setSpeed}
          isRunning={isRunning}
          algorithm={algorithm}
          onAlgorithmChange={setAlgorithm}
        />

        {algorithmsData[algorithm] && (
          <AlgorithmInfo data={algorithmsData[algorithm]} />
        )}
      </div>

      {/* Footer / Info */}
      <footer className="w-full py-3 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
        Built with Next.js & React &bull; 2026
      </footer>
    </main>
  );
}
