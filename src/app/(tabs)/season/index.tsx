import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Image } from 'react-native';
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

export default function SeasonScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [rulesExpanded, setRulesExpanded] = useState(false);
  const [leaderboardFilter, setLeaderboardFilter] = useState('GLOBAL');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Leaderboard dummy data
  const leaderboardData = [
    { rank: 1, name: 'ShadowWolf', xp: '4,820 XP', isMe: false, rankName: 'Gold III' },
    { rank: 2, name: 'Nova',       xp: '4,650 XP', isMe: false, rankName: 'Gold IV' },
    { rank: 3, name: 'Zenith',     xp: '4,510 XP', isMe: false, rankName: 'Gold V' },
    { rank: null, name: '...', xp: '', isMe: false, rankName: '' }, // Ellipsis row
    { rank: 16, name: 'Player',   xp: '1,960 XP', isMe: false, rankName: 'Bronze II' },
    { rank: 17, name: 'YOU',      xp: '1,840 XP', isMe: true,  rankName: 'Bronze II' },
    { rank: 18, name: 'Player',   xp: '1,790 XP', isMe: false, rankName: 'Bronze III' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={[styles.header, { width: width * 0.92 }]}>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="help-circle" size={20} color="#0E0F19" />
          </TouchableOpacity>
          <View style={styles.headerTitleBox}>
            <Text style={styles.title}>Season</Text>
            <Text style={styles.subtitle}>Compete. Climb. Conquer.</Text>
          </View>
          <TouchableOpacity style={styles.iconBtn}>
            <Feather name="bell" size={20} color="#7F45FF" />
            <View style={styles.bellBadge} />
          </TouchableOpacity>
        </View>

        {/* Banner Card */}
        <View style={[styles.bannerCard, { width: width * 0.92 }]}>
          <LinearGradient
            colors={['#EAE0FF', '#F4F0FF', '#FAFAFC']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextSide}>
              <Text style={styles.seasonNumber}>SEASON 01</Text>
              <Text style={styles.seasonName}>THE ASCENSION</Text>
              
              <View style={styles.timerBadge}>
                <Feather name="clock" size={12} color="#7F45FF" />
                <Text style={styles.timerText}>12D 08H 24M LEFT</Text>
              </View>

              <Text style={styles.bannerDesc}>
                Complete your habits, earn Season XP, and climb the seasonal ladder.
              </Text>

              <TouchableOpacity 
                style={styles.rulesBtn}
                onPress={() => setRulesExpanded(!rulesExpanded)}
              >
                <Feather name="file-text" size={14} color="#7F45FF" />
                <Text style={styles.rulesBtnText}>Season Rules</Text>
                <Feather name="chevron-right" size={14} color="#7F45FF" />
              </TouchableOpacity>
            </View>

            <View style={styles.bannerImageSide}>
              <Image 
                source={require('../../../../assets/crystals/aqua_shard.png')} 
                style={styles.bannerCrystalImg} 
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        {/* Your Season Status */}
        <View style={[styles.card, { width: width * 0.92 }]}>
          <Text style={styles.cardSectionTitle}>YOUR SEASON STATUS</Text>
          
          <View style={styles.statusRow}>
            {/* Rank Image */}
            <Image 
              source={rankImages['Bronze II']} 
              style={styles.rankShieldImg} 
              resizeMode="contain"
            />

            {/* Rank Info */}
            <View style={styles.rankInfoCol}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankBadgeText}>YOUR RANK</Text>
              </View>
              <Text style={styles.rankName}>BRONZE II</Text>
              <Text style={styles.rankLevel}>LEVEL <Text style={{color: '#7F45FF', fontWeight: '800'}}>18</Text></Text>
            </View>

            <View style={styles.vDivider} />

            {/* XP */}
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>SEASON XP</Text>
              <Text style={styles.statValuePurple}>1,840 <Text style={styles.statValueSub}>XP</Text></Text>
            </View>

            <View style={styles.vDivider} />

            {/* Position */}
            <View style={styles.statCol}>
              <Text style={styles.statLabel}>CURRENT POSITION</Text>
              <Text style={styles.statValuePurple}>#17</Text>
            </View>
          </View>

          {/* Next Position Bar */}
          <View style={styles.nextPosRow}>
            <Text style={styles.nextPosLeft}>NEXT POSITION: <Text style={{color: '#7F45FF', fontWeight: '800'}}>#16</Text></Text>
            <Text style={styles.nextPosRight}>120 <Text style={{fontWeight: '800'}}>XP</Text> to overtake</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '85%' }]} />
            <View style={styles.progressDot} />
          </View>
        </View>

        {/* Season Stats */}
        <View style={[styles.card, { width: width * 0.92 }]}>
          <Text style={styles.cardSectionTitle}>SEASON STATS</Text>
          <View style={styles.statsGridRow}>
            
            <View style={styles.statsGridItem}>
              <View style={styles.statsIconCircle}>
                <Text style={styles.statsIconText}>XP</Text>
              </View>
              <Text style={styles.statsGridLabel}>SEASON XP</Text>
              <Text style={styles.statsGridValue}>1,840</Text>
            </View>

            <View style={styles.statsGridItem}>
              <View style={styles.statsIconCircle}>
                <MaterialCommunityIcons name="poll" size={18} color="#7F45FF" />
              </View>
              <Text style={styles.statsGridLabel}>CURRENT POSITION</Text>
              <Text style={styles.statsGridValue}>#17</Text>
            </View>

            <View style={styles.statsGridItem}>
              <View style={styles.statsIconCircle}>
                <Feather name="calendar" size={16} color="#7F45FF" />
              </View>
              <Text style={styles.statsGridLabel}>DAYS ACTIVE</Text>
              <Text style={styles.statsGridValue}>12</Text>
            </View>

            <View style={styles.statsGridItem}>
              <View style={styles.statsIconCircle}>
                <MaterialCommunityIcons name="fire" size={18} color="#7F45FF" />
              </View>
              <Text style={styles.statsGridLabel}>SEASON STREAK</Text>
              <Text style={styles.statsGridValue}>7 DAYS</Text>
            </View>

          </View>
        </View>

        {/* Season Ladder */}
        <View style={[styles.card, { width: width * 0.92, padding: 0 }]}>
          <View style={styles.ladderHeader}>
            <Text style={styles.cardSectionTitle}>SEASON LADDER</Text>
            
            <View style={{ position: 'relative', zIndex: 10 }}>
              <TouchableOpacity 
                style={styles.filterDropdownBtn}
                onPress={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Feather name="globe" size={14} color="#0E0F19" style={{ marginRight: 6 }} />
                <Text style={styles.filterDropdownText}>{leaderboardFilter}</Text>
                <Feather name="chevron-down" size={14} color="#0E0F19" />
              </TouchableOpacity>
              
              {showFilterDropdown && (
                <View style={styles.dropdownMenu}>
                  {['GLOBAL', 'FRIENDS', 'LOCAL'].map(opt => (
                    <TouchableOpacity 
                      key={opt}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setLeaderboardFilter(opt);
                        setShowFilterDropdown(false);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={styles.ladderList}>
            {leaderboardData.map((item, index) => {
              if (item.rank === null) {
                return (
                  <View key={`ellipsis-${index}`} style={styles.ellipsisRow}>
                    <Text style={styles.ellipsisText}>...</Text>
                  </View>
                );
              }
              
              return (
                <View key={item.rank} style={[styles.ladderRow, item.isMe && styles.ladderRowMe]}>
                  {/* Rank Number / Crown */}
                  <View style={styles.ladderRankCol}>
                    {item.rank <= 3 ? (
                      <View style={styles.crownWrapper}>
                        <MaterialCommunityIcons 
                          name="crown" 
                          size={24} 
                          color={item.rank === 1 ? '#F59E0B' : item.rank === 2 ? '#94A3B8' : '#D97706'} 
                        />
                        <Text style={styles.crownNumber}>{item.rank}</Text>
                      </View>
                    ) : (
                      <Text style={[styles.ladderRankText, item.isMe && { color: '#7F45FF' }]}>{item.rank}</Text>
                    )}
                  </View>
                  
                  {/* Avatar */}
                  <View style={styles.ladderAvatarBox}>
                    <MaterialCommunityIcons name="account-circle" size={32} color={item.isMe ? '#7F45FF' : '#94A3B8'} />
                  </View>

                  {/* Name */}
                  <Text style={[styles.ladderNameText, item.isMe && { color: '#7F45FF', fontWeight: '800' }]}>
                    {item.name}
                  </Text>

                  {/* Spacer */}
                  <View style={{ flex: 1 }} />

                  {/* Rank Badge */}
                  {item.rankName ? (
                    <Image source={rankImages[item.rankName] ?? rankImages['Bronze V']} style={styles.ladderBadgeImg} resizeMode="contain" />
                  ) : null}

                  {/* XP */}
                  <Text style={[styles.ladderXpText, item.isMe && { color: '#7F45FF', fontWeight: '800' }]}>
                    {item.xp}
                  </Text>
                </View>
              );
            })}
          </View>

          <View style={{ padding: 16, paddingTop: 0 }}>
            <TouchableOpacity
              style={styles.viewFullBtn}
              onPress={() => router.push('/(tabs)/season/leaderboard')}
              activeOpacity={0.8}
            >
              <Feather name="award" size={14} color="#7F45FF" />
              <Text style={styles.viewFullText}>View Full Leaderboard</Text>
              <Feather name="chevron-right" size={14} color="#7F45FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Season Rules */}
        <View style={[styles.card, { width: width * 0.92 }]}>
          <TouchableOpacity 
            style={styles.rulesHeader}
            onPress={() => setRulesExpanded(!rulesExpanded)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="shield" size={16} color="#7F45FF" style={{ marginRight: 8 }} />
              <Text style={styles.cardSectionTitle}>SEASON RULES</Text>
            </View>
            <Feather name={rulesExpanded ? "chevron-up" : "chevron-down"} size={16} color="#0E0F19" />
          </TouchableOpacity>

          {rulesExpanded && (
            <View style={styles.rulesBody}>
              <Text style={styles.ruleItem}>1. Complete habits to earn Season XP.</Text>
              <Text style={styles.ruleItem}>2. Season XP determines leaderboard position.</Text>
              <Text style={styles.ruleItem}>3. Your permanent <Text style={{fontWeight: '700'}}>Level</Text> and <Text style={{fontWeight: '700'}}>Rank</Text> never reset.</Text>
              <Text style={styles.ruleItem}>4. Season XP resets when the Season ends.</Text>
              <Text style={styles.ruleItem}>5. The leaderboard closes when the Season timer reaches zero.</Text>
            </View>
          )}
        </View>

      </ScrollView>
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
  iconBtn: {
    width: 44, height: 44,
    borderRadius: 12,
    backgroundColor: '#FFF',
    borderWidth: 1, borderColor: '#F1F5F9',
    justifyContent: 'center', alignItems: 'center',
  },
  bellBadge: {
    position: 'absolute', top: 12, right: 12, width: 8, height: 8,
    borderRadius: 4, backgroundColor: '#EF4444',
  },
  headerTitleBox: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0E0F19',
  },
  subtitle: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },

  // Banner
  bannerCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1, borderColor: '#E2E8F0',
  },
  bannerContent: {
    flexDirection: 'row',
    padding: 20,
  },
  bannerTextSide: {
    flex: 1,
    paddingRight: 10,
  },
  seasonNumber: {
    fontSize: 10, fontWeight: '800', color: '#7F45FF', letterSpacing: 1,
  },
  seasonName: {
    fontSize: 22, fontWeight: '900', color: '#0E0F19',
    letterSpacing: -0.5, marginTop: 4, marginBottom: 8,
  },
  timerBadge: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12,
    borderWidth: 1, borderColor: '#EDE9FF', marginBottom: 12,
  },
  timerText: {
    fontSize: 10, fontWeight: '800', color: '#7F45FF', marginLeft: 4,
  },
  bannerDesc: {
    fontSize: 11, color: '#475569', lineHeight: 16, marginBottom: 14,
  },
  rulesBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', alignSelf: 'flex-start',
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8,
    borderWidth: 1, borderColor: '#EDE9FF',
  },
  rulesBtnText: {
    fontSize: 10, fontWeight: '800', color: '#7F45FF', marginHorizontal: 6,
  },
  bannerImageSide: {
    width: 100, justifyContent: 'center', alignItems: 'center',
  },
  bannerCrystalImg: {
    width: 120, height: 120,
  },

  // Generic Card
  card: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  cardSectionTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
  },

  // Status Card
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  rankShieldImg: {
    width: 60, height: 60, marginRight: 12,
  },
  rankInfoCol: {
    flex: 1,
  },
  rankBadge: {
    backgroundColor: '#EDE9FF', alignSelf: 'flex-start',
    paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginBottom: 4,
  },
  rankBadgeText: { fontSize: 8, fontWeight: '800', color: '#7F45FF' },
  rankName: { fontSize: 16, fontWeight: '900', color: '#0E0F19' },
  rankLevel: { fontSize: 10, fontWeight: '700', color: '#64748B', marginTop: 2 },
  
  vDivider: { width: 1, height: 40, backgroundColor: '#F1F5F9', marginHorizontal: 12 },
  
  statCol: { alignItems: 'center' },
  statLabel: { fontSize: 8, fontWeight: '700', color: '#64748B', marginBottom: 4 },
  statValuePurple: { fontSize: 16, fontWeight: '900', color: '#7F45FF' },
  statValueSub: { fontSize: 10, fontWeight: '600' },

  nextPosRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  nextPosLeft: { fontSize: 10, color: '#64748B', fontWeight: '600' },
  nextPosRight: { fontSize: 10, color: '#94A3B8' },
  progressBarBg: { height: 8, backgroundColor: '#F1F5F9', borderRadius: 4, width: '100%', flexDirection: 'row', alignItems: 'center' },
  progressBarFill: { height: 8, backgroundColor: '#7F45FF', borderRadius: 4 },
  progressDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFF', borderWidth: 3, borderColor: '#7F45FF', marginLeft: -6 },

  // Stats Grid
  statsGridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statsGridItem: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#F1F5F9',
  },
  statsIconCircle: {
    width: 36, height: 36, borderRadius: 18, backgroundColor: '#EDE9FF',
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  statsIconText: { fontSize: 12, fontWeight: '900', color: '#7F45FF' },
  statsGridLabel: { fontSize: 8, fontWeight: '800', color: '#64748B', textAlign: 'center', marginBottom: 4 },
  statsGridValue: { fontSize: 14, fontWeight: '900', color: '#7F45FF' },

  // Ladder
  ladderHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  filterDropdownBtn: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#FFF', paddingHorizontal: 10, paddingVertical: 6,
    borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0',
  },
  filterDropdownText: { fontSize: 10, fontWeight: '800', color: '#0E0F19', marginRight: 4 },
  dropdownMenu: {
    position: 'absolute', top: 32, right: 0,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#E2E8F0',
    borderRadius: 8, width: 100, zIndex: 100, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 5,
  },
  dropdownItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  dropdownItemText: { fontSize: 10, fontWeight: '700', color: '#0E0F19' },

  ladderList: {
    paddingVertical: 8,
  },
  ladderRow: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: 16,
  },
  ladderRowMe: {
    backgroundColor: '#F9F5FF',
  },
  ladderRankCol: { width: 30, alignItems: 'center' },
  ladderRankText: { fontSize: 13, fontWeight: '700', color: '#0E0F19' },
  crownWrapper: { alignItems: 'center', justifyContent: 'center' },
  crownNumber: { position: 'absolute', fontSize: 9, fontWeight: '900', color: '#FFF', top: 8 },
  ladderAvatarBox: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center', marginHorizontal: 12 },
  ladderNameText: { fontSize: 13, fontWeight: '600', color: '#0E0F19' },
  ladderBadgeImg: { width: 24, height: 24, marginRight: 12 },
  ladderXpText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  ellipsisRow: { alignItems: 'center', paddingVertical: 8 },
  ellipsisText: { fontSize: 14, fontWeight: '700', color: '#94A3B8', letterSpacing: 2 },

  viewFullBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#EDE9FF',
    marginTop: 8,
  },
  viewFullText: { fontSize: 12, fontWeight: '800', color: '#7F45FF', marginHorizontal: 8 },

  // Rules
  rulesHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  rulesBody: {
    marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F1F5F9',
  },
  ruleItem: {
    fontSize: 12, color: '#475569', lineHeight: 20, marginBottom: 4,
  },
});
