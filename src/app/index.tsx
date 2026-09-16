import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';

export default function App() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/onboarding');
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);
  
  // Calculate responsive sizes
  const crystalSize = Math.min(width * 0.8, height * 0.5);
  const titleFontSize = width * 0.12;
  const subtitleFontSize = width * 0.035;
  const statusFontSize = width * 0.03;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Crystal Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={require('../../assets/crystal.png')}
            style={[styles.crystalImage, { width: crystalSize, height: crystalSize }]}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={[styles.titleHabit, { fontSize: titleFontSize }]}>Habit</Text>
          <Text style={[styles.titleLoop, { fontSize: titleFontSize }]}>Loop</Text>
        </View>

        {/* Subtitle */}
        <Text style={[styles.subtitle, { fontSize: subtitleFontSize }]}>
          LEVEL UP YOUR REAL LIFE.
        </Text>
      </View>

      {/* Bottom Status */}
      <View style={styles.statusContainer}>
        <Text style={[styles.statusText, { fontSize: statusFontSize }]}>
          •  SYSTEM ONLINE  •
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC', // very light grey/white background
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    // Optional glow effect
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 40,
    elevation: 10,
  },
  crystalImage: {
    // Sizing handled dynamically
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  titleHabit: {
    fontWeight: '800',
    color: '#0E0F19', // Dark color
    letterSpacing: -1,
  },
  titleLoop: {
    fontWeight: '800',
    color: '#7F45FF', // Bright purple
    letterSpacing: -1,
  },
  subtitle: {
    fontWeight: '600',
    color: '#1A1B2F',
    letterSpacing: 2.5,
    opacity: 0.8,
  },
  statusContainer: {
    paddingBottom: 50,
  },
  statusText: {
    fontWeight: '700',
    color: '#1DB954', // Bright green
    letterSpacing: 2,
  }
});
