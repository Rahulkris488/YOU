import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BookOpen, CheckCircle, Star, Target, Clock, Flag } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 34; // Matches other cards' width with marginHorizontal: 17

export function ChapterProgressCard() {
  return (
    <View style={styles.cardContainer}>
      {/* Main Black Card */}
      <View style={styles.card}>
        
        {/* Top Section */}
        <View style={styles.topSection}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.chapterKicker}>CHAPTER</Text>
            <Text style={styles.chapterTitle}>Stage 1: The Basics</Text>
          </View>
          
          {/* Book Icon Container */}
          <View style={styles.bookIconWrapper}>
            <View style={styles.bookStarsLeft}>
              <Text style={styles.sparkleStar}>✦</Text>
              <Text style={styles.sparkleStarSmall}>✦</Text>
            </View>
            <View style={styles.bookIconBg}>
              <BookOpen size={24} color="#FFFFFF" />
            </View>
            <View style={styles.bookStarsRight}>
              <Text style={styles.sparkleStar}>✦</Text>
              <Text style={styles.sparkleStarSmall}>✦</Text>
            </View>
          </View>
        </View>

        {/* Horizontal Divider */}
        <View style={styles.horizontalDivider} />

        {/* Bottom Columns Section */}
        <View style={styles.bottomSection}>
          
          {/* Column 1: Step Tracker */}
          <View style={styles.column}>
            <Text style={styles.columnKicker}>STEP TRACKER</Text>
            <View style={styles.valueRow}>
              <CheckCircle size={12} color="#FFFFFF" style={styles.iconMargin} />
              <Text style={styles.valueText}>4 / 12</Text>
            </View>
            <Text style={styles.subLabelText}>Steps</Text>
            <Text style={styles.subLabelText}>Complete</Text>
            
            {/* Segmented Progress Bar */}
            <View style={styles.segmentBar}>
              {[...Array(5)].map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.segmentBlock,
                    { backgroundColor: i < 3 ? '#CEF932' : '#2D2D2D' },
                  ]}
                />
              ))}
            </View>
          </View>

          {/* Vertical Separator 1 */}
          <View style={styles.verticalSeparator} />

          {/* Column 2: XP to Next */}
          <View style={styles.column}>
            <Text style={styles.columnKicker}>XP TO NEXT</Text>
            <View style={styles.valueRow}>
              <Star size={12} color="#FFFFFF" fill="#FFFFFF" style={styles.iconMargin} />
              <Text style={styles.valueText}>150 XP</Text>
            </View>
            <Text style={styles.subLabelText}>to next</Text>
            <Text style={styles.subLabelText}>node</Text>
          </View>

          {/* Vertical Separator 2 */}
          <View style={styles.verticalSeparator} />

          {/* Column 3: Current Focus */}
          <View style={styles.column}>
            <Text style={styles.columnKicker}>CURRENT FOCUS</Text>
            <View style={styles.valueRow}>
              <Target size={12} color="#FFFFFF" style={styles.iconMargin} />
              <Text style={styles.valueText}>Skill:</Text>
            </View>
            <Text style={styles.subLabelText}>Smooth</Text>
            <Text style={styles.subLabelText}>Transitions</Text>
          </View>

          {/* Vertical Separator 3 */}
          <View style={styles.verticalSeparator} />

          {/* Column 4: Time Estimate */}
          <View style={styles.column}>
            <Text style={styles.columnKicker}>TIME ESTIMATE</Text>
            <View style={styles.valueRow}>
              <Clock size={12} color="#FFFFFF" style={styles.iconMargin} />
              <Text style={styles.valueText}>Est. 2 days</Text>
            </View>
            <View style={styles.timeFooterRow}>
              <Text style={styles.subLabelText}>to clear map</Text>
              <Flag size={9} color="#CEF932" fill="#CEF932" style={styles.flagIcon} />
            </View>
          </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 6,
    width: '100%',
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#000000',
    borderColor: '#2D2D2D',
    borderWidth: 1.5,
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTextContainer: {
    flex: 1,
  },
  chapterKicker: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 9.5,
    letterSpacing: 0.8,
    color: '#6B4EFF', // Brand Purple
    marginBottom: 2,
  },
  chapterTitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 18.5,
    color: '#FFFFFF',
  },
  bookIconWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  bookIconBg: {
    width: 44,
    height: 44,
    backgroundColor: '#6B4EFF', // Brand Purple
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#8B5CF6',
  },
  bookStarsLeft: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  bookStarsRight: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sparkleStar: {
    fontSize: 10,
    color: '#CEF932', // Neon Lime
    lineHeight: 10,
  },
  sparkleStarSmall: {
    fontSize: 6,
    color: '#CEF932',
    lineHeight: 6,
    opacity: 0.8,
  },
  horizontalDivider: {
    height: 1,
    backgroundColor: '#2D2D2D',
    width: '100%',
    marginBottom: 12,
  },
  bottomSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  column: {
    flex: 1,
    alignItems: 'flex-start',
    paddingHorizontal: 2,
  },
  columnKicker: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 7.8,
    letterSpacing: 0.5,
    color: '#6B4EFF', // Brand Purple
    marginBottom: 5,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  iconMargin: {
    marginRight: 4,
  },
  valueText: {
    fontFamily: 'Chillax-Bold',
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  subLabelText: {
    fontFamily: 'Chillax-Regular',
    fontSize: 9.5,
    color: '#8E9AA6',
    lineHeight: 11.5,
  },
  segmentBar: {
    flexDirection: 'row',
    gap: 2,
    marginTop: 6,
    width: '85%',
  },
  segmentBlock: {
    flex: 1,
    height: 5,
    borderRadius: 1.5,
  },
  verticalSeparator: {
    width: 1,
    height: '90%',
    backgroundColor: '#22252A',
    alignSelf: 'center',
    marginHorizontal: 3,
  },
  timeFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  flagIcon: {
    marginTop: 1,
    marginRight: 4,
  },
});
