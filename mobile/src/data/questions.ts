import type { OnboardingQuestion } from '@/types/onboarding';

export const onboardingQuestions: OnboardingQuestion[] = [
  {
    id: 'q1',
    title: 'Which would bother you more?',
    options: [
      {
        answer: 'A',
        label: 'Failing publicly',
        attributes: {
          ego: 3,
          ambition: 2,
        },
      },
      {
        answer: 'B',
        label: 'Never trying',
        attributes: {
          ambition: 4,
        },
      },
      {
        answer: 'C',
        label: 'Being forgotten',
        attributes: {
          connection: 4,
        },
      },
      {
        answer: 'D',
        label: "Becoming someone you don't respect",
        attributes: {
          healing: 2,
          ego: 1,
        },
      },
    ],
  },
  {
    id: 'q2',
    title: "Someone your age builds your dream life.\n\nWhat's your first reaction?",
    options: [
      {
        answer: 'A',
        label: 'Respect',
        attributes: {
          logic: 2,
          healing: 2,
        },
      },
      {
        answer: 'B',
        label: 'Jealousy',
        attributes: {
          ego: 3,
          chaos: 2,
        },
      },
      {
        answer: 'C',
        label: 'Curiosity',
        attributes: {
          logic: 4,
        },
      },
      {
        answer: 'D',
        label: 'Motivation',
        attributes: {
          ambition: 4,
        },
      },
    ],
  },
  {
    id: 'q3',
    title: 'Which matters more?',
    options: [
      {
        answer: 'A',
        label: 'Being admired',
        attributes: {
          ego: 3,
        },
      },
      {
        answer: 'B',
        label: 'Being understood',
        attributes: {
          connection: 4,
        },
      },
      {
        answer: 'C',
        label: 'Being remembered',
        attributes: {
          connection: 3,
          ego: 1,
        },
      },
      {
        answer: 'D',
        label: 'Being loved',
        attributes: {
          connection: 5,
        },
      },
    ],
  },
  {
    id: 'q4',
    title: 'Which sentence feels most true?',
    options: [
      {
        answer: 'A',
        label: 'I have something to prove',
        attributes: {
          ambition: 4,
          ego: 3,
        },
      },
      {
        answer: 'B',
        label: 'I owe people',
        attributes: {
          connection: 4,
        },
      },
      {
        answer: 'C',
        label: 'I need more',
        attributes: {
          ambition: 5,
        },
      },
      {
        answer: 'D',
        label: 'I need peace',
        attributes: {
          healing: 5,
        },
      },
    ],
  },
];
