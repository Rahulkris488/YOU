import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Answer, OnboardingQuestion } from '@/types/onboarding';

import { AnswerOption } from './AnswerOption';

const theme = {
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

type QuestionCardProps = {
  question: OnboardingQuestion;
  selectedAnswer?: Answer;
  onSelect: (answer: Answer) => void;
};

export function QuestionCard({
  question,
  selectedAnswer,
  onSelect,
}: QuestionCardProps): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Text style={styles.kicker}>LOCK YOUR ANSWER</Text>
      <Text style={styles.title}>{question.title}</Text>
      <View style={styles.options}>
        {question.options.map(option => (
          <AnswerOption
            key={option.answer}
            option={option}
            selected={selectedAnswer === option.answer}
            onPress={() => onSelect(option.answer)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    gap: 22,
    padding: 18,
    shadowColor: theme.purple,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  kicker: {
    color: theme.purple,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  title: {
    color: theme.text,
    fontSize: 31,
    fontWeight: '900',
    lineHeight: 36,
  },
  options: {
    gap: 14,
  },
});
