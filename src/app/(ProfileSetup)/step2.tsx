import { StyleSheet, Text, View, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const AREAS = [
  { id: 'fitness',       label: 'FITNESS',       icon: 'fitness-outline',    family: 'Ionicons',  bg: '#EDE9FF', iconColor: '#7F45FF' },
  { id: 'study',         label: 'STUDY',         icon: 'book-outline',       family: 'Ionicons',  bg: '#DBEAFE', iconColor: '#3B82F6' },
  { id: 'productivity',  label: 'PRODUCTIVITY',  icon: 'briefcase-outline',  family: 'Ionicons',  bg: '#EDE9FF', iconColor: '#7F45FF' },
  { id: 'mindfulness',   label: 'MINDFULNESS',   icon: 'body-outline',       family: 'Ionicons',  bg: '#D1FAE5', iconColor: '#10B981' },
  { id: 'health',        label: 'HEALTH',        icon: 'water-outline',      family: 'Ionicons',  bg: '#DBEAFE', iconColor: '#38BDF8' },
  { id: 'growth',        label: 'PERSONAL GROWTH', icon: 'leaf-outline',     family: 'Ionicons',  bg: '#D1FAE5', iconColor: '#22C55E' },
  { id: 'sleep',         label: 'SLEEP',         icon: 'moon-outline',       family: 'Ionicons',  bg: '#EDE9FF', iconColor: '#7F45FF' },
  { id: 'finance',       label: 'FINANCE',       icon: 'cash-outline',       family: 'Ionicons',  bg: '#FEF9C3', iconColor: '#EAB308' },
];

export default function ProfileSetupStep2() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const cardW = (width * 0.9 - 14) / 2;

  const [selected, setSelected] = useState<string[]>(['fitness', 'productivity', 'sleep']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const selectedLabels = AREAS
    .filter(a => selected.includes(a.id))
    .map(a => a.label.charAt(0) + a.label.slice(1).toLowerCase())
    .join(', ');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="chevron-left" size={22} color="#0E0F19" />
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
          <View style={{ width: 60 }} />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitle}>WHAT DO YOU WANT{'\n'}TO <Text style={styles.mainTitlePurple}>IMPROVE?</Text></Text>
          <Text style={styles.subtitle}>Choose the areas you'd like to focus on.{'\n'}You can change these anytime.</Text>
        </View>

        {/* Grid */}
        <View style={[styles.grid, { width: width * 0.9 }]}>
          {AREAS.map((area) => {
            const isSelected = selected.includes(area.id);
            return (
              <TouchableOpacity
                key={area.id}
                onPress={() => toggle(area.id)}
                style={[styles.card, { width: cardW }, isSelected && styles.cardSelected]}
              >
                {isSelected && (
                  <View style={styles.checkBadge}>
                    <Ionicons name="checkmark-circle" size={22} color="#7F45FF" />
                  </View>
                )}
                <View style={[styles.cardIconCircle, { backgroundColor: area.bg }]}>
                  <Ionicons name={area.icon as any} size={28} color={area.iconColor} />
                </View>
                <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                  {area.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Selection summary */}
        <View style={[styles.summaryCard, { width: width * 0.9 }]}>
          <View style={styles.summaryLeft}>
            <View style={styles.summaryIconBox}>
              <Ionicons name="star-outline" size={18} color="#7F45FF" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.summaryCount}>{selected.length} AREAS SELECTED</Text>
              <Text style={styles.summaryLabels} numberOfLines={1}>{selectedLabels || 'None selected'}</Text>
            </View>
          </View>
          <Feather name="chevron-right" size={18} color="#7F45FF" />
        </View>

        {/* Info note */}
        <View style={[styles.infoNote, { width: width * 0.9 }]}>
          <Ionicons name="sparkles-outline" size={18} color="#7F45FF" style={{ marginRight: 10 }} />
          <Text style={styles.infoNoteText}>
            Great! We'll use these areas to personalize{'\n'}habit recommendations that fit your goals.
          </Text>
        </View>

        {/* Step indicator */}
        <View style={[styles.stepsRow, { width: width * 0.9 }]}>
          <View style={styles.stepItem}>
            <View style={styles.stepDone}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
            <Text style={styles.stepLabelDone}>PROFILE</Text>
          </View>
          <View style={styles.stepLineCompleted} />
          <View style={styles.stepItem}>
            <View style={styles.stepActive}>
              <Ionicons name="checkmark" size={14} color="#FFF" />
            </View>
            <Text style={styles.stepLabelActive}>FOCUS</Text>
          </View>
          <View style={styles.stepLinePending} />
          <View style={styles.stepItem}>
            <View style={styles.stepPending} />
            <Text style={styles.stepLabelPending}>HABITS</Text>
          </View>
        </View>

        {/* Continue */}
        <TouchableOpacity
          style={[styles.continueBtn, { width: width * 0.9 }]}
          onPress={() => router.push('/(ProfileSetup)/step3')}
        >
          <Text style={styles.continueBtnText}>CONTINUE</Text>
          <Feather name="arrow-right" size={18} color="#FFF" />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFC' },
  scrollContent: { alignItems: 'center', paddingBottom: 40 },

  header: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 10,
  },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backText: { fontSize: 15, fontWeight: '600', color: '#0E0F19' },
  logoHabit: { fontSize: 22, fontWeight: '800', color: '#0E0F19', letterSpacing: -1 },
  logoLoop: { color: '#7F45FF' },

  titleContainer: { alignItems: 'center', marginBottom: 22 },
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#0E0F19', textAlign: 'center', letterSpacing: -0.5, lineHeight: 34 },
  mainTitlePurple: { color: '#7F45FF' },
  subtitle: { marginTop: 8, fontSize: 13, color: '#64748B', textAlign: 'center', lineHeight: 19, fontWeight: '500' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 14, marginBottom: 18 },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    paddingVertical: 18,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#7F45FF',
    backgroundColor: '#FAF5FF',
  },
  checkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  cardIconCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardLabel: { fontSize: 11, fontWeight: '800', color: '#1E293B', textAlign: 'center', letterSpacing: 0.3 },
  cardLabelSelected: { color: '#7F45FF' },

  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  summaryLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  summaryIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCount: { fontSize: 12, fontWeight: '800', color: '#7F45FF' },
  summaryLabels: { fontSize: 11, color: '#64748B', fontWeight: '500', marginTop: 2, maxWidth: 200 },

  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  infoNoteText: { flex: 1, fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500' },

  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 22,
  },
  stepItem: { alignItems: 'center', width: 64 },
  stepDone: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#7F45FF', justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  stepActive: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#7F45FF', justifyContent: 'center', alignItems: 'center', marginBottom: 4,
  },
  stepPending: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#E2E8F0', marginBottom: 4,
  },
  stepLabelDone: { fontSize: 9, fontWeight: '700', color: '#7F45FF' },
  stepLabelActive: { fontSize: 9, fontWeight: '700', color: '#7F45FF' },
  stepLabelPending: { fontSize: 9, fontWeight: '700', color: '#94A3B8' },
  stepLineCompleted: { flex: 1, height: 2, backgroundColor: '#7F45FF', marginBottom: 16 },
  stepLinePending: {
    flex: 1, height: 2, borderWidth: 1,
    borderColor: '#CBD5E1', borderStyle: 'dashed', marginBottom: 16,
  },

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
  },
  continueBtnText: { fontSize: 16, fontWeight: '700', color: '#FFF' },
});
