import React, { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAuth } from '@/hooks/useAuth';
import { clearOnboardingState } from '@/services/onboardingStorage';
import type { RootStackParamList } from '@/types/navigation';
import type { User } from '@/types/user';

type RegisterNavigation = NativeStackNavigationProp<RootStackParamList, 'Register'>;

const theme = {
  background: '#0B0B0B',
  lime: '#D9FF2F',
  muted: '#A1A1AA',
  purple: '#8B5CF6',
  surface: '#171717',
  text: '#FFFFFF',
};

export function RegisterScreen(): React.JSX.Element {
  const navigation = useNavigation<RegisterNavigation>();
  const { setSession } = useAuth();
  const [name, setName] = useState('Rahul');
  const [email, setEmail] = useState('rahul@you.app');

  function createDummyAccount() {
    const now = new Date().toISOString();
    const user: User = {
      id: `dummy-${Date.now()}`,
      name: name.trim() || 'YOU User',
      email: email.trim() || 'you@example.com',
      avatar: '',
      createdAt: now,
      onboardingCompleted: false,
      driver: null,
      level: 1,
      xp: 0,
    };

    clearOnboardingState().catch(() => {});
    setSession('dummy-token', user);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Onboarding' }],
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.kicker}>DUMMY SIGN UP</Text>
          <Text style={styles.title}>Create your YOU profile.</Text>
          <Text style={styles.copy}>
            This local account is enough to test the full MVP flow: sign up, driver discovery,
            reveal, and Home.
          </Text>

          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>NAME</Text>
              <TextInput
                autoCapitalize="words"
                onChangeText={setName}
                placeholder="Your name"
                placeholderTextColor={theme.muted}
                style={styles.input}
                value={name}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor={theme.muted}
                style={styles.input}
                value={email}
              />
            </View>
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={createDummyAccount}>
            <Text style={styles.primaryButtonText}>SIGN UP + START DISCOVERY</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.secondaryButtonText}>USE DUMMY LOGIN</Text>
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
    gap: 18,
    marginTop: 20,
    padding: 18,
    shadowColor: theme.purple,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
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
  form: {
    gap: 14,
  },
  field: {
    gap: 8,
  },
  label: {
    color: theme.text,
    fontSize: 12,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#0B0B0B',
    borderColor: theme.text,
    borderRadius: 8,
    borderWidth: 3,
    color: theme.text,
    fontSize: 16,
    fontWeight: '800',
    minHeight: 54,
    paddingHorizontal: 14,
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
});
