import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Feather, Ionicons, AntDesign } from '@expo/vector-icons';

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [fullName, setFullName] = useState('Rupesh Katuwal');
  const [username, setUsername] = useState('@rupesh');
  const [email, setEmail] = useState('rupesh@example.com');
  const [password, setPassword] = useState('password123');
  const [confirmPassword, setConfirmPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Feather name="chevron-left" size={28} color="#0E0F19" />
            </TouchableOpacity>
            <View style={styles.logoContainer}>
              <Text style={styles.logoHabit}>Habit<Text style={styles.logoLoop}>Loop</Text></Text>
            </View>
            <View style={{ width: 28 }} />
          </View>

          {/* Titles */}
          <View style={styles.titleContainer}>
            <Text style={styles.mainTitle}>CREATE YOUR ACCOUNT</Text>
            <Text style={styles.subtitle}>
              Start your journey and turn your{'\n'}everyday habits into progress.
            </Text>
          </View>

          {/* Form */}
          <View style={[styles.formContainer, { width: width * 0.9 }]}>

            {/* Full Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={fullName}
                  onChangeText={setFullName}
                  placeholder="John Doe"
                  placeholderTextColor="#94A3B8"
                />
                <View style={styles.checkCircle}>
                  <Feather name="check" size={14} color="#34D399" />
                </View>
              </View>
            </View>



            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL</Text>
              <View style={styles.inputWrapper}>
                <Feather name="mail" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#94A3B8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <View style={styles.checkCircle}>
                  <Feather name="check" size={14} color="#34D399" />
                </View>
              </View>
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#7F45FF" />
                </TouchableOpacity>
                <View style={styles.checkCircle}>
                  <Feather name="check" size={14} color="#34D399" />
                </View>
              </View>
              <View style={[styles.validationRow, { justifyContent: 'space-between' }]}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name="checkmark-circle" size={14} color="#34D399" />
                  <Text style={styles.validationTextSuccess}>Password meets requirements</Text>
                </View>
                <Text style={styles.validationTextHint}>At least 8 characters</Text>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>CONFIRM PASSWORD</Text>
              <View style={styles.inputWrapper}>
                <Feather name="lock" size={20} color="#7F45FF" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  placeholderTextColor="#94A3B8"
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeIcon}>
                  <Feather name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#7F45FF" />
                </TouchableOpacity>
                <View style={styles.checkCircle}>
                  <Feather name="check" size={14} color="#34D399" />
                </View>
              </View>
              <View style={styles.validationRow}>
                <Ionicons name="checkmark-circle" size={14} color="#34D399" />
                <Text style={styles.validationTextSuccess}>Passwords match</Text>
              </View>
            </View>

            {/* Checkbox */}
            <View style={styles.checkboxRow}>
              <TouchableOpacity onPress={() => setAgreed(!agreed)} style={[styles.checkbox, agreed && styles.checkboxActive]}>
                {agreed && <Feather name="check" size={14} color="#FFF" />}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                I agree to the <Text style={styles.linkText}>Terms of Service</Text> and <Text style={styles.linkText}>Privacy Policy</Text>.
              </Text>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(ProfileSetup)/step1')}>
              <Text style={styles.primaryButtonText}>CREATE ACCOUNT</Text>
              <Feather name="arrow-right" size={20} color="#FFF" style={{ position: 'absolute', right: 20 }} />
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerRow}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#DB4437" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="apple" size={22} color="#000" style={styles.socialIcon} />
              <Text style={styles.socialButtonText}>Continue with Apple</Text>
            </TouchableOpacity>

            {/* Footer Login */}
            <View style={styles.footerRow}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/welcome')}>
                <Text style={styles.footerLink}>LOG IN</Text>
              </TouchableOpacity>
            </View>

          </View>
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
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
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0E0F19',
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
  formContainer: {
    alignItems: 'center',
  },
  inputGroup: {
    width: '100%',
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#0E0F19',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#ECFDF5',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  eyeIcon: {
    padding: 5,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 4,
  },
  validationTextSuccess: {
    fontSize: 11,
    color: '#34D399',
    fontWeight: '600',
    marginLeft: 4,
  },
  validationTextHint: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 15,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#7F45FF',
    borderColor: '#7F45FF',
  },
  checkboxText: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
    flex: 1,
  },
  linkText: {
    color: '#7F45FF',
    fontWeight: '600',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#7F45FF',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 25,
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
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
    fontSize: 11,
    color: '#94A3B8',
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
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 2,
  },
  socialIcon: {
    position: 'absolute',
    left: 24,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0E0F19',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  footerText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
  },
  footerLink: {
    fontSize: 13,
    color: '#7F45FF',
    fontWeight: '800',
  },
});
