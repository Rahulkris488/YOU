import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft, Settings, Star } from 'lucide-react-native';
import { colors } from '@/theme/colors';

interface RoadmapHeaderProps {
  theme: {
    primary: string;
    secondary: string;
  };
}

export function RoadmapHeader({ theme }: RoadmapHeaderProps) {
  const navigation = useNavigation();
  const lightBg = colors.tints.purple;

  return (
    <View style={styles.header}>
      {/* Back button */}
      <Pressable
        style={[styles.iconButton, { backgroundColor: lightBg }]}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft size={22} color={theme.primary} />
      </Pressable>

      {/* Screen Title */}
      <View style={styles.titleContainer}>
        <View style={styles.titleSubRow}>
          <Star size={10} color={theme.primary} fill={theme.primary} />
          <Text style={[styles.titleSub, { color: theme.primary }]}>YOUR GOAL. YOUR PATH.</Text>
          <Star size={10} color={theme.primary} fill={theme.primary} />
        </View>
        <Text style={styles.titleText}>YOUMAP</Text>
      </View>

      {/* Settings button */}
      <Pressable style={[styles.iconButton, { backgroundColor: lightBg }]}>
        <Settings size={22} color={theme.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  titleSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  titleSub: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 9,
    letterSpacing: 1.4,
    fontWeight: '600',
  },
  titleText: {
    fontFamily: 'SugarPeachy-Bold',
    fontSize: 64,
    color: '#1A1C1E',
    lineHeight: 60,
    marginTop: 4,
  },
});
