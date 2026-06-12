import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { Flame, BookOpen, Trophy, Star, Target, BarChart2, ChevronRight } from 'lucide-react-native';
import { colors, theme } from '../../theme/colors';

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
        <View style={[styles.dottedRingOuter, { borderColor: '#CEF932', opacity: 0.8 }]}>
          <View style={[styles.dottedRingInner, { borderColor: '#CEF932', opacity: 0.4 }]} />
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
            style={styles.streakCard}
            onPress={() => onCardPress('Streak')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: theme.shades.streak.text }]}>{streak}</Text>
              <Flame size={16} color={theme.shades.streak.text === '#FFFFFF' ? '#FDE047' : theme.secondary} fill={theme.shades.streak.text === '#FFFFFF' ? '#F59E0B' : theme.secondary} />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.statLabel, { color: theme.shades.streak.text, opacity: 0.85 }]} numberOfLines={1}>DAY STREAK</Text>
              <View style={styles.rowAlign}>
                <View style={styles.streakDotsRow}>
                  {[...Array(7)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.streakDot,
                        {
                          backgroundColor:
                            i < 5 ? (theme.shades.streak.text === '#FFFFFF' ? '#FBBF24' : theme.secondary) : 'rgba(255, 255, 255, 0.25)',
                        },
                      ]}
                    />
                  ))}
                </View>
                <ChevronRight size={11} color={theme.shades.streak.text} />
              </View>
            </View>
          </Pressable>

          {/* Card 2: Chapter 1 */}
          <Pressable
            style={styles.chaptersCard}
            onPress={() => onCardPress('Chapters')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.chapterTitle, { color: theme.shades.chapters.text }]} numberOfLines={1}>CH {currentChapter}</Text>
              <BookOpen size={16} color={theme.shades.chapters.text} />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.chapterSubtitle, { color: theme.shades.chapters.text, opacity: 0.85 }]} numberOfLines={1}>
                {currentChapter}/{totalChapters} Chapters
              </Text>
              <View style={styles.rowAlign}>
                <View style={[styles.progressBarBg, { backgroundColor: theme.shades.chapters.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)' }]}>
                  <View style={[styles.progressBarFill, { width: `${(currentChapter / totalChapters) * 100}%`, backgroundColor: theme.shades.chapters.text }]} />
                </View>
                <ChevronRight size={11} color={theme.shades.chapters.text} />
              </View>
            </View>
          </Pressable>

          {/* Card 3: Achievements */}
          <Pressable
            style={styles.achievementsCard}
            onPress={() => onCardPress('Achievements')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: theme.shades.achievements.text }]}>{achievementsCount}</Text>
              <Trophy size={16} color={theme.shades.achievements.text} />
            </View>
            <View style={styles.cardBottomSection}>
              <View style={styles.rowAlign}>
                <Text style={[styles.statLabel, { color: theme.shades.achievements.text, opacity: 0.85, marginTop: 0 }]} numberOfLines={1}>ACHIEVEMENTS</Text>
                <ChevronRight size={11} color={theme.shades.achievements.text} />
              </View>
            </View>
          </Pressable>
        </View>

        {/* Center Spacer for Floating Avatar */}
        <View style={styles.centerSpace} />

        {/* Right Column */}
        <View style={styles.column}>
          {/* Card 1: Total XP */}
          <Pressable
            style={styles.xpCard}
            onPress={() => onCardPress('XP')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: theme.shades.xp.text }]}>{totalXp}</Text>
              <Star size={16} color={theme.shades.xp.text} fill={theme.shades.xp.text === '#FFFFFF' ? '#FBBF24' : 'rgba(15, 23, 42, 0.3)'} />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.statLabel, { color: theme.shades.xp.text, opacity: 0.85 }]} numberOfLines={1}>TOTAL XP</Text>
              <View style={styles.rowAlign}>
                <View style={[styles.progressBarBg, { backgroundColor: theme.shades.xp.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)' }]}>
                  <View style={[styles.progressBarFill, { width: '80%', backgroundColor: theme.shades.xp.text }]} />
                </View>
                <ChevronRight size={11} color={theme.shades.xp.text} />
              </View>
            </View>
          </Pressable>

          {/* Card 2: Goals This Week */}
          <Pressable
            style={styles.goalsCard}
            onPress={() => onCardPress('Goals')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: theme.shades.goals.text }]} numberOfLines={1}>
                {goalsThisWeek}/{totalGoalsThisWeek}
              </Text>
              <Target size={16} color={theme.shades.goals.text} />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.statLabel, { color: theme.shades.goals.text, opacity: 0.85 }]} numberOfLines={1}>GOALS THIS WEEK</Text>
              <View style={styles.rowAlign}>
                <View style={styles.goalsBlocksRow}>
                  {[...Array(totalGoalsThisWeek)].map((_, i) => (
                    <View
                      key={i}
                      style={[
                        styles.goalBlock,
                        {
                          backgroundColor:
                            i < goalsThisWeek ? theme.shades.goals.text : (theme.shades.goals.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 0, 0, 0.15)'),
                        },
                      ]}
                    />
                  ))}
                </View>
                <ChevronRight size={11} color={theme.shades.goals.text} />
              </View>
            </View>
          </Pressable>

          {/* Card 3: Overall Progress */}
          <Pressable
            style={styles.progressCard}
            onPress={() => onCardPress('Progress')}
          >
            <View style={styles.cardHeaderRow}>
              <Text style={[styles.statNumber, { color: theme.shades.progress.text }]}>{overallProgress}%</Text>
              <BarChart2 size={16} color={theme.shades.progress.text} />
            </View>
            <View style={styles.cardBottomSection}>
              <Text style={[styles.statLabel, { color: theme.shades.progress.text, opacity: 0.85 }]} numberOfLines={1}>PROGRESS</Text>
              <View style={styles.rowAlign}>
                <View style={[styles.progressBarBg, { backgroundColor: theme.shades.progress.text === '#FFFFFF' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.15)' }]}>
                  <View style={[styles.progressBarFill, { width: `${overallProgress}%`, backgroundColor: theme.shades.progress.text }]} />
                </View>
                <ChevronRight size={11} color={theme.shades.progress.text} />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 6,
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
    borderColor: '#CEF932',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dottedRingInner: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#CEF932',
    borderStyle: 'dashed',
    opacity: 0.5,
  },
  avatarImage: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: -72,
    width: 240,
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
  streakCard: {
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
    marginBottom: 20,
    backgroundColor: '#5D27B9',
    borderColor: '#000000',
  },
  chaptersCard: {
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
    marginBottom: 20,
    backgroundColor: '#4F46E5',
    borderColor: '#000000',
  },
  achievementsCard: {
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
    marginBottom: 20,
    backgroundColor: '#6B4EFF',
    borderColor: '#000000',
  },
  xpCard: {
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
    marginBottom: 20,
    backgroundColor: '#CEF932',
    borderColor: '#000000',
  },
  goalsCard: {
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
    marginBottom: 20,
    backgroundColor: '#ADDF00',
    borderColor: '#000000',
  },
  progressCard: {
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
    marginBottom: 20,
    backgroundColor: '#E1FF63',
    borderColor: '#000000',
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
    fontSize: 24,
    color: '#FFFFFF',
    lineHeight: 20,
  },
  chapterSubtitle: {
    fontFamily: 'Chillax-Bold',
    fontSize: 9.5,
    color: '#E2E8F0',
    marginTop: 0.5,
  },
  streakDotsRow: {
    flexDirection: 'row',
    gap: 2.5,
    marginTop: 0,
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
    marginTop: 0,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2.5,
  },
  goalsBlocksRow: {
    flexDirection: 'row',
    gap: 3,
    marginTop: 0,
  },
  goalBlock: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  rowAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 6,
  },
});
