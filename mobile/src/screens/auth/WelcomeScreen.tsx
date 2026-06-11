import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { RootStackParamList } from '@/types/navigation';

type WelcomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

export function WelcomeScreen(): React.JSX.Element {
  const navigation = useNavigation<WelcomeNavigation>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.heroCard}>
          <Text style={styles.logo}>YOU</Text>
          <Text style={styles.title}>Build the story you are proud of.</Text>
          <Text style={styles.copy}>
            Discover your Driver Card, choose a goal, and turn momentum into proof.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.primaryButtonText}>CREATE ACCOUNT</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryButtonText}>I ALREADY HAVE ONE</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.background,
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  heroCard: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    gap: 18,
    marginTop: 28,
    padding: 20,
    shadowColor: theme.purple,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  logo: {
    color: theme.lime,
    fontSize: 70,
    fontWeight: '900',
    lineHeight: 74,
  },
  title: {
    color: theme.text,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39,
  },
  copy: {
    color: theme.muted,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 23,
  },
  actions: {
    gap: 12,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: theme.lime,
    borderColor: '#000000',
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 58,
  },
  primaryButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 56,
  },
  secondaryButtonText: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '900',
  },
});
