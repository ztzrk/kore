export type AnimationType = 'compare' | 'swap' | 'sorted' | 'overwrite';

export interface AnimationStep {
  type: AnimationType;
  indices: number[];
  value?: number; // Optional value for cases where we might need to update a specific value
}

export interface SortingState {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}
