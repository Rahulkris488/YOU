import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type ScreenPlaceholderProps = {
  title: string;
  description: string;
};

export function ScreenPlaceholder({ title, description }: ScreenPlaceholderProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '700',
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginTop: spacing.sm,
  },
});

