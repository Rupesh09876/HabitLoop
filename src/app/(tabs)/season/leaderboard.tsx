import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Rank images map
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

interface LeaderboardEntry {
  position: number;
  name: string;
  xp: number;
  level: number;
  rank: string;
  isMe: boolean;
  avatar?: string;
}

const allUsers: LeaderboardEntry[] = [
  { position: 1,  name: 'ShadowWolf',   xp: 4820, level: 62, rank: 'Gold III',   isMe: false },
  { position: 2,  name: 'Nova',          xp: 4650, level: 59, rank: 'Gold IV',    isMe: false },
  { position: 3,  name: 'Zenith',        xp: 4510, level: 55, rank: 'Gold V',     isMe: false },
  { position: 4,  name: 'Kaito',         xp: 4320, level: 52, rank: 'Gold V',     isMe: false },
  { position: 5,  name: 'Blaze',         xp: 4110, level: 49, rank: 'Silver I',   isMe: false },
  { position: 6,  name: 'Lyra',          xp: 3980, level: 47, rank: 'Silver I',   isMe: false },
  { position: 7,  name: 'Phoenix',       xp: 3740, level: 44, rank: 'Silver II',  isMe: false },
  { position: 8,  name: 'Aether',        xp: 3620, level: 42, rank: 'Silver III', isMe: false },
  { position: 9,  name: 'Storm',         xp: 3450, level: 39, rank: 'Silver III', isMe: false },
  { position: 10, name: 'Cipher',        xp: 3280, level: 37, rank: 'Silver IV',  isMe: false },
  { position: 11, name: 'Vex',           xp: 3100, level: 35, rank: 'Silver IV',  isMe: false },
  { position: 12, name: 'Orion',         xp: 2910, level: 32, rank: 'Silver V',   isMe: false },
  { position: 13, name: 'Jade',          xp: 2780, level: 30, rank: 'Silver V',   isMe: false },
  { position: 14, name: 'Flux',          xp: 2640, level: 28, rank: 'Bronze I',   isMe: false },
  { position: 15, name: 'Runa',          xp: 2510, level: 25, rank: 'Bronze I',   isMe: false },
  { position: 16, name: 'Player',        xp: 1960, level: 21, rank: 'Bronze II',  isMe: false },
  { position: 17, name: 'YOU',           xp: 1840, level: 18, rank: 'Bronze II',  isMe: true  },
  { position: 18, name: 'Player18',      xp: 1790, level: 17, rank: 'Bronze III', isMe: false },
  { position: 19, name: 'Player19',      xp: 1670, level: 16, rank: 'Bronze III', isMe: false },
  { position: 20, name: 'Player20',      xp: 1540, level: 15, rank: 'Bronze III', isMe: false },
  { position: 21, name: 'Player21',      xp: 1430, level: 14, rank: 'Bronze IV',  isMe: false },
  { position: 22, name: 'Player22',      xp: 1320, level: 13, rank: 'Bronze IV',  isMe: false },
  { position: 23, name: 'Player23',      xp: 1210, level: 12, rank: 'Bronze IV',  isMe: false },
  { position: 24, name: 'Player24',      xp: 1080, level: 11, rank: 'Bronze V',   isMe: false },
  { position: 25, name: 'Player25',      xp: 940,  level: 9,  rank: 'Bronze V',   isMe: false },
];

export default function LeaderboardScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [filter, setFilter] = useState<'GLOBAL' | 'FRIENDS'>('GLOBAL');
  const [search, setSearch] = useState('');

  const filtered = allUsers.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const getRankColor = (rank: string) => {
    if (rank.startsWith('Platinum')) return '#A78BFA';
    if (rank.startsWith('Gold'))     return '#F59E0B';
    if (rank.startsWith('Silver'))   return '#94A3B8';
    return '#CD7C34'; // Bronze
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
          <Feather name="arrow-left" size={22} color="#0E0F19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>LEADERBOARD</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Season badge */}
      <View style={[styles.seasonBadgeRow, { width: width * 0.92 }]}>
        <View style={styles.seasonBadge}>
          <MaterialCommunityIcons name="trophy-outline" size={14} color="#7F45FF" />
          <Text style={styles.seasonBadgeText}>SEASON 01 — THE ASCENSION</Text>
        </View>
        <Text style={styles.userCountText}>{allUsers.length} Players</Text>
      </View>

      {/* Filter Tabs */}
      <View style={[styles.filterRow, { width: width * 0.92 }]}>
        {(['GLOBAL', 'FRIENDS'] as const).map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterTab, filter === f && styles.filterTabActive]}
            onPress={() => setFilter(f)}
            activeOpacity={0.8}
          >
            <Text style={[styles.filterTabText, filter === f && styles.filterTabTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Search Bar */}
      <View style={[styles.searchBar, { width: width * 0.92 }]}>
        <Feather name="search" size={16} color="#94A3B8" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search player..."
          placeholderTextColor="#94A3B8"
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Feather name="x" size={16} color="#94A3B8" />
          </TouchableOpacity>
        )}
      </View>

      {/* Top 3 Podium */}
      {search.length === 0 && (
        <View style={[styles.podiumRow, { width: width * 0.92 }]}>
          {/* 2nd place */}
          <View style={styles.podiumItem}>
            <Image
              source={rankImages[filtered[1]?.rank] ?? rankImages['Bronze V']}
              style={styles.podiumRankImg}
              resizeMode="contain"
            />
            <View style={[styles.podiumCircle, { backgroundColor: '#E2E8F0' }]}>
              <MaterialCommunityIcons name="account-circle" size={36} color="#94A3B8" />
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{filtered[1]?.name}</Text>
            <View style={[styles.podiumPlate, { backgroundColor: '#E2E8F0' }]}>
              <Text style={styles.podiumPlateNum}>2</Text>
            </View>
            <Text style={styles.podiumXp}>{filtered[1]?.xp.toLocaleString()} XP</Text>
          </View>

          {/* 1st place */}
          <View style={[styles.podiumItem, styles.podiumFirst]}>
            <MaterialCommunityIcons name="crown" size={24} color="#F59E0B" style={{ marginBottom: 4 }} />
            <Image
              source={rankImages[filtered[0]?.rank] ?? rankImages['Bronze V']}
              style={[styles.podiumRankImg, { width: 60, height: 60 }]}
              resizeMode="contain"
            />
            <View style={[styles.podiumCircle, { backgroundColor: '#FEF9C3', width: 52, height: 52, borderRadius: 26 }]}>
              <MaterialCommunityIcons name="account-circle" size={44} color="#F59E0B" />
            </View>
            <Text style={[styles.podiumName, { fontWeight: '900', color: '#0E0F19' }]} numberOfLines={1}>{filtered[0]?.name}</Text>
            <View style={[styles.podiumPlate, { backgroundColor: '#F59E0B' }]}>
              <Text style={[styles.podiumPlateNum, { color: '#FFF' }]}>1</Text>
            </View>
            <Text style={[styles.podiumXp, { color: '#F59E0B', fontWeight: '800' }]}>{filtered[0]?.xp.toLocaleString()} XP</Text>
          </View>

          {/* 3rd place */}
          <View style={styles.podiumItem}>
            <Image
              source={rankImages[filtered[2]?.rank] ?? rankImages['Bronze V']}
              style={styles.podiumRankImg}
              resizeMode="contain"
            />
            <View style={[styles.podiumCircle, { backgroundColor: '#FEF3C7' }]}>
              <MaterialCommunityIcons name="account-circle" size={36} color="#D97706" />
            </View>
            <Text style={styles.podiumName} numberOfLines={1}>{filtered[2]?.name}</Text>
            <View style={[styles.podiumPlate, { backgroundColor: '#D97706' }]}>
              <Text style={[styles.podiumPlateNum, { color: '#FFF' }]}>3</Text>
            </View>
            <Text style={styles.podiumXp}>{filtered[2]?.xp.toLocaleString()} XP</Text>
          </View>
        </View>
      )}

      {/* Full List */}
      <ScrollView
        contentContainerStyle={[styles.listContainer, { width: width * 0.92, alignSelf: 'center' }]}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((item) => (
          <View
            key={item.position}
            style={[styles.listRow, item.isMe && styles.listRowMe]}
          >
            {/* Position */}
            <View style={styles.positionCol}>
              {item.position <= 3 ? (
                <MaterialCommunityIcons
                  name="crown"
                  size={20}
                  color={item.position === 1 ? '#F59E0B' : item.position === 2 ? '#94A3B8' : '#D97706'}
                />
              ) : (
                <Text style={[styles.positionText, item.isMe && { color: '#7F45FF' }]}>
                  {item.position}
                </Text>
              )}
            </View>

            {/* Avatar */}
            <View style={[styles.avatarCircle, item.isMe && { backgroundColor: '#EDE9FF' }]}>
              <MaterialCommunityIcons
                name="account-circle"
                size={30}
                color={item.isMe ? '#7F45FF' : '#94A3B8'}
              />
            </View>

            {/* Name + rank */}
            <View style={styles.nameCol}>
              <Text style={[styles.nameText, item.isMe && { color: '#7F45FF', fontWeight: '900' }]}>
                {item.name}
              </Text>
              <Text style={[styles.rankLabel, { color: getRankColor(item.rank) }]}>
                {item.rank}
              </Text>
            </View>

            {/* Spacer */}
            <View style={{ flex: 1 }} />

            {/* Rank image */}
            <Image
              source={rankImages[item.rank] ?? rankImages['Bronze V']}
              style={styles.rankImg}
              resizeMode="contain"
            />

            {/* XP */}
            <Text style={[styles.xpText, item.isMe && { color: '#7F45FF', fontWeight: '800' }]}>
              {item.xp.toLocaleString()} XP
            </Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 8,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: 1.2,
  },
  seasonBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  seasonBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDE9FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    gap: 6,
  },
  seasonBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F45FF',
    letterSpacing: 0.5,
  },
  userCountText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  filterRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
    marginBottom: 12,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  filterTabTextActive: {
    color: '#7F45FF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0E0F19',
  },
  podiumRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 16,
    gap: 8,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumFirst: {
    marginBottom: 8,
  },
  podiumRankImg: {
    width: 44,
    height: 44,
    marginBottom: 6,
  },
  podiumCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  podiumName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0E0F19',
    marginBottom: 4,
    textAlign: 'center',
  },
  podiumPlate: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  podiumPlateNum: {
    fontSize: 11,
    fontWeight: '900',
    color: '#64748B',
  },
  podiumXp: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  listContainer: {
    paddingBottom: 30,
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  listRowMe: {
    backgroundColor: '#F5F0FF',
    borderColor: '#DDD6FE',
  },
  positionCol: {
    width: 28,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
  },
  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  nameCol: {
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0E0F19',
  },
  rankLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 1,
  },
  rankImg: {
    width: 28,
    height: 28,
    marginRight: 10,
  },
  xpText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    minWidth: 70,
    textAlign: 'right',
  },
});
