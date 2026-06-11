import { useEffect, useMemo, useState } from 'react';

import { onboardingQuestions } from '@/data/questions';
import { getDriverResult } from '@/data/scoring';
import {
  clearOnboardingState,
  loadOnboardingState,
  saveOnboardingState,
} from '@/services/onboardingStorage';
import type { Answer, OnboardingAnswers } from '@/types/onboarding';

type OnboardingPhase = 'question' | 'analysis' | 'reveal';

export function useOnboarding() {
  const [answers, setAnswers] = useState<OnboardingAnswers>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<OnboardingPhase>('question');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    let mounted = true;

    loadOnboardingState().then(state => {
      if (!mounted) {
        return;
      }

      if (state?.answers) {
        setAnswers(state.answers);
        const firstUnansweredIndex = onboardingQuestions.findIndex(question => !state.answers[question.id]);
        setCurrentIndex(firstUnansweredIndex === -1 ? onboardingQuestions.length - 1 : firstUnansweredIndex);
        setPhase(state.completedDriverId ? 'reveal' : 'question');
      }

      setIsHydrated(true);
    });

    return () => {
      mounted = false;
    };
  }, []);

  const currentQuestion = onboardingQuestions[currentIndex];
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const result = useMemo(() => getDriverResult(answers), [answers]);
  const progress = onboardingQuestions.length === 0 ? 0 : (currentIndex + 1) / onboardingQuestions.length;
  const canContinue = Boolean(currentAnswer);

  function selectAnswer(answer: Answer) {
    if (!currentQuestion) {
      return;
    }

    const nextAnswers = {
      ...answers,
      [currentQuestion.id]: answer,
    };

    setAnswers(nextAnswers);
    saveOnboardingState(nextAnswers).catch(() => {});
  }

  function goBack() {
    setCurrentIndex(index => Math.max(index - 1, 0));
  }

  function goNext() {
    if (!canContinue) {
      return;
    }

    const isLastQuestion = currentIndex === onboardingQuestions.length - 1;

    if (isLastQuestion) {
      setPhase('analysis');
      return;
    }

    setCurrentIndex(index => Math.min(index + 1, onboardingQuestions.length - 1));
  }

  function revealDriver() {
    setPhase('reveal');
    saveOnboardingState(answers, result.driver.id).catch(() => {});
  }

  function reset() {
    setAnswers({});
    setCurrentIndex(0);
    setPhase('question');
    clearOnboardingState().catch(() => {});
  }

  return {
    answers,
    canContinue,
    currentAnswer,
    currentIndex,
    currentQuestion,
    goBack,
    goNext,
    isHydrated,
    phase,
    progress,
    questions: onboardingQuestions,
    reset,
    result,
    revealDriver,
    selectAnswer,
  };
}
