import { AnimationStep } from '@/types/sorting';

export const combSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;
  let gap = n;
  const shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    gap = Math.floor(gap / shrink);
    if (gap <= 1) {
      gap = 1;
      sorted = true;
    }

    for (let i = 0; i + gap < n; i++) {
      animations.push({ type: 'compare', indices: [i, i + gap] });
      if (auxiliaryArray[i] > auxiliaryArray[i + gap]) {
        animations.push({ type: 'swap', indices: [i, i + gap] });
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[i + gap];
        auxiliaryArray[i + gap] = temp;
        sorted = false;
      }
    }
  }

  for (let i = 0; i < n; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
