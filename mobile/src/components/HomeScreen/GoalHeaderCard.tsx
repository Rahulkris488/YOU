import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Target, Flag } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors } from '../../theme/colors';

interface GoalHeaderCardProps {
  goalTitle?: string;
  level?: number;
  levelName?: string;
  tasksDone?: number;
  totalTasks?: number;
}

export function GoalHeaderCard({
  goalTitle = 'Become a Video Editor',
  level = 1,
  levelName = 'The Beginner',
  tasksDone = 3,
  totalTasks = 3,
}: GoalHeaderCardProps): React.JSX.Element {
  return (
    <Card
      style={styles.container}
      backgroundColor="#000000"
      borderColor="#111827"
    >
      <View style={styles.leftSection}>
        <View style={styles.targetIconContainer}>
          <Target size={24} color="#EF4444" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.overline}>CURRENT GOAL</Text>
          <Text style={styles.goalTitle}>{goalTitle}</Text>
          <View style={styles.statusRow}>
            <View style={styles.activeDot} />
            <Text style={styles.statusText}>
              LEVEL {level} • {levelName}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.rightSection}>
        <View style={styles.flagIconContainer}>
          <Flag size={20} color="#10B981" fill="#10B981" />
        </View>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressCount}>
            {tasksDone} / {totalTasks}
          </Text>
          <Text style={styles.progressLabel}>tasks done</Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginHorizontal: 17,
    marginTop: 1,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  targetIconContainer: {
    width: 44,
    height: 44, // Dark grey background for target icon on black card
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,

  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  overline: {
    fontFamily: 'Chillax-Medium',
    fontSize: 9,
    letterSpacing: 1,
    color: '#f7e81aff', // High-contrast grey subtext
    marginBottom: 2,
  },
  goalTitle: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 16,
    color: '#FFFFFF', // White title text
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981', // Active green dot
    marginRight: 6,
  },
  statusText: {
    fontFamily: 'Chillax-Medium',
    fontSize: 11,
    color: '#4eb95dff', // High-contrast grey
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: '#b4c3d6ff', // Dark divider
    marginHorizontal: 12,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 4,
  },
  flagIconContainer: {
    marginRight: 12,
  },
  progressTextContainer: {
    alignItems: 'flex-start',
  },
  progressCount: {
    fontFamily: 'Chillax-Bold',
    fontSize: 14,
    color: '#FFFFFF', // White progress count
  },
  progressLabel: {
    fontFamily: 'Chillax-Medium',
    fontSize: 10,
    color: '#FFFFFF', // High-contrast grey
  },
});
