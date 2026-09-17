import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Onboarding() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      router.replace('/welcome');
    }
  };

  const handleBackOrSkip = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      router.replace('/welcome');
    }
  };

  const renderStep1 = () => (
    <View style={styles.stepContent}>
      <View style={[styles.illustrationContainer, { height: height * 0.45 }]}>
        <Image
          source={require('../../assets/onboarding1.png')}
          style={{ width: '150%', height: '100%' }}
          resizeMode="contain"
        />
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.mainTitleDark}>SMALL HABITS.</Text>
        <Text style={styles.mainTitlePurple}>BIG PROGRESS.</Text>
        <Text style={styles.subtitle}>
          Turn the small things you do{'\n'}every day into meaningful progress.
        </Text>
      </View>

      <View style={[styles.card, { width: width * 0.9 }]}>
        <View style={styles.featureItem}>
          <View style={[styles.iconWrapper, { backgroundColor: '#F3E8FF' }]}>
            <Feather name="target" size={24} color="#7F45FF" />
          </View>
          <Text style={styles.featureText}>Start small</Text>
        </View>
        <View style={styles.featureDivider} />
        <View style={styles.featureItem}>
          <View style={[styles.iconWrapper, { backgroundColor: '#E0F2FE' }]}>
            <Ionicons name="bar-chart" size={24} color="#38BDF8" />
          </View>
          <Text style={styles.featureText}>Stay consistent</Text>
        </View>
        <View style={styles.featureDivider} />
        <View style={styles.featureItem}>
          <View style={[styles.iconWrapper, { backgroundColor: '#F3E8FF' }]}>
            <Image source={require('../../assets/crystal1.png')} style={{ width: 40, height: 40 }} resizeMode="contain" />
          </View>
          <Text style={styles.featureText}>See real progress</Text>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContent}>
      <View style={styles.titleContainerStep2}>
        <Text style={styles.mainTitleDark}>COMPLETE HABITS.</Text>
        <Text style={styles.mainTitlePurple}>EARN XP.</Text>
        <Text style={styles.mainTitlePurple}>LEVEL UP.</Text>
      </View>

      <View style={[styles.illustrationContainer, { height: height * 0.25, marginVertical: 10 }]}>
        <Image
          source={require('../../assets/onboarding2.png')}
          style={{ width: width * 0.95, height: '100%' }}
          resizeMode="contain"
        />
      </View>

      <Text style={[styles.subtitle, { paddingHorizontal: 20, marginBottom: 20 }]}>
        Every completed habit gives you XP.{'\n'}Keep going to reach the next level{'\n'}and unlock your journey.
      </Text>

      <View style={[styles.exampleCard, { width: width * 0.9 }]}>
        <View style={styles.exampleLeft}>
          <View style={styles.exampleBadge}>
            <Text style={styles.exampleBadgeText}>EXAMPLE</Text>
          </View>
          <Text style={styles.exampleLabel}>DAILY HABIT</Text>
          <View style={styles.habitItemRow}>
            <Ionicons name="checkmark-circle" size={16} color="#7F45FF" />
            <Text style={styles.habitItemText}>Morning Workout</Text>
          </View>
          <View style={styles.xpRewardBox}>
            <Text style={styles.xpRewardText}>+40 XP</Text>
          </View>
        </View>

        <View style={styles.verticalDivider} />

        <View style={styles.exampleRight}>
          <View style={styles.xpHeaderRow}>
            <Text style={styles.totalXpText}>2,840 XP</Text>
            <Ionicons name="sparkles" size={14} color="#7F45FF" />
          </View>
          <View style={styles.progressBarBg}>
            <View style={styles.progressBarFill} />
          </View>

          <View style={styles.levelInfoBox}>
            <View>
              <Text style={styles.levelLabel}>LEVEL</Text>
              <Text style={styles.levelNumber}>18</Text>
            </View>
            <MaterialCommunityIcons name="shield-star" size={28} color="#7F45FF" />
          </View>

          <View style={styles.nextLevelBox}>
            <View>
              <Text style={styles.nextLevelLabel}>NEXT LEVEL</Text>
              <Text style={styles.nextLevelXp}>760 XP TO GO</Text>
            </View>
            <Feather name="chevron-right" size={14} color="#A0AEC0" />
          </View>
        </View>
      </View>

      <View style={[styles.infoPill, { width: width * 0.9 }]}>
        <View style={styles.infoIconBox}>
          <Feather name="trending-up" size={18} color="#7F45FF" />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.infoTitle}>Your progress becomes your power.</Text>
          <Text style={styles.infoDesc}>Keep building. Keep leveling up.</Text>
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContent}>
      {/* Full Image Graphic for Step 3 */}
      <View style={[styles.illustrationContainer, { height: height * 0.6, marginVertical: 10 }]}>
        <Image
          source={require('../../assets/onboarding3.png')}
          style={{ width: width * 0.95, height: '105%' }}
          resizeMode="contain"
        />
      </View>


      {/* Footer Motivation */}
      <View style={styles.step3Footer}>
        <Ionicons name="sparkles" size={18} color="#7F45FF" style={{ marginBottom: 6 }} />
        <Text style={styles.step3FooterTitle}>Start with one habit.</Text>
        <Text style={styles.step3FooterDesc}>See where it takes you.</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.topLogoContainer}>
        <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {step === 0 && renderStep1()}
        {step === 1 && renderStep2()}
        {step === 2 && renderStep3()}
      </ScrollView>

      {/* Bottom Bar */}
      <View style={[styles.bottomBar, { width: width * 0.9 }]}>
        <TouchableOpacity onPress={handleBackOrSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>{step === 2 ? 'BACK' : 'SKIP'}</Text>
        </TouchableOpacity>

        <View style={styles.pagination}>
          <View style={[styles.dot, step === 0 && styles.activeDot]} />
          <View style={[styles.dot, step === 1 && styles.activeDot]} />
          <View style={[styles.dot, step === 2 && styles.activeDot]} />
        </View>

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextText}>{step === 2 ? 'GET STARTED' : 'NEXT'}</Text>
          <Feather name="arrow-right" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  stepContent: {
    alignItems: 'center',
    width: '100%',
  },
  topLogoContainer: {
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 0,
  },
  logoHabit: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0E0F19',
    letterSpacing: -1,
  },
  logoLoop: {
    color: '#7F45FF',
  },

  // Step 1
  illustrationContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  illustrationPlaceholder: {
    width: 180,
    height: 180,
    backgroundColor: '#F3E8FF',
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mainTitleDark: {
    fontSize: 28,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -0.5,
  },
  mainTitlePurple: {
    fontSize: 28,
    fontWeight: '900',
    color: '#7F45FF',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  featureItem: {
    alignItems: 'center',
    flex: 1,
  },
  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0E0F19',
    textAlign: 'center',
  },
  featureDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
  },

  // Step 2
  titleContainerStep2: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  flowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  flowItem: {
    alignItems: 'center',
  },
  flowIconBox: {
    width: 48,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  checkBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#34D399',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
  },
  xpBadge: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  xpBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  levelBadgeText: {
    position: 'absolute',
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  flowText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0E0F19',
    textAlign: 'center',
  },
  flowArrow: {
    marginHorizontal: 4,
    marginBottom: 16,
    opacity: 0.6,
  },
  exampleCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 6,
    marginBottom: 15,
  },
  exampleLeft: {
    flex: 1,
    paddingRight: 10,
  },
  exampleBadge: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  exampleBadgeText: {
    color: '#7F45FF',
    fontSize: 9,
    fontWeight: '800',
  },
  exampleLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0E0F19',
    marginBottom: 6,
  },
  habitItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFAFC',
    padding: 6,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  habitItemText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#0E0F19',
    marginLeft: 6,
  },
  xpRewardBox: {
    backgroundColor: '#F8FAFC',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  xpRewardText: {
    color: '#7F45FF',
    fontSize: 16,
    fontWeight: '800',
  },
  verticalDivider: {
    width: 1,
    backgroundColor: '#F1F5F9',
    marginHorizontal: 6,
  },
  exampleRight: {
    flex: 1.2,
    paddingLeft: 6,
  },
  xpHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  totalXpText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E0F19',
    marginRight: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    marginBottom: 15,
  },
  progressBarFill: {
    width: '70%',
    height: '100%',
    backgroundColor: '#7F45FF',
    borderRadius: 3,
  },
  levelInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: 12,
    marginBottom: 10,
  },
  levelLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
  },
  levelNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#7F45FF',
  },
  nextLevelBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FAFAFC',
    padding: 10,
    borderRadius: 10,
  },
  nextLevelLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0E0F19',
  },
  nextLevelXp: {
    fontSize: 9,
    fontWeight: '700',
    color: '#7F45FF',
    marginTop: 2,
  },
  infoPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 14,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 3,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0E0F19',
  },
  infoDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },

  // Step 3
  step3HeaderRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10,
  },
  step3TitleBox: {
    flex: 1.2,
    paddingRight: 10,
  },
  step3TitleDark: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -0.5,
  },
  step3TitlePurple: {
    fontSize: 26,
    fontWeight: '900',
    color: '#7F45FF',
    letterSpacing: -0.5,
  },
  step3Subtitle: {
    marginTop: 10,
    fontSize: 13,
    color: '#64748B',
    lineHeight: 20,
    fontWeight: '500',
  },
  step3CrystalBox: {
    flex: 0.8,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  timelineContainer: {
    width: '90%',
    paddingVertical: 10,
    position: 'relative',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 14,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  timelineIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timelineTextBox: {
    marginLeft: 10,
  },
  timelineTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0E0F19',
  },
  timelineDesc: {
    fontSize: 10,
    color: '#64748B',
    marginTop: 2,
  },
  profileCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F5F3FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#7F45FF',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  profileSummaryTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
    letterSpacing: -0.2,
  },
  profileSummaryDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 6,
    lineHeight: 16,
  },
  step3Footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  step3FooterTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E0F19',
  },
  step3FooterDesc: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },

  // Bottom Bar
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#FAFAFC',
  },
  skipButton: {
    padding: 10,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#7F45FF',
    width: 9,
    height: 9,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#7F45FF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  nextText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    marginRight: 6,
  },
});
