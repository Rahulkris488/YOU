import { Pressable, StyleSheet, Text } from 'react-native';

import { colors, spacing } from '@/theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function AppButton({ title, onPress, disabled = false }: AppButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
  },
});

