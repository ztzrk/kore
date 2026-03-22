import { AnimationStep } from '@/types/sorting';

export const bogoSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  const isSorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      animations.push({ type: 'compare', indices: [i, i + 1] });
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const shuffle = (arr: number[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      animations.push({ type: 'swap', indices: [i, j] });
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  };

  let attempts = 0;
  // Bogo Sort is highly inefficient, we limit attempts to prevent massive animation arrays
  while (!isSorted(auxiliaryArray) && attempts < 50) {
    shuffle(auxiliaryArray);
    attempts++;
  }

  if (isSorted(auxiliaryArray)) {
    for (let i = 0; i < n; i++) {
      animations.push({ type: 'sorted', indices: [i] });
    }
  }

  return animations;
};
