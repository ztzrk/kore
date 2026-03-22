import { AnimationStep } from '@/types/sorting';

export const cocktailShakerSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  let swapped = true;
  let start = 0;
  let end = auxiliaryArray.length - 1;

  while (swapped) {
    swapped = false;

    // Left to Right
    for (let i = start; i < end; i++) {
      animations.push({ type: 'compare', indices: [i, i + 1] });
      if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
        animations.push({ type: 'swap', indices: [i, i + 1] });
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[i + 1];
        auxiliaryArray[i + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
    animations.push({ type: 'sorted', indices: [end] });
    end--;

    // Right to Left
    swapped = false;
    for (let i = end - 1; i >= start; i--) {
      animations.push({ type: 'compare', indices: [i, i + 1] });
      if (auxiliaryArray[i] > auxiliaryArray[i + 1]) {
        animations.push({ type: 'swap', indices: [i, i + 1] });
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[i + 1];
        auxiliaryArray[i + 1] = temp;
        swapped = true;
      }
    }
    animations.push({ type: 'sorted', indices: [start] });
    start++;
  }

  // Mark all remaining as sorted
  for (let i = 0; i < auxiliaryArray.length; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
