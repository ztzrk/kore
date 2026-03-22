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
    <main className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col items-center selection:bg-indigo-500/30">
      {/* Header */}
      <header className="w-full py-8 text-center bg-zinc-950/50 border-b border-zinc-900/50 backdrop-blur-sm z-10">
        <h1 className="text-4xl font-extrabold tracking-tighter bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent italic">
          KORE
        </h1>
        <p className="text-zinc-500 text-sm font-medium tracking-[0.2em] mt-1">
          THE CHOREOGRAPHY OF DATA
        </p>
      </header>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-7xl flex flex-col items-center justify-center gap-12 p-8">
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
      </div>

      {/* Footer / Info */}
      <footer className="w-full py-6 text-center text-[10px] text-zinc-600 uppercase tracking-widest font-bold">
        Built with Next.js & React &bull; 2026
      </footer>
    </main>
  );
}
