import { AnimationStep } from '@/types/sorting';

export const selectionSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      // Comparison: highlight the current element and the current minimum
      animations.push({ type: 'compare', indices: [j, minIdx] });
      
      if (auxiliaryArray[j] < auxiliaryArray[minIdx]) {
        minIdx = j;
      }
    }

    if (minIdx !== i) {
      // Swap: highlight the swap and update the auxiliary array
      animations.push({ type: 'swap', indices: [i, minIdx] });
      
      const temp = auxiliaryArray[i];
      auxiliaryArray[i] = auxiliaryArray[minIdx];
      auxiliaryArray[minIdx] = temp;
    }
    
    // Sorted: Mark the element at index i as sorted
    animations.push({ type: 'sorted', indices: [i] });
  }
  // The last element is also sorted
  animations.push({ type: 'sorted', indices: [n - 1] });

  return animations;
};
