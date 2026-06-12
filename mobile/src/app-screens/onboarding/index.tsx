import React, { useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AnalysisScreen } from '@/components/onboarding/AnalysisScreen';
import { DriverReveal } from '@/components/onboarding/DriverReveal';
import { ProgressBar } from '@/components/onboarding/ProgressBar';
import { QuestionCard } from '@/components/onboarding/QuestionCard';
import { useOnboarding } from '@/hooks/useOnboarding';
import type { DriverId } from '@/types/onboarding';

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

type OnboardingFlowProps = {
  onComplete: (driverId: DriverId) => void;
};

export function OnboardingFlow({ onComplete }: OnboardingFlowProps): React.JSX.Element {
  const onboarding = useOnboarding();
  const fade = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fade.setValue(0);
    translateY.setValue(12);

    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, onboarding.currentIndex, translateY]);

  if (!onboarding.isHydrated) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={theme.background} />
        <View style={styles.loading}>
          <ActivityIndicator color={theme.lime} />
        </View>
      </SafeAreaView>
    );
  }

  if (onboarding.phase === 'analysis') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={theme.background} />
        <View style={styles.analysisWrap}>
          <AnalysisScreen onComplete={onboarding.revealDriver} />
        </View>
      </SafeAreaView>
    );
  }

  if (onboarding.phase === 'reveal') {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor={theme.background} />
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <Header />
          <DriverReveal
            result={onboarding.result}
            onEnter={() => onComplete(onboarding.result.driver.id)}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.background} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <Header />
        <ProgressBar
          current={onboarding.currentIndex + 1}
          total={onboarding.questions.length}
          progress={onboarding.progress}
        />

        {onboarding.currentQuestion && (
          <Animated.View
            style={{
              opacity: fade,
              transform: [{ translateY }],
            }}
          >
            <QuestionCard
              question={onboarding.currentQuestion}
              selectedAnswer={onboarding.currentAnswer}
              onSelect={onboarding.selectAnswer}
            />
          </Animated.View>
        )}

        <View style={styles.footer}>
          <Pressable
            accessibilityRole="button"
            disabled={onboarding.currentIndex === 0}
            onPress={onboarding.goBack}
            style={[styles.backButton, onboarding.currentIndex === 0 && styles.disabledBack]}
          >
            <Text style={styles.backText}>BACK</Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            disabled={!onboarding.canContinue}
            onPress={onboarding.goNext}
            style={[styles.continueButton, !onboarding.canContinue && styles.disabledContinue]}
          >
            <Text style={[styles.continueText, !onboarding.canContinue && styles.disabledContinueText]}>
              CONTINUE →
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Header(): React.JSX.Element {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>YOU</Text>
      <Text style={styles.subtitle}>4 QUESTIONS.</Text>
      <Text style={styles.subtitle}>1 DISCOVERY.</Text>
      <Text style={styles.subtitleAccent}>100% YOU.</Text>
    </View>
  );
}

export default OnboardingFlow;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.background,
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  scrollContent: {
    gap: 24,
    padding: 20,
    paddingBottom: 34,
  },
  analysisWrap: {
    flex: 1,
    padding: 20,
  },
  header: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    padding: 18,
    shadowColor: theme.purple,
    shadowOffset: { width: 7, height: 7 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  logo: {
    color: theme.text,
    fontSize: 54,
    fontWeight: '900',
    lineHeight: 58,
  },
  subtitle: {
    color: theme.muted,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  subtitleAccent: {
    color: theme.lime,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  footer: {
    flexDirection: 'row',
    gap: 12,
  },
  backButton: {
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 58,
    paddingHorizontal: 18,
  },
  disabledBack: {
    opacity: 0.35,
  },
  backText: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '900',
  },
  continueButton: {
    alignItems: 'center',
    backgroundColor: theme.lime,
    borderColor: '#000000',
    borderRadius: 8,
    borderWidth: 3,
    flex: 1,
    justifyContent: 'center',
    minHeight: 58,
    paddingHorizontal: 18,
    shadowColor: theme.text,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  disabledContinue: {
    backgroundColor: '#3F3F46',
    borderColor: '#27272A',
    shadowOpacity: 0,
  },
  disabledContinueText: {
    color: '#A1A1AA',
  },
  continueText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
  },
});
