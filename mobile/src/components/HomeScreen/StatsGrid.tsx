import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { Flame, BookOpen, Trophy, Star, Target, BarChart2, ChevronRight } from 'lucide-react-native';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 20 - 200) / 2; // Subtract margins and center space

interface StatsGridProps {
  streak?: number;
  totalXp?: number;
  currentChapter?: number;
  totalChapters?: number;
  achievementsCount?: number;
  goalsThisWeek?: number;
  totalGoalsThisWeek?: number;
  overallProgress?: number;
  onCardPress?: (cardName: string) => void;
}

export function StatsGrid({
  streak = 12,
  totalXp = 7421,
  currentChapter = 1,
  totalChapters = 10,
  achievementsCount = 4,
  goalsThisWeek = 2,
  totalGoalsThisWeek = 3,
  overallProgress = 78,
  onCardPress = () => undefined,
}: StatsGridProps): React.JSX.Element {
  return (
    <View style={styles.container}>
      {/* Background Ornament Behind Avatar */}
      <View style={styles.avatarBackdrop}>
        <View style={styles.dottedRingOuter}>
          <View style={styles.dottedRingInner} />
        </View>
      </View>

      {/* Floating Center Avatar */}
      <Image
        source={require('../../assets/avatar.webp')}
        style={styles.avatarImage}
        resizeMode="contain"
      />

      {/* Grid Layout */}
      <View style={styles.gridRow}>
        {/* Left Column */}
        <View style={styles.column}>
          {/* Card 1: Day Streak */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.indigo, borderColor: '#551FCA' }]}
            onPress={() => onCardPress('Streak')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.statNumber}>{streak}</Text>
              <Flame size={16} color="#FDE047" fill="#F59E0B" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={styles.statLabel} numberOfLines={1}>DAY STREAK</Text>
              <View style={styles.streakDotsRow}>
                {[...Array(7)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.streakDot,
                      {
                        backgroundColor:
                          i < 5 ? '#FBBF24' : 'rgba(255, 255, 255, 0.25)',
                      },
                    ]}
                  />
                ))}
              </View>
            </View>
          </Pressable>

          {/* Card 2: Chapter 1 (Lime Card - Dark Text) */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.lime, borderColor: '#9BBF1B' }]}
            onPress={() => onCardPress('Chapters')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.chapterTitle, { color: '#1A1C1E' }]} numberOfLines={1}>CH {currentChapter}</Text>
              <BookOpen size={16} color="#1A1C1E" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.chapterSubtitle, { color: 'rgba(26, 28, 30, 0.7)' }]} numberOfLines={1}>
                {currentChapter}/{totalChapters} Chapters
              </Text>
              <View style={[styles.progressBarBg, { backgroundColor: 'rgba(0, 0, 0, 0.15)' }]}>
                <View style={[styles.progressBarFill, { width: `${(currentChapter / totalChapters) * 100}%`, backgroundColor: '#1A1C1E' }]} />
              </View>
            </View>
          </Pressable>

          {/* Card 3: Achievements */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.safetyOrange, borderColor: '#C96200' }]}
            onPress={() => onCardPress('Achievements')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.statNumber}>{achievementsCount}</Text>
              <Trophy size={16} color="#FFFFFF" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={styles.statLabel} numberOfLines={1}>ACHIEVEMENTS</Text>
              <ChevronRight size={11} color="#FFFFFF" style={styles.bottomChevron} />
            </View>
          </Pressable>
        </View>

        {/* Center Spacer for Floating Avatar */}
        <View style={styles.centerSpace} />

        {/* Right Column */}
        <View style={styles.column}>
          {/* Card 1: Total XP */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.blue, borderColor: '#0267BD' }]}
            onPress={() => onCardPress('XP')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.statNumber}>{totalXp}</Text>
              <Star size={16} color="#FBBF24" fill="#FBBF24" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={styles.statLabel} numberOfLines={1}>TOTAL XP</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: '80%', backgroundColor: '#FFFFFF' }]} />
              </View>
            </View>
          </Pressable>

          {/* Card 2: Goals This Week */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.imperialRed, borderColor: '#CC0927' }]}
            onPress={() => onCardPress('Goals')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={styles.statNumber} numberOfLines={1}>
                {goalsThisWeek}/{totalGoalsThisWeek}
              </Text>
              <Target size={16} color="#FFFFFF" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={styles.statLabel} numberOfLines={1}>GOALS THIS WEEK</Text>
              <View style={styles.goalsBlocksRow}>
                {[...Array(totalGoalsThisWeek)].map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.goalBlock,
                      {
                        backgroundColor:
                          i < goalsThisWeek ? '#FFFFFF' : 'rgba(255, 255, 255, 0.25)',
                      },
                    ]}
                  />
                ))}
              </View>
              <ChevronRight size={11} color="#FFFFFF" style={styles.bottomChevron} />
            </View>
          </Pressable>

          {/* Card 3: Overall Progress (Mango Card - Dark Text) */}
          <Pressable
            style={[styles.card, { backgroundColor: colors.solid.mango, borderColor: '#C9A71E' }]}
            onPress={() => onCardPress('Progress')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: '#1A1C1E' }]}>{overallProgress}%</Text>
              <BarChart2 size={16} color="#1A1C1E" />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.statLabel, { color: 'rgba(26, 28, 30, 0.7)' }]} numberOfLines={1}>PROGRESS</Text>
              <View style={[styles.progressBarBg, { backgroundColor: 'rgba(0, 0, 0, 0.15)' }]}>
                <View style={[styles.progressBarFill, { width: `${overallProgress}%`, backgroundColor: '#1A1C1E' }]} />
              </View>
              <ChevronRight size={11} color="#1A1C1E" style={styles.bottomChevron} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 42,
    position: 'relative',
    height: 340,
  },
  avatarBackdrop: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  dottedRingOuter: {
    width: 230,
    height: 230,
    borderRadius: 115,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  avatarImage: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -72, // Sit taller and centered in spacer
    width: 240,  // Proportional avatar scale
    height: 440,
    zIndex: 0,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    zIndex: 1,
  },
  column: {
    width: COLUMN_WIDTH,
    justifyContent: 'space-between',
    height: '100%',
  },
  centerSpace: {
    width: 175,
  },
  card: {
    width: '100%',
    height: 104,
    borderRadius: 10,
    borderWidth: 1.5,
    padding: 10,
    position: 'relative',
    justifyContent: 'flex-start',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.22,
    shadowRadius: 10,
    elevation: 5,
    marginBottom:20
  },
  cardBottomSection: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 2,
  },
  statNumber: {
    fontFamily: 'SugarPeachy-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    lineHeight: 25,
  },
  statLabel: {
    fontFamily: 'Chillax-Semibold',
    fontSize: 8.5,
    color: '#E2E8F0',
    marginTop: 0.5,
  },
  chapterTitle: {
    fontFamily: 'SugarPeachy-Bold',
    fontSize: 24, // Made font bolder and larger
    color: '#FFFFFF',
    lineHeight: 20,
  },
  chapterSubtitle: {
    fontFamily: 'Chillax-Bold', // Made font bold
    fontSize: 9.5, // Match statLabel size
    color: '#E2E8F0',
    marginTop: 0.5,
  },
  streakDotsRow: {
    flexDirection: 'row',
    gap: 2.5,
    marginTop: 6,
  },
  streakDot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 1.8,
  },
  progressBarBg: {
    height: 5,
    borderRadius: 2.5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '80%',
    marginTop: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2.5,
  },

  bottomChevron: {
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  goalsBlocksRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 6,
  },
  goalBlock: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
});
