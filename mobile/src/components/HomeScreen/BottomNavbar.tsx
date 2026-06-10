import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import { Home, Flame, Map, BookOpen, User, Star } from 'lucide-react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { theme } from '../../theme/colors';

interface BottomNavbarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

export function BottomNavbar({
  onTabChange,
}: BottomNavbarProps): React.JSX.Element {
  const route = useRoute();
  const navigation = useNavigation<any>();

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
    { name: 'HOME', icon: Home },
    { name: 'STREAK', icon: Flame },
    { name: 'YOUMAP', icon: Map },
    { name: 'YOUSTORY', icon: BookOpen },
    { name: 'PROFILE', icon: User },
  ];
  const activeContentColor = '#0F172A';

  return (
    <View style={[styles.outerContainer, { borderColor: '#000000' }]}>
      <ImageBackground
        source={require('../../assets/navbar-bg.jpeg')}
        style={styles.navbarBg}
        imageStyle={styles.navbarImage}
        resizeMode="cover"
      >
        <View style={styles.innerContainer}>
          {/* Left Star Decorative */}
          <Star size={10} color={theme.primary} fill={theme.primary} style={styles.starDecoration} />

          {tabs.map((tab, idx) => {
            const isActive = activeTab === tab.name;
            const Icon = tab.icon;

            return (
              <React.Fragment key={tab.name}>
                <Pressable
                  onPress={() => handlePress(tab.name)}
                  style={styles.tabButton}
                >
                  <View
                    style={[
                      styles.tabInner,
                      isActive && [styles.activeTabInner, { backgroundColor: '#CEF932' }],
                    ]}
                  >
                    <Icon
                      size={18}
                      color={isActive ? activeContentColor : '#FFFFFF'}
                      fill={isActive && tab.name === 'STREAK' ? '#0F172A' : 'none'}
                    />
                    <Text
                      style={[
                        styles.tabLabel,
                        isActive ? [styles.activeTabLabel, { color: activeContentColor }] : styles.inactiveTabLabel,
                      ]}
                    >
                      {tab.name}
                    </Text>
                  </View>
                </Pressable>

                {/* Vertical Divider only between inactive tabs */}
                {idx < tabs.length - 1 && activeTab !== tab.name && activeTab !== tabs[idx + 1].name && (
                  <View style={styles.divider} />
                )}
              </React.Fragment>
            );
          })}

          {/* Right Star Decorative */}
          <Star size={10} color={theme.primary} fill={theme.primary} style={styles.starDecoration} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 8,
    left: 20,
    right: 20,
    height: 55,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: '#000000',
    overflow: 'hidden',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  navbarBg: {
    width: '100%',
    height: '100%',
  },
  navbarImage: {
    borderRadius: 10,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  tabInner: {
    width: 52, // Fixed width so active yellow bg is not too wide
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTabInner: {
    backgroundColor: '#CEF932', // Neon Lime
    borderWidth: 1,
    borderColor: '#000000',
  },
  tabLabel: {
    fontFamily: 'Chillax-Bold',
    fontSize: 7.5,
    letterSpacing: 0.5,
    marginTop: 1.5,
  },
  activeTabLabel: {
    color: '#1A1C1E',
  },
  inactiveTabLabel: {
    color: '#FFFFFF',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  starDecoration: {
    marginHorizontal: 2,
  },
});
