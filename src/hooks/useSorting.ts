import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimationStep } from '@/types/sorting';
import { generateRandomArray } from '@/utils/helpers';

interface UseSortingProps {
  initialSize?: number;
  initialSpeed?: number;
}

export const useSorting = ({ 
  initialSize = 50, 
  initialSpeed = 50 
}: UseSortingProps = {}) => {
  const [array, setArray] = useState<number[]>([]);
  const [comparing, setComparing] = useState<number[]>([]);
  const [swapping, setSwapping] = useState<number[]>([]);
  const [sorted, setSorted] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  
  const animationsRef = useRef<AnimationStep[]>([]);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const isRunningRef = useRef(false);
  const speedRef = useRef(initialSpeed);

  // Sync speed state to ref for real-time access in the loop
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const stopSorting = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
    isRunningRef.current = false;
    setIsRunning(false);
    setComparing([]);
    setSwapping([]);
    animationsRef.current = [];
  }, []);

  const resetArray = useCallback((size: number = initialSize) => {
    stopSorting();
    const newArray = generateRandomArray(size, 10, 500);
    setArray(newArray);
    setSorted([]);
  }, [initialSize, stopSorting]);

  useEffect(() => {
    resetArray();
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [resetArray]);

  const playAnimations = useCallback(() => {
    if (!isRunningRef.current || animationsRef.current.length === 0) {
      setIsRunning(false);
      isRunningRef.current = false;
      setComparing([]);
      setSwapping([]);
      return;
    }

    const currentSpeed = speedRef.current;
    const stepsToProcess = currentSpeed > 90 ? Math.floor((currentSpeed - 85) / 2) : 1;
    
    for (let k = 0; k < stepsToProcess; k++) {
      const step = animationsRef.current.shift();
      if (!step) break;

      if (step.type === 'compare') {
        setComparing(step.indices);
        setSwapping([]);
      } else if (step.type === 'swap') {
        setSwapping(step.indices);
        setComparing([]);
        
        const [i, j] = step.indices;
        setArray(prevArray => {
          const newArray = [...prevArray];
          [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
          return newArray;
        });
      } else if (step.type === 'sorted') {
        setSorted(prev => {
          const newSet = new Set([...prev, ...step.indices]);
          return Array.from(newSet);
        });
        setComparing([]);
        setSwapping([]);
      } else if (step.type === 'overwrite') {
        setSwapping(step.indices);
        setComparing([]);
        
        const [idx] = step.indices;
        const { value } = step;
        if (value !== undefined) {
          setArray(prevArray => {
            const newArray = [...prevArray];
            newArray[idx] = value;
            return newArray;
          });
        }
      }
    }

    const delay = Math.max(1, 101 - currentSpeed);
    if (isRunningRef.current) {
      timeoutIdRef.current = setTimeout(playAnimations, delay);
    }
  }, []);

  const startSorting = useCallback((animations: AnimationStep[]) => {
    if (isRunningRef.current) return;
    animationsRef.current = animations;
    isRunningRef.current = true;
    setIsRunning(true);
    playAnimations();
  }, [playAnimations]);

  return {
    array,
    comparing,
    swapping,
    sorted,
    isRunning,
    startSorting,
    stopSorting,
    resetArray,
    speed,
    setSpeed
  };
};
