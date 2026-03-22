"use client";

import React, { useState, useEffect } from "react";
import Visualizer from "@/components/Visualizer";
import Controls from "@/components/Controls";
import { useSorting } from "@/hooks/useSorting";
import { AnimationStep } from "@/types/sorting";
import { bubbleSort } from "@/utils/algorithms/bubbleSort";
import { quickSort } from "@/utils/algorithms/quickSort";
import { selectionSort } from "@/utils/algorithms/selectionSort";
import { insertionSort } from "@/utils/algorithms/insertionSort";
import { mergeSort } from "@/utils/algorithms/mergeSort";
import { heapSort } from "@/utils/algorithms/heapSort";
import { shellSort } from "@/utils/algorithms/shellSort";
import { cocktailShakerSort } from "@/utils/algorithms/cocktailShakerSort";
import { combSort } from "@/utils/algorithms/combSort";
import { countingSort } from "@/utils/algorithms/countingSort";
import { radixSort } from "@/utils/algorithms/radixSort";
import { bucketSort } from "@/utils/algorithms/bucketSort";
import { bogoSort } from "@/utils/algorithms/bogoSort";
import { algorithmsData } from "@/data/algorithms";
import Logo from "@/components/ui/Logo";
import AlgorithmInfo from "@/components/AlgorithmInfo";

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

    const [algorithm, setAlgorithm] = useState("Bubble Sort");

    // Sync size changes to the hook
    useEffect(() => {
        resetArray(size);
    }, [size, resetArray]);

    const handleStart = () => {
        const algorithms: Record<string, (arr: number[]) => AnimationStep[]> = {
            "Bubble Sort": bubbleSort,
            "Quick Sort": quickSort,
            "Selection Sort": selectionSort,
            "Insertion Sort": insertionSort,
            "Merge Sort": mergeSort,
            "Heap Sort": heapSort,
            "Shell Sort": shellSort,
            "Cocktail Shaker Sort": cocktailShakerSort,
            "Comb Sort": combSort,
            "Counting Sort": countingSort,
            "Radix Sort": radixSort,
            "Bucket Sort": bucketSort,
            "Bogo Sort": bogoSort,
        };

        if (algorithms[algorithm]) {
            const animations = algorithms[algorithm]([...array]);
            startSorting(animations);
        }
    };

    return (
        <main className="h-screen max-h-screen overflow-hidden bg-transparent text-zinc-100 flex flex-col items-center selection:bg-indigo-500/30">
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
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-none mb-1">
                            Status
                        </span>
                        <div className="flex items-center gap-2">
                            <div
                                className={`w-2 h-2 rounded-full ${isRunning ? "bg-indigo-500 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "bg-zinc-700"}`}
                            />
                            <span className="text-xs font-mono font-bold text-zinc-400">
                                {isRunning ? "RUNNING" : "IDLE"}
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
            <footer className="w-full py-8 text-center bg-zinc-950/20 backdrop-blur-sm border-t border-white/5">
                <p className="text-[11px] text-zinc-400 font-medium tracking-wide flex items-center justify-center gap-4">
                    <span>Want to request a new algorithm? Reach out on</span>
                    <a
                        href="https://www.linkedin.com/in/ztzrk/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        <span className="underline underline-offset-4 border-b border-transparent hover:border-indigo-400/50 pb-0.5">LinkedIn</span>
                    </a>
                    <span className="text-zinc-600">or</span>
                    <a
                        href="https://github.com/ztzrk"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-all duration-300 group"
                    >
                        <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="underline underline-offset-4 border-b border-transparent hover:border-pink-400/50 pb-0.5">GitHub</span>
                    </a>
                </p>
            </footer>
        </main>
    );
}
