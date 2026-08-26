import { StyleSheet, Text, View, Image, TouchableOpacity, useWindowDimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

export default function Welcome() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push('/(auth)/register');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  const handleGoogleAuth = () => {
    // Google auth logic
  };

  const handleAppleAuth = () => {
    // Apple auth logic
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Top Logo */}
        <View style={styles.topLogoContainer}>
          <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
        </View>

        {/* Crystal Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/crystal.png')}
            style={{ width: width * 1, height: height * 0.3 }}
            resizeMode="contain"
          />
        </View>

        {/* Titles */}
        <View style={styles.titleContainer}>
          <Text style={styles.mainTitleDark}>READY TO</Text>
          <Text style={styles.mainTitlePurple}>LEVEL UP?</Text>
          <Text style={styles.subtitle}>
            Create your account and start{'\n'}building better habits today.
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={[styles.actionContainer, { width: width * 0.85 }]}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleCreateAccount}>
            <Text style={styles.primaryButtonText}>CREATE ACCOUNT</Text>
          </TouchableOpacity>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginLink}>LOG IN</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <TouchableOpacity style={styles.socialButton} onPress={handleGoogleAuth}>
            <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton} onPress={handleAppleAuth}>
            <AntDesign name="apple" size={22} color="#000" style={styles.socialIcon} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            By continuing, you agree to our{'\n'}
            <Text style={styles.footerLink}>Terms of Service</Text> and <Text style={styles.footerLink}>Privacy Policy</Text>.
          </Text>
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
    paddingBottom: 40,
  },
  topLogoContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  logoHabit: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0E0F19',
    letterSpacing: -1,
  },
  logoLoop: {
    color: '#7F45FF',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    elevation: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  mainTitleDark: {
    fontSize: 36,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -1,
  },
  mainTitlePurple: {
    fontSize: 38,
    fontWeight: '900',
    color: '#7F45FF',
    letterSpacing: -1,
    marginTop: -5,
  },
  subtitle: {
    marginTop: 15,
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  actionContainer: {
    alignItems: 'center',
    width: '100%',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#7F45FF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 20,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  loginText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  loginLink: {
    fontSize: 14,
    color: '#7F45FF',
    fontWeight: '800',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 12,
    color: '#475569',
    fontWeight: '700',
    letterSpacing: 1,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    position: 'absolute',
    left: 20,
  },
  socialButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0E0F19',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
    fontWeight: '500',
  },
  footerLink: {
    color: '#7F45FF',
    fontWeight: '600',
  },
});
