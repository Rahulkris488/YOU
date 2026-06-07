import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/screens/auth/LoginScreen';
import { RegisterScreen } from '@/screens/auth/RegisterScreen';
import { CardsScreen } from '@/screens/cards/CardsScreen';
import { HomeScreen } from '@/screens/home/HomeScreen';
import { JournalScreen } from '@/screens/journal/JournalScreen';
import { JourneyScreen } from '@/screens/journey/JourneyScreen';
import { OnboardingScreen } from '@/screens/onboarding/OnboardingScreen';
import { ProfileScreen } from '@/screens/profile/ProfileScreen';
import { RoadmapScreen } from '@/screens/roadmap/RoadmapScreen';
import type { RootStackParamList } from '@/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
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
