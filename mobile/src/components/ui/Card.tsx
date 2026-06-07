import React from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { colors } from '../../theme/colors';

interface CardProps {
  backgroundColor?: string;
  borderColor?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export function Card({
  backgroundColor = colors.surface,
  borderColor = colors.cardBorder,
  style,
  children,
}: CardProps): React.JSX.Element {
  return (
    <View style={[styles.card, { backgroundColor, borderColor }, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
  },
});
