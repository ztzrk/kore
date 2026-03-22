import { AnimationStep } from '@/types/sorting';

export const radixSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const max = Math.max(...auxiliaryArray);

  const countingSortForRadix = (exp: number) => {
    const output = new Array(auxiliaryArray.length);
    const count = new Array(10).fill(0);

    for (let i = 0; i < auxiliaryArray.length; i++) {
      const digit = Math.floor(auxiliaryArray[i] / exp) % 10;
      animations.push({ type: 'compare', indices: [i] });
      count[digit]++;
    }

    for (let i = 1; i < 10; i++) {
      count[i] += count[i - 1];
    }

    for (let i = auxiliaryArray.length - 1; i >= 0; i--) {
      const digit = Math.floor(auxiliaryArray[i] / exp) % 10;
      const pos = count[digit] - 1;
      output[pos] = auxiliaryArray[i];
      count[digit]--;
    }

    // Final gather phase for each pass
    for (let i = 0; i < auxiliaryArray.length; i++) {
      animations.push({ type: 'overwrite', indices: [i], value: output[i] });
      auxiliaryArray[i] = output[i];
    }
  };

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSortForRadix(exp);
  }

  for (let i = 0; i < auxiliaryArray.length; i++) {
    animations.push({ type: 'sorted', indices: [i] });
  }

  return animations;
};
