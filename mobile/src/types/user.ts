export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  onboardingCompleted: boolean;
  driver: string | null;
  level: number;
  xp: number;
};
