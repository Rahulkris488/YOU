import React, { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from './src/context/AuthContext';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme/colors';

// Keep splash screen visible while fonts load
SplashScreen.preventAutoHideAsync().catch(() => {});

function App(): React.JSX.Element {
  const [fontsLoaded, fontError] = useFonts({
    'SugarPeachy-Bold': require('./src/fonts/sugar-peachy/Sugar Peachy Bold.otf'),
    'Chillax-Medium': require('./src/fonts/chillax-font/Chillax_Complete/Fonts/OTF/Chillax-Medium.otf'),
    'Chillax-Semibold': require('./src/fonts/chillax-font/Chillax_Complete/Fonts/OTF/Chillax-Semibold.otf'),
    'Chillax-Regular': require('./src/fonts/chillax-font/Chillax_Complete/Fonts/OTF/Chillax-Regular.otf'),
    'Chillax-Bold': require('./src/fonts/chillax-font/Chillax_Complete/Fonts/OTF/Chillax-Bold.otf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (fontError) {
    console.error('Font loading error:', fontError);
  }

  return (
    <AuthProvider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </View>
    </AuthProvider>
  );
}

export default App;
