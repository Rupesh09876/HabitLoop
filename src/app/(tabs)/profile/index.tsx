import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, Modal, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Real rank images
const rankImages: Record<string, ReturnType<typeof require>> = {
  'Bronze V': require('../../../assets/rank/Bronze_V.png'),
  'Bronze IV': require('../../../assets/rank/Bronze_IV.png'),
  'Bronze III': require('../../../assets/rank/Bronze_III.png'),
  'Bronze II': require('../../../assets/rank/Bronze_II.png'),
  'Bronze I': require('../../../assets/rank/Bronze_I.png'),
  'Silver V': require('../../../assets/rank/Silver_V.png'),
  'Silver IV': require('../../../assets/rank/Silver_IV.png'),
  'Silver III': require('../../../assets/rank/Silver_III.png'),
  'Silver II': require('../../../assets/rank/Silver_II.png'),
  'Silver I': require('../../../assets/rank/Silver_I.png'),
  'Gold V': require('../../../assets/rank/Gold_V.png'),
  'Gold IV': require('../../../assets/rank/Gold_IV.png'),
  'Gold III': require('../../../assets/rank/Gold_III.png'),
  'Gold II': require('../../../assets/rank/Gold_II.png'),
  'Gold I': require('../../../assets/rank/Gold_I.png'),
  'Platinum V': require('../../../assets/rank/Platinum_V.png'),
  'Platinum IV': require('../../../assets/rank/Platinum_IV.png'),
  'Platinum III': require('../../../assets/rank/Platinum_III.png'),
  'Platinum II': require('../../../assets/rank/Platinum_II.png'),
  'Platinum I': require('../../../assets/rank/Platinum_I.png'),
};

interface AchievementItem {
  id: string;
  title: string;
  subtitle: string;
  status: 'Completed' | 'In Progress' | 'Locked';
  type: 'shield' | 'streak7' | 'streak30' | 'target' | 'star' | 'lightning';
  xpReward: number;
  progress?: string;
  image?: ReturnType<typeof require>;
}

export default function ProfileScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  // User Profile State
  const [name, setName] = useState('RUPESH');
  const [username, setUsername] = useState('@rupeshh');
  const [bio, setBio] = useState('Leveling up daily habits & ascending the ranks 🔥');
  const [avatarUri, setAvatarUri] = useState('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=350&q=80');

  // Modals state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editUsername, setEditUsername] = useState(username);
  const [editBio, setEditBio] = useState(bio);

  const [showAchievementsModal, setShowAchievementsModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<AchievementItem | null>(null);

  // Stats
  const level = 18;
  const rank = 'BRONZE II';
  const currentXp = 2450;
  const xpToNext = 305;
  const bestStreak = 24;
  const daysActive = 126;

  // Achievements Data
  const achievements: AchievementItem[] = [
    {
      id: 'a1',
      title: 'Getting Started',
      subtitle: 'Complete your first habit quest',
      status: 'Completed',
      type: 'shield',
      xpReward: 100,
      image: require('../../../../assets/images/achievements/first_step.png'),
    },
    {
      id: 'a2',
      title: '7-Day Streak',
      subtitle: 'Maintain a 7-day consistency streak',
      status: 'Completed',
      type: 'streak7',
      xpReward: 250,
      image: require('../../../../assets/images/achievements/week_warrior_2.png'),
    },
    {
      id: 'a3',
      title: '30-Day Streak',
      subtitle: 'Maintain a 30-day consistency streak',
      status: 'Completed',
      type: 'streak30',
      xpReward: 500,
      image: require('../../../../assets/images/achievements/monthly_legend.png'),
    },
    {
      id: 'a4',
      title: 'Consistency King',
      subtitle: 'Achieve 90%+ weekly consistency',
      status: 'Completed',
      type: 'target',
      xpReward: 400,
      image: require('../../../../assets/images/achievements/perfect_week.png'),
    },
    {
      id: 'a5',
      title: 'Master Hunter',
      subtitle: 'Reach Level 25 in Season 01',
      status: 'In Progress',
      progress: '18/25 Levels',
      type: 'star',
      xpReward: 1000,
      image: require('../../../../assets/images/achievements/habit_master.png'),
    },
    {
      id: 'a6',
      title: 'Iron Will',
      subtitle: 'Complete 100 morning workouts',
      status: 'In Progress',
      progress: '64/100',
      type: 'lightning',
      xpReward: 750,
      image: require('../../../../assets/images/achievements/stronger_today.png'),
    },
  ];

  // Friends Data
  const friendsList = [
    { name: 'Anjali', level: 22, online: true, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
    { name: 'Saurav', level: 17, online: true, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
    { name: 'Priya', level: 19, online: true, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
    { name: 'Bibek', level: 14, online: false, img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
  ];

  const handleSaveProfile = () => {
    setName(editName);
    setUsername(editUsername.startsWith('@') ? editUsername : `@${editUsername}`);
    setBio(editBio);
    setShowEditModal(false);
  };

  const handleOpenChat = (friendName: string, friendImg: string, friendLv: number) => {
    router.push({
      pathname: '/chat',
      params: { name: friendName, avatar: friendImg, status: `Level ${friendLv} • Active now` },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Header */}
      <View style={[styles.header, { width: width * 0.92 }]}>
        <TouchableOpacity
          style={{ width: 60, justifyContent: 'center', alignItems: 'center' }}
          onPress={() => router.push('/(tabs)/profile/setting')}
        >
          <Feather name="settings" size={22} color="#0E0F19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>PROFILE</Text>
        <TouchableOpacity
          onPress={() => {
            setEditName(name);
            setEditUsername(username);
            setEditBio(bio);
            setShowEditModal(true);
          }}
        >
          <Text style={styles.headerEditBtn}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* ─── 1. HERO PROFILE SECTION ─── */}
        <View style={[styles.heroSection, { width: width * 0.92 }]}>
          {/* Avatar with Glowing Gradient Ring & Sparkle */}
          <View style={styles.heroAvatarContainer}>
            <LinearGradient
              colors={['#A855F7', '#3B82F6', '#E9D5FF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroAvatarGradientRing}
            >
              <View style={styles.avatarInnerContainer}>
                <Image source={{ uri: avatarUri }} style={styles.heroAvatarImg} />
              </View>
            </LinearGradient>
            <View style={styles.sparkleIconBox}>
              <MaterialCommunityIcons name="star-four-points" size={14} color="#7F45FF" />
            </View>
          </View>

          {/* Profile Name & Status Badges */}
          <View style={styles.heroInfoCol}>
            <Text style={styles.heroName}>{name}</Text>
            <Text style={styles.heroUsername}>{username}</Text>

            {/* Level & Rank Badges Row */}
            <View style={styles.heroBadgesRow}>
              <View style={styles.heroLevelBadge}>
                <MaterialCommunityIcons name="shield-check" size={14} color="#7F45FF" style={{ marginRight: 4 }} />
                <Text style={styles.heroLevelBadgeText}>LEVEL {level}</Text>
              </View>

              <View style={styles.heroDivider} />

              <View style={styles.heroRankBadge}>
                <MaterialCommunityIcons name="shield" size={14} color="#B45309" style={{ marginRight: 4 }} />
                <Text style={styles.heroRankBadgeText}>{rank}</Text>
              </View>
            </View>

            {/* Crystal Tier Badge */}
            <View style={styles.heroCrystalRow}>
              <Image
                source={require('../../../../assets/crystals/aqua_shard.png')}
                style={styles.heroCrystalIcon}
                resizeMode="contain"
              />
              <Text style={styles.heroCrystalText}>BRONZE CRYSTAL</Text>
            </View>
          </View>
        </View>

        {/* ─── 2. LEVEL & RANK PROGRESS CARD ─── */}
        <View style={[styles.progressCard, { width: width * 0.92 }]}>
          <View style={styles.progressCardTop}>
            {/* Left Circular Level Ring */}
            <View style={styles.circularLevelWrapper}>
              <LinearGradient
                colors={['#DDD6FE', '#EDE9FE']}
                style={styles.circularLevelRing}
              >
                <View style={styles.circularLevelInner}>
                  <Text style={styles.circularLevelNum}>{level}</Text>
                  <Text style={styles.circularLevelLabel}>LEVEL</Text>
                </View>
              </LinearGradient>
            </View>

            {/* Center Info */}
            <View style={styles.progressCenterInfo}>
              <Text style={styles.progressLevelTitle}>LEVEL {level}</Text>
              <Text style={styles.progressRankTitle}>{rank}</Text>
              <Text style={styles.progressXpText}>{currentXp.toLocaleString()} XP</Text>

              {/* Segmented Progress Bar */}
              <View style={styles.segmentedBar}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.segmentItem,
                      i < 14 ? styles.segmentFilled : styles.segmentEmpty,
                    ]}
                  />
                ))}
              </View>

              <Text style={styles.progressNextText}>{xpToNext} XP to next level</Text>
            </View>

            {/* Right Real Rank Shield Badge */}
            <View style={styles.rankShieldBox}>
              <Image
                source={rankImages[rank] ?? rankImages['Bronze II']}
                style={styles.rankShieldImg}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* ─── 3. 4-COLUMN QUICK STATS ROW ─── */}
        <View style={[styles.quickStatsRow, { width: width * 0.92 }]}>

          {/* Stat 1: Level */}
          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: '#FAF5FF' }]}>
              <MaterialCommunityIcons name="trending-up" size={20} color="#7F45FF" />
            </View>
            <Text style={[styles.statNumber, { color: '#7F45FF' }]}>{level}</Text>
            <Text style={styles.statLabel}>LEVEL</Text>
          </View>

          {/* Stat 2: Best Streak */}
          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: '#EFF6FF' }]}>
              <MaterialCommunityIcons name="fire" size={20} color="#2563EB" />
            </View>
            <Text style={[styles.statNumber, { color: '#2563EB' }]}>{bestStreak}</Text>
            <Text style={styles.statLabel}>BEST STREAK</Text>
          </View>

          {/* Stat 3: Achievements */}
          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: '#F0FDF4' }]}>
              <Ionicons name="trophy-outline" size={18} color="#16A34A" />
            </View>
            <Text style={[styles.statNumber, { color: '#16A34A' }]}>{achievements.filter(a => a.status === 'Completed').length}</Text>
            <Text style={styles.statLabel}>ACHIEVEMENTS</Text>
          </View>

          {/* Stat 4: Days Active */}
          <View style={styles.statBox}>
            <View style={[styles.statIconBg, { backgroundColor: '#FFF1F2' }]}>
              <Ionicons name="calendar-outline" size={18} color="#E11D48" />
            </View>
            <Text style={[styles.statNumber, { color: '#E11D48' }]}>{daysActive}</Text>
            <Text style={styles.statLabel}>DAYS ACTIVE</Text>
          </View>

        </View>

        {/* ─── 4. ACHIEVEMENTS SECTION ─── */}
        <View style={[styles.sectionContainer, { width: width * 0.92 }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
            <TouchableOpacity onPress={() => setShowAchievementsModal(true)}>
              <Text style={styles.sectionViewAll}>View all &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.achievementsScrollRow}
          >
            {achievements.slice(0, 4).map(ach => (
              <TouchableOpacity
                key={ach.id}
                style={styles.achievementCard}
                activeOpacity={0.8}
                onPress={() => {
                  setSelectedAchievement(ach);
                  setShowAchievementsModal(true);
                }}
              >
                {/* Badge Icon: use real image if available, fall back to gradient icon */}
                <View style={styles.achievementBadgeContainer}>
                  {ach.image ? (
                    <Image
                      source={ach.image}
                      style={styles.achievementBadgeImg}
                      resizeMode="contain"
                    />
                  ) : (
                    <LinearGradient
                      colors={['#9333EA', '#7F45FF', '#C084FC']}
                      style={styles.achievementBadgeCircle}
                    >
                      <Ionicons name="shield-checkmark" size={22} color="#FFF" />
                    </LinearGradient>
                  )}
                </View>

                <Text style={styles.achievementTitleText} numberOfLines={1}>
                  {ach.title}
                </Text>
                <Text style={styles.achievementStatusText}>
                  {ach.status}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ─── 5. FRIENDS SECTION ─── */}
        <View style={[styles.sectionContainer, { width: width * 0.92 }]}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>FRIENDS</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/friends')}>
              <Text style={styles.sectionViewAll}>View all &gt;</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.friendsScrollRow}
          >
            {friendsList.map((friend, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.friendCardItem}
                activeOpacity={0.7}
                onPress={() => handleOpenChat(friend.name, friend.img, friend.level)}
              >
                <View style={styles.friendAvatarWrapper}>
                  <Image source={{ uri: friend.img }} style={styles.friendAvatarImg} />
                  {friend.online && <View style={styles.friendOnlineDot} />}
                </View>
                <Text style={styles.friendNameText}>{friend.name}</Text>
                <Text style={styles.friendLevelText}>Level {friend.level}</Text>
              </TouchableOpacity>
            ))}

            {/* Add Friend Card */}
            <TouchableOpacity
              style={styles.addFriendCard}
              activeOpacity={0.7}
              onPress={() => router.push('/(tabs)/friends')}
            >
              <View style={styles.addFriendCircle}>
                <Ionicons name="person-add-outline" size={24} color="#7F45FF" />
              </View>
              <Text style={styles.addFriendLabel}>Add Friend</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

      </ScrollView>

      {/* ─── EDIT PROFILE MODAL ─── */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowEditModal(false)}
          />

          <View style={[styles.modalCard, { maxHeight: height * 0.85 }]}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setShowEditModal(false)}>
                <Feather name="x" size={22} color="#0E0F19" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
              {/* Change Avatar */}
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <Image source={{ uri: avatarUri }} style={styles.editAvatarPreview} />
                <TouchableOpacity
                  style={styles.changePhotoBtn}
                  onPress={() => {
                    // Cycle sample avatar for fun interactive demonstration
                    const samples = [
                      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=350&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=350&q=80',
                      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=350&q=80',
                    ];
                    const next = samples[(samples.indexOf(avatarUri) + 1) % samples.length];
                    setAvatarUri(next);
                  }}
                >
                  <Feather name="camera" size={14} color="#7F45FF" style={{ marginRight: 4 }} />
                  <Text style={styles.changePhotoText}>Change Photo</Text>
                </TouchableOpacity>
              </View>

              {/* Form Fields */}
              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Full Name</Text>
                <TextInput
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter name"
                  placeholderTextColor="#94A3B8"
                  style={styles.formInput}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Username</Text>
                <TextInput
                  value={editUsername}
                  onChangeText={setEditUsername}
                  placeholder="@username"
                  placeholderTextColor="#94A3B8"
                  style={styles.formInput}
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.formLabel}>Bio & Motivation</Text>
                <TextInput
                  value={editBio}
                  onChangeText={setEditBio}
                  placeholder="Tell friends about your journey..."
                  placeholderTextColor="#94A3B8"
                  style={[styles.formInput, { height: 80, textAlignVertical: 'top' }]}
                  multiline
                />
              </View>

              {/* Save Button */}
              <TouchableOpacity
                style={styles.saveProfileBtn}
                activeOpacity={0.8}
                onPress={handleSaveProfile}
              >
                <Text style={styles.saveProfileBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ─── ALL ACHIEVEMENTS MODAL ─── */}
      <Modal
        visible={showAchievementsModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAchievementsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowAchievementsModal(false)}
          />

          <View style={[styles.modalCard, { maxHeight: height * 0.85 }]}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <View>
                <Text style={styles.modalTitle}>All Achievements</Text>
                <Text style={styles.modalSubtitle}>4 of {achievements.length} Unlocked</Text>
              </View>
              <TouchableOpacity onPress={() => setShowAchievementsModal(false)}>
                <Feather name="x" size={22} color="#0E0F19" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20 }}>
              {achievements.map(ach => (
                <View key={ach.id} style={styles.achModalItem}>
                  <View style={styles.achModalIconBox}>
                    <Ionicons
                      name={ach.status === 'Completed' ? 'trophy' : 'lock-closed-outline'}
                      size={22}
                      color={ach.status === 'Completed' ? '#7F45FF' : '#94A3B8'}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 14 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text style={styles.achModalItemTitle}>{ach.title}</Text>
                      <Text style={styles.achModalXp}>+{ach.xpReward} XP</Text>
                    </View>
                    <Text style={styles.achModalItemSub}>{ach.subtitle}</Text>
                    {ach.progress && (
                      <View style={{ marginTop: 6 }}>
                        <Text style={styles.achProgressText}>{ach.progress}</Text>
                        <View style={styles.achProgressBarBg}>
                          <View style={[styles.achProgressBarFill, { width: '70%' }]} />
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              ))}
            </ScrollView>
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
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: 0.5,
  },
  headerEditBtn: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7F45FF',
  },

  // 1. Hero Section
  heroSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heroAvatarContainer: {
    position: 'relative',
  },
  heroAvatarGradientRing: {
    width: 110,
    height: 110,
    borderRadius: 55,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInnerContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 55,
    backgroundColor: '#FFF',
    overflow: 'hidden',
    padding: 3,
  },
  heroAvatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  sparkleIconBox: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  heroInfoCol: {
    flex: 1,
    marginLeft: 16,
  },
  heroName: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -0.5,
  },
  heroUsername: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
    marginBottom: 8,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroLevelBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  heroLevelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F45FF',
    letterSpacing: 0.5,
  },
  heroDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 8,
  },
  heroRankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroRankBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  heroCrystalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroCrystalIcon: {
    width: 18,
    height: 18,
    marginRight: 6,
  },
  heroCrystalText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.5,
  },

  // 2. Progress Card
  progressCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  progressCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circularLevelWrapper: {
    marginRight: 14,
  },
  circularLevelRing: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularLevelInner: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circularLevelNum: {
    fontSize: 20,
    fontWeight: '900',
    color: '#7F45FF',
  },
  circularLevelLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
  },
  progressCenterInfo: {
    flex: 1,
  },
  progressLevelTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0E0F19',
  },
  progressRankTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#B45309',
    marginTop: 2,
  },
  progressXpText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
    marginTop: 2,
  },
  segmentedBar: {
    flexDirection: 'row',
    gap: 3,
    marginVertical: 6,
  },
  segmentItem: {
    flex: 1,
    height: 6,
    borderRadius: 3,
  },
  segmentFilled: {
    backgroundColor: '#7F45FF',
  },
  segmentEmpty: {
    backgroundColor: '#F1F5F9',
  },
  progressNextText: {
    fontSize: 10,
    color: '#94A3B8',
    fontWeight: '500',
  },
  rankShieldBox: {
    width: 56,
    height: 56,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankShieldImg: {
    width: '100%',
    height: '100%',
  },

  // 3. Quick Stats Row
  quickStatsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  statIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.5,
    textAlign: 'center',
  },

  // 4 & 5. Section Containers
  sectionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0E0F19',
    letterSpacing: 0.8,
  },
  sectionViewAll: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7F45FF',
  },

  // Achievements
  achievementsScrollRow: {
    flexDirection: 'row',
    gap: 12,
  },
  achievementCard: {
    width: 86,
    alignItems: 'center',
    backgroundColor: '#FAF9FF',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  achievementBadgeContainer: {
    marginBottom: 8,
  },
  achievementBadgeImg: {
    width: 60,
    height: 60,
  },
  achievementBadgeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  streakBadgeNum: {
    position: 'absolute',
    fontSize: 10,
    fontWeight: '900',
    color: '#FFF',
    bottom: 4,
  },
  streakBadgeNumSmall: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: '900',
    color: '#FFF',
    bottom: 5,
  },
  achievementTitleText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0E0F19',
    textAlign: 'center',
    marginBottom: 2,
  },
  achievementStatusText: {
    fontSize: 8,
    fontWeight: '600',
    color: '#94A3B8',
  },

  // Friends Row
  friendsScrollRow: {
    flexDirection: 'row',
    gap: 14,
  },
  friendCardItem: {
    alignItems: 'center',
    width: 60,
  },
  friendAvatarWrapper: {
    position: 'relative',
    marginBottom: 6,
  },
  friendAvatarImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E2E8F0',
  },
  friendOnlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  friendNameText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0E0F19',
    textAlign: 'center',
  },
  friendLevelText: {
    fontSize: 9,
    fontWeight: '600',
    color: '#7F45FF',
  },
  addFriendCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 80,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#EDE9FF',
    borderStyle: 'dashed',
    backgroundColor: '#FAF5FF',
  },
  addFriendCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  addFriendLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7F45FF',
    textAlign: 'center',
  },

  // Modals Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
  },
  modalDragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginVertical: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
  },
  modalSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  editAvatarPreview: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#7F45FF',
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#FAF5FF',
  },
  changePhotoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F45FF',
  },
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
  },
  formInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: '#0E0F19',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  saveProfileBtn: {
    backgroundColor: '#7F45FF',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveProfileBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFF',
  },

  // Achievements Modal Items
  achModalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  achModalIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FAF5FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achModalItemTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
  },
  achModalXp: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F45FF',
  },
  achModalItemSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  achProgressText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 3,
  },
  achProgressBarBg: {
    height: 4,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
  },
  achProgressBarFill: {
    height: '100%',
    backgroundColor: '#7F45FF',
    borderRadius: 2,
  },
});
