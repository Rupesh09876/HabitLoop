import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Switch, useWindowDimensions, Platform, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface CategoryItem {
  id: string;
  label: string;
  icon: string;
  family: 'MaterialCommunityIcons' | 'Ionicons' | 'Feather';
  bg: string;
  color: string;
}

const CATEGORIES: CategoryItem[] = [
  { id: 'fitness', label: 'Fitness', icon: 'dumbbell', family: 'MaterialCommunityIcons', bg: '#EDE9FF', color: '#7F45FF' },
  { id: 'health', label: 'Health', icon: 'leaf', family: 'Ionicons', bg: '#DCFCE7', color: '#16A34A' },
  { id: 'mindfulness', label: 'Mindfulness', icon: 'heart', family: 'Feather', bg: '#FCE7F3', color: '#DB2777' },
  { id: 'learning', label: 'Learning', icon: 'book-open', family: 'Feather', bg: '#FEF9C3', color: '#D97706' },
  { id: 'lifestyle', label: 'Lifestyle', icon: 'cafe', family: 'Ionicons', bg: '#DBEAFE', color: '#2563EB' },
  { id: 'other', label: 'Other', icon: 'grid', family: 'Ionicons', bg: '#F1F5F9', color: '#64748B' },
];

const COLORS = [
  '#7F45FF',
  '#3B82F6',
  '#06B6D4',
  '#22C55E',
  '#F97316',
  '#EC4899',
  '#EAB308',
  '#EF4444',
  '#6366F1',
];

const DAYS = [
  { key: 'M1', label: 'M', full: 'Mon' },
  { key: 'T1', label: 'T', full: 'Tue' },
  { key: 'W',  label: 'W', full: 'Wed' },
  { key: 'T2', label: 'T', full: 'Thu' },
  { key: 'F',  label: 'F', full: 'Fri' },
  { key: 'S1', label: 'S', full: 'Sat' },
  { key: 'S2', label: 'S', full: 'Sun' },
];

export default function AddHabitScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Form states
  const [habitName, setHabitName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('fitness');
  const [habitType, setHabitType] = useState<'daily' | 'weekly'>('daily');
  const [targetType, setTargetType] = useState('Custom');
  const [targetDetails, setTargetDetails] = useState('');
  const [reminderTime, setReminderTime] = useState('7:00 AM');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [selectedDays, setSelectedDays] = useState<string[]>(['M1', 'T1', 'W', 'T2', 'F']);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [selectedColor, setSelectedColor] = useState('#7F45FF');

  const toggleDay = (key: string) => {
    if (selectedDays.includes(key)) {
      if (selectedDays.length > 1) {
        setSelectedDays(selectedDays.filter((d) => d !== key));
      }
    } else {
      setSelectedDays([...selectedDays, key]);
    }
  };

  const getXpReward = () => {
    switch (difficulty) {
      case 'easy':
        return 15;
      case 'medium':
        return 25;
      case 'hard':
        return 40;
      default:
        return 25;
    }
  };

  const currentCategory = CATEGORIES.find((c) => c.id === selectedCategory) || CATEGORIES[0];

  const getFormattedDays = () => {
    return DAYS.filter((d) => selectedDays.includes(d.key))
      .map((d) => d.full)
      .join(', ');
  };

  const handleSave = () => {
    // Navigate back to Home
    router.replace('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Feather name="chevron-left" size={24} color="#0E0F19" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Add New Habit</Text>
            <Text style={styles.headerSubtitle}>Build a new habit and level up your life.</Text>
          </View>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Habit Name */}
          <View style={[styles.sectionCard, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>1. Habit Name</Text>
            <View style={styles.nameInputWrapper}>
              <View style={styles.nameIconBox}>
                <Feather name="edit-3" size={18} color="#7F45FF" />
              </View>
              <TextInput
                style={styles.nameInput}
                placeholder="e.g. Drink Water"
                placeholderTextColor="#94A3B8"
                value={habitName}
                onChangeText={(t) => setHabitName(t.slice(0, 50))}
                maxLength={50}
              />
            </View>
            <Text style={styles.charCounter}>{habitName.length}/50</Text>
          </View>

          {/* 2. Category */}
          <View style={[styles.sectionCard, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>2. Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoriesRow}
            >
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => setSelectedCategory(cat.id)}
                    style={[styles.categoryCard, isSelected && styles.categoryCardSelected]}
                  >
                    {isSelected && (
                      <View style={styles.selectedBadge}>
                        <Ionicons name="checkmark" size={10} color="#FFF" />
                      </View>
                    )}
                    <View style={[styles.categoryIconCircle, { backgroundColor: cat.bg }]}>
                      {cat.family === 'MaterialCommunityIcons' && (
                        <MaterialCommunityIcons name={cat.icon as any} size={22} color={cat.color} />
                      )}
                      {cat.family === 'Ionicons' && (
                        <Ionicons name={cat.icon as any} size={22} color={cat.color} />
                      )}
                      {cat.family === 'Feather' && (
                        <Feather name={cat.icon as any} size={22} color={cat.color} />
                      )}
                    </View>
                    <Text style={[styles.categoryLabel, isSelected && styles.categoryLabelSelected]}>
                      {cat.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <Text style={styles.helperText}>Choose a category that best fits your habit.</Text>
          </View>

          {/* 3. Habit Type */}
          <View style={[styles.sectionCard, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>3. Habit Type</Text>
            <View style={styles.habitTypeRow}>
              {/* Daily */}
              <TouchableOpacity
                onPress={() => setHabitType('daily')}
                style={[styles.typeCard, habitType === 'daily' && styles.typeCardSelected]}
              >
                {habitType === 'daily' && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFF" />
                  </View>
                )}
                <View style={[styles.typeIconBox, { backgroundColor: '#EDE9FF' }]}>
                  <Ionicons name="sunny-outline" size={22} color="#7F45FF" />
                </View>
                <View style={styles.typeTextBox}>
                  <Text style={[styles.typeTitle, habitType === 'daily' && styles.typeTitleSelected]}>
                    Daily
                  </Text>
                  <Text style={styles.typeDesc}>Repeat every day</Text>
                </View>
              </TouchableOpacity>

              {/* Weekly */}
              <TouchableOpacity
                onPress={() => setHabitType('weekly')}
                style={[styles.typeCard, habitType === 'weekly' && styles.typeCardSelected]}
              >
                {habitType === 'weekly' && (
                  <View style={styles.selectedBadge}>
                    <Ionicons name="checkmark" size={10} color="#FFF" />
                  </View>
                )}
                <View style={[styles.typeIconBox, { backgroundColor: '#DBEAFE' }]}>
                  <Ionicons name="calendar-outline" size={22} color="#3B82F6" />
                </View>
                <View style={styles.typeTextBox}>
                  <Text style={[styles.typeTitle, habitType === 'weekly' && styles.typeTitleSelected]}>
                    Weekly
                  </Text>
                  <Text style={styles.typeDesc}>Repeat on specific days</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. Target & Schedule */}
          <View style={[styles.sectionCard, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>4. Target & Schedule</Text>

            {/* Target & Details Row */}
            <View style={styles.targetRow}>
              <View style={styles.targetCol}>
                <Text style={styles.subLabel}>Target</Text>
                <TouchableOpacity style={styles.dropdownBtn}>
                  <Feather name="target" size={16} color="#7F45FF" style={{ marginRight: 6 }} />
                  <Text style={styles.dropdownBtnText}>{targetType}</Text>
                  <Feather name="chevron-down" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              </View>

              <View style={[styles.targetCol, { flex: 1.2 }]}>
                <Text style={styles.subLabel}>Target Details</Text>
                <TextInput
                  style={styles.detailsInput}
                  placeholder="e.g. 8 glasses, 30 minutes"
                  placeholderTextColor="#94A3B8"
                  value={targetDetails}
                  onChangeText={setTargetDetails}
                />
              </View>
            </View>

            {/* Reminder Time Row */}
            <View style={styles.reminderRow}>
              <TouchableOpacity style={styles.timePickerBox}>
                <Feather name="bell" size={16} color="#475569" style={{ marginRight: 8 }} />
                <Text style={styles.timeText}>{reminderTime}</Text>
                <Feather name="chevron-down" size={16} color="#94A3B8" style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
                trackColor={{ false: '#E2E8F0', true: '#7F45FF' }}
                thumbColor="#FFF"
              />
            </View>

            {/* Repeat Time / Days */}
            <View style={styles.repeatDaysRow}>
              <Text style={styles.repeatLabel}>Repeat Time</Text>
              <View style={styles.daysContainer}>
                {DAYS.map((day) => {
                  const isActive = selectedDays.includes(day.key);
                  return (
                    <TouchableOpacity
                      key={day.key}
                      onPress={() => toggleDay(day.key)}
                      style={[styles.dayCircle, isActive && styles.dayCircleActive]}
                    >
                      <Text style={[styles.dayCircleText, isActive && styles.dayCircleTextActive]}>
                        {day.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>

          {/* 5. XP Reward & Difficulty */}
          <View style={[styles.twoColRow, { width: width * 0.92 }]}>
            {/* XP Reward */}
            <View style={styles.rewardCard}>
              <View style={styles.rewardCardHeader}>
                <View style={[styles.miniIconBox, { backgroundColor: '#EDE9FF' }]}>
                  <Ionicons name="sparkles" size={16} color="#7F45FF" />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.miniCardTitle}>XP Reward</Text>
                  <Text style={styles.miniCardSub}>Automatically set based on category & difficulty</Text>
                </View>
              </View>
              <View style={styles.xpBadgeRow}>
                <View style={styles.xpBadge}>
                  <Text style={styles.xpBadgeText}>✦ +{getXpReward()} XP</Text>
                </View>
                <Feather name="info" size={14} color="#94A3B8" style={{ marginLeft: 8 }} />
              </View>
            </View>

            {/* Difficulty */}
            <View style={styles.rewardCard}>
              <View style={styles.rewardCardHeader}>
                <View style={[styles.miniIconBox, { backgroundColor: '#EDE9FF' }]}>
                  <Ionicons name="bar-chart-outline" size={16} color="#7F45FF" />
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                  <Text style={styles.miniCardTitle}>Difficulty</Text>
                  <Text style={styles.miniCardSub}>Higher difficulty, higher rewards</Text>
                </View>
              </View>
              <View style={styles.difficultyPillsRow}>
                {/* Easy */}
                <TouchableOpacity
                  onPress={() => setDifficulty('easy')}
                  style={[styles.diffPill, difficulty === 'easy' && styles.diffPillEasySelected]}
                >
                  <Text style={[styles.diffPillText, { color: '#16A34A' }]}>Easy</Text>
                </TouchableOpacity>

                {/* Medium */}
                <TouchableOpacity
                  onPress={() => setDifficulty('medium')}
                  style={[styles.diffPill, difficulty === 'medium' && styles.diffPillMedSelected]}
                >
                  {difficulty === 'medium' && (
                    <View style={styles.pillCheck}>
                      <Ionicons name="checkmark" size={8} color="#FFF" />
                    </View>
                  )}
                  <Text style={[styles.diffPillText, { color: '#D97706' }]}>Medium</Text>
                </TouchableOpacity>

                {/* Hard */}
                <TouchableOpacity
                  onPress={() => setDifficulty('hard')}
                  style={[styles.diffPill, difficulty === 'hard' && styles.diffPillHardSelected]}
                >
                  <Text style={[styles.diffPillText, { color: '#EF4444' }]}>Hard</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* 6. Habit Color */}
          <View style={[styles.sectionCard, { width: width * 0.92 }]}>
            <Text style={styles.sectionTitle}>6. Habit Color</Text>
            <Text style={styles.helperText}>Choose a color that represents this habit.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.colorsRow}>
              {COLORS.map((color, index) => {
                const isSelected = selectedColor === color;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedColor(color)}
                    style={[styles.colorCircleOuter, isSelected && { borderColor: color }]}
                  >
                    <View style={[styles.colorCircleInner, { backgroundColor: color }]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#FFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
              {/* Color edit pen */}
              <TouchableOpacity style={styles.colorEditCircle}>
                <Feather name="edit-2" size={14} color="#7F45FF" />
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* Habit Preview */}
          <View style={[styles.previewContainer, { width: width * 0.92 }]}>
            <View style={styles.previewHeader}>
              <Feather name="eye" size={16} color="#7F45FF" style={{ marginRight: 6 }} />
              <Text style={styles.previewHeaderText}>Habit Preview</Text>
            </View>

            <View style={styles.previewCard}>
              <View style={styles.previewCardLeft}>
                <View style={[styles.previewIconCircle, { backgroundColor: `${selectedColor}20` }]}>
                  {currentCategory.family === 'MaterialCommunityIcons' && (
                    <MaterialCommunityIcons name={currentCategory.icon as any} size={24} color={selectedColor} />
                  )}
                  {currentCategory.family === 'Ionicons' && (
                    <Ionicons name={currentCategory.icon as any} size={24} color={selectedColor} />
                  )}
                  {currentCategory.family === 'Feather' && (
                    <Feather name={currentCategory.icon as any} size={24} color={selectedColor} />
                  )}
                </View>
                <View style={styles.previewTextCol}>
                  <Text style={styles.previewHabitTitle}>
                    {habitName.trim() ? habitName : 'Morning Workout'}
                  </Text>
                  <View style={styles.previewTagsRow}>
                    <View style={styles.previewTagBlue}>
                      <Ionicons name="time-outline" size={11} color="#2563EB" style={{ marginRight: 3 }} />
                      <Text style={styles.previewTagBlueText}>
                        {habitType === 'daily' ? 'Daily' : 'Weekly'}
                      </Text>
                    </View>
                    <View style={styles.previewTagPurple}>
                      <Ionicons name="location-outline" size={11} color="#7F45FF" style={{ marginRight: 3 }} />
                      <Text style={styles.previewTagPurpleText}>{currentCategory.label}</Text>
                    </View>
                    <View style={styles.previewTagXp}>
                      <Text style={styles.previewTagXpText}>✦ +{getXpReward()} XP</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.previewCardRight}>
                <Text style={styles.previewTimeText}>{reminderTime}</Text>
                <Text style={styles.previewDaysText} numberOfLines={1}>
                  {getFormattedDays()}
                </Text>
              </View>
            </View>
          </View>

          {/* Create Habit Button */}
          <TouchableOpacity
            style={[styles.createBtn, { width: width * 0.92 }]}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <LinearGradient
              colors={['#7F45FF', '#6366F1']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createBtnGradient}
            >
              <Text style={styles.createBtnText}>Create Habit</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 14,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7F45FF',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 2,
  },
  saveBtn: {
    backgroundColor: '#7F45FF',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },

  // Sections
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
    marginBottom: 12,
  },
  helperText: {
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 8,
    fontWeight: '500',
  },

  // 1. Name Input
  nameInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF8FF',
    borderWidth: 1,
    borderColor: '#E9D5FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  nameIconBox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  nameInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#0E0F19',
  },
  charCounter: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 4,
  },

  // 2. Categories
  categoriesRow: {
    flexDirection: 'row',
    gap: 10,
    paddingVertical: 4,
  },
  categoryCard: {
    width: 72,
    height: 84,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  categoryCardSelected: {
    borderColor: '#7F45FF',
    backgroundColor: '#FAF8FF',
  },
  categoryIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  categoryLabelSelected: {
    color: '#7F45FF',
  },
  selectedBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 3. Habit Type
  habitTypeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  typeCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
    padding: 12,
    position: 'relative',
  },
  typeCardSelected: {
    borderColor: '#7F45FF',
    backgroundColor: '#FAF8FF',
  },
  typeIconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  typeTextBox: {
    flex: 1,
  },
  typeTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
  },
  typeTitleSelected: {
    color: '#7F45FF',
  },
  typeDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },

  // 4. Target & Schedule
  targetRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  targetCol: {
    flex: 1,
  },
  subLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 6,
  },
  dropdownBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    height: 42,
    paddingHorizontal: 10,
  },
  dropdownBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0E0F19',
  },
  detailsInput: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 10,
    height: 42,
    paddingHorizontal: 12,
    fontSize: 12,
    color: '#0E0F19',
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  timePickerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: 140,
  },
  timeText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0E0F19',
  },
  repeatDaysRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  repeatLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  daysContainer: {
    flexDirection: 'row',
    gap: 6,
  },
  dayCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleActive: {
    backgroundColor: '#7F45FF',
  },
  dayCircleText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  dayCircleTextActive: {
    color: '#FFF',
  },

  // 5. XP & Difficulty 2-Col
  twoColRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  rewardCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'space-between',
  },
  rewardCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  miniIconBox: {
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  miniCardTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0E0F19',
  },
  miniCardSub: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 2,
    lineHeight: 12,
  },
  xpBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  xpBadge: {
    backgroundColor: '#F3EEFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F45FF',
  },
  difficultyPillsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  diffPill: {
    flex: 1,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  diffPillEasySelected: {
    borderColor: '#22C55E',
    backgroundColor: '#F0FDF4',
  },
  diffPillMedSelected: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  diffPillHardSelected: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  diffPillText: {
    fontSize: 10,
    fontWeight: '700',
  },
  pillCheck: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 6. Colors
  colorsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 12,
    paddingBottom: 4,
  },
  colorCircleOuter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircleInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorEditCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // 7. Preview
  previewContainer: {
    marginTop: 16,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  previewHeaderText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#7F45FF',
  },
  previewCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  previewCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  previewIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  previewTextCol: {
    flex: 1,
  },
  previewHabitTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
    marginBottom: 4,
  },
  previewTagsRow: {
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'wrap',
  },
  previewTagBlue: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  previewTagBlueText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2563EB',
  },
  previewTagPurple: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  previewTagPurpleText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#7F45FF',
  },
  previewTagXp: {
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  previewTagXpText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#7F45FF',
  },
  previewCardRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },
  previewTimeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 4,
  },
  previewDaysText: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
    maxWidth: 100,
  },

  // Create Button
  createBtn: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  createBtnGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
