import { AnimationStep } from '@/types/sorting';

export const mergeSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];

  const merge = (low: number, mid: number, high: number) => {
    const left = auxiliaryArray.slice(low, mid + 1);
    const right = auxiliaryArray.slice(mid + 1, high + 1);
    
    let i = 0, j = 0, k = low;

    while (i < left.length && j < right.length) {
      // Comparison
      animations.push({ type: 'compare', indices: [low + i, mid + 1 + j] });
      
      if (left[i] <= right[j]) {
        animations.push({ type: 'overwrite', indices: [k], value: left[i] });
        auxiliaryArray[k] = left[i];
        i++;
      } else {
        animations.push({ type: 'overwrite', indices: [k], value: right[j] });
        auxiliaryArray[k] = right[j];
        j++;
      }
      k++;
    }

    while (i < left.length) {
      animations.push({ type: 'overwrite', indices: [k], value: left[i] });
      auxiliaryArray[k] = left[i];
      i++;
      k++;
    }

    while (j < right.length) {
      animations.push({ type: 'overwrite', indices: [k], value: right[j] });
      auxiliaryArray[k] = right[j];
      j++;
      k++;
    }
  };

  const sort = (low: number, high: number) => {
    if (low < high) {
      const mid = Math.floor((low + high) / 2);
      sort(low, mid);
      sort(mid + 1, high);
      merge(low, mid, high);
      
      // If we are at the top-level merge, mark everything as sorted
      if (low === 0 && high === auxiliaryArray.length - 1) {
        for (let i = 0; i < auxiliaryArray.length; i++) {
          animations.push({ type: 'sorted', indices: [i] });
        }
      }
    }
  };

  sort(0, auxiliaryArray.length - 1);
  return animations;
};
