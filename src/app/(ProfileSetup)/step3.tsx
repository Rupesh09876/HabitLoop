import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

const HABITS = [
  {
    id: 'water',
    title: 'DRINK WATER',
    desc: 'Drink 8 glasses throughout the day',
    xp: '+20 XP',
    iconBg: '#DBEAFE',
    iconColor: '#38BDF8',
    icon: 'water-outline' as const,
  },
  {
    id: 'exercise',
    title: 'EXERCISE',
    desc: 'Exercise for at least 20 minutes',
    xp: '+30 XP',
    iconBg: '#FEE2E2',
    iconColor: '#EF4444',
    icon: 'flame-outline' as const,
  },
  {
    id: 'study',
    title: 'STUDY',
    desc: 'Study for at least 30 minutes',
    xp: '+30 XP',
    iconBg: '#D1FAE5',
    iconColor: '#10B981',
    icon: 'book-outline' as const,
  },
  {
    id: 'sleep',
    title: 'SLEEP EARLY',
    desc: 'Go to bed by your target time',
    xp: '+25 XP',
    iconBg: '#EDE9FF',
    iconColor: '#7F45FF',
    icon: 'moon-outline' as const,
  },
];

export default function ProfileSetupStep3() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [selected, setSelected] = useState<string>('water');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="arrow-left" size={20} color="#0E0F19" />
          </TouchableOpacity>
          <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
          <View style={{ width: 36 }} />
        </View>


        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>LET'S START</Text>
          <Text style={styles.mainTitlePurple}>SMALL</Text>
          <Text style={styles.subtitle}>Choose one habit to begin your journey.</Text>
        </View>

        {/* Recommended label */}
        <View style={[styles.recommendedRow, { width: width * 0.9 }]}>
          <Ionicons name="sparkles" size={16} color="#7F45FF" style={{ marginRight: 8 }} />
          <View>
            <Text style={styles.recommendedTitle}>RECOMMENDED FOR YOU</Text>
            <Text style={styles.recommendedSub}>Based on the areas you selected.</Text>
          </View>
        </View>

        {/* Habit list */}
        <View style={[styles.habitList, { width: width * 0.9 }]}>
          {HABITS.map((habit) => {
            const isSelected = selected === habit.id;
            return (
              <TouchableOpacity
                key={habit.id}
                onPress={() => setSelected(habit.id)}
                style={[styles.habitCard, isSelected && styles.habitCardSelected]}
              >
                {/* Icon */}
                <View style={[styles.habitIconCircle, { backgroundColor: habit.iconBg }]}>
                  <Ionicons name={habit.icon} size={28} color={habit.iconColor} />
                </View>

                {/* Text */}
                <View style={styles.habitInfo}>
                  <Text style={[styles.habitTitle, isSelected && styles.habitTitleSelected]}>
                    {habit.title}
                  </Text>
                  <Text style={styles.habitDesc}>{habit.desc}</Text>
                  <View style={styles.habitFreqRow}>
                    <Ionicons name="calendar-outline" size={12} color="#7F45FF" style={{ marginRight: 4 }} />
                    <Text style={styles.habitFreq}>Daily</Text>
                  </View>
                </View>

                {/* XP + radio */}
                <View style={styles.habitRight}>
                  {isSelected ? (
                    <View style={styles.radioSelected}>
                      <Ionicons name="checkmark" size={14} color="#FFF" />
                    </View>
                  ) : (
                    <View style={styles.radioUnselected} />
                  )}
                  <Text style={styles.xpText}>{habit.xp}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Info note */}
        <View style={[styles.infoNote, { width: width * 0.9 }]}>
          <View style={styles.infoIconBox}>
            <Ionicons name="star-outline" size={18} color="#7F45FF" />
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.infoTitle}>Start with one. Grow from there.</Text>
            <Text style={styles.infoDesc}>You can add more habits anytime.</Text>
          </View>
        </View>

        {/* Customize link */}
        <TouchableOpacity style={styles.customizeRow}>
          <Feather name="edit-2" size={13} color="#7F45FF" style={{ marginRight: 6 }} />
          <Text style={styles.customizeText}>Customize habit</Text>
        </TouchableOpacity>

        {/* Step indicator */}
        <View style={[styles.stepsRow, { width: width * 0.9 }]}>
          {/* Step 1 done */}
          <View style={styles.stepItem}>
            <View style={styles.stepDone}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
            <Text style={styles.stepLabelDone}>PROFILE</Text>
          </View>
          <View style={styles.stepLineCompleted} />
          {/* Step 2 done */}
          <View style={styles.stepItem}>
            <View style={styles.stepDone}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
            <Text style={styles.stepLabelDone}>FOCUS</Text>
          </View>
          <View style={styles.stepLineCompleted} />
          {/* Step 3 active */}
          <View style={styles.stepItem}>
            <View style={styles.stepActive} />
            <Text style={styles.stepLabelActive}>FIRST HABIT</Text>
          </View>
        </View>

        {/* Primary CTA */}
        <TouchableOpacity style={[styles.continueBtn, { width: width * 0.9 }]} onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.continueBtnText}>CREATE MY FIRST HABIT</Text>
          <Feather name="arrow-right" size={18} color="#FFF" />
        </TouchableOpacity>

        {/* Skip */}
        <TouchableOpacity style={styles.skipBtn} onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.skipText}>SKIP FOR NOW</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  scrollContent: { alignItems: 'center', paddingBottom: 40 },

  // Header
  header: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#FFF', borderWidth: 1, borderColor: '#F1F5F9',
    justifyContent: 'center', alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03, shadowRadius: 4, elevation: 2,
  },
  logoHabit: { fontSize: 22, fontWeight: '800', color: '#0E0F19', letterSpacing: -1 },
  logoLoop: { color: '#7F45FF' },

  // Steps
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  stepItem: { alignItems: 'center', width: 68 },
  stepDone: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#7F45FF', justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  stepActive: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: '#7F45FF', marginBottom: 4,
    borderWidth: 3, borderColor: '#C4B5FD',
  },
  stepLabelDone: { fontSize: 9, fontWeight: '700', color: '#7F45FF' },
  stepLabelActive: { fontSize: 9, fontWeight: '800', color: '#7F45FF' },
  stepLineCompleted: { flex: 1, height: 2, backgroundColor: '#7F45FF', marginBottom: 16 },

  // Title
  titleContainer: { alignItems: 'center', marginBottom: 22 },
  mainTitle: { fontSize: 34, fontWeight: '900', color: '#0E0F19', letterSpacing: -1 },
  mainTitlePurple: { fontSize: 38, fontWeight: '900', color: '#7F45FF', letterSpacing: -1, marginTop: -6 },
  subtitle: { marginTop: 8, fontSize: 14, color: '#64748B', fontWeight: '500' },

  // Recommended
  recommendedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  recommendedTitle: { fontSize: 12, fontWeight: '800', color: '#0E0F19' },
  recommendedSub: { fontSize: 11, color: '#64748B', fontWeight: '500', marginTop: 1 },

  // Habit cards
  habitList: { gap: 12, marginBottom: 18 },
  habitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  habitCardSelected: {
    borderColor: '#7F45FF',
    backgroundColor: '#FAF5FF',
  },
  habitIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  habitInfo: { flex: 1 },
  habitTitle: { fontSize: 13, fontWeight: '800', color: '#0E0F19' },
  habitTitleSelected: { color: '#7F45FF' },
  habitDesc: { fontSize: 11, color: '#64748B', fontWeight: '500', marginTop: 2, marginBottom: 6 },
  habitFreqRow: { flexDirection: 'row', alignItems: 'center' },
  habitFreq: { fontSize: 11, color: '#7F45FF', fontWeight: '600' },

  habitRight: { alignItems: 'center', marginLeft: 10, gap: 6 },
  radioSelected: {
    width: 24, height: 24, borderRadius: 12,
    backgroundColor: '#7F45FF', justifyContent: 'center', alignItems: 'center',
  },
  radioUnselected: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: '#CBD5E1', backgroundColor: '#FFF',
  },
  xpText: { fontSize: 12, fontWeight: '800', color: '#7F45FF' },

  // Info note
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  infoIconBox: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#EDE9FF', justifyContent: 'center', alignItems: 'center',
  },
  infoTitle: { fontSize: 13, fontWeight: '700', color: '#0E0F19' },
  infoDesc: { fontSize: 11, color: '#64748B', fontWeight: '500', marginTop: 2 },

  // Customize
  customizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 22,
  },
  customizeText: { fontSize: 13, fontWeight: '600', color: '#7F45FF' },

  // Buttons
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7F45FF',
    paddingVertical: 18,
    borderRadius: 16,
    gap: 10,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    marginBottom: 16,
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
  skipBtn: { paddingVertical: 8 },
  skipText: { fontSize: 13, fontWeight: '700', color: '#94A3B8', letterSpacing: 0.5 },
});
