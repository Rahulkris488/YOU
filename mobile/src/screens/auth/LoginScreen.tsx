import React from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '@/hooks/useAuth';
import type { RootStackParamList } from '@/types/navigation';
import type { User } from '@/types/user';

type LoginNavigation = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  surface: '#171717',
  text: '#FFFFFF',
};

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<LoginNavigation>();
  const { setSession } = useAuth();

  function loginWithDummyAccount(onboardingCompleted: boolean) {
    const user: User = {
      id: 'returning-dummy-user',
      name: 'Rahul',
      email: 'rahul@you.app',
      avatar: '',
      createdAt: new Date().toISOString(),
      onboardingCompleted,
      driver: onboardingCompleted ? 'VEX' : null,
      level: 1,
      xp: 0,
    };

    setSession('dummy-token', user);
    navigation.reset({
      index: 0,
      routes: [{ name: onboardingCompleted ? 'Home' : 'Onboarding' }],
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.kicker}>DUMMY AUTH</Text>
          <Text style={styles.title}>Choose a test session.</Text>
          <Text style={styles.copy}>
            Email, Google, and Apple sign-in are represented here as local dummy actions for the MVP
            workflow.
          </Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => loginWithDummyAccount(false)}>
            <Text style={styles.primaryButtonText}>EMAIL SIGN IN</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => loginWithDummyAccount(false)}>
            <Text style={styles.secondaryButtonText}>CONTINUE WITH GOOGLE</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => loginWithDummyAccount(false)}>
            <Text style={styles.secondaryButtonText}>CONTINUE WITH APPLE</Text>
          </Pressable>
          <Pressable style={styles.returningButton} onPress={() => loginWithDummyAccount(true)}>
            <Text style={styles.returningButtonText}>RETURNING USER → HOME</Text>
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
  card: {
    backgroundColor: theme.surface,
    borderColor: theme.text,
    borderRadius: 10,
    borderWidth: 4,
    gap: 16,
    marginTop: 20,
    padding: 18,
  },
  kicker: {
    color: theme.lime,
    fontSize: 12,
    fontWeight: '900',
  },
  title: {
    color: theme.text,
    fontSize: 34,
    fontWeight: '900',
    lineHeight: 39,
  },
  copy: {
    color: theme.muted,
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
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
    fontSize: 15,
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
  returningButton: {
    alignItems: 'center',
    backgroundColor: '#8B5CF6',
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    justifyContent: 'center',
    minHeight: 56,
  },
  returningButtonText: {
    color: theme.text,
    fontSize: 15,
    fontWeight: '900',
  },
});
