import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import type { DriverResult } from '@/types/onboarding';

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

type DriverRevealProps = {
  result: DriverResult;
  onEnter: () => void;
  onShare?: () => void;
};

export function DriverReveal({ result, onEnter, onShare }: DriverRevealProps): React.JSX.Element {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.96)).current;
  const driver = result.driver;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 260,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, scale]);

  return (
    <Animated.View style={[styles.container, { opacity: fade, transform: [{ scale }] }]}>
      <Text style={styles.kicker}>YOUR DRIVER IS</Text>

      <View style={[styles.driverCard, { backgroundColor: driver.color }]}>
        <View style={styles.artwork}>
          <View style={[styles.artworkCore, { borderColor: driver.textColor }]}>
            <Text style={[styles.artworkText, { color: driver.textColor }]}>{driver.name.slice(0, 2)}</Text>
          </View>
        </View>

        <Text style={[styles.driverName, { color: driver.textColor }]}>{driver.name}</Text>
      </View>

      <View style={styles.descriptionCard}>
        <Text style={styles.description}>{driver.description}</Text>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.shareButton} onPress={onShare}>
          <Text style={styles.shareButtonText}>SHARE CARD</Text>
        </Pressable>
        <Pressable style={styles.enterButton} onPress={onEnter}>
          <Text style={styles.enterButtonText}>ENTER YOU →</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.background,
    gap: 18,
  },
  kicker: {
    color: theme.text,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0,
  },
  driverCard: {
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    minHeight: 330,
    justifyContent: 'space-between',
    padding: 20,
    shadowColor: theme.lime,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  artwork: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.22)',
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 3,
    height: 174,
    justifyContent: 'center',
    width: 174,
  },
  artworkCore: {
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 4,
    height: 104,
    justifyContent: 'center',
    width: 104,
  },
  artworkText: {
    fontSize: 30,
    fontWeight: '900',
  },
  driverName: {
    fontSize: 62,
    fontWeight: '900',
    lineHeight: 68,
  },
  descriptionCard: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    padding: 18,
  },
  description: {
    color: theme.text,
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 24,
  },
  actions: {
    gap: 12,
  },
  shareButton: {
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 56,
  },
  shareButtonText: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '900',
  },
  enterButton: {
    alignItems: 'center',
    backgroundColor: theme.lime,
    borderColor: '#000000',
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 58,
  },
  enterButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
  },
});
