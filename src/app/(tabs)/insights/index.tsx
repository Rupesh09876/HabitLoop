import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, useWindowDimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Svg, { Circle, Path, Defs, LinearGradient as SvgGradient, Stop } from 'react-native-svg';
import { useRouter, useFocusEffect } from 'expo-router';

// ─── Shared helpers (exported for month.tsx / year.tsx) ────────────────────

export function getRank(level: number): string {
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

// ─── Circular Progress ─────────────────────────────────────────────────────
export function CircularProgress({
  percentage,
  size = 72,
  strokeWidth = 7,
  sublabel,
  color = '#7F45FF',
  animKey = 0,
}: {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  sublabel?: string;
  color?: string;
  animKey?: number;
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [displayPct, setDisplayPct] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    animatedValue.setValue(0);
    setDisplayPct(0);
    const listener = animatedValue.addListener(({ value }) =>
      setDisplayPct(Math.round(value)),
    );
    const anim = Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    });
    anim.start();
    return () => {
      animatedValue.removeListener(listener);
      anim.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percentage, animKey]);

  const strokeDashoffset = circumference - (circumference * displayPct) / 100;

  return (
    <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke="#F1F5F9" strokeWidth={strokeWidth} fill="none"
        />
        <Circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: size * 0.22, fontWeight: '900', color: '#0E0F19' }}>
            {displayPct}%
          </Text>
          {sublabel && (
            <Text style={{ fontSize: size * 0.105, fontWeight: '600', color: '#64748B', textAlign: 'center', marginTop: 1 }}>
              {sublabel}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

// ─── Wavy trend chart ──────────────────────────────────────────────────────
export function WavyChart({ width = 110, height = 48 }: { width?: number; height?: number }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 110 48">
      <Defs>
        <SvgGradient id="waveGrad2" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#7F45FF" stopOpacity="0.2" />
          <Stop offset="1" stopColor="#7F45FF" stopOpacity="0.0" />
        </SvgGradient>
      </Defs>
      <Path
        d="M 4 40 C 18 42, 28 22, 44 26 C 58 30, 68 16, 84 22 C 94 26, 100 14, 106 10 L 106 48 L 4 48 Z"
        fill="url(#waveGrad2)"
      />
      <Path
        d="M 4 40 C 18 42, 28 22, 44 26 C 58 30, 68 16, 84 22 C 94 26, 100 14, 106 10"
        stroke="#7F45FF" strokeWidth="2.2" fill="none" strokeLinecap="round"
      />
      <Circle cx="106" cy="10" r="3.5" fill="#7F45FF" />
    </Svg>
  );
}

// ─── Bar color scale ────────────────────────────────────────────────────────
function barColor(pct: number): string {
  if (pct >= 100) return '#2E1065';
  if (pct >= 76) return '#5B21B6';
  if (pct >= 51) return '#7C3AED';
  if (pct >= 26) return '#C4B5FD';
  return '#EDE9FE';
}

// ─── Week data ──────────────────────────────────────────────────────────────
const WEEK_DAYS = [
  { day: 'MON', date: 18, pct: 80 },
  { day: 'TUE', date: 19, pct: 60 },
  { day: 'WED', date: 20, pct: 100 },  // today – highlighted
  { day: 'THU', date: 21, pct: 40 },
  { day: 'FRI', date: 22, pct: 90 },
  { day: 'SAT', date: 23, pct: 70 },
  { day: 'SUN', date: 24, pct: 50 },
];

// ─── Animated bar (remounts via key to replay anim) ─────────────────────────
function AnimatedBar({
  pct,
  maxH,
  isToday,
  delay = 0,
}: {
  pct: number;
  maxH: number;
  isToday?: boolean;
  delay?: number;
}) {
  const animH = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animH.setValue(0);
    Animated.timing(animH, {
      toValue: (pct / 100) * maxH,
      duration: 650,
      delay,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View
      style={{
        width: 32,
        height: animH,
        backgroundColor: isToday ? '#2E1065' : barColor(pct),
        borderRadius: 10,
        alignSelf: 'flex-end',
      }}
    />
  );
}

// ─── Mini bar (weekly completion panel) ─────────────────────────────────────
function MiniBar({ pct, delay = 0 }: { pct: number; delay?: number }) {
  const animH = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animH.setValue(0);
    Animated.timing(animH, {
      toValue: pct,
      duration: 600,
      delay,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View
      style={{
        width: 11,
        height: animH,
        backgroundColor: pct >= 40 ? '#7C3AED' : '#C4B5FD',
        borderRadius: 5,
        alignSelf: 'flex-end',
      }}
    />
  );
}

// ─── XP progress bar ────────────────────────────────────────────────────────
function XpBar({ pct, animKey = 0 }: { pct: number; animKey?: number }) {
  const animW = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    animW.setValue(0);
    Animated.timing(animW, {
      toValue: pct,
      duration: 1000,
      delay: 200,
      useNativeDriver: false,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pct, animKey]);
  return (
    <View style={styles.xpBarTrack}>
      <Animated.View
        style={[
          styles.xpBarFill,
          { width: animW.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] }) },
        ]}
      />
    </View>
  );
}

// ─── Fade-slide-in wrapper ──────────────────────────────────────────────────
function FadeSlide({
  delay,
  children,
  animKey = 0,
}: {
  delay: number;
  children: React.ReactNode;
  animKey?: number;
}) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    opacity.setValue(0);
    translateY.setValue(18);
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 420, delay, useNativeDriver: true }),
      Animated.timing(translateY, { toValue: 0, duration: 420, delay, useNativeDriver: true }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      {children}
    </Animated.View>
  );
}

// ─── Shield rank badge ───────────────────────────────────────────────────────
function ShieldBadge({ level, rank }: { level: number; rank: string }) {
  return (
    <View style={styles.shieldWrap}>
      {/* Shield shape using layered views */}
      <View style={styles.shieldOuter}>
        <View style={styles.shieldInner}>
          <Text style={styles.shieldLevel}>{level}</Text>
        </View>
      </View>
      <Text style={styles.shieldRankText}>{rank.toUpperCase()}</Text>
    </View>
  );
}

// ─── Main Week Screen ────────────────────────────────────────────────────────
export default function InsightsWeekScreen() {
  const { width } = useWindowDimensions();
  const router = useRouter();

  const currentLevel = 24;
  const currentXp = 245;
  const nextXp = 445;
  const xpPct = Math.round((currentXp / nextXp) * 100); // 55%
  const currentRank = getRank(currentLevel); // Bronze I

  const BAR_MAX_H = 130;

  // Incremented each time this screen gains focus → replays all animations
  const [animKey, setAnimKey] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setAnimKey(k => k + 1);
    }, []),
  );

  const goTo = (p: 'MONTH' | 'YEAR') => {
    if (p === 'MONTH') router.push('/(tabs)/insights/month');
    else router.push('/(tabs)/insights/year');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ──────────────────────────────────────────────────── */}
        <FadeSlide delay={0} animKey={animKey}>
          <View style={[styles.header, { width: width * 0.92 }]}>
            <View>
              <Text style={styles.title}>INSIGHTS</Text>
              <Text style={styles.subtitle}>Your progress at a glance.</Text>
            </View>
            <TouchableOpacity style={styles.calIconBtn}>
              <Ionicons name="calendar-outline" size={20} color="#7C3AED" />
            </TouchableOpacity>
          </View>
        </FadeSlide>

        {/* ── Period switcher ──────────────────────────────────────────── */}
        <FadeSlide delay={60} animKey={animKey}>
          <View style={[styles.switcher, { width: width * 0.92 }]}>
            {/* WEEK – active */}
            <View style={styles.switchTabActive}>
              <Text style={styles.switchTextActive}>WEEK</Text>
            </View>
            <TouchableOpacity style={styles.switchTab} onPress={() => goTo('MONTH')}>
              <Text style={styles.switchText}>MONTH</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.switchTab} onPress={() => goTo('YEAR')}>
              <Text style={styles.switchText}>YEAR</Text>
            </TouchableOpacity>
          </View>
        </FadeSlide>

        {/* ── 3 Stat Cards ─────────────────────────────────────────────── */}
        <FadeSlide delay={120} animKey={animKey}>
          <View style={[styles.statRow, { width: width * 0.92 }]}>
            {/* TODAY */}
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
                <Ionicons name="checkmark-circle-outline" size={22} color="#7C3AED" />
              </View>
              <Text style={styles.statLabel}>TODAY</Text>
              <Text style={styles.statValue}>
                8 <Text style={styles.statSlash}>/ 10</Text>
              </Text>
              <Text style={styles.statSub}>Habits completed</Text>
            </View>

            {/* STREAK */}
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#FFF3EB' }]}>
                <MaterialCommunityIcons name="fire" size={22} color="#F97316" />
              </View>
              <Text style={styles.statLabel}>CURRENT STREAK</Text>
              <Text style={[styles.statValue, { color: '#F97316', fontSize: 14 }]}>12 DAYS</Text>
              <Text style={styles.statSub}>Keep it up!</Text>
            </View>

            {/* XP EARNED */}
            <View style={styles.statCard}>
              <View style={[styles.iconCircle, { backgroundColor: '#EDE9FE' }]}>
                <Text style={styles.xpBadge}>XP</Text>
              </View>
              <Text style={styles.statLabel}>XP EARNED</Text>
              <Text style={[styles.statValue, { color: '#7C3AED' }]}>+340 XP</Text>
              <Text style={styles.statSub}>This week</Text>
            </View>
          </View>
        </FadeSlide>

        {/* ── Weekly Activity Bar Chart ─────────────────────────────────── */}
        <FadeSlide delay={180} animKey={animKey}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>WEEKLY ACTIVITY</Text>

            {/* Week nav */}
            <View style={styles.weekNav}>
              <TouchableOpacity style={styles.navBtn}>
                <Feather name="chevron-left" size={18} color="#64748B" />
              </TouchableOpacity>
              <Text style={styles.weekNavTitle}>18 – 24 AUG 2026</Text>
              <TouchableOpacity style={styles.navBtn}>
                <Feather name="chevron-right" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>

            {/* Day + Date labels */}
            <View style={styles.barLabelRow}>
              {WEEK_DAYS.map((d, i) => (
                <View key={i} style={styles.barCol}>
                  <Text style={[styles.dayName, d.date === 20 && styles.dayNameToday]}>
                    {d.day}
                  </Text>
                  <Text style={[styles.dayDate, d.date === 20 && styles.dayDateToday]}>
                    {d.date}
                  </Text>
                </View>
              ))}
            </View>

            {/* Bars */}
            <View style={styles.barsContainer}>
              {WEEK_DAYS.map((d, i) => (
                <View key={`${animKey}-${i}`} style={[styles.barCol, { height: BAR_MAX_H, justifyContent: 'flex-end' }]}>
                  <AnimatedBar
                    pct={d.pct}
                    maxH={BAR_MAX_H}
                    isToday={d.date === 20}
                    delay={i * 60}
                  />
                </View>
              ))}
            </View>

            {/* % Labels */}
            <View style={styles.barLabelRow}>
              {WEEK_DAYS.map((d, i) => (
                <View key={i} style={styles.barCol}>
                  <Text style={[styles.pctLabel, d.date === 20 && { color: '#2E1065', fontWeight: '800' }]}>
                    {d.pct}%
                  </Text>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              {[
                { label: '0–25%', color: '#EDE9FE' },
                { label: '26–50%', color: '#C4B5FD' },
                { label: '51–75%', color: '#7C3AED' },
                { label: '76–99%', color: '#5B21B6' },
                { label: '100%', color: '#2E1065' },
              ].map((item, i) => (
                <View key={i} style={styles.legendItem}>
                  <View style={[styles.legendBox, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{item.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </FadeSlide>

        {/* ── Weekly Completion + Overall Consistency ───────────────────── */}
        <FadeSlide delay={240} animKey={animKey}>
          <View style={[styles.twoCol, { width: width * 0.92 }]}>
            {/* Weekly Completion */}
            <View style={styles.halfCard}>
              <View style={styles.halfCardHeader}>
                <Text style={styles.halfCardTitle}>WEEKLY COMPLETION</Text>
                <Text style={styles.halfCardDate}>18 Aug – 24 Aug</Text>
              </View>
              <View style={styles.halfCardBody}>
                <CircularProgress
                  percentage={80}
                  size={76}
                  sublabel="Completed"
                  animKey={animKey}
                />
                {/* Mini day bars */}
                <View style={styles.miniBars}>
                  {[
                    { d: 'M', h: 34 },
                    { d: 'T', h: 26 },
                    { d: 'W', h: 48 },
                    { d: 'T', h: 16 },
                    { d: 'F', h: 40 },
                    { d: 'S', h: 30 },
                    { d: 'S', h: 22 },
                  ].map((b, i) => (
                    <View key={`${animKey}-m${i}`} style={styles.miniBarCol}>
                      <MiniBar pct={b.h} delay={i * 55} />
                      <Text style={styles.miniBarLabel}>{b.d}</Text>
                    </View>
                  ))}
                </View>
              </View>
              {/* Badge */}
              <View style={styles.greenBadge}>
                <MaterialCommunityIcons name="star-circle-outline" size={13} color="#7C3AED" />
                <Text style={styles.greenBadgeText}> Great consistency!</Text>
              </View>
            </View>

            {/* Overall Consistency */}
            <View style={styles.halfCard}>
              <Text style={styles.halfCardTitle}>OVERALL CONSISTENCY</Text>
              <View style={styles.halfCardBody}>
                <CircularProgress
                  percentage={78}
                  size={76}
                  sublabel="33-day avg"
                  animKey={animKey}
                />
                <WavyChart width={82} height={46} />
              </View>
              <View style={styles.trendRow}>
                <Text style={styles.trendUp}>Up 12% </Text>
                <MaterialCommunityIcons name="trending-up" size={13} color="#16A34A" />
                <Text style={styles.trendSub}> from last 30 days</Text>
              </View>
            </View>
          </View>
        </FadeSlide>

        {/* ── XP Progression ────────────────────────────────────────────── */}
        <FadeSlide delay={300} animKey={animKey}>
          <View style={[styles.card, { width: width * 0.92 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Left: XP info */}
              <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitle}>XP PROGRESSION</Text>

                <View style={styles.xpRow}>
                  <Text style={styles.xpLevel}>Level {currentLevel}</Text>
                  <Text style={styles.xpVals}>   {currentXp} / {nextXp} XP</Text>
                  <Text style={styles.xpPct}>{xpPct}%</Text>
                </View>

                <XpBar pct={xpPct} animKey={animKey} />

                <Text style={styles.xpNext}>
                  Next:{' '}
                  <Text style={{ color: '#7C3AED', fontWeight: '800' }}>
                    Level {currentLevel + 1}
                  </Text>
                  {' '}• {nextXp - currentXp} XP to go
                </Text>
              </View>

              {/* Right: Shield badge */}
              <ShieldBadge level={currentLevel} rank={currentRank} />
            </View>
          </View>
        </FadeSlide>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const PURPLE = '#7C3AED';
const DARK = '#0E0F19';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFBFF' },
  scrollContent: { alignItems: 'center', paddingTop: 10, paddingBottom: 48 },

  // Header
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 8, marginBottom: 18,
  },
  title: { fontSize: 26, fontWeight: '900', color: DARK, letterSpacing: -0.5 },
  subtitle: { fontSize: 12, fontWeight: '500', color: '#64748B', marginTop: 2 },
  calIconBtn: {
    width: 42, height: 42, borderRadius: 13, backgroundColor: '#FFF',
    borderWidth: 1, borderColor: '#E8ECF4',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },

  // Period switcher
  switcher: {
    flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 30,
    padding: 5, borderWidth: 1, borderColor: '#E8ECF4',
    marginBottom: 18,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 1,
  },
  switchTabActive: {
    flex: 1, paddingVertical: 11, borderRadius: 25,
    backgroundColor: PURPLE, alignItems: 'center',
    shadowColor: PURPLE, shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 4,
  },
  switchTab: { flex: 1, paddingVertical: 11, borderRadius: 25, alignItems: 'center' },
  switchTextActive: { fontSize: 12, fontWeight: '800', color: '#FFF', letterSpacing: 0.6 },
  switchText: { fontSize: 12, fontWeight: '700', color: '#94A3B8', letterSpacing: 0.4 },

  // Stat cards
  statRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  statCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 20,
    paddingVertical: 16, paddingHorizontal: 6,
    alignItems: 'center', borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 8, elevation: 1,
  },
  iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  statLabel: { fontSize: 8, fontWeight: '800', color: '#94A3B8', letterSpacing: 0.6, marginBottom: 5, textAlign: 'center' },
  statValue: { fontSize: 16, fontWeight: '900', color: DARK, marginBottom: 3, textAlign: 'center' },
  statSlash: { fontSize: 14, fontWeight: '600', color: '#CBD5E1' },
  statSub: { fontSize: 9, fontWeight: '500', color: '#94A3B8', textAlign: 'center' },
  xpBadge: { fontSize: 11, fontWeight: '900', color: PURPLE },

  // Generic white card
  card: {
    backgroundColor: '#FFF', borderRadius: 22, padding: 18,
    marginBottom: 16, borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 8, elevation: 1,
  },
  sectionTitle: { fontSize: 12, fontWeight: '900', color: DARK, letterSpacing: 0.5, marginBottom: 12 },

  // Week nav inside chart card
  weekNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  navBtn: {
    width: 30, height: 30, borderRadius: 10, backgroundColor: '#F8FAFC',
    borderWidth: 1, borderColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center',
  },
  weekNavTitle: { fontSize: 13, fontWeight: '800', color: DARK },

  // Bar chart
  barLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  barCol: { flex: 1, alignItems: 'center' },
  dayName: { fontSize: 9, fontWeight: '700', color: '#94A3B8', letterSpacing: 0.4 },
  dayNameToday: { color: PURPLE, fontWeight: '900' },
  dayDate: { fontSize: 12, fontWeight: '700', color: '#475569', marginTop: 2 },
  dayDateToday: { color: PURPLE, fontWeight: '900' },
  barsContainer: {
    flexDirection: 'row', justifyContent: 'space-between',
    marginTop: 10, marginBottom: 6,
  },
  pctLabel: { fontSize: 9, fontWeight: '700', color: '#64748B', marginTop: 4 },

  // Legend
  legendRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#F8FAFC',
  },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  legendBox: { width: 11, height: 11, borderRadius: 3 },
  legendText: { fontSize: 8, fontWeight: '600', color: '#64748B' },

  // Two-column row
  twoCol: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  halfCard: {
    flex: 1, backgroundColor: '#FFF', borderRadius: 20, padding: 13,
    borderWidth: 1, borderColor: '#F1F5F9',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 8, elevation: 1,
  },
  halfCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  halfCardTitle: { fontSize: 9, fontWeight: '900', color: DARK, letterSpacing: 0.5 },
  halfCardDate: { fontSize: 8, fontWeight: '600', color: '#94A3B8' },
  halfCardBody: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 },

  // Mini bars
  miniBars: { flexDirection: 'row', alignItems: 'flex-end', gap: 3, height: 48 },
  miniBarCol: { alignItems: 'center' },
  miniBarLabel: { fontSize: 8, fontWeight: '600', color: '#94A3B8', marginTop: 3 },

  // Badge
  greenBadge: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F3FF',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, alignSelf: 'flex-start',
  },
  greenBadgeText: { fontSize: 10, fontWeight: '700', color: PURPLE },

  // Trend row
  trendRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  trendUp: { fontSize: 11, fontWeight: '800', color: '#16A34A' },
  trendSub: { fontSize: 10, fontWeight: '500', color: '#64748B' },

  // XP card
  xpRow: { flexDirection: 'row', alignItems: 'baseline', marginTop: 6, marginBottom: 0 },
  xpLevel: { fontSize: 14, fontWeight: '900', color: PURPLE },
  xpVals: { fontSize: 12, fontWeight: '500', color: '#94A3B8' },
  xpPct: { fontSize: 13, fontWeight: '900', color: PURPLE, marginLeft: 'auto' },
  xpBarTrack: { height: 9, backgroundColor: '#EDE9FE', borderRadius: 5, marginTop: 10, overflow: 'hidden' },
  xpBarFill: { height: '100%', backgroundColor: PURPLE, borderRadius: 5 },
  xpNext: { fontSize: 11, color: '#94A3B8', fontWeight: '500', marginTop: 8 },

  // Shield
  shieldWrap: { alignItems: 'center', marginLeft: 14 },
  shieldOuter: {
    width: 64, height: 64, borderRadius: 18,
    backgroundColor: PURPLE, justifyContent: 'center', alignItems: 'center',
    shadowColor: PURPLE, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35, shadowRadius: 12, elevation: 5,
  },
  shieldInner: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: '#5B21B6', justifyContent: 'center', alignItems: 'center',
  },
  shieldLevel: { fontSize: 22, fontWeight: '900', color: '#FFF' },
  shieldRankText: { fontSize: 9, fontWeight: '800', color: PURPLE, letterSpacing: 0.6, marginTop: 6 },
});
