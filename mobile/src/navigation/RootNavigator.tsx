import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';
import { WelcomeScreen } from '@/screens/auth/WelcomeScreen';
import { CardsScreen } from '@/screens/cards/CardsScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { JournalScreen } from '@/screens/journal/JournalScreen';
import { JourneyScreen } from '@/screens/journey/JourneyScreen';
import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';
import { RoadmapScreen } from '@/screens/roadmap/RoadmapScreen';
import { useAuth } from '@/hooks/useAuth';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const { isHydrated, user } = useAuth();

  if (!isHydrated) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color="#D9FF2F" />
      </View>
    );
  }

  const initialRouteName = user
    ? user.onboardingCompleted
      ? 'Home'
      : 'Onboarding'
    : 'Welcome';

  return (
    <Stack.Navigator
      key={initialRouteName}
      initialRouteName={initialRouteName}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Roadmap" component={RoadmapScreen} />
      <Stack.Screen name="Journey" component={JourneyScreen} />
      <Stack.Screen name="Journal" component={JournalScreen} />
      <Stack.Screen name="Cards" component={CardsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loading: {
    alignItems: 'center',
    backgroundColor: '#0B0B0B',
    flex: 1,
    justifyContent: 'center',
  },
});
