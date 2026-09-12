import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

function getRank(level: number): string {
  if (level >= 1 && level <= 5) return 'Bronze V';
  if (level >= 6 && level <= 10) return 'Bronze IV';
  if (level >= 11 && level <= 15) return 'Bronze III';
  if (level >= 16 && level <= 20) return 'Bronze II';
  if (level >= 21 && level <= 25) return 'Bronze I';
  if (level >= 26 && level <= 30) return 'Silver V';
  if (level >= 31 && level <= 35) return 'Silver IV';
  if (level >= 36 && level <= 40) return 'Silver III';
  if (level >= 41 && level <= 45) return 'Silver II';
  if (level >= 46 && level <= 50) return 'Silver I';
  if (level >= 51 && level <= 55) return 'Gold V';
  if (level >= 56 && level <= 60) return 'Gold IV';
  if (level >= 61 && level <= 65) return 'Gold III';
  if (level >= 66 && level <= 70) return 'Gold II';
  if (level >= 71 && level <= 75) return 'Gold I';
  if (level >= 76 && level <= 80) return 'Platinum V';
  if (level >= 81 && level <= 85) return 'Platinum IV';
  if (level >= 86 && level <= 90) return 'Platinum III';
  if (level >= 91 && level <= 95) return 'Platinum II';
  if (level >= 96 && level <= 100) return 'Platinum I';
  return 'Ascending';
}

// Pre-require all 36 turntable frames for the novice shard
const NOVICE_FRAMES = [
  require('../../../../assets/crystals/novice_shard/frame_00.png'),
  require('../../../../assets/crystals/novice_shard/frame_01.png'),
  require('../../../../assets/crystals/novice_shard/frame_02.png'),
  require('../../../../assets/crystals/novice_shard/frame_03.png'),
  require('../../../../assets/crystals/novice_shard/frame_04.png'),
  require('../../../../assets/crystals/novice_shard/frame_05.png'),
  require('../../../../assets/crystals/novice_shard/frame_06.png'),
  require('../../../../assets/crystals/novice_shard/frame_07.png'),
  require('../../../../assets/crystals/novice_shard/frame_08.png'),
  require('../../../../assets/crystals/novice_shard/frame_09.png'),
  require('../../../../assets/crystals/novice_shard/frame_10.png'),
  require('../../../../assets/crystals/novice_shard/frame_11.png'),
  require('../../../../assets/crystals/novice_shard/frame_12.png'),
  require('../../../../assets/crystals/novice_shard/frame_13.png'),
  require('../../../../assets/crystals/novice_shard/frame_14.png'),
  require('../../../../assets/crystals/novice_shard/frame_15.png'),
  require('../../../../assets/crystals/novice_shard/frame_16.png'),
  require('../../../../assets/crystals/novice_shard/frame_17.png'),
  require('../../../../assets/crystals/novice_shard/frame_18.png'),
  require('../../../../assets/crystals/novice_shard/frame_19.png'),
  require('../../../../assets/crystals/novice_shard/frame_20.png'),
  require('../../../../assets/crystals/novice_shard/frame_21.png'),
  require('../../../../assets/crystals/novice_shard/frame_22.png'),
  require('../../../../assets/crystals/novice_shard/frame_23.png'),
  require('../../../../assets/crystals/novice_shard/frame_24.png'),
  require('../../../../assets/crystals/novice_shard/frame_25.png'),
  require('../../../../assets/crystals/novice_shard/frame_26.png'),
  require('../../../../assets/crystals/novice_shard/frame_27.png'),
  require('../../../../assets/crystals/novice_shard/frame_28.png'),
  require('../../../../assets/crystals/novice_shard/frame_29.png'),
  require('../../../../assets/crystals/novice_shard/frame_30.png'),
  require('../../../../assets/crystals/novice_shard/frame_31.png'),
  require('../../../../assets/crystals/novice_shard/frame_32.png'),
  require('../../../../assets/crystals/novice_shard/frame_33.png'),
  require('../../../../assets/crystals/novice_shard/frame_34.png'),
  require('../../../../assets/crystals/novice_shard/frame_35.png'),
];

function RotatingCrystal({ size = 120 }: { size?: number }) {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % NOVICE_FRAMES.length);
    }, 150); // ~6.7 FPS for slow rotation
    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      source={NOVICE_FRAMES[frameIndex]}
      style={{ width: size, height: size }}
      resizeMode="contain"
    />
  );
}

export default function Home() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [showMenu, setShowMenu] = useState(false);
  const currentLevel = 18;
  const currentRank = getRank(currentLevel);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#F5EFFF', '#E9F5FF', '#FAFAFC']}
        locations={[0, 0.4, 0.8]}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.menuBox}
            activeOpacity={0.7}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Feather name="menu" size={20} color="#475569" />
          </TouchableOpacity>

          {/* Quick Menu Dropdown */}
          {showMenu && (
            <View style={styles.menuDropdownCard}>
              <TouchableOpacity
                style={styles.menuDropdownItem}
                onPress={() => {
                  setShowMenu(false);
                  router.push('/(tabs)/home/achivement');
                }}
              >
                <View style={[styles.menuItemIconBox, { backgroundColor: '#FAF5FF' }]}>
                  <Ionicons name="trophy-outline" size={16} color="#7F45FF" />
                </View>
                <Text style={styles.menuDropdownText}>Achievements</Text>
                <Feather name="chevron-right" size={14} color="#94A3B8" />
              </TouchableOpacity>

              <View style={styles.menuItemDivider} />

              <TouchableOpacity
                style={styles.menuDropdownItem}
                onPress={() => {
                  setShowMenu(false);
                  router.push('/(tabs)/insights');
                }}
              >
                <View style={[styles.menuItemIconBox, { backgroundColor: '#EFF6FF' }]}>
                  <Ionicons name="bar-chart-outline" size={16} color="#2563EB" />
                </View>
                <Text style={styles.menuDropdownText}>Analytics & Stats</Text>
                <Feather name="chevron-right" size={14} color="#94A3B8" />
              </TouchableOpacity>

              <View style={styles.menuItemDivider} />

              <TouchableOpacity
                style={styles.menuDropdownItem}
                onPress={() => {
                  setShowMenu(false);
                  router.push('/(tabs)/profile');
                }}
              >
                <View style={[styles.menuItemIconBox, { backgroundColor: '#F0FDF4' }]}>
                  <Feather name="user" size={16} color="#16A34A" />
                </View>
                <Text style={styles.menuDropdownText}>Player Profile</Text>
                <Feather name="chevron-right" size={14} color="#94A3B8" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.logoContainer}>
            <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
            <Text style={styles.systemOnline}>• SYSTEM ONLINE •</Text>
          </View>
          <TouchableOpacity style={styles.bellBox}>
            <Feather name="bell" size={20} color="#475569" />
            <View style={styles.bellBadge}>
              <Text style={styles.bellBadgeText}>3</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Level / Rank Card */}
        <View style={[styles.mainCard, { width: width * 0.9 }]}>
          <View style={styles.mainCardTop}>
            <View style={styles.levelCol}>
              <Text style={styles.statLabel}>LEVEL</Text>
              <Text style={styles.levelText}>{currentLevel}</Text>
            </View>

            <View style={styles.crystalWrapper}>
              <View style={styles.crystalRing}>
                <RotatingCrystal size={110} />
              </View>
            </View>

            <View style={styles.rankCol}>
              <Text style={styles.statLabel}>RANK</Text>
              <Text style={styles.rankText}>{currentRank}</Text>
              <Text style={[styles.statLabel, { marginTop: 12 }]}>CONSISTENCY</Text>
              <Text style={styles.consistencyText}>84%</Text>
            </View>
          </View>

          {/* XP Bar */}
          <View style={styles.xpSection}>
            <LinearGradient
              colors={['#8B5CF6', '#3B82F6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.xpBarFill}
            />
            <View style={styles.xpBarTrack} />
            <View style={styles.xpTextRow}>
              <Text style={styles.xpInfo}>2,840 / 3,600 XP</Text>
              <Text style={styles.xpInfo}>•</Text>
              <Text style={styles.xpInfo}>760 XP until Level 19.</Text>
            </View>
          </View>
        </View>

        {/* Core Attributes */}
        <View style={[styles.attributesCard, { width: width * 0.9 }]}>
          <Text style={styles.sectionHeaderCentered}>CORE ATTRIBUTES</Text>
          <View style={styles.attributesRow}>

            <View style={styles.attrItem}>
              <View style={[styles.attrIconBox, { backgroundColor: '#F3E8FF' }]}>
                <MaterialCommunityIcons name="dumbbell" size={22} color="#9333EA" />
              </View>
              <Text style={styles.attrLabel}>Discipline</Text>
              <Text style={styles.attrValue}>74</Text>
              <View style={[styles.attrBar, { backgroundColor: '#9333EA', width: '74%' }]} />
            </View>

            <View style={styles.attrItem}>
              <View style={[styles.attrIconBox, { backgroundColor: '#E0F2FE' }]}>
                <MaterialCommunityIcons name="target" size={22} color="#2563EB" />
              </View>
              <Text style={styles.attrLabel}>Focus</Text>
              <Text style={styles.attrValue}>61</Text>
              <View style={[styles.attrBar, { backgroundColor: '#2563EB', width: '61%' }]} />
            </View>

            <View style={styles.attrItem}>
              <View style={[styles.attrIconBox, { backgroundColor: '#DCFCE7' }]}>
                <MaterialCommunityIcons name="lightning-bolt" size={22} color="#16A34A" />
              </View>
              <Text style={styles.attrLabel}>Energy</Text>
              <Text style={styles.attrValue}>82</Text>
              <View style={[styles.attrBar, { backgroundColor: '#16A34A', width: '82%' }]} />
            </View>

            <View style={styles.attrItem}>
              <View style={[styles.attrIconBox, { backgroundColor: '#FEF9C3' }]}>
                <Feather name="book-open" size={20} color="#D97706" />
              </View>
              <Text style={styles.attrLabel}>Knowledge</Text>
              <Text style={styles.attrValue}>55</Text>
              <View style={[styles.attrBar, { backgroundColor: '#D97706', width: '55%' }]} />
            </View>

            <View style={styles.attrItem}>
              <View style={[styles.attrIconBox, { backgroundColor: '#FCE7F3' }]}>
                <Feather name="heart" size={20} color="#DB2777" />
              </View>
              <Text style={styles.attrLabel}>Wellness</Text>
              <Text style={styles.attrValue}>69</Text>
              <View style={[styles.attrBar, { backgroundColor: '#DB2777', width: '69%' }]} />
            </View>
          </View>
        </View>

        {/* Quests */}
        <View style={[styles.questsCard, { width: width * 0.9 }]}>
          <View style={styles.questsHeader}>
            <View style={styles.questsHeaderLeft}>
              <Feather name="bookmark" size={18} color="#7F45FF" />
              <Text style={styles.sectionHeaderLeft}>TODAY'S QUESTS</Text>
            </View>
            <Text style={styles.questsCount}>2 / 4 Completed</Text>
          </View>

          {/* Quest 1 Done */}
          <View style={styles.questRow}>
            <View style={styles.questCheckDone}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
            <View style={[styles.questIconBox, { backgroundColor: '#F3E8FF' }]}>
              <MaterialCommunityIcons name="dumbbell" size={20} color="#9333EA" />
            </View>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>Morning Training</Text>
              <Text style={styles.questDesc}>Workout for 30 minutes</Text>
            </View>
            <Text style={styles.questXp}>+40 XP</Text>
            <Feather name="chevron-right" size={16} color="#94A3B8" />
          </View>
          <View style={styles.questDivider} />

          {/* Quest 2 Done */}
          <View style={styles.questRow}>
            <View style={styles.questCheckDone}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
            <View style={[styles.questIconBox, { backgroundColor: '#E0F2FE' }]}>
              <Feather name="book-open" size={18} color="#2563EB" />
            </View>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>Read 20 Pages</Text>
              <Text style={styles.questDesc}>Build knowledge</Text>
            </View>
            <Text style={styles.questXp}>+25 XP</Text>
            <Feather name="chevron-right" size={16} color="#94A3B8" />
          </View>
          <View style={styles.questDivider} />

          {/* Quest 3 Pending */}
          <View style={styles.questRow}>
            <View style={styles.questCheckPending} />
            <View style={[styles.questIconBox, { backgroundColor: '#E0F2FE' }]}>
              <MaterialCommunityIcons name="target" size={20} color="#2563EB" />
            </View>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>Meditation</Text>
              <Text style={styles.questDesc}>Meditate for 15 minutes</Text>
            </View>
            <Text style={styles.questXp}>+15 XP</Text>
            <View style={styles.circleProgress}>
              <Text style={styles.circleProgressText}>75%</Text>
            </View>
          </View>
          <View style={styles.questDivider} />

          {/* Quest 4 Done */}
          <View style={styles.questRow}>
            <View style={styles.questCheckDone}>
              <Feather name="check" size={14} color="#FFF" />
            </View>
            <View style={[styles.questIconBox, { backgroundColor: '#FCE7F3' }]}>
              <Feather name="heart" size={18} color="#DB2777" />
            </View>
            <View style={styles.questInfo}>
              <Text style={styles.questTitle}>Drink Water</Text>
              <Text style={styles.questDesc}>Drink 8 glasses</Text>
            </View>
            <Text style={styles.questXp}>+10 XP</Text>
            <Feather name="chevron-right" size={16} color="#94A3B8" />
          </View>
        </View>

        {/* Bottom Row */}
        <View style={[styles.bottomGrid, { width: width * 0.9 }]}>

          {/* Streak Card */}
          <View style={styles.streakCard}>
            <Text style={styles.sectionHeaderLeft}>STREAK</Text>
            <View style={styles.streakRow}>
              <MaterialCommunityIcons name="fire" size={40} color="#F97316" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.streakDays}>7 <Text style={styles.streakDaysSub}>Days</Text></Text>
                <Text style={styles.streakBest}>Best: 24 Days</Text>
              </View>
            </View>

            <View style={styles.weekRow}>
              {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
                <View key={i} style={styles.dayCol}>
                  <View style={styles.dayCircleDone}>
                    <Feather name="check" size={10} color="#FFF" />
                  </View>
                  <Text style={styles.dayText}>{d}</Text>
                </View>
              ))}
              {['S', 'S'].map((d, i) => (
                <View key={i + 5} style={styles.dayCol}>
                  <View style={styles.dayCirclePending} />
                  <Text style={styles.dayText}>{d}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Milestone Card */}
          <View style={styles.milestoneCard}>
            <Text style={styles.sectionHeaderLeft}>NEXT MILESTONE</Text>
            <Text style={styles.milestoneDesc}>Reach 10-day streak</Text>
            <View style={styles.milestoneRow}>
              <View>
                <Text style={styles.milestoneProg}>7/10</Text>
                <View style={styles.milestoneBarBg}>
                  <LinearGradient colors={['#8B5CF6', '#3B82F6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={[StyleSheet.absoluteFill, { width: '70%', borderRadius: 4 }]} />
                </View>
              </View>
              <Image
                source={require('../../../../assets/crystals/aqua_shard.png')}
                style={{ width: 55, height: 55 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* System Message */}
        <View style={[styles.systemMessage, { width: width * 0.9 }]}>
          <View style={styles.sysIconBox}>
            <Feather name="crosshair" size={20} color="#3B82F6" />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.sysTitle}>SYSTEM MESSAGE</Text>
            <Text style={styles.sysText}>Great progress today, Hunter.{'\n'}Keep leveling up your real life.</Text>
          </View>
          <Feather name="chevron-right" size={16} color="#3B82F6" />
        </View>

      </ScrollView>

      {/* FAB to open Add New Habit */}
      <TouchableOpacity
        style={styles.fab}
        activeOpacity={0.8}
        onPress={() => router.push('/add-habit')}
      >
        <LinearGradient
          colors={['#8B5CF6', '#3B82F6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <Feather name="plus" size={32} color="#FFF" />
        </LinearGradient>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  scrollContent: { alignItems: 'center', paddingTop: 50, paddingBottom: 100 },

  // Header
  header: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  menuDropdownCard: {
    position: 'absolute',
    top: 52,
    left: 0,
    width: 200,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  menuDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  menuItemIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  menuDropdownText: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    color: '#0E0F19',
  },
  menuItemDivider: {
    height: 1,
    backgroundColor: '#F8FAFC',
    marginHorizontal: 8,
  },
  logoContainer: { alignItems: 'center' },
  logoHabit: { fontSize: 24, fontWeight: '800', color: '#7F45FF', letterSpacing: -1 },
  logoLoop: { color: '#3B82F6' },
  systemOnline: { fontSize: 9, fontWeight: '800', color: '#10B981', letterSpacing: 1.5, marginTop: 2 },
  bellBox: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  bellBadge: {
    position: 'absolute', top: 8, right: 8, width: 14, height: 14, borderRadius: 7,
    backgroundColor: '#EF4444', justifyContent: 'center', alignItems: 'center',
  },
  bellBadgeText: { fontSize: 8, fontWeight: '800', color: '#FFF' },

  // Typography helpers
  statLabel: { fontSize: 10, fontWeight: '700', color: '#64748B', letterSpacing: 1 },
  sectionHeaderCentered: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 1, textAlign: 'center', marginBottom: 16 },
  sectionHeaderLeft: { fontSize: 10, fontWeight: '800', color: '#64748B', letterSpacing: 1 },

  // Main Card
  mainCard: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 16,
    shadowColor: '#7F45FF', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.08, shadowRadius: 20, elevation: 5,
  },
  mainCardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  levelCol: { alignItems: 'flex-start', flex: 1 },
  levelText: { fontSize: 48, fontWeight: '900', color: '#3B82F6', marginTop: -4 },
  crystalWrapper: { alignItems: 'center', justifyContent: 'center', width: 130, height: 130 },
  crystalRing: {
    width: 130, height: 130, borderRadius: 65, borderWidth: 4, borderColor: '#EDE9FF',
    justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
  },
  rankCol: { alignItems: 'flex-end', flex: 1 },
  rankText: { fontSize: 16, fontWeight: '800', color: '#7F45FF', marginTop: 2 },
  consistencyText: { fontSize: 18, fontWeight: '800', color: '#0E0F19', marginTop: 2 },

  // XP Section
  xpSection: { width: '100%' },
  xpBarTrack: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, width: '100%', position: 'absolute', zIndex: -1 },
  xpBarFill: { height: 8, borderRadius: 4, width: '78%' },
  xpTextRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 10, gap: 8 },
  xpInfo: { fontSize: 11, color: '#475569', fontWeight: '500' },

  // Attributes
  attributesCard: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 3,
  },
  attributesRow: { flexDirection: 'row', justifyContent: 'space-between' },
  attrItem: { alignItems: 'center', width: '18%' },
  attrIconBox: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  attrLabel: { fontSize: 9, fontWeight: '600', color: '#475569', marginBottom: 4 },
  attrValue: { fontSize: 14, fontWeight: '800', color: '#0E0F19', marginBottom: 6 },
  attrBar: { height: 4, borderRadius: 2, backgroundColor: '#E2E8F0', width: '100%' },

  // Quests
  questsCard: {
    backgroundColor: '#FFF', borderRadius: 24, padding: 20, marginBottom: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 3,
  },
  questsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  questsHeaderLeft: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  questsCount: { fontSize: 11, fontWeight: '700', color: '#7F45FF' },
  questRow: { flexDirection: 'row', alignItems: 'center' },
  questCheckDone: { width: 22, height: 22, borderRadius: 6, backgroundColor: '#34D399', justifyContent: 'center', alignItems: 'center' },
  questCheckPending: { width: 22, height: 22, borderRadius: 6, borderWidth: 2, borderColor: '#CBD5E1' },
  questIconBox: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 },
  questInfo: { flex: 1 },
  questTitle: { fontSize: 13, fontWeight: '700', color: '#0E0F19' },
  questDesc: { fontSize: 11, color: '#64748B', marginTop: 2 },
  questXp: { fontSize: 12, fontWeight: '700', color: '#7F45FF', marginRight: 12 },
  questDivider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 14 },
  circleProgress: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#3B82F6', justifyContent: 'center', alignItems: 'center' },
  circleProgressText: { fontSize: 9, fontWeight: '700', color: '#0E0F19' },

  // Bottom Grid
  bottomGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  streakCard: {
    width: '48%', backgroundColor: '#FFF', borderRadius: 24, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 3,
  },
  streakRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 12 },
  streakDays: { fontSize: 24, fontWeight: '900', color: '#0E0F19' },
  streakDaysSub: { fontSize: 12, fontWeight: '700', color: '#0E0F19' },
  streakBest: { fontSize: 10, color: '#64748B', fontWeight: '500' },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between' },
  dayCol: { alignItems: 'center' },
  dayCircleDone: { width: 16, height: 16, borderRadius: 8, backgroundColor: '#F9B52A', justifyContent: 'center', alignItems: 'center', marginBottom: 4 },
  dayCirclePending: { width: 16, height: 16, borderRadius: 8, borderWidth: 1.5, borderColor: '#E2E8F0', marginBottom: 4 },
  dayText: { fontSize: 9, color: '#94A3B8', fontWeight: '600' },

  milestoneCard: {
    width: '48%', backgroundColor: '#FFF', borderRadius: 24, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 10, elevation: 3,
  },
  milestoneDesc: { fontSize: 11, color: '#475569', fontWeight: '500', marginTop: 4, marginBottom: 8 },
  milestoneRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  milestoneProg: { fontSize: 20, fontWeight: '900', color: '#7F45FF', marginBottom: 6 },
  milestoneBarBg: { width: 60, height: 6, backgroundColor: '#F1F5F9', borderRadius: 4 },

  // System Message
  systemMessage: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#EFF6FF', borderRadius: 20, padding: 16,
  },
  sysIconBox: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#DBEAFE', justifyContent: 'center', alignItems: 'center' },
  sysTitle: { fontSize: 9, fontWeight: '800', color: '#3B82F6', letterSpacing: 1, marginBottom: 2 },
  sysText: { fontSize: 12, color: '#1E3A8A', fontWeight: '500', lineHeight: 16 },

  // FAB
  fab: { position: 'absolute', bottom: 20, right: 20, shadowColor: '#3B82F6', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8 },
  fabGradient: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
});
