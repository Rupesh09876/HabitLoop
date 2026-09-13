import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Polyline, Defs, LinearGradient as SvgGradient, Stop, Path, Circle } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { getRank, CircularProgress } from './index';

// ─── Monthly XP data ────────────────────────────────────────────────────────
const MONTHS_DATA = [
  { label: 'Jan', xp: 900 },
  { label: 'Feb', xp: 1050 },
  { label: 'Mar', xp: 820 },
  { label: 'Apr', xp: 1200 },
  { label: 'May', xp: 960 },
  { label: 'Jun', xp: 1100 },
  { label: 'Jul', xp: 1300 },
  { label: 'Aug', xp: 1240 },
  { label: 'Sep', xp: 0 },
  { label: 'Oct', xp: 0 },
  { label: 'Nov', xp: 0 },
  { label: 'Dec', xp: 0 },
];

// Month completion heatmap (12 months × ~30 days = compact view)
const MONTH_HEATMAP_COLORS = ['#F8FAFC', '#DDD6FE', '#A78BFA', '#6D28D9', '#2E1065'];

function getHeatColor(val: number) {
  if (val >= 90) return MONTH_HEATMAP_COLORS[4];
  if (val >= 70) return MONTH_HEATMAP_COLORS[3];
  if (val >= 50) return MONTH_HEATMAP_COLORS[2];
  if (val >= 25) return MONTH_HEATMAP_COLORS[1];
  return MONTH_HEATMAP_COLORS[0];
}

// Fake per-month completion to drive monthly "heatmap" row
const MONTH_COMPLETION = [88, 74, 60, 92, 70, 80, 95, 84, 0, 0, 0, 0];

// Line chart for XP over months
function XpLineChart({ width, height }: { width: number; height: number }) {
  const maxXp = 1400;
  const data = MONTHS_DATA.slice(0, 8);
  const padX = 28, padY = 12;
  const chartW = width - padX * 2;
  const chartH = height - padY * 2;

  const points = data.map((d, i) => ({
    x: padX + (i / (data.length - 1)) * chartW,
    y: padY + chartH - (d.xp / maxXp) * chartH,
  }));

  const polyPoints = points.map(p => `${p.x},${p.y}`).join(' ');
  const areaPath = `M ${points.map(p => `${p.x},${p.y}`).join(' L ')} L ${points[points.length - 1].x},${height} L ${points[0].x},${height} Z`;

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <Defs>
        <SvgGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7F45FF" stopOpacity="0.3" />
          <Stop offset="1" stopColor="#7F45FF" stopOpacity="0.0" />
        </SvgGradient>
      </Defs>
      <Path d={areaPath} fill="url(#xpGrad)" />
      <Polyline points={polyPoints} fill="none" stroke="#7F45FF" strokeWidth="2.5" strokeLinejoin="round" />
      {points.map((p, i) => (
        <Circle key={i} cx={p.x} cy={p.y} r={4} fill={MONTHS_DATA[i].xp === 0 ? '#F1F5F9' : '#7F45FF'} stroke="#FFF" strokeWidth="1.5" />
      ))}
    </Svg>
  );
}

// Animated bar for year-monthly chart
function YearMonthBar({ pct, delay = 0, highlight }: { pct: number; delay?: number; highlight?: boolean }) {
  const animH = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animH, { toValue: pct, duration: 700, delay, useNativeDriver: false }).start();
  }, [pct]);
  return (
    <Animated.View style={{ width: 16, height: animH, backgroundColor: highlight ? '#3B0F8C' : '#7F45FF', borderRadius: 5, alignSelf: 'flex-end', opacity: pct === 0 ? 0.2 : 1 }} />
  );
}

function FadeInView({ delay, children }: { delay: number; children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 500, delay, useNativeDriver: true }).start();
  }, []);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

export default function YearScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [period, setPeriod] = useState<'WEEK' | 'MONTH' | 'YEAR'>('YEAR');

  const currentLevel = 24;
  const currentRank = getRank(currentLevel);

  const handlePeriodChange = (p: 'WEEK' | 'MONTH' | 'YEAR') => {
    if (p === 'WEEK') router.push('/(tabs)/insights');
    else if (p === 'MONTH') router.push('/(tabs)/insights/month');
  };

  const BAR_MAX = 70;
  const monthBars = MONTHS_DATA.map(m => ({
    label: m.label,
    pct: m.xp === 0 ? 6 : (m.xp / 1400) * BAR_MAX,
    isActive: m.xp > 0,
  }));

  const totalXp = MONTHS_DATA.reduce((a, m) => a + m.xp, 0);
  const completedMonths = MONTHS_DATA.filter(m => m.xp > 0).length;
  const avgXp = Math.round(totalXp / completedMonths);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={[styles.header, { width: width * 0.92 }]}>
          <View>
            <Text style={styles.title}>INSIGHTS</Text>
            <Text style={styles.subtitle}>Your progress at a glance.</Text>
          </View>
          <TouchableOpacity style={styles.calendarIconBtn}>
            <Ionicons name="calendar-outline" size={20} color="#7F45FF" />
          </TouchableOpacity>
        </View>

        {/* Period Switcher */}
        <View style={[styles.periodSwitcher, { width: width * 0.92 }]}>
          {(['WEEK', 'MONTH', 'YEAR'] as const).map(p => (
            <TouchableOpacity
              key={p}
              style={[styles.periodTab, period === p && styles.periodTabActive]}
              onPress={() => handlePeriodChange(p)}
            >
              <Text style={[styles.periodTabText, period === p && styles.periodTabTextActive]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 3 Yearly Stat Cards */}
        <FadeInView delay={0}>
          <View style={[styles.statsRow, { width: width * 0.92 }]}>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#EDE9FF' }]}>
                <Ionicons name="trending-up-outline" size={18} color="#7F45FF" />
              </View>
              <Text style={styles.statCardLabel}>YEAR AVG</Text>
              <Text style={styles.statCardValue}>84%</Text>
              <Text style={styles.statCardSub}>Completion</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#FFF3EC' }]}>
                <MaterialCommunityIcons name="trophy-outline" size={18} color="#F97316" />
              </View>
              <Text style={styles.statCardLabel}>TOTAL XP</Text>
              <Text style={[styles.statCardValue, { color: '#F97316' }]}>{totalXp.toLocaleString()}</Text>
              <Text style={styles.statCardSub}>All year</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#EDE9FF' }]}>
                <Text style={{ fontSize: 9, fontWeight: '900', color: '#7F45FF' }}>AVG</Text>
              </View>
              <Text style={styles.statCardLabel}>AVG / MONTH</Text>
              <Text style={[styles.statCardValue, { color: '#7F45FF' }]}>{avgXp}</Text>
              <Text style={styles.statCardSub}>XP per month</Text>
            </View>
          </View>
        </FadeInView>

        {/* Monthly Bar Chart */}
        <FadeInView delay={80}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>YEARLY XP OVERVIEW</Text>
            <Text style={styles.cardSubtitle}>Jan – Dec 2026</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginTop: 16, height: BAR_MAX + 30 }}>
              {monthBars.map((b, i) => (
                <View key={i} style={{ alignItems: 'center', height: BAR_MAX + 20 }}>
                  <YearMonthBar pct={b.pct} delay={i * 60} highlight={b.label === 'Aug'} />
                  <Text style={[styles.monthLabel, !b.isActive && { color: '#CBD5E1' }]}>{b.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* XP Line Chart */}
        <FadeInView delay={140}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>XP TREND</Text>
            <Text style={styles.cardSubtitle}>Monthly XP earned in 2026</Text>
            <View style={{ marginTop: 12 }}>
              <XpLineChart width={width * 0.92 - 32} height={120} />
            </View>
            {/* Month labels */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 14, marginTop: 4 }}>
              {MONTHS_DATA.slice(0, 8).map((m, i) => (
                <Text key={i} style={[styles.monthLabel, m.xp === 0 && { color: '#CBD5E1' }]}>{m.label}</Text>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Monthly Heatmap Strip */}
        <FadeInView delay={200}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>MONTHLY COMPLETION HEAT</Text>
            <View style={styles.heatStrip}>
              {MONTH_COMPLETION.map((val, i) => (
                <View key={i} style={styles.heatCell}>
                  <View style={[styles.heatBox, { backgroundColor: getHeatColor(val), opacity: val === 0 ? 0.3 : 1 }]} />
                  <Text style={styles.heatLabel}>{MONTHS_DATA[i].label}</Text>
                </View>
              ))}
            </View>
            <View style={styles.legendRow}>
              {[
                { label: '< 25%', color: MONTH_HEATMAP_COLORS[1] },
                { label: '25–50%', color: MONTH_HEATMAP_COLORS[2] },
                { label: '50–70%', color: MONTH_HEATMAP_COLORS[3] },
                { label: '70–90%', color: MONTH_HEATMAP_COLORS[4] },
              ].map((l, i) => (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: l.color }]} />
                  <Text style={styles.legendText}>{l.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Rank Progress Card */}
        <FadeInView delay={250}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>RANK PROGRESS</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
              <CircularProgress percentage={62} size={68} sublabel={currentRank} color="#3B0F8C" />
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ fontSize: 15, fontWeight: '900', color: '#0E0F19' }}>Level {currentLevel} – {currentRank}</Text>
                <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>
                  Top 18% of all players this year
                </Text>
                <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                  {[
                    { tier: 'Bronze V', done: true },
                    { tier: 'Bronze IV', done: true },
                    { tier: 'Bronze III', done: true },
                    { tier: 'Bronze II', done: true },
                    { tier: 'Bronze I', done: false },
                  ].map((r, i) => (
                    <View key={i} style={[styles.rankBadge, r.done && styles.rankBadgeDone]}>
                      <Text style={[styles.rankBadgeText, r.done && styles.rankBadgeTextDone]}>{r.tier.replace('Bronze ', 'B')}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </FadeInView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  scrollContent: { alignItems: 'center', paddingTop: 10, paddingBottom: 40 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: '900', color: '#0E0F19', letterSpacing: -0.5 },
  subtitle: { fontSize: 12, fontWeight: '500', color: '#64748B', marginTop: 2 },
  calendarIconBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },

  periodSwitcher: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 24, padding: 4, borderWidth: 1, borderColor: '#F1F5F9', marginBottom: 16 },
  periodTab: { flex: 1, paddingVertical: 10, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  periodTabActive: { backgroundColor: '#7F45FF', shadowColor: '#7F45FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 8, elevation: 3 },
  periodTabText: { fontSize: 12, fontWeight: '700', color: '#64748B', letterSpacing: 0.5 },
  periodTabTextActive: { color: '#FFF' },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 18, paddingVertical: 14, paddingHorizontal: 6, alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 6, elevation: 1 },
  statIconCircle: { width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  statCardLabel: { fontSize: 8, fontWeight: '800', color: '#64748B', letterSpacing: 0.5, marginBottom: 4, textAlign: 'center' },
  statCardValue: { fontSize: 15, fontWeight: '900', color: '#0E0F19', marginBottom: 2, textAlign: 'center' },
  statCardSub: { fontSize: 9, fontWeight: '500', color: '#94A3B8', textAlign: 'center' },

  card: { backgroundColor: '#FFF', borderRadius: 20, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.02, shadowRadius: 6, elevation: 1 },
  cardSectionTitle: { fontSize: 11, fontWeight: '800', color: '#0E0F19', letterSpacing: 0.5, marginBottom: 4 },
  cardSubtitle: { fontSize: 10, fontWeight: '500', color: '#94A3B8' },

  monthLabel: { fontSize: 9, fontWeight: '700', color: '#64748B', marginTop: 5, textAlign: 'center' },

  heatStrip: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 14 },
  heatCell: { alignItems: 'center', flex: 1 },
  heatBox: { width: 20, height: 20, borderRadius: 5 },
  heatLabel: { fontSize: 8, fontWeight: '600', color: '#94A3B8', marginTop: 3 },

  legendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F8FAFC' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendBox: { width: 12, height: 12, borderRadius: 3 },
  legendText: { fontSize: 9, fontWeight: '600', color: '#64748B' },

  rankBadge: { backgroundColor: '#F1F5F9', borderRadius: 8, paddingHorizontal: 6, paddingVertical: 4 },
  rankBadgeDone: { backgroundColor: '#7F45FF' },
  rankBadgeText: { fontSize: 8, fontWeight: '800', color: '#94A3B8' },
  rankBadgeTextDone: { color: '#FFF' },
});
