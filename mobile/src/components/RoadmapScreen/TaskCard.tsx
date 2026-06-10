import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Clipboard, Check } from 'lucide-react-native';

interface TaskCardProps {
  theme: {
    primary: string;
    secondary: string;
  };
}

export function TaskCard({ theme }: TaskCardProps) {
  return (
    <View style={styles.taskCardContainer}>
      <View style={[styles.taskCard, { backgroundColor: '#000000', borderColor: '#000000' }]}>
        <View style={styles.taskCardLeft}>
          <View style={styles.taskIconContainer}>
            <Clipboard size={18} color="#CEF932" />
          </View>
          <View style={styles.taskCardTexts}>
            <Text style={[styles.taskKicker, { color: '#CEF932' }]}>TODAY'S TASK</Text>
            <Text style={styles.taskTitle}>Practice a basic cut in your project</Text>
          </View>
        </View>
        <Pressable style={[styles.doneButton, { backgroundColor: '#CEF932', borderColor: '#000000' }]}>
          <Check size={12} color="#000000" strokeWidth={3} />
          <Text style={styles.doneButtonText}>Mark Done</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskCardContainer: {
    alignItems: 'center',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  taskCard: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    borderWidth: 1.5,
    padding: 14,
  },
  taskCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  taskIconContainer: {
    width: 34,
    height: 34,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCardTexts: {
    flex: 1,
  },
  taskKicker: {
    fontFamily: 'Chillax-Bold',
    fontSize: 9.5,
    letterSpacing: 0.8,
  },
  taskTitle: {
    fontFamily: 'Chillax-Medium',
    fontSize: 12.5,
    color: '#FFFFFF',
    marginTop: 1,
  },
  doneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1.5,
  },
  doneButtonText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 10.5,
    color: '#000000',
  },
});
