import { AnimationStep } from '@/types/sorting';

export const heapSort = (array: number[]): AnimationStep[] => {
  const animations: AnimationStep[] = [];
  const auxiliaryArray = [...array];
  const n = auxiliaryArray.length;

  const heapify = (size: number, i: number) => {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      animations.push({ type: 'compare', indices: [left, largest] });
      if (auxiliaryArray[left] > auxiliaryArray[largest]) {
        largest = left;
      }
    }

    if (right < size) {
      animations.push({ type: 'compare', indices: [right, largest] });
      if (auxiliaryArray[right] > auxiliaryArray[largest]) {
        largest = right;
      }
    }

    if (largest !== i) {
      animations.push({ type: 'swap', indices: [i, largest] });
      const temp = auxiliaryArray[i];
      auxiliaryArray[i] = auxiliaryArray[largest];
      auxiliaryArray[largest] = temp;

      heapify(size, largest);
    }
  };

  // Build Max Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    animations.push({ type: 'swap', indices: [0, i] });
    const temp = auxiliaryArray[0];
    auxiliaryArray[0] = auxiliaryArray[i];
    auxiliaryArray[i] = temp;

    animations.push({ type: 'sorted', indices: [i] });
    heapify(i, 0);
  }
  animations.push({ type: 'sorted', indices: [0] });

  return animations;
};
