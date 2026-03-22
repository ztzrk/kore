import { AnimationStep } from '@/types/sorting';

export const bucketSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;
  if (n <= 1) return animations;

  const max = Math.max(...auxiliaryArray);
  const min = Math.min(...auxiliaryArray);
  const bucketCount = 5;
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  // Scattering phase
  for (let i = 0; i < n; i++) {
    const bucketIdx = Math.floor(((auxiliaryArray[i] - min) / (max - min + 1)) * bucketCount);
    buckets[bucketIdx].push(auxiliaryArray[i]);
    animations.push({ type: 'compare', indices: [i] });
  }

  // Sorting phase (within buckets) and Gathering phase
  let k = 0;
  for (let i = 0; i < bucketCount; i++) {
    // Mini-sort using insertion sort
    for (let j = 1; j < buckets[i].length; j++) {
      let l = j;
      while (l > 0 && buckets[i][l] < buckets[i][l - 1]) {
        [buckets[i][l], buckets[i][l - 1]] = [buckets[i][l - 1], buckets[i][l]];
        l--;
      }
    }

    // Gathering phase: overwrite
    for (let val of buckets[i]) {
      animations.push({ type: 'overwrite', indices: [k], value: val });
      auxiliaryArray[k] = val;
      k++;
    }
  }

  for (let i = 0; i < n; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
