import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type ThemeType = 'Light' | 'Dark' | 'System Default';
type VisibilityType = 'Everyone' | 'Friends' | 'Only Me';

export default function SettingsScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  // Settings State
  const [habitReminders, setHabitReminders] = useState(true);
  const [dailySummary, setDailySummary] = useState(true);
  const [friendActivity, setFriendActivity] = useState(true);
  const [achievementAlerts, setAchievementAlerts] = useState(true);

  const [theme, setTheme] = useState<ThemeType>('Light');
  const [isThemeModalVisible, setIsThemeModalVisible] = useState(false);

  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [celebrationEffects, setCelebrationEffects] = useState(true);
  const [autoStartNextHabit, setAutoStartNextHabit] = useState(false);

  const [profileVisibility, setProfileVisibility] = useState<VisibilityType>('Friends');
  const [isVisibilityModalVisible, setIsVisibilityModalVisible] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [showStreak, setShowStreak] = useState(true);

  const [isAboutModalVisible, setIsAboutModalVisible] = useState(false);

  // Helper Row Components
  interface SettingSectionProps {
    title: string;
    children: React.ReactNode;
  }

  const SettingSection = ({ title, children }: SettingSectionProps) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionCard}>{children}</View>
    </View>
  );

  interface SettingRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
  }

  const SettingRow = ({ icon, title, subtitle, onPress, rightComponent }: SettingRowProps) => {
    const Container = onPress ? TouchableOpacity : View;
    return (
      <Container
        style={styles.rowContainer}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.rowIconContainer}>{icon}</View>
        <View style={styles.rowContent}>
          <Text style={styles.rowTitle}>{title}</Text>
          {subtitle && <Text style={styles.rowSubtitle}>{subtitle}</Text>}
        </View>
        {rightComponent && <View style={styles.rowRight}>{rightComponent}</View>}
        {onPress && !rightComponent && (
          <Feather name="chevron-right" size={18} color="#94A3B8" />
        )}
      </Container>
    );
  };

  // Switch row wrapper
  interface SettingToggleRowProps {
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    value: boolean;
    onValueChange: (val: boolean) => void;
  }

  const SettingToggleRow = ({ icon, title, subtitle, value, onValueChange }: SettingToggleRowProps) => (
    <SettingRow
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightComponent={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#E2E8F0', true: '#7F45FF' }}
          thumbColor={Platform.OS === 'android' ? '#FFFFFF' : undefined}
          ios_backgroundColor="#E2E8F0"
        />
      }
    />
  );

  // Handlers for mock data/alerts
  const handleExportData = () => {
    Alert.alert(
      'Data Export',
      'Your data export feature will be available once cloud storage is connected.',
      [{ text: 'OK' }]
    );
  };

  const handleBackupSync = () => {
    Alert.alert(
      'Backup & Sync',
      'Cloud backup will be available when the backend and database are connected.',
      [{ text: 'OK' }]
    );
  };

  const handleChangePassword = () => {
    Alert.alert(
      'Change Password',
      'Password management will be connected when authentication is implemented.',
      [{ text: 'OK' }]
    );
  };

  const handleLoginActivity = () => {
    Alert.alert(
      'Login Activity',
      'Login activity will be available once authentication is connected.',
      [{ text: 'OK' }]
    );
  };

  const handleHelpSupport = () => {
    Alert.alert(
      'Help & Support',
      'Support functionality will be connected in a future version.',
      [{ text: 'OK' }]
    );
  };

  const handleTermsOfService = () => {
    Alert.alert(
      'Terms of Service',
      'Terms of Service details will be provided in the final production release.',
      [{ text: 'OK' }]
    );
  };

  const handlePrivacyPolicy = () => {
    Alert.alert(
      'Privacy Policy',
      'Privacy Policy details will be provided in the final production release.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      'Log Out?',
      'Are you sure you want to log out of HabitLoop?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Info', 'Authentication will be connected later.');
          },
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account?',
      'This action cannot be undone. Are you sure you want to delete your account?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Info', 'Account deletion will be connected once the backend is implemented.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Top Header */}
      <View style={[styles.header, { width: width * 0.92 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          accessibilityLabel="Go back"
        >
          <Feather name="arrow-left" size={24} color="#0E0F19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SETTINGS</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ACCOUNT */}
        <SettingSection title="ACCOUNT">
          <SettingRow
            icon={<Feather name="user" size={18} color="#7F45FF" />}
            title="Profile"
            subtitle="Manage your profile information"
            onPress={() => router.back()}
          />
          <SettingRow
            icon={<Feather name="at-sign" size={18} color="#7F45FF" />}
            title="Username"
            subtitle="Change your HabitLoop username"
            rightComponent={<Text style={styles.valueText}>@rupeshh</Text>}
          />
        </SettingSection>

        {/* NOTIFICATIONS */}
        <SettingSection title="NOTIFICATIONS">
          <SettingToggleRow
            icon={<Feather name="bell" size={18} color="#7F45FF" />}
            title="Habit Reminders"
            subtitle="Get reminded when it's time to complete a habit"
            value={habitReminders}
            onValueChange={setHabitReminders}
          />
          <SettingToggleRow
            icon={<Feather name="file-text" size={18} color="#7F45FF" />}
            title="Daily Summary"
            subtitle="Receive your daily habit progress summary"
            value={dailySummary}
            onValueChange={setDailySummary}
          />
          <SettingToggleRow
            icon={<Feather name="users" size={18} color="#7F45FF" />}
            title="Friend Activity"
            subtitle="Get notified about friend activity and challenges"
            value={friendActivity}
            onValueChange={setFriendActivity}
          />
          <SettingToggleRow
            icon={<Feather name="award" size={18} color="#7F45FF" />}
            title="Achievement Alerts"
            subtitle="Celebrate when you unlock achievements and rewards"
            value={achievementAlerts}
            onValueChange={setAchievementAlerts}
          />
        </SettingSection>

        {/* APPEARANCE */}
        <SettingSection title="APPEARANCE">
          <SettingRow
            icon={<Feather name="aperture" size={18} color="#7F45FF" />}
            title="Theme"
            onPress={() => setIsThemeModalVisible(true)}
            rightComponent={
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{theme}</Text>
                <Feather name="chevron-right" size={18} color="#94A3B8" />
              </View>
            }
          />
        </SettingSection>

        {/* HABIT EXPERIENCE */}
        <SettingSection title="HABIT EXPERIENCE">
          <SettingToggleRow
            icon={<Feather name="smartphone" size={18} color="#7F45FF" />}
            title="Haptic Feedback"
            subtitle="Use vibration feedback when completing habits"
            value={hapticFeedback}
            onValueChange={setHapticFeedback}
          />
          <SettingToggleRow
            icon={<Feather name="zap" size={18} color="#7F45FF" />}
            title="Celebration Effects"
            subtitle="Show animations and effects when completing habits"
            value={celebrationEffects}
            onValueChange={setCelebrationEffects}
          />
          <SettingToggleRow
            icon={<Feather name="play" size={18} color="#7F45FF" />}
            title="Auto Start Next Habit"
            subtitle="Automatically continue to the next habit"
            value={autoStartNextHabit}
            onValueChange={setAutoStartNextHabit}
          />
        </SettingSection>

        {/* PRIVACY */}
        <SettingSection title="PRIVACY">
          <SettingRow
            icon={<Feather name="lock" size={18} color="#7F45FF" />}
            title="Profile Visibility"
            onPress={() => setIsVisibilityModalVisible(true)}
            rightComponent={
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>{profileVisibility}</Text>
                <Feather name="chevron-right" size={18} color="#94A3B8" />
              </View>
            }
          />
          <SettingToggleRow
            icon={<Feather name="eye" size={18} color="#7F45FF" />}
            title="Show Activity to Friends"
            subtitle="Let friends see your habit activity"
            value={showActivity}
            onValueChange={setShowActivity}
          />
          <SettingToggleRow
            icon={<Feather name="activity" size={18} color="#7F45FF" />}
            title="Show Streak"
            subtitle="Show your current streak to friends"
            value={showStreak}
            onValueChange={setShowStreak}
          />
        </SettingSection>

        {/* DATA & BACKUP */}
        <SettingSection title="DATA & BACKUP">
          <SettingRow
            icon={<Feather name="download" size={18} color="#7F45FF" />}
            title="Export My Data"
            subtitle="Export your HabitLoop data"
            onPress={handleExportData}
          />
          <SettingRow
            icon={<Feather name="cloud" size={18} color="#7F45FF" />}
            title="Backup & Sync"
            onPress={handleBackupSync}
            rightComponent={
              <View style={styles.valueContainer}>
                <Text style={styles.valueText}>Not Connected</Text>
                <Feather name="chevron-right" size={18} color="#94A3B8" />
              </View>
            }
          />
        </SettingSection>

        {/* SECURITY */}
        <SettingSection title="SECURITY">
          <SettingRow
            icon={<Feather name="key" size={18} color="#7F45FF" />}
            title="Change Password"
            onPress={handleChangePassword}
          />
          <SettingRow
            icon={<Feather name="shield" size={18} color="#7F45FF" />}
            title="Login Activity"
            onPress={handleLoginActivity}
          />
        </SettingSection>

        {/* ABOUT */}
        <SettingSection title="ABOUT">
          <SettingRow
            icon={<Feather name="info" size={18} color="#7F45FF" />}
            title="About HabitLoop"
            onPress={() => setIsAboutModalVisible(true)}
          />
          <SettingRow
            icon={<Feather name="help-circle" size={18} color="#7F45FF" />}
            title="Help & Support"
            onPress={handleHelpSupport}
          />
          <SettingRow
            icon={<Feather name="file" size={18} color="#7F45FF" />}
            title="Terms of Service"
            onPress={handleTermsOfService}
          />
          <SettingRow
            icon={<Feather name="lock" size={18} color="#7F45FF" />}
            title="Privacy Policy"
            onPress={handlePrivacyPolicy}
          />
        </SettingSection>

        {/* DESTRUCTIVE ACTIONS */}
        <View style={styles.destructiveActionsContainer}>
          <TouchableOpacity
            style={styles.destructiveButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Feather name="log-out" size={18} color="#EF4444" style={styles.destructiveIcon} />
            <Text style={styles.destructiveButtonText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.destructiveButton, styles.deleteAccountBtn]}
            onPress={handleDeleteAccount}
            activeOpacity={0.7}
          >
            <Feather name="trash-2" size={18} color="#EF4444" style={styles.destructiveIcon} />
            <Text style={styles.destructiveButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* THEME SELECTION MODAL */}
      <Modal
        visible={isThemeModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsThemeModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsThemeModalVisible(false)}
          />
          <View style={styles.modalContentCard}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Theme</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsThemeModalVisible(false)}
              >
                <Feather name="x" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              {(['Light', 'Dark', 'System Default'] as ThemeType[]).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.modalOptionRow}
                  onPress={() => {
                    setTheme(t);
                    setIsThemeModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, theme === t && styles.modalOptionTextActive]}>
                    {t}
                  </Text>
                  {theme === t && (
                    <Ionicons name="checkmark-circle" size={22} color="#7F45FF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* PRIVACY VISIBILITY MODAL */}
      <Modal
        visible={isVisibilityModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsVisibilityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsVisibilityModalVisible(false)}
          />
          <View style={styles.modalContentCard}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Profile Visibility</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsVisibilityModalVisible(false)}
              >
                <Feather name="x" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={styles.modalBody}>
              {(['Everyone', 'Friends', 'Only Me'] as VisibilityType[]).map((v) => (
                <TouchableOpacity
                  key={v}
                  style={styles.modalOptionRow}
                  onPress={() => {
                    setProfileVisibility(v);
                    setIsVisibilityModalVisible(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, profileVisibility === v && styles.modalOptionTextActive]}>
                    {v}
                  </Text>
                  {profileVisibility === v && (
                    <Ionicons name="checkmark-circle" size={22} color="#7F45FF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>

      {/* ABOUT MODAL */}
      <Modal
        visible={isAboutModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsAboutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setIsAboutModalVisible(false)}
          />
          <View style={styles.modalContentCard}>
            <View style={styles.modalDragHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>About HabitLoop</Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setIsAboutModalVisible(false)}
              >
                <Feather name="x" size={18} color="#64748B" />
              </TouchableOpacity>
            </View>
            <View style={[styles.modalBody, styles.aboutModalBody]}>
              <View style={styles.aboutLogoContainer}>
                <MaterialCommunityIcons name="loop" size={48} color="#7F45FF" />
              </View>
              <Text style={styles.aboutAppTitle}>HabitLoop</Text>
              <Text style={styles.aboutAppSlogan}>Build better habits. Level up your everyday life.</Text>
              <Text style={styles.aboutAppVersion}>Version 1.0.0</Text>
            </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 50,
    marginBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: 1.2,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 1,
    marginBottom: 8,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  rowIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FAF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rowContent: {
    flex: 1,
    justifyContent: 'center',
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E0F19',
  },
  rowSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  rowRight: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  valueText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  destructiveActionsContainer: {
    marginTop: 10,
    gap: 12,
  },
  destructiveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 16,
    paddingVertical: 14,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  deleteAccountBtn: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FFF1F1',
  },
  destructiveIcon: {
    marginRight: 8,
  },
  destructiveButtonText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#EF4444',
  },

  // Bottom Sheet Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBackdrop: {
    flex: 1,
  },
  modalContentCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: 36,
    paddingHorizontal: 20,
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
    marginBottom: 16,
    marginTop: 8,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: 0.5,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    gap: 8,
  },
  modalOptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#FAFAFC',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  modalOptionText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  modalOptionTextActive: {
    color: '#7F45FF',
  },

  // About Modal Specifics
  aboutModalBody: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  aboutLogoContainer: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: '#FAF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#EDE9FF',
  },
  aboutAppTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0E0F19',
    marginBottom: 8,
  },
  aboutAppSlogan: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 18,
    marginBottom: 16,
  },
  aboutAppVersion: {
    fontSize: 12,
    fontWeight: '800',
    color: '#94A3B8',
  },
});
