import { AnimationStep } from '@/types/sorting';

export const bubbleSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison: highlight the two elements being compared
      animations.push({ type: 'compare', indices: [j, j + 1] });
      
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        // Swap: highlight the swap and update the auxiliary array
        animations.push({ type: 'swap', indices: [j, j + 1] });
        
        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      }
    }
    // Sorted: Mark the last element of the current pass as sorted
    animations.push({ type: 'sorted', indices: [n - i - 1] });
  }
  // The first element is also sorted after the loop
  animations.push({ type: 'sorted', indices: [0] });

  return animations;
};
