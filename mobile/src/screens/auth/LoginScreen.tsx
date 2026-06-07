import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenPlaceholder } from '../../components/ScreenPlaceholder';
import { AppButton } from '../../components/AppButton';
import type { RootStackParamList } from '../../types/navigation';
import { spacing } from '../../theme';

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScreenPlaceholder title="Login" description="Authenticate and start a secure session." />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton 
          title="Go to Home" 
          onPress={() => navigation.navigate('Home')} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
});

