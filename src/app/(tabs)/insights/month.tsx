import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useRouter } from 'expo-router';
import { getRank, CircularProgress, WavyChart } from './index';

// ─── Heatmap Calendar Data ─────────────────────────────────────────────────
const HEATMAP_COLORS = {
  zero: '#F8FAFC',
  low: '#DDD6FE',
  med: '#A78BFA',
  high: '#6D28D9',
  full: '#2E1065',
  adjacent: '#F1F5F9',
};

interface DayCell { day: number; isCurrentMonth: boolean; completion: number; isToday?: boolean; }

const AUGUST_DAYS: DayCell[] = [
  { day: 27, isCurrentMonth: false, completion: 0 },
  { day: 28, isCurrentMonth: false, completion: 0 },
  { day: 29, isCurrentMonth: false, completion: 0 },
  { day: 30, isCurrentMonth: false, completion: 0 },
  { day: 31, isCurrentMonth: false, completion: 0 },
  { day: 1, isCurrentMonth: true, completion: 100 },
  { day: 2, isCurrentMonth: true, completion: 60 },
  { day: 3, isCurrentMonth: true, completion: 40 },
  { day: 4, isCurrentMonth: true, completion: 60 },
  { day: 5, isCurrentMonth: true, completion: 100 },
  { day: 6, isCurrentMonth: true, completion: 30 },
  { day: 7, isCurrentMonth: true, completion: 100 },
  { day: 8, isCurrentMonth: true, completion: 70 },
  { day: 9, isCurrentMonth: true, completion: 35 },
  { day: 10, isCurrentMonth: true, completion: 100 },
  { day: 11, isCurrentMonth: true, completion: 65 },
  { day: 12, isCurrentMonth: true, completion: 60 },
  { day: 13, isCurrentMonth: true, completion: 45 },
  { day: 14, isCurrentMonth: true, completion: 100 },
  { day: 15, isCurrentMonth: true, completion: 60 },
  { day: 16, isCurrentMonth: true, completion: 30 },
  { day: 17, isCurrentMonth: true, completion: 60 },
  { day: 18, isCurrentMonth: true, completion: 35 },
  { day: 19, isCurrentMonth: true, completion: 100 },
  { day: 20, isCurrentMonth: true, completion: 65 },
  { day: 21, isCurrentMonth: true, completion: 100 },
  { day: 22, isCurrentMonth: true, completion: 60 },
  { day: 23, isCurrentMonth: true, completion: 40 },
  { day: 24, isCurrentMonth: true, completion: 35 },
  { day: 25, isCurrentMonth: true, completion: 70 },
  { day: 26, isCurrentMonth: true, completion: 100 },
  { day: 27, isCurrentMonth: true, completion: 60 },
  { day: 28, isCurrentMonth: true, completion: 100, isToday: true },
  { day: 29, isCurrentMonth: true, completion: 65 },
  { day: 30, isCurrentMonth: true, completion: 40 },
  { day: 31, isCurrentMonth: true, completion: 60 },
  { day: 1, isCurrentMonth: false, completion: 0 },
  { day: 2, isCurrentMonth: false, completion: 0 },
  { day: 3, isCurrentMonth: false, completion: 0 },
  { day: 4, isCurrentMonth: false, completion: 0 },
  { day: 5, isCurrentMonth: false, completion: 0 },
];

function getCellColor(cell: DayCell): string {
  if (!cell.isCurrentMonth) return HEATMAP_COLORS.adjacent;
  if (cell.completion >= 100) return HEATMAP_COLORS.full;
  if (cell.completion >= 76) return HEATMAP_COLORS.high;
  if (cell.completion >= 51) return HEATMAP_COLORS.med;
  if (cell.completion >= 26) return HEATMAP_COLORS.low;
  return HEATMAP_COLORS.zero;
}

function getCellTextColor(cell: DayCell): string {
  if (!cell.isCurrentMonth) return '#94A3B8';
  if (cell.completion >= 76) return '#FFFFFF';
  return '#475569';
}

// Animated fade in wrapper
function FadeInView({ delay, children }: { delay: number; children: React.ReactNode }) {
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      delay,
      useNativeDriver: true,
    }).start();
  }, []);
  return <Animated.View style={{ opacity }}>{children}</Animated.View>;
}

// Month bars (animated)
function MonthBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  const animH = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(animH, { toValue: pct, duration: 700, delay, useNativeDriver: false }).start();
  }, [pct]);
  return (
    <Animated.View
      style={{
        width: 12,
        height: animH,
        backgroundColor: '#7F45FF',
        borderRadius: 4,
        alignSelf: 'flex-end',
      }}
    />
  );
}

function HabitRow({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const barAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(barAnim, { toValue: pct, duration: 700, delay, useNativeDriver: false }).start();
  }, [pct]);
  return (
    <View style={styles.habitBreakdownRow}>
      <Text style={styles.habitBreakdownName}>{name}</Text>
      <View style={styles.habitBarTrack}>
        <Animated.View
          style={[
            styles.habitBarFill,
            {
              width: barAnim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }),
              backgroundColor: color,
            },
          ]}
        />
      </View>
      <Text style={[styles.habitPctText, { color }]}>{pct}%</Text>
    </View>
  );
}

export default function MonthScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();
  const [period, setPeriod] = useState<'WEEK' | 'MONTH' | 'YEAR'>('MONTH');
  const [activeMonthIndex, setActiveMonthIndex] = useState(0);

  const currentLevel = 24;
  const currentRank = getRank(currentLevel);

  const handlePeriodChange = (p: 'WEEK' | 'MONTH' | 'YEAR') => {
    if (p === 'WEEK') router.push('/(tabs)/insights');
    else if (p === 'YEAR') router.push('/(tabs)/insights/year');
  };

  const BAR_MAX = 60;
  const weekBars = [
    { w: 'W1', pct: 52 },
    { w: 'W2', pct: 48 },
    { w: 'W3', pct: BAR_MAX },
    { w: 'W4', pct: 44 },
  ];

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

        {/* 3 Monthly Stat Cards */}
        <FadeInView delay={0}>
          <View style={[styles.statsRow, { width: width * 0.92 }]}>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#EDE9FF' }]}>
                <Ionicons name="calendar-outline" size={18} color="#7F45FF" />
              </View>
              <Text style={styles.statCardLabel}>THIS MONTH</Text>
              <Text style={styles.statCardValue}>84%</Text>
              <Text style={styles.statCardSub}>Avg completion</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#FFF3EC' }]}>
                <MaterialCommunityIcons name="fire" size={18} color="#F97316" />
              </View>
              <Text style={styles.statCardLabel}>BEST STREAK</Text>
              <Text style={[styles.statCardValue, { color: '#F97316' }]}>24 DAYS</Text>
              <Text style={styles.statCardSub}>Personal best</Text>
            </View>
            <View style={styles.statCard}>
              <View style={[styles.statIconCircle, { backgroundColor: '#EDE9FF' }]}>
                <Text style={{ fontSize: 10, fontWeight: '900', color: '#7F45FF' }}>XP</Text>
              </View>
              <Text style={styles.statCardLabel}>MONTHLY XP</Text>
              <Text style={[styles.statCardValue, { color: '#7F45FF' }]}>+1,240</Text>
              <Text style={styles.statCardSub}>Total earned</Text>
            </View>
          </View>
        </FadeInView>

        {/* Monthly Active Calendar / Heatmap */}
        <FadeInView delay={100}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>ACTIVE CALENDAR</Text>

            <View style={styles.monthNavRow}>
              <TouchableOpacity><Feather name="chevron-left" size={18} color="#64748B" /></TouchableOpacity>
              <Text style={styles.monthNavTitle}>AUGUST 2026</Text>
              <TouchableOpacity><Feather name="chevron-right" size={18} color="#64748B" /></TouchableOpacity>
            </View>

            <View style={styles.weekDaysHeader}>
              {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d, i) => (
                <Text key={i} style={styles.weekDayHeaderText}>{d}</Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {AUGUST_DAYS.map((cell, index) => {
                const cellBg = getCellColor(cell);
                return (
                  <View
                    key={index}
                    style={[
                      styles.calendarCell,
                      { backgroundColor: cellBg },
                      cell.isToday && styles.calendarCellToday,
                    ]}
                  >
                    <Text style={[styles.calendarCellText, { color: getCellTextColor(cell) }]}>
                      {cell.day}
                    </Text>
                  </View>
                );
              })}
            </View>

            {/* Heatmap Legend */}
            <View style={styles.legendRow}>
              {[
                { label: 'None', color: '#F8FAFC', border: true },
                { label: '1–2', color: '#DDD6FE' },
                { label: '3–4', color: '#A78BFA' },
                { label: '5+', color: '#6D28D9' },
                { label: 'All', color: '#2E1065' },
              ].map((l, i) => (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: l.color, borderWidth: l.border ? 1 : 0, borderColor: '#E2E8F0' }]} />
                  <Text style={styles.legendText}>{l.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeInView>

        {/* Monthly Completion + Consistency */}
        <FadeInView delay={150}>
          <View style={[styles.twoColRow, { width: width * 0.92 }]}>
            <View style={styles.halfCard}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardSectionTitle}>COMPLETION</Text>
                <Text style={styles.cardDateRange}>August</Text>
              </View>
              <View style={[styles.completionBody, { marginVertical: 10 }]}>
                <CircularProgress percentage={84} size={66} sublabel="Monthly avg" />
                {/* Week bars */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: BAR_MAX }}>
                  {weekBars.map((b, i) => (
                    <View key={i} style={{ alignItems: 'center' }}>
                      <MonthBar pct={b.pct} delay={i * 80} />
                      <Text style={{ fontSize: 8, color: '#94A3B8', fontWeight: '600', marginTop: 3 }}>{b.w}</Text>
                    </View>
                  ))}
                </View>
              </View>
              <View style={styles.growthRow}>
                <Text style={styles.growthText}>↗ 8%</Text>
                <Text style={styles.growthSub}> from last month</Text>
              </View>
            </View>

            <View style={styles.halfCard}>
              <Text style={styles.cardSectionTitle}>CONSISTENCY</Text>
              <View style={[styles.completionBody, { marginVertical: 10 }]}>
                <CircularProgress percentage={78} size={66} sublabel="Monthly avg" />
                <WavyChart width={82} height={44} />
              </View>
              <View style={styles.growthRow}>
                <Text style={styles.growthText}>↗ 6%</Text>
                <Text style={styles.growthSub}> from last month</Text>
              </View>
            </View>
          </View>
        </FadeInView>

        {/* Habits Breakdown */}
        <FadeInView delay={200}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.cardSectionTitle}>HABIT BREAKDOWN</Text>
            {[
              { name: 'Morning Workout', pct: 90, color: '#F97316' },
              { name: 'Read 30 Pages', pct: 75, color: '#7F45FF' },
              { name: 'Drink 3L Water', pct: 60, color: '#3B82F6' },
              { name: 'Meditate', pct: 85, color: '#22C55E' },
              { name: 'Sleep Before 11pm', pct: 50, color: '#A855F7' },
            ].map((h, i) => (
              <HabitRow key={i} name={h.name} pct={h.pct} color={h.color} delay={i * 80} />
            ))}
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
  cardSectionTitle: { fontSize: 11, fontWeight: '800', color: '#0E0F19', letterSpacing: 0.5, marginBottom: 10 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardDateRange: { fontSize: 8, fontWeight: '600', color: '#94A3B8' },

  monthNavRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, paddingHorizontal: 8 },
  monthNavTitle: { fontSize: 13, fontWeight: '800', color: '#0E0F19', letterSpacing: 0.5 },

  weekDaysHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  weekDayHeaderText: { width: '13%', textAlign: 'center', fontSize: 9, fontWeight: '700', color: '#94A3B8' },
  calendarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 6 },
  calendarCell: { width: '13%', aspectRatio: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center', padding: 0 },
  calendarCellToday: { borderWidth: 2, borderColor: '#7F45FF' },
  calendarCellText: { fontSize: 11, fontWeight: '700', textAlign: 'center', includeFontPadding: false },

  legendRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F8FAFC' },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  legendBox: { width: 12, height: 12, borderRadius: 3 },
  legendText: { fontSize: 9, fontWeight: '600', color: '#64748B' },

  twoColRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  halfCard: { flex: 1, backgroundColor: '#FFF', borderRadius: 18, padding: 12, borderWidth: 1, borderColor: '#F1F5F9', justifyContent: 'space-between' },
  completionBody: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  growthRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  growthText: { fontSize: 11, fontWeight: '800', color: '#16A34A' },
  growthSub: { fontSize: 10, color: '#64748B' },

  habitBreakdownRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  habitBreakdownName: { width: 100, fontSize: 11, fontWeight: '600', color: '#0E0F19' },
  habitBarTrack: { flex: 1, height: 6, backgroundColor: '#F1F5F9', borderRadius: 3, marginHorizontal: 8, overflow: 'hidden' },
  habitBarFill: { height: '100%', borderRadius: 3 },
  habitPctText: { width: 34, fontSize: 11, fontWeight: '800', textAlign: 'right' },
});
