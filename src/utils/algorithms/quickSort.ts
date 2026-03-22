import { AnimationStep } from '@/types/sorting';

export const quickSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  
  const partition = (low: number, high: number) => {
    const pivot = auxiliaryArray[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      // Comparison: highlight current element and pivot
      animations.push({ type: 'compare', indices: [j, high] });
      
      if (auxiliaryArray[j] < pivot) {
        i++;
        // Swap: highlight the swap and update the auxiliary array
        animations.push({ type: 'swap', indices: [i, j] });
        
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[j];
        auxiliaryArray[j] = temp;
      }
    }
    // Swap the pivot into its correct place
    animations.push({ type: 'swap', indices: [i + 1, high] });
    const temp = auxiliaryArray[i + 1];
    auxiliaryArray[i + 1] = auxiliaryArray[high];
    auxiliaryArray[high] = temp;
    
    // Pivot is now in its sorted position
    animations.push({ type: 'sorted', indices: [i + 1] });
    
    return i + 1;
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      const pi = partition(low, high);
      sort(low, pi - 1);
      sort(pi + 1, high);
    } else if (low === high) {
      // Single element is sorted
      animations.push({ type: 'sorted', indices: [low] });
    }
  };

  sort(0, auxiliaryArray.length - 1);
  return animations;
};
