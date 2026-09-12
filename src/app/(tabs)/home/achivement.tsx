import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Modal, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

type FilterCategory = 'ALL' | 'STREAKS' | 'HABITS' | 'MILESTONES' | 'SPECIAL';
type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'LOCKED';

interface Achievement {
  id: string;
  name: string;
  category: FilterCategory;
  rarity: Rarity;
  isUnlocked: boolean;
  description: string;
  xpReward: number;
  image?: any;
  customIcon?: {
    type: 'ionic' | 'mci' | 'feather';
    name: string;
    bgColor: [string, string];
    number?: string | number;
  };
}

export default function AchievementScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('ALL');
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // List of achievements
  const [achievementsList, setAchievementsList] = useState<Achievement[]>([
    {
      id: 'ach_1',
      name: 'HYDRATION HERO',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Drink 3.5L of water in a day.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/hydration_hero.png'),
    },
    {
      id: 'ach_2',
      name: 'FITNESS STREAK',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Workout for 7 days in a row.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/fitness_streak.png'),
    },
    {
      id: 'ach_3',
      name: 'FOCUS MODE',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Use focus mode 10 times.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/focus_mode.png'),
    },
    {
      id: 'ach_4',
      name: 'DAILY WARRIOR',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete all daily habits in a day.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/daily_warrior.png'),
    },
    {
      id: 'ach_5',
      name: 'BETTER SLEEP',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Maintain 7+ hours of sleep for 7 days.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/better_sleep.png'),
    },
    {
      id: 'ach_6',
      name: 'PERFECT DAY',
      category: 'SPECIAL',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete all habits in a single day.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/perfect_day.png'),
    },
    {
      id: 'ach_7',
      name: 'MONTHLY DEDICATION',
      category: 'STREAKS',
      rarity: 'EPIC',
      isUnlocked: true,
      description: 'Stay consistent for 30 days.',
      xpReward: 300,
      image: require('../../../../assets/images/achievements/monthly_dedication.png'),
    },
    {
      id: 'ach_8',
      name: 'MONTHLY CHAMP',
      category: 'STREAKS',
      rarity: 'EPIC',
      isUnlocked: true,
      description: 'Maintain a 30 day streak.',
      xpReward: 350,
      image: require('../../../../assets/images/achievements/monthly_champ.png'),
    },
    {
      id: 'ach_9',
      name: 'LEVEL UP',
      category: 'MILESTONES',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Reach Level 10.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/level_up.png'),
    },
    {
      id: 'ach_10',
      name: 'SELF CARE',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete 20 self-care habits.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/self_care.png'),
    },
    {
      id: 'ach_11',
      name: 'EXPLORER',
      category: 'SPECIAL',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Try 5 different habit categories.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/explorer.png'),
    },
    {
      id: 'ach_12',
      name: 'FIRE STREAK',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Maintain a 7 day streak.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/fire_streak.png'),
    },
    {
      id: 'ach_13',
      name: 'HEALTHY CHOICE',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete 20 healthy food habits.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/healthy_choice.png'),
    },
    {
      id: 'ach_14',
      name: 'KNOWLEDGE SEEKER',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Read or study for 10 days.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/knowledge_seeker.png'),
    },
    {
      id: 'ach_15',
      name: 'NEVER GIVE UP',
      category: 'SPECIAL',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Come back after breaking a streak.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/never_give_up.png'),
    },
    {
      id: 'ach_16',
      name: 'CALM MIND',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Meditate for 10 days.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/calm_mind.png'),
    },
    {
      id: 'ach_17',
      name: 'MOVE MORE',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Do any workout 15 times.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/move_more.png'),
    },
    {
      id: 'ach_18',
      name: 'TIME MASTER',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Complete habits before 10 AM (10x).',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/time_master.png'),
    },
    {
      id: 'ach_19',
      name: 'HABIT BUILDER',
      category: 'MILESTONES',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Create 5 different habits.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/habit_builder.png'),
    },
    {
      id: 'ach_20',
      name: 'GOOD NIGHT',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Go to bed before 11 PM (7x).',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/good_night.png'),
    },
    {
      id: 'ach_21',
      name: 'DIGITAL DETOX',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Stay off phone for 2 hours.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/digital_detox.png'),
    },
    {
      id: 'ach_22',
      name: 'KIND TO SELF',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Rest when needed (5x).',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/kind_to_self.png'),
    },
    {
      id: 'ach_23',
      name: 'LEARNING STREAK',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Study or read for 7 days.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/learning_streak.png'),
    },
    {
      id: 'ach_24',
      name: 'XP COLLECTOR',
      category: 'MILESTONES',
      rarity: 'EPIC',
      isUnlocked: false,
      description: 'Earn 5,000 XP.',
      xpReward: 250,
      image: require('../../../../assets/images/achievements/xp_collector.png'),
    },
    {
      id: 'ach_25',
      name: 'GOAL CRUSHER',
      category: 'SPECIAL',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Complete a custom goal.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/goal_crusher.png'),
    },
    {
      id: 'ach_26',
      name: 'NATURE WALKER',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Go outside for a walk (7x).',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/nature_walker.png'),
    },
    {
      id: 'ach_27',
      name: 'HELPING HAND',
      category: 'SPECIAL',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Encourage a friend (3x).',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/helping_hand.png'),
    },
    {
      id: 'ach_28',
      name: 'BALANCED LIFE',
      category: 'SPECIAL',
      rarity: 'EPIC',
      isUnlocked: false,
      description: 'Complete habits in 3 different categories.',
      xpReward: 250,
      image: require('../../../../assets/images/achievements/balanced_life.png'),
    },
    {
      id: 'ach_29',
      name: 'HABIT LEGEND',
      category: 'STREAKS',
      rarity: 'LEGENDARY',
      isUnlocked: false,
      description: 'Maintain a 100 day streak.',
      xpReward: 1000,
      image: require('../../../../assets/images/achievements/habit_legend.png'),
    },
      {
      id: 'ach_30',
      name: 'EARLY BIRD',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Complete a habit before 8 AM.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/early_bird.png'),
    },
    {
      id: 'ach_31',
      name: 'QUICK START',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Complete a habit within 5 minutes.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/quick_start.png'),
    },
    {
      id: 'ach_32',
      name: 'FIRST STEP',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Complete your first habit.',
      xpReward: 50,
      image: require('../../../../assets/images/achievements/first_step.png'),
    },
    {
      id: 'ach_33',
      name: 'PERFECT WEEK',
      category: 'STREAKS',
      rarity: 'EPIC',
      isUnlocked: true,
      description: 'Complete all habits every day for a week.',
      xpReward: 250,
      image: require('../../../../assets/images/achievements/perfect_week.png'),
    },
    {
      id: 'ach_34',
      name: '3 DAY STREAK',
      category: 'STREAKS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Complete a habit for 3 days in a row.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/3_day_streak.png'),
    },
    {
      id: 'ach_35',
      name: 'DISCIPLINED',
      category: 'STREAKS',
      rarity: 'EPIC',
      isUnlocked: true,
      description: 'Maintain a 30 day streak.',
      xpReward: 300,
      image: require('../../../../assets/images/achievements/disciplined.png'),
    },
    {
      id: 'ach_36',
      name: 'WEEK WARRIOR',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Maintain a 7 day streak.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/week_warrior_2.png'),
    },
    {
      id: 'ach_37',
      name: 'SELF IMPROVER',
      category: 'MILESTONES',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete 50 habits.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/self_improver.png'),
    },
    {
      id: 'ach_38',
      name: 'CONSISTENT',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete any habit 10 times.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/consistent.png'),
    },
    {
      id: 'ach_39',
      name: 'HABIT MASTER',
      category: 'MILESTONES',
      rarity: 'EPIC',
      isUnlocked: true,
      description: 'Complete 100 habits.',
      xpReward: 400,
      image: require('../../../../assets/images/achievements/habit_master.png'),
    },
    {
      id: 'ach_40',
      name: 'FOCUSED',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: true,
      description: 'Complete a habit without skipping.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/focused.png'),
    },
    {
      id: 'ach_41',
      name: 'KNOWLEDGE SPARK',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete a study habit 5 times.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/knowledge_spark.png'),
    },
    {
      id: 'ach_42',
      name: 'TASK TERMINATOR',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete 10 habits in a day.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/task_terminator.png'),
    },
    {
      id: 'ach_43',
      name: 'STRONGER TODAY',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete a workout 10 times.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/stronger_today.png'),
    },
    {
      id: 'ach_44',
      name: 'EARLY RISER',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: true,
      description: 'Complete a habit before 6 AM.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/early_riser.png'),
    },
    {
      id: 'ach_45',
      name: 'SELF CARE CHAMP',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Complete a self-care habit 5 times.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/self_care_champ.png'),
    },
    {
      id: 'ach_46',
      name: 'COMEBACK KID',
      category: 'SPECIAL',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Return after missing a day.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/comeback_kid.png'),
    },
    {
      id: 'ach_47',
      name: 'NIGHT OWL',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Complete a habit after 10 PM.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/night_owl.png'),
    },
    {
      id: 'ach_48',
      name: 'HABIT STREAKER',
      category: 'STREAKS',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Reach a 5-day streak.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/habit_streaker.png'),
    },
    {
      id: 'ach_49',
      name: 'WATER WARRIOR',
      category: 'HABITS',
      rarity: 'COMMON',
      isUnlocked: false,
      description: 'Drink 2L+ water in a day.',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/water_warrior.png'),
    },
    {
      id: 'ach_50',
      name: 'TIME MASTER',
      category: 'HABITS',
      rarity: 'EPIC',
      isUnlocked: false,
      description: 'Complete all habits before 10 AM (7x).',
      xpReward: 250,
      image: require('../../../../assets/images/achievements/time_master_2.png'),
    },
    {
      id: 'ach_51',
      name: 'HEALTHY CHOICE',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Complete 20 healthy food habits.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/healthy_choice_2.png'),
    },
    {
      id: 'ach_52',
      name: 'KIND SOUL',
      category: 'SPECIAL',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Help or support a friend (3x).',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/kind_soul.png'),
    },
    {
      id: 'ach_53',
      name: 'BETTER SLEEP',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Get 7+ hours of sleep for 7 days.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/better_sleep_2.png'),
    },
    {
      id: 'ach_54',
      name: 'EXPLORER',
      category: 'SPECIAL',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Try 5 different habit categories.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/explorer_2.png'),
    },
    {
      id: 'ach_55',
      name: 'FITNESS STREAK',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Workout for 5 days in a row.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/fitness_streak_2.png'),
    },
    {
      id: 'ach_56',
      name: 'LEVEL UP',
      category: 'MILESTONES',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Reach Level 5.',
      xpReward: 150,
      image: require('../../../../assets/images/achievements/level_up_2.png'),
    },
    {
      id: 'ach_57',
      name: 'STUDY CHAMP',
      category: 'STREAKS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Study for 10 days in a row.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/study_champ.png'),
    },
    {
      id: 'ach_58',
      name: 'MONTHLY LEGEND',
      category: 'STREAKS',
      rarity: 'EPIC',
      isUnlocked: false,
      description: 'Maintain a 30 day streak.',
      xpReward: 400,
      image: require('../../../../assets/images/achievements/monthly_legend.png'),
    },
    {
      id: 'ach_59',
      name: 'DIGITAL DETOX',
      category: 'HABITS',
      rarity: 'RARE',
      isUnlocked: false,
      description: 'Stay within screen-time goal for 7 days.',
      xpReward: 200,
      image: require('../../../../assets/images/achievements/digital_detox_2.png'),
    },
]);

  const filteredAchievements = achievementsList.filter(item => {
    if (selectedFilter === 'ALL') return true;
    return item.category === selectedFilter;
  });

  const unlockedCount = achievementsList.filter(a => a.isUnlocked).length;
  const totalCount = 100;
  const unlockPercentage = Math.round((unlockedCount / totalCount) * 100);

  const getRarityColor = (rarity: Rarity) => {
    switch (rarity) {
      case 'COMMON': return '#64748B';
      case 'RARE': return '#2563EB';
      case 'EPIC': return '#9333EA';
      case 'LEGENDARY': return '#D97706';
      default: return '#94A3B8';
    }
  };

  const getRarityBadgeBg = (rarity: Rarity) => {
    switch (rarity) {
      case 'COMMON': return '#F1F5F9';
      case 'RARE': return '#EFF6FF';
      case 'EPIC': return '#FAF5FF';
      case 'LEGENDARY': return '#FEF3C7';
      default: return '#F1F5F9';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={[styles.header, { width: width * 0.92 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Feather name="arrow-left" size={24} color="#0E0F19" />
        </TouchableOpacity>

        <View style={styles.headerTitleBox}>
          <Text style={styles.headerTitle}>ACHIEVEMENTS</Text>
          <Text style={styles.headerSubtitle}>Your journey, recorded.</Text>
        </View>

        <TouchableOpacity style={styles.filterIconBtn}>
          <Ionicons name="filter-outline" size={20} color="#7F45FF" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Top Summary Progress Card */}
        <View style={[styles.summaryCard, { width: width * 0.92 }]}>
          {/* Trophy Graphic */}
          <LinearGradient
            colors={['#A855F7', '#7F45FF', '#3B82F6']}
            style={styles.trophyCircle}
          >
            <Ionicons name="trophy" size={28} color="#FFF" />
          </LinearGradient>

          <View style={styles.summaryInfoCol}>
            <View style={styles.unlockedRow}>
              <Text style={styles.unlockedCountText}>{unlockedCount}</Text>
              <Text style={styles.totalCountText}> / {totalCount} </Text>
              <Text style={styles.unlockedLabel}>UNLOCKED</Text>
              <Text style={styles.percentageText}>{unlockPercentage}%</Text>
            </View>

            {/* Progress Track */}
            <View style={styles.summaryProgressBarTrack}>
              <LinearGradient
                colors={['#7F45FF', '#A855F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.summaryProgressBarFill, { width: `${unlockPercentage}%` }]}
              />
            </View>
          </View>
        </View>

        {/* Filter Category Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersScrollRow}
        >
          {(['ALL', 'STREAKS', 'HABITS', 'MILESTONES', 'SPECIAL'] as FilterCategory[]).map(cat => {
            const isActive = selectedFilter === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.filterPill, isActive && styles.filterPillActive]}
                onPress={() => setSelectedFilter(cat)}
              >
                <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 3-Column Achievement Badges Grid */}
        <View style={[styles.gridContainer, { width: width * 0.92 }]}>
          {filteredAchievements.map(ach => (
            <TouchableOpacity
              key={ach.id}
              style={[styles.badgeCard, !ach.isUnlocked && styles.badgeCardLocked]}
              activeOpacity={0.8}
              onPress={() => setSelectedAchievement(ach)}
            >
              {/* Checkmark or Lock Status on Top-Right */}
              <View style={styles.cardStatusBadge}>
                {ach.isUnlocked ? (
                  <View style={styles.unlockedCheckCircle}>
                    <Ionicons name="checkmark" size={10} color="#FFF" />
                  </View>
                ) : (
                  <View style={styles.lockedIconCircle}>
                    <Feather name="lock" size={10} color="#64748B" />
                  </View>
                )}
              </View>

              {/* Badge Visual Graphic */}
              <View style={styles.badgeVisualContainer}>
                {ach.image ? (
                  <Image
                    source={ach.image}
                    style={[styles.badgeUploadedImg, !ach.isUnlocked && { opacity: 0.4 }]}
                    resizeMode="contain"
                  />
                ) : ach.customIcon ? (
                  <LinearGradient
                    colors={ach.isUnlocked ? ach.customIcon.bgColor : ['#E2E8F0', '#CBD5E1']}
                    style={styles.badgeHexShield}
                  >
                    <MaterialCommunityIcons
                      name={ach.customIcon.name as any}
                      size={28}
                      color={ach.isUnlocked ? '#FFF' : '#94A3B8'}
                    />
                    {ach.customIcon.number && (
                      <Text style={styles.hexNumberText}>{ach.customIcon.number}</Text>
                    )}
                  </LinearGradient>
                ) : null}
              </View>

              {/* Title & Rarity */}
              <Text style={[styles.badgeNameText, !ach.isUnlocked && { color: '#64748B' }]} numberOfLines={1}>
                {ach.name}
              </Text>
              <Text style={[styles.badgeRarityText, { color: getRarityColor(ach.rarity) }]}>
                {ach.rarity}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* ─── BOTTOM POPUP SHEET DETAIL MODAL ─── */}
      <Modal
        visible={selectedAchievement !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedAchievement(null)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedAchievement(null)}
          />

          <View style={styles.modalContentCard}>
            <View style={styles.modalDragHandle} />

            <View style={styles.modalHeaderRow}>
              <View style={{ flex: 1 }} />
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedAchievement(null)}
              >
                <Feather name="x" size={20} color="#0E0F19" />
              </TouchableOpacity>
            </View>

            {selectedAchievement && (
              <View style={styles.modalBody}>
                {/* Highlighted Badge Icon */}
                <View style={styles.modalBadgeWrapper}>
                  {selectedAchievement.image ? (
                    <Image
                      source={selectedAchievement.image}
                      style={styles.modalBadgeImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <LinearGradient
                      colors={
                        selectedAchievement.isUnlocked
                          ? ['#9333EA', '#7F45FF', '#C084FC']
                          : ['#475569', '#334155']
                      }
                      style={styles.modalBadgeCircle}
                    >
                      <MaterialCommunityIcons
                        name={(selectedAchievement.customIcon?.name as any) || 'trophy'}
                        size={56}
                        color="#FFF"
                      />
                    </LinearGradient>
                  )}
                </View>

                {/* Details */}
                <View style={styles.modalInfoCol}>
                  <Text style={styles.modalAchTitle}>{selectedAchievement.name}</Text>

                  <View
                    style={[
                      styles.modalRarityBadge,
                      { backgroundColor: getRarityBadgeBg(selectedAchievement.rarity) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.modalRarityBadgeText,
                        { color: getRarityColor(selectedAchievement.rarity) },
                      ]}
                    >
                      {selectedAchievement.rarity}
                    </Text>
                  </View>

                  <Text style={styles.modalAchDesc}>{selectedAchievement.description}</Text>

                  {/* Reward & Status Bottom Row */}
                  <View style={styles.modalBottomRow}>
                    <View style={styles.modalXpRewardBox}>
                      <View style={styles.modalXpIcon}>
                        <Text style={{ fontSize: 9, fontWeight: '800', color: '#FFF' }}>XP</Text>
                      </View>
                      <Text style={styles.modalXpText}>+{selectedAchievement.xpReward} XP</Text>
                    </View>

                    <View
                      style={[
                        styles.modalStatusBtn,
                        selectedAchievement.isUnlocked
                          ? styles.modalStatusUnlocked
                          : styles.modalStatusLocked,
                      ]}
                    >
                      <Text
                        style={[
                          styles.modalStatusBtnText,
                          selectedAchievement.isUnlocked && { color: '#7F45FF' },
                        ]}
                      >
                        {selectedAchievement.isUnlocked ? 'UNLOCKED' : 'LOCKED'}
                      </Text>
                      {selectedAchievement.isUnlocked && (
                        <Ionicons name="checkmark-circle" size={16} color="#7F45FF" style={{ marginLeft: 4 }} />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 40,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  filterIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Summary Card
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  trophyCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryInfoCol: {
    flex: 1,
    marginLeft: 14,
  },
  unlockedRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  unlockedCountText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#7F45FF',
  },
  totalCountText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
  },
  unlockedLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F45FF',
    marginLeft: 'auto',
  },
  summaryProgressBarTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    width: '100%',
    overflow: 'hidden',
  },
  summaryProgressBarFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Filters Scroll Row
  filtersScrollRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  filterPillActive: {
    backgroundColor: '#7F45FF',
    borderColor: '#7F45FF',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  filterPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  filterPillTextActive: {
    color: '#FFF',
    fontWeight: '800',
  },

  // Grid
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  badgeCard: {
    width: '31%',
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  badgeCardLocked: {
    backgroundColor: '#F8FAFC',
  },
  cardStatusBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  unlockedCheckCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockedIconCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeVisualContainer: {
    width: 72,
    height: 72,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  badgeUploadedImg: {
    width: '100%',
    height: '100%',
  },
  badgeHexShield: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  hexNumberText: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
    bottom: 4,
  },
  badgeNameText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0E0F19',
    textAlign: 'center',
    marginTop: 4,
  },
  badgeRarityText: {
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginTop: 2,
  },

  // Modal Bottom Sheet
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContentCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 32,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginVertical: 6,
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 4,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalBadgeWrapper: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalBadgeImg: {
    width: '100%',
    height: '100%',
  },
  modalBadgeCircle: {
    width: 108,
    height: 108,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalInfoCol: {
    flex: 1,
  },
  modalAchTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
  },
  modalRarityBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    marginBottom: 6,
  },
  modalRarityBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  modalAchDesc: {
    fontSize: 11,
    color: '#64748B',
    lineHeight: 16,
    marginBottom: 12,
  },
  modalBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalXpRewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalXpIcon: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  modalXpText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F45FF',
  },
  modalStatusBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  modalStatusUnlocked: {
    backgroundColor: '#FAF5FF',
    borderWidth: 1,
    borderColor: '#EDE9FF',
  },
  modalStatusLocked: {
    backgroundColor: '#F1F5F9',
  },
  modalStatusBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#94A3B8',
  },
});
