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

  const resetArray = useCallback((size: number = initialSize) => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    const newArray = generateRandomArray(size, 10, 500);
    setArray(newArray);
    setComparing([]);
    setSwapping([]);
    setSorted([]);
    setIsRunning(false);
    animationsRef.current = [];
  }, [initialSize]);

  useEffect(() => {
    resetArray();
    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [resetArray]);

  const playAnimations = useCallback(() => {
    if (animationsRef.current.length === 0) {
      setIsRunning(false);
      setComparing([]);
      setSwapping([]);
      return;
    }

    // Determine how many steps to process per "tick" based on speed
    // If speed > 90, process multiple steps to make it feel super fast
    const stepsToProcess = speed > 90 ? Math.floor((speed - 85) / 2) : 1;
    
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
        setSorted(prev => [...prev, ...step.indices]);
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

    // Faster interval: translate 1-100 to 100ms - 1ms
    const delay = Math.max(1, 101 - speed);
    timeoutIdRef.current = setTimeout(playAnimations, delay);
  }, [speed]);

  const startSorting = useCallback((animations: AnimationStep[]) => {
    if (isRunning) return;
    animationsRef.current = animations;
    setIsRunning(true);
    playAnimations();
  }, [isRunning, playAnimations]);

  const stopSorting = useCallback(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setIsRunning(false);
    setComparing([]);
    setSwapping([]);
    animationsRef.current = [];
  }, []);

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
