import { create } from 'zustand';

type ProgressState = {
  level: number;
  xp: number;
  streak: number;
  setProgress: (progress: Partial<Pick<ProgressState, 'level' | 'xp' | 'streak'>>) => void;
};

export const useProgressStore = create<ProgressState>((set) => ({
  level: 1,
  xp: 0,
  streak: 0,
  setProgress: (progress) => set(progress),
}));

