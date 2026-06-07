import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { OnboardingFlow } from '@/app/onboarding';
import type { RootStackParamList } from '@/types/navigation';
import type { DriverId } from '@/types/onboarding';
import { useAuth } from '@/hooks/useAuth';

type OnboardingNavigation = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

export function OnboardingScreen(): React.JSX.Element {
  const navigation = useNavigation<OnboardingNavigation>();
  const { setSession, updateUser, user } = useAuth();

  function enterHome(driverId: DriverId) {
    const nextUser = user
      ? {
          ...user,
          onboardingCompleted: true,
          driver: driverId,
        }
      : {
          id: `dummy-${Date.now()}`,
          name: 'YOU User',
          email: 'you@example.com',
          avatar: '',
          createdAt: new Date().toISOString(),
          onboardingCompleted: true,
          driver: driverId,
          level: 1,
          xp: 0,
        };

    if (user) {
      updateUser(nextUser);
    } else {
      setSession('dummy-token', nextUser);
    }

    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
  }

  return <OnboardingFlow onComplete={enterHome} />;
}
