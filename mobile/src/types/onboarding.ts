export type Answer = 'A' | 'B' | 'C' | 'D';

export type QuestionId = 'q1' | 'q2' | 'q3' | 'q4';

export type OnboardingAnswers = Partial<Record<QuestionId, Answer>>;

export type AttributeKey = 'ambition' | 'ego' | 'connection' | 'healing' | 'chaos' | 'logic';

export type Attributes = Record<AttributeKey, number>;

export type OnboardingOption = {
  answer: Answer;
  label: string;
  attributes: Partial<Attributes>;
};

export type OnboardingQuestion = {
  id: QuestionId;
  title: string;
  options: OnboardingOption[];
};

export type DriverId =
  | 'VEX'
  | 'EMPYR'
  | 'SHADE'
  | 'RUST'
  | 'ECHO'
  | 'NULL'
  | 'VECTOR'
  | 'ASH'
  | 'NOCA'
  | 'SAGE'
  | 'REVENANT'
  | 'RAGE';

export type DriverProfile = {
  id: DriverId;
  name: DriverId;
  description: string;
  color: string;
  textColor: string;
  attributes: Attributes;
};

export type DriverResult = {
  driver: DriverProfile;
  distance: number;
  attributes: Attributes;
};

export type PersistedOnboardingState = {
  answers: OnboardingAnswers;
  completedDriverId?: DriverId;
  updatedAt: string;
};
