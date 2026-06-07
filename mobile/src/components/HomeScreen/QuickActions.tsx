import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Calendar, Zap, Map, BookOpen, Contact } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface ActionItem {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  bgColor: string;
  borderColor: string;
  iconColor: string;
}

interface QuickActionsProps {
  onActionPress?: (actionId: string) => void;
}

export function QuickActions({ onActionPress = () => undefined }: QuickActionsProps): React.JSX.Element {
  const actions: ActionItem[] = [
    {
      id: 'daily',
      title: 'Daily Task',
      subtitle: '1 task today',
      icon: <Calendar size={20} color="#16A34A" />,
      bgColor: colors.tints.green,
      borderColor: '#A7F3D0',
      iconColor: '#16A34A',
    },
    {
      id: 'streak',
      title: 'Streak',
      subtitle: 'Keep it alive',
      icon: <Zap size={20} color="#CA8A04" fill="#FEF9EC" />,
      bgColor: colors.tints.yellow,
      borderColor: '#FDE047',
      iconColor: '#CA8A04',
    },
    {
      id: 'youmap',
      title: 'YOUmap',
      subtitle: 'Your path',
      icon: <Map size={20} color="#2563EB" />,
      bgColor: colors.tints.blue,
      borderColor: '#93C5FD',
      iconColor: '#2563EB',
    },
    {
      id: 'youstory',
      title: 'YOUstory',
      subtitle: 'Your chapters',
      icon: <BookOpen size={20} color="#9333EA" />,
      bgColor: '#FAF2FA',
      borderColor: '#F3E8FF',
      iconColor: '#9333EA',
    },
    {
      id: 'youcard',
      title: 'YOU Card',
      subtitle: 'Your identity',
      icon: <Contact size={20} color="#EA580C" />,
      bgColor: colors.tints.orange,
      borderColor: '#FDBA74',
      iconColor: '#EA580C',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>QUICK ACTIONS</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {actions.map((action) => (
          <Pressable
            key={action.id}
            style={({ pressed }) => [
              styles.actionButton,
              {
                backgroundColor: action.bgColor,
                borderColor: action.borderColor,
                opacity: pressed ? 0.8 : 1.0,
              },
            ]}
            onPress={() => onActionPress(action.id)}
          >
            <View style={styles.iconContainer}>{action.icon}</View>
            <Text style={styles.actionTitle}>{action.title}</Text>
            <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    marginBottom: 32, // Padding at bottom of scrollable screen
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.muted,
    marginHorizontal: 16,
    marginBottom: 10,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    gap: 10,
  },
  actionButton: {
    width: 86,
    height: 98,
    borderRadius: 18,
    borderWidth: 1.5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 10,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontFamily: 'Chillax-Medium',
    fontSize: 7.5,
    color: colors.muted,
    textAlign: 'center',
  },
});
