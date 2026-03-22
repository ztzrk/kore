import { AnimationStep } from '@/types/sorting';

export const shellSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let j = i;
      animations.push({ type: 'compare', indices: [j, j - gap] });
      
      while (j >= gap && auxiliaryArray[j] < auxiliaryArray[j - gap]) {
        animations.push({ type: 'swap', indices: [j, j - gap] });
        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j - gap];
        auxiliaryArray[j - gap] = temp;
        
        j -= gap;
        if (j >= gap) {
          animations.push({ type: 'compare', indices: [j, j - gap] });
        }
      }
    }
  }

  for (let i = 0; i < n; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
