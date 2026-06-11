import React, { useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import type { OnboardingOption } from '@/types/onboarding';

const theme = {
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  surface: '#171717',
  text: '#FFFFFF',
};

type AnswerOptionProps = {
  option: OnboardingOption;
  selected: boolean;
  onPress: () => void;
};

export function AnswerOption({ option, selected, onPress }: AnswerOptionProps): React.JSX.Element {
  const scale = useRef(new Animated.Value(1)).current;

  function animatePress(toValue: number) {
    Animated.timing(scale, {
      toValue,
      duration: 120,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      onPressIn={() => animatePress(0.98)}
      onPressOut={() => animatePress(1)}
    >
      <Animated.View
        style={[
          styles.container,
          selected && styles.selectedContainer,
          { transform: [{ scale }] },
        ]}
      >
        <View style={[styles.answerBadge, selected && styles.selectedBadge]}>
          <Text style={[styles.answerText, selected && styles.selectedBadgeText]}>{option.answer}</Text>
        </View>
        <Text style={[styles.label, selected && styles.selectedText]}>{option.label}</Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    flexDirection: 'row',
    gap: 14,
    minHeight: 72,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: theme.text,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  selectedContainer: {
    backgroundColor: theme.lime,
    borderColor: '#000000',
    shadowColor: '#FFFFFF',
  },
  answerBadge: {
    alignItems: 'center',
    backgroundColor: '#0B0B0B',
    borderColor: theme.text,
    borderRadius: 6,
    borderWidth: 2,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  selectedBadge: {
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
  },
  answerText: {
    color: theme.text,
    fontSize: 16,
    fontWeight: '900',
  },
  label: {
    color: theme.text,
    flex: 1,
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  selectedText: {
    color: '#000000',
  },
  selectedBadgeText: {
    color: '#000000',
  },
});
