import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Calendar, Check } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors } from '../../theme/colors';

interface FocusCardProps {
  taskTitle?: string;
  taskSubtitle?: string;
  onMarkDone?: () => void;
}

export function FocusCard({
  taskTitle = 'Practice a basic cut',
  taskSubtitle = 'in your project',
  onMarkDone = () => undefined,
}: FocusCardProps): React.JSX.Element {
  const [completed, setCompleted] = useState(false);

  const handlePress = () => {
    setCompleted(!completed);
    onMarkDone();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>TODAY'S FOCUS</Text>

      <Card
        backgroundColor="#FAF8FC"
        borderColor="#E9E3F5"
        style={styles.card}
      >
        <View style={styles.leftContent}>
          <View style={styles.iconContainer}>
            <Calendar size={20} color="#6B4EFF" />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.taskTitle, completed && styles.crossedText]}>
              {taskTitle}
            </Text>
            <Text style={styles.taskSubtitle}>{taskSubtitle}</Text>
          </View>
        </View>

        <Pressable
          style={[styles.button, completed && styles.buttonCompleted]}
          onPress={handlePress}
        >
          <Check size={14} color={completed ? '#FFFFFF' : '#6B4EFF'} style={styles.buttonIcon} />
          <Text style={[styles.buttonText, completed && styles.buttonTextCompleted]}>
            {completed ? 'Done' : 'Mark Done'}
          </Text>
        </Pressable>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 10,
    letterSpacing: 1.2,
    color: colors.muted,
    marginBottom: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: 18,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F3E8FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    paddingRight: 8,
  },
  taskTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 13,
    color: colors.text,
  },
  crossedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskSubtitle: {
    fontFamily: 'Chillax-Medium',
    fontSize: 10,
    color: colors.muted,
    marginTop: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: '#EDE9FE',
    minWidth: 105,
    justifyContent: 'center',
    minHeight: 44, // Touch target compliance
  },
  buttonCompleted: {
    backgroundColor: '#16A34A',
  },
  buttonIcon: {
    marginRight: 4,
  },
  buttonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 11,
    color: '#6B4EFF',
  },
  buttonTextCompleted: {
    color: '#FFFFFF',
  },
});
