import { AnimationStep } from '@/types/sorting';

export const insertionSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  for (let i = 1; i < n; i++) {
    let j = i;
    // Highlight the current element key
    animations.push({ type: 'compare', indices: [j, j - 1] });
    
    while (j > 0 && auxiliaryArray[j] < auxiliaryArray[j - 1]) {
      // Comparison and Swap: highlight the swap and move the key
      animations.push({ type: 'swap', indices: [j, j - 1] });
      
      const temp = auxiliaryArray[j];
      auxiliaryArray[j] = auxiliaryArray[j - 1];
      auxiliaryArray[j - 1] = temp;
      
      j--;
      if (j > 0) {
        animations.push({ type: 'compare', indices: [j, j - 1] });
      }
    }
  }

  // After completion, mark all elements as sorted
  for (let i = 0; i < n; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
