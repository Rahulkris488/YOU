import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const theme = {
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  surface: '#171717',
  text: '#FFFFFF',
};

type ProgressBarProps = {
  current: number;
  total: number;
  progress: number;
};

export function ProgressBar({ current, total, progress }: ProgressBarProps): React.JSX.Element {
  const widthProgress = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(widthProgress, {
      toValue: progress,
      duration: 260,
      useNativeDriver: false,
    }).start();
  }, [progress, widthProgress]);

  const fillWidth = widthProgress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>QUESTION {current}</Text>
        <Text style={styles.percent}>{Math.round(progress * 100)}%</Text>
      </View>
      <View style={styles.track}>
        <Animated.View style={[styles.fill, { width: fillWidth }]} />
      </View>
      <Text style={styles.total}>DISCOVERY {current}/{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 0,
  },
  percent: {
    color: theme.lime,
    fontSize: 12,
    fontWeight: '900',
  },
  track: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 4,
    borderWidth: 2,
    height: 18,
    overflow: 'hidden',
  },
  fill: {
    backgroundColor: theme.lime,
    height: '100%',
  },
  total: {
    color: theme.muted,
    fontSize: 11,
    fontWeight: '800',
  },
});
