import { AnimationStep } from '@/types/sorting';

export const countingSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const max = Math.max(...auxiliaryArray);
  const min = Math.min(...auxiliaryArray);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(auxiliaryArray.length);

  // Store count of each element
  for (let i = 0; i < auxiliaryArray.length; i++) {
    animations.push({ type: 'compare', indices: [i] });
    count[auxiliaryArray[i] - min]++;
  }

  // Change count[i] so that it contains the position of this element in output array
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array (stable version)
  for (let i = auxiliaryArray.length - 1; i >= 0; i--) {
    const val = auxiliaryArray[i];
    const pos = count[val - min] - 1;
    output[pos] = val;
    count[val - min]--;
    
    // We visualize this as an "overwrite" in the final gather phase
  }

  // Final gather phase: copy output back to original array
  for (let i = 0; i < auxiliaryArray.length; i++) {
    animations.push({ type: 'overwrite', indices: [i], value: output[i] });
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
