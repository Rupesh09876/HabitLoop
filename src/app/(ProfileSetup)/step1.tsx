import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileSetupStep1() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [displayName, setDisplayName] = useState('Rupesh Katuwal');
  const [username, setUsername] = useState('@rupesh');
  const [bio, setBio] = useState('Building better habits, one day at a time.');

  const maxBio = 120;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Feather name="chevron-left" size={24} color="#0E0F19" />
            </TouchableOpacity>
            <Text style={styles.logoHabit}>
              Habit<Text style={styles.logoLoop}>Loop</Text>
            </Text>
            <View style={{ width: 32 }} />
          </View>

          {/* ── Title ── */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>PROFILE SETUP</Text>
            <Text style={styles.subtitle}>
              Set up your profile and start your{'\n'}HabitLoop journey.
            </Text>
          </View>

          {/* ── Avatar ── */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <View style={styles.avatarInner}>
                <Ionicons name="person" size={56} color="#7F45FF" />
              </View>
              {/* sparkle decoration */}
              <View style={styles.sparkleDot} />
            </View>
            {/* Camera badge */}
            <TouchableOpacity style={styles.cameraBadge}>
              <Feather name="camera" size={16} color="#7F45FF" />
            </TouchableOpacity>
          </View>

          {/* Change Photo button */}
          <TouchableOpacity style={styles.changePhotoBtn}>
            <Feather name="camera" size={14} color="#7F45FF" style={{ marginRight: 6 }} />
            <Text style={styles.changePhotoText}>CHANGE PHOTO</Text>
          </TouchableOpacity>

          {/* ── Form ── */}
          <View style={[styles.formContainer, { width: width * 0.9 }]}>

            {/* Display Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>DISPLAY NAME</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Your name"
                  placeholderTextColor="#94A3B8"
                />
                <View style={styles.checkCircle}>
                  <Feather name="check" size={13} color="#34D399" />
                </View>
              </View>
              <Text style={styles.helperText}>This is how your name will appear to friends.</Text>
            </View>

            {/* Username */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>USERNAME</Text>
              <View style={styles.inputWrapper}>
                <Feather name="at-sign" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={username}
                  onChangeText={setUsername}
                  placeholder="@username"
                  placeholderTextColor="#94A3B8"
                  autoCapitalize="none"
                />
                <View style={styles.checkCircle}>
                  <Feather name="check" size={13} color="#34D399" />
                </View>
              </View>
              <View style={styles.validationRow}>
                <Ionicons name="checkmark-circle" size={14} color="#34D399" />
                <Text style={styles.validationTextGreen}>{username} is available</Text>
              </View>
            </View>

            {/* Bio */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>
                BIO <Text style={styles.optionalLabel}>(OPTIONAL)</Text>
              </Text>
              <View style={[styles.inputWrapper, styles.bioWrapper]}>
                <Feather name="edit-2" size={16} color="#7F45FF" style={[styles.inputIcon, { alignSelf: 'flex-start', marginTop: 4 }]} />
                <TextInput
                  style={[styles.input, styles.bioInput]}
                  value={bio}
                  onChangeText={(t) => setBio(t.slice(0, maxBio))}
                  placeholder="Tell people a bit about yourself..."
                  placeholderTextColor="#94A3B8"
                  multiline
                  numberOfLines={3}
                />
              </View>
              <Text style={styles.charCount}>{bio.length}/{maxBio}</Text>
            </View>

            {/* ── Profile Preview ── */}
            <View style={styles.previewCard}>
              <Text style={styles.previewSectionLabel}>PROFILE PREVIEW</Text>

              <View style={styles.previewInner}>
                {/* Avatar small */}
                <View style={styles.previewAvatar}>
                  <Ionicons name="person" size={28} color="#7F45FF" />
                </View>

                {/* Info */}
                <View style={styles.previewInfo}>
                  <Text style={styles.previewName}>{displayName}</Text>
                  <Text style={styles.previewUsername}>{username}</Text>
                  <Text style={styles.previewBio} numberOfLines={1}>
                    "{bio}"
                  </Text>
                  <View style={styles.badgeRow}>
                    <View style={styles.levelBadge}>
                      <Text style={styles.levelBadgeText}>LEVEL 1</Text>
                    </View>
                    <View style={styles.rankBadge}>
                      <MaterialCommunityIcons name="shield-star" size={12} color="#B45309" />
                      <Text style={styles.rankBadgeText}>BRONZE V</Text>
                    </View>
                  </View>
                </View>

                {/* Crystal top-right */}
                <View style={styles.previewCrystalBox}>
                  <View style={styles.previewCrystal}>
                    <Ionicons name="diamond" size={36} color="#7F45FF" />
                  </View>
                </View>
              </View>

              {/* XP Bar */}
              <View style={styles.xpRow}>
                <View>
                  <Text style={styles.xpValue}>0 XP</Text>
                  <Text style={styles.xpLabel}>Total XP</Text>
                </View>
                <View style={styles.xpBarBg}>
                  <View style={[styles.xpBarFill, { width: '2%' }]} />
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.xpValue}>100 XP</Text>
                  <Text style={styles.xpLabel}>Next Level</Text>
                </View>
              </View>
            </View>

            {/* ── Info note ── */}
            <View style={styles.infoNote}>
              <View style={styles.infoIconBox}>
                <MaterialCommunityIcons name="shield-check" size={20} color="#7F45FF" />
              </View>
              <Text style={styles.infoNoteText}>
                Your profile information can be changed{'\n'}
                anytime from <Text style={styles.infoNoteLink}>Settings</Text>.
              </Text>
            </View>

          </View>

          {/* ── Progress Steps ── */}
          <View style={[styles.stepsContainer, { width: width * 0.9 }]}>
            <Text style={styles.stepsSectionLabel}>YOUR JOURNEY SETUP</Text>
            <View style={styles.stepsRow}>
              {/* Step 1 - active */}
              <View style={styles.stepItem}>
                <View style={[styles.stepIcon, styles.stepIconActive]}>
                  <Feather name="user" size={16} color="#FFF" />
                </View>
                <Text style={[styles.stepLabel, styles.stepLabelActive]}>Profile</Text>
              </View>

              <View style={styles.stepDashLine} />

              {/* Step 2 */}
              <View style={styles.stepItem}>
                <View style={styles.stepIcon}>
                  <Ionicons name="flag-outline" size={16} color="#94A3B8" />
                </View>
                <Text style={styles.stepLabel}>Goals</Text>
              </View>

              <View style={styles.stepDashLine} />

              {/* Step 3 */}
              <View style={styles.stepItem}>
                <View style={styles.stepIcon}>
                  <Feather name="flag" size={16} color="#94A3B8" />
                </View>
                <Text style={styles.stepLabel}>First Habit</Text>
              </View>
            </View>
          </View>

          {/* ── Bottom Actions ── */}
          <View style={[styles.bottomBar, { width: width * 0.9 }]}>
            <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
              <Text style={styles.skipText}>SKIP FOR NOW</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.continueBtn}
              onPress={() => router.push('/(ProfileSetup)/step2')}
            >
              <Text style={styles.continueBtnText}>CONTINUE</Text>
              <Feather name="arrow-right" size={18} color="#FFF" />
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
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
    marginBottom: 4,
  },
  backBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoHabit: { fontSize: 22, fontWeight: '800', color: '#0E0F19', letterSpacing: -1 },
  logoLoop: { color: '#7F45FF' },

  // Title
  titleContainer: { alignItems: 'center', marginBottom: 20 },
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#0E0F19', letterSpacing: -0.5 },
  subtitle: {
    marginTop: 6,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    fontWeight: '500',
  },

  // Avatar
  avatarWrapper: {
    width: 110,
    height: 110,
    marginBottom: 6,
    position: 'relative',
  },
  avatarCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarInner: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#D8CBFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sparkleDot: {
    position: 'absolute',
    top: 6,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C4B5FD',
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#EDE9FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3EEFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 24,
  },
  changePhotoText: { fontSize: 11, fontWeight: '700', color: '#7F45FF', letterSpacing: 0.5 },

  // Form
  formContainer: { alignItems: 'center' },
  inputGroup: { width: '100%', marginBottom: 16 },
  inputLabel: { fontSize: 11, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  optionalLabel: { color: '#94A3B8', fontWeight: '600' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 5,
    elevation: 2,
  },
  bioWrapper: { height: 90, alignItems: 'flex-start', paddingVertical: 12 },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, fontSize: 15, fontWeight: '600', color: '#0E0F19' },
  bioInput: { textAlignVertical: 'top', height: 60 },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  helperText: { fontSize: 11, color: '#94A3B8', marginTop: 6, fontWeight: '500', paddingHorizontal: 4 },
  validationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, paddingHorizontal: 4 },
  validationTextGreen: { fontSize: 11, color: '#34D399', fontWeight: '600', marginLeft: 4 },
  charCount: { fontSize: 11, color: '#94A3B8', textAlign: 'right', marginTop: 4 },

  // Profile Preview
  previewCard: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 15,
    elevation: 4,
  },
  previewSectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 12,
  },
  previewInner: { flexDirection: 'row', alignItems: 'flex-start' },
  previewAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  previewInfo: { flex: 1 },
  previewName: { fontSize: 15, fontWeight: '800', color: '#0E0F19' },
  previewUsername: { fontSize: 12, color: '#7F45FF', fontWeight: '600', marginTop: 1 },
  previewBio: { fontSize: 11, color: '#475569', marginTop: 3, fontStyle: 'italic' },
  badgeRow: { flexDirection: 'row', marginTop: 8, gap: 6 },
  levelBadge: {
    backgroundColor: '#7F45FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  levelBadgeText: { fontSize: 9, fontWeight: '800', color: '#FFF' },
  rankBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rankBadgeText: { fontSize: 9, fontWeight: '800', color: '#B45309', marginLeft: 4 },
  previewCrystalBox: { justifyContent: 'center', alignItems: 'center', paddingLeft: 8 },
  previewCrystal: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // XP Bar
  xpRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  xpValue: { fontSize: 12, fontWeight: '800', color: '#0E0F19' },
  xpLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '500' },
  xpBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  xpBarFill: {
    height: '100%',
    backgroundColor: '#7F45FF',
    borderRadius: 3,
  },

  // Info Note
  infoNote: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F5F3FF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 24,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoNoteText: { flex: 1, fontSize: 12, color: '#475569', lineHeight: 18, fontWeight: '500' },
  infoNoteLink: { color: '#7F45FF', fontWeight: '700' },

  // Steps
  stepsContainer: { marginBottom: 20 },
  stepsSectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 14,
  },
  stepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepItem: { alignItems: 'center', width: 70 },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  stepIconActive: {
    backgroundColor: '#7F45FF',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  stepLabel: { fontSize: 11, color: '#94A3B8', fontWeight: '600', textAlign: 'center' },
  stepLabelActive: { color: '#7F45FF', fontWeight: '800' },
  stepDashLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: '#E2E8F0',
    borderStyle: 'dashed',
    marginBottom: 18,
    borderWidth: 0.8,
    borderColor: '#CBD5E1',
  },

  // Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  skipText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F45FF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    gap: 8,
  },
  continueBtnText: { fontSize: 15, fontWeight: '700', color: '#FFF' },
});
