import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Animated,
  Dimensions
} from 'react-native';

import { Settings, RefreshCw, User, Sparkles, Star } from 'lucide-react-native';
import { colors } from '../../theme/colors';
import { useProgressStore } from '../../store/useProgressStore';
import { useAuth } from '../../hooks/useAuth';

// Subcomponents
import { GoalHeaderCard } from '../../components/HomeScreen/GoalHeaderCard';
import { StatsGrid } from '../../components/HomeScreen/StatsGrid';
import { YouCardSection } from '../../components/HomeScreen/YouCardSection';
import { BottomNavbar } from '../../components/HomeScreen/BottomNavbar';

const { width, height } = Dimensions.get('window');

export function HomeScreen(): React.JSX.Element {


  // 2. State & Hooks
  const { user } = useAuth();
  const { level, xp, streak, setProgress } = useProgressStore();

  // UX Simulators
  const [is3amMode, setIs3amMode] = useState(false);
  const [showRelapse, setShowRelapse] = useState(false);
  const [mirrorDayActive, setMirrorDayActive] = useState(false);
  const [mirrorSecondsLeft, setMirrorSecondsLeft] = useState(60);

  // Animation values
  const relapseFadeAnim = useRef(new Animated.Value(1)).current;

  // 3. Lifecycle Effects
  useEffect(() => {
    // Check 3am Mode (between 2:00 AM and 4:00 AM)
    const hours = new Date().getHours();
    if (hours >= 2 && hours < 4) {
      setIs3amMode(true);
    }

    // Trigger Relapse Screen if streak is 0 on mount
    if (streak === 0) {
      setShowRelapse(true);
      // Run fade out after 2.7s to transition smoothly
      setTimeout(() => {
        Animated.timing(relapseFadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          setShowRelapse(false);
        });
      }, 2700);
    }
  }, []);

  // Mirror Day countdown timer
  useEffect(() => {
    if (mirrorDayActive && mirrorSecondsLeft > 0) {
      const timer = setTimeout(() => {
        setMirrorSecondsLeft(mirrorSecondsLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (mirrorSecondsLeft === 0) {
      setMirrorDayActive(false);
    }
  }, [mirrorDayActive, mirrorSecondsLeft]);

  // Handle mock actions for testing
  const triggerRelapseSimulator = () => {
    setProgress({ streak: 0 });
    relapseFadeAnim.setValue(1);
    setShowRelapse(true);
    setTimeout(() => {
      Animated.timing(relapseFadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowRelapse(false);
        setProgress({ streak: 12 }); // Reset streak back for mockup
      });
    }, 2700);
  };

  const triggerMirrorDaySimulator = () => {
    setMirrorSecondsLeft(60);
    setMirrorDayActive(true);
  };



  // 5. Relapse Screen Overlay (True OLED Black, Enforced Silence)
  if (showRelapse) {
    return (
      <Animated.View style={[styles.relapseContainer, { opacity: relapseFadeAnim }]}>
        <Text style={styles.relapseTitle}>Day 1 again.</Text>
        <Text style={styles.relapseSubtitle}>You know what that means.</Text>
      </Animated.View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Top Header Section */}
        <View style={styles.header}>
          {/* Profile Badge */}
          <View style={styles.profileBadge}>
            <User size={22} color="#FFFFFF" />
          </View>

          {/* Stylized Logo Title */}
          <View style={styles.logoContainer}>
            <View style={styles.logoSubRow}>
              <Star size={10} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.logoSub}>BUILD YOUR STORY</Text>
              <Star size={10} color="#F59E0B" fill="#F59E0B" />
            </View>
            <Text style={styles.logoText}>YOU</Text>
          </View>

          {/* Settings Action button */}
          <Pressable style={styles.iconButton}>
            <Settings size={22} color="#1A1C1E" />
          </Pressable>
        </View>

        {/* 3am Mode Banner */}
        {is3amMode && (
          <View style={styles.banner3am}>
            <Text style={styles.bannerText}>
              You're up late. Something's pushing you.
            </Text>
          </View>
        )}

        {/* Mirror Day Active Banner */}
        {mirrorDayActive && (
          <View style={styles.bannerMirror}>
            <Text style={styles.bannerMirrorText}>
              MIRROR DAY ACTIVE — REFOCUS ({mirrorSecondsLeft}s)
            </Text>
          </View>
        )}


        {/* Conditional Layout: Mirror Day displays ONLY stats/drives and locks focus/goals */}
        {!mirrorDayActive ? (
          <>
            {/* Top Current Goal Card */}
            <GoalHeaderCard />

            {/* Grid display surrounding central avatar */}
            <StatsGrid streak={streak} totalXp={xp} overallProgress={78} />

            {/* YOU Card + QR Share */}
            <YouCardSection />
          </>
        ) : (
          <>
            {/* Locked Focus Statement */}
            <View style={styles.mirrorFocusContainer}>
              <Text style={styles.mirrorFocusLabel}>IDENTITY STATEMENT</Text>
              <Text style={styles.mirrorFocusText}>
                "I am becoming a Master Video Editor and creating works that inspire millions."
              </Text>
            </View>

            {/* Grid display showing stats */}
            <StatsGrid streak={streak} totalXp={xp} overallProgress={78} />

            {/* YOU Card + QR Share */}
            <YouCardSection />

            {/* Visual Lock message */}
            <View style={styles.mirrorLockMessageContainer}>
              <Text style={styles.mirrorLockLabel}>DASHBOARD LOCK ACTIVE</Text>
              <Text style={styles.mirrorLockSub}>
                Take 60 seconds to look at your drives, streak, and identity. Silence distractions.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
      {/* Floating Bottom Navigation Bar */}
      <BottomNavbar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 0,
  },
  profileBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7C3AED',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  profileEmoji: {
    fontSize: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 28,
  },
  logoSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    
  },
  logoSub: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 9,
    letterSpacing: 1.4,
    color: '#1A1C1E',
    fontWeight: '600',
  },
  logoText: {
    fontFamily: 'SugarPeachy-Bold',
    fontSize: 64,
    color: '#1A1C1E',
    lineHeight: 60,
    marginTop: 4,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
  },
  banner3am: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#1E1B4B',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#4338CA',
  },
  bannerText: {
    fontFamily: 'Chillax-Medium',
    fontSize: 11,
    color: '#E0E7FF',
    textAlign: 'center',
  },
  bannerMirror: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#7C3AED',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C084FC',
  },
  bannerMirrorText: {
    fontFamily: 'Chillax-Medium',
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.2,
  },
  sandboxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 8,
    paddingHorizontal: 16,
  },
  sandboxBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  sandboxBtnText: {
    fontFamily: 'Chillax-Regular',
    fontSize: 8.5,
    color: colors.muted,
  },
  relapseContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  relapseTitle: {
    fontFamily: 'Chillax-Medium',
    fontSize: 28,
    fontWeight: '700',
    color: '#EF4444', // Red
    marginBottom: 6,
  },
  relapseSubtitle: {
    fontFamily: 'Chillax-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  mirrorFocusContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#DCD6F7',
    backgroundColor: '#F0EEFA',
    alignItems: 'center',
  },
  mirrorFocusLabel: {
    fontFamily: 'Chillax-Medium',
    fontSize: 10,
    letterSpacing: 1.5,
    color: '#6B4EFF',
    marginBottom: 6,
    fontWeight: '600',
  },
  mirrorFocusText: {
    fontFamily: 'Chillax-Regular',
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  mirrorLockMessageContainer: {
    marginHorizontal: 16,
    marginTop: 24,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#FECDD3',
    backgroundColor: '#FEF2F4',
    alignItems: 'center',
  },
  mirrorLockLabel: {
    fontFamily: 'Chillax-Medium',
    fontSize: 11,
    letterSpacing: 1.2,
    color: '#DC2626',
    marginBottom: 4,
    fontWeight: '700',
  },
  mirrorLockSub: {
    fontFamily: 'Chillax-Regular',
    fontSize: 11,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 16,
  },
});
