import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Shield, Flame } from 'lucide-react-native';
import { Card } from '../ui/Card';
import { colors } from '../../theme/colors';

interface DriverCardsProps {
  onViewAll?: () => void;
}

export function DriverCards({ onViewAll = () => undefined }: DriverCardsProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>WHAT DRIVES YOU</Text>
        <Pressable onPress={onViewAll}>
          <Text style={styles.viewAllText}>VIEW ALL →</Text>
        </Pressable>
      </View>

      <View style={styles.cardsRow}>
        {/* Pride Card (Solid Red, White Text) */}
        <Card
          backgroundColor={colors.solid.red}
          borderColor="#B91C1C"
          style={styles.driverCard}
        >
          <View style={styles.iconContainer}>
            <Shield size={20} color="#FFFFFF" fill="rgba(255,255,255,0.2)" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>PRIDE</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              You can't let yourself down.
            </Text>
          </View>
        </Card>

        {/* Spite Card (Solid Green, White Text) */}
        <Card
          backgroundColor={colors.solid.green}
          borderColor="#047857"
          style={styles.driverCard}
        >
          <View style={styles.iconContainer}>
            <Flame size={20} color="#FFFFFF" fill="rgba(255,255,255,0.2)" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>SPITE</Text>
            <Text style={styles.cardDescription} numberOfLines={2}>
              You do it because they said you couldn't.
            </Text>
          </View>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 28,
    marginTop:32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 11,
    letterSpacing: 1,
    color: '#1A1C1E', // Dark header label
  },
  viewAllText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 10,
    color: '#063d8aff', // Slate grey view all
    letterSpacing: 0.5,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  driverCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#1A1C1E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 36,
    height: 36,
    
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 14,
    color: '#FFFFFF', // High-contrast white text
    marginBottom: 1,
  },
  cardDescription: {
    fontFamily: 'Chillax-Medium',
    fontSize: 10,
    color: '#fafafaff', // Light slate text description
    lineHeight: 12,
  },
});
