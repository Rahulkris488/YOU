import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Home, Flame, Map, BookOpen, User } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

interface BottomNavbarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

const TabHump = () => (
  <View style={styles.humpContainer}>
    <Svg width={160} height={38} viewBox="0 0 160 38">
      <Path
        d="M 0 37 C 40 37, 50 2, 80 2 C 110 2, 120 37, 160 37 L 160 38 L 0 38 Z"
        fill="#121212"
      />
      <Path
        d="M 0 37 C 40 37, 50 2, 80 2 C 110 2, 120 37, 160 37"
        fill="none"
        stroke="#222222"
        strokeWidth={1.5}
      />
    </Svg>
  </View>
);

export function BottomNavbar({
  onTabChange,
}: BottomNavbarProps): React.JSX.Element {
  const route = useRoute();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();

  let activeTab = 'HOME';
  if (route.name === 'Home') activeTab = 'HOME';
  else if (route.name === 'Journey') activeTab = 'STREAK';
  else if (route.name === 'Roadmap') activeTab = 'YOUMAP';
  else if (route.name === 'Journal') activeTab = 'YOUSTORY';
  else if (route.name === 'Profile') activeTab = 'PROFILE';

  const handlePress = (name: string) => {
    if (name === 'HOME') navigation.navigate('Home');
    else if (name === 'STREAK') navigation.navigate('Journey');
    else if (name === 'YOUMAP') navigation.navigate('Roadmap');
    else if (name === 'YOUSTORY') navigation.navigate('Journal');
    else if (name === 'PROFILE') navigation.navigate('Profile');

    if (onTabChange) {
      onTabChange(name);
    }
  };

  const tabs = [
    { name: 'STREAK', label: 'Streak', icon: Flame },
    { name: 'YOUMAP', label: 'Map', icon: Map },
    { name: 'HOME', label: 'Home', icon: Home },
    { name: 'YOUSTORY', label: 'Journal', icon: BookOpen },
    { name: 'PROFILE', label: 'Profile', icon: User },
  ];

  const barHeight = 60 + insets.bottom;

  return (
    <View style={[styles.outerContainer, { height: barHeight, paddingBottom: insets.bottom }]}>
      <View style={styles.innerContainer}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.name;
          const Icon = tab.icon;
          const isHome = tab.name === 'HOME';

          return (
            <Pressable
              key={tab.name}
              onPress={() => handlePress(tab.name)}
              style={styles.tabButton}
            >
              {isHome ? (
                <>
                  <TabHump />
                  <View style={styles.activeCircle}>
                    <Icon size={20} color="#000000" />
                  </View>
                  <Text style={isActive ? styles.tabLabelActiveHome : styles.tabLabelInactiveHome}>
                    {tab.label}
                  </Text>
                  {isActive && <View style={styles.activeDotHome} />}
                </>
              ) : (
                <>
                  <Icon
                    size={20}
                    color={isActive ? '#CEF932' : '#FFFFFF'}
                    fill={tab.name === 'STREAK' && isActive ? '#CEF932' : 'none'}
                  />
                  <Text style={isActive ? styles.tabLabelActive : styles.tabLabelInactive}>
                    {tab.label}
                  </Text>
                  {isActive && <View style={styles.activeDot} />}
                </>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#121212',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderTopWidth: 1.5,
    borderTopColor: '#222222',
    zIndex: 1000,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 60,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  },
  humpContainer: {
    position: 'absolute',
    top: -36.5,
    width: 160,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  activeCircle: {
    position: 'absolute',
    top: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#CEF932', // Brand Neon
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    shadowColor: '#CEF932',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  tabLabelActiveHome: {
    fontFamily: 'Chillax-Bold',
    fontSize: 8,
    color: '#CEF932', // Neon Lime text
    marginTop: 34,
    letterSpacing: 0.5,
    zIndex: 2,
  },
  tabLabelInactiveHome: {
    fontFamily: 'Chillax-Bold',
    fontSize: 8,
    color: '#FFFFFF',
    marginTop: 34,
    letterSpacing: 0.5,
    opacity: 0.8,
    zIndex: 2,
  },
  activeDotHome: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CEF932',
    marginTop: 2,
    zIndex: 2,
  },
  tabLabelActive: {
    fontFamily: 'Chillax-Bold',
    fontSize: 8,
    color: '#CEF932', // Neon Lime text
    marginTop: 5,
    letterSpacing: 0.5,
  },
  tabLabelInactive: {
    fontFamily: 'Chillax-Bold',
    fontSize: 8,
    color: '#FFFFFF',
    marginTop: 5,
    letterSpacing: 0.5,
    opacity: 0.8,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CEF932',
    marginTop: 2,
  },
});
