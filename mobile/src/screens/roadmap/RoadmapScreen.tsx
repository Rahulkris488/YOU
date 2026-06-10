import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/colors';
import { BottomNavbar } from '@/components/HomeScreen/BottomNavbar';
import { RoadmapHeader } from '@/components/RoadmapScreen/RoadmapHeader';
import { MapSection } from '@/components/RoadmapScreen/MapSection';
import { TaskCard } from '@/components/RoadmapScreen/TaskCard';

export function RoadmapScreen(): React.JSX.Element {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <RoadmapHeader theme={theme} />
        <TaskCard theme={theme} />
        <MapSection />
      </ScrollView>

      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    position: 'relative',
  },
  scrollContent: {
    paddingBottom: 110,
  },
});
