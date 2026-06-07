import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

type AnalysisScreenProps = {
  onComplete: () => void;
};

export function AnalysisScreen({ onComplete }: AnalysisScreenProps): React.JSX.Element {
  const progress = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(progress, {
        toValue: 1,
        duration: 2500,
        useNativeDriver: false,
      }),
    ]).start();

    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [fade, onComplete, progress, scale]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <Animated.View style={[styles.container, { opacity: fade, transform: [{ scale }] }]}>
      <View style={styles.panel}>
        <Text style={styles.title}>CONNECTING THE DOTS...</Text>
        <View style={styles.copyStack}>
          <Text style={styles.line}>Analyzing your answers...</Text>
          <Text style={styles.line}>Building your story...</Text>
        </View>

        <View style={styles.progressTrack}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>

        <View style={styles.signalGrid}>
          <View style={[styles.signalBlock, styles.purpleBlock]} />
          <View style={[styles.signalBlock, styles.limeBlock]} />
          <View style={[styles.signalBlock, styles.whiteBlock]} />
        </View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    flex: 1,
    justifyContent: 'center',
  },
  panel: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    gap: 24,
    padding: 22,
    shadowColor: theme.lime,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  title: {
    color: theme.text,
    fontSize: 31,
    fontWeight: '900',
    lineHeight: 36,
  },
  copyStack: {
    gap: 8,
  },
  line: {
    color: theme.muted,
    fontSize: 16,
    fontWeight: '800',
  },
  progressTrack: {
    backgroundColor: theme.background,
    borderColor: theme.text,
    borderRadius: 4,
    borderWidth: 3,
    height: 22,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: theme.lime,
    height: '100%',
  },
  signalGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  signalBlock: {
    borderColor: theme.text,
    borderRadius: 6,
    borderWidth: 3,
    flex: 1,
    height: 74,
  },
  purpleBlock: {
    backgroundColor: theme.purple,
  },
  limeBlock: {
    backgroundColor: theme.lime,
  },
  whiteBlock: {
    backgroundColor: theme.text,
  },
});
