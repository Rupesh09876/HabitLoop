import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, useWindowDimensions, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CreatePostScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const [postText, setPostText] = useState(
    "Morning workout complete! 💪\nDay 14 of consistency.\nLet's keep pushing forward!"
  );
  const [showPhotoAttachment, setShowPhotoAttachment] = useState(true);
  const [showStreakAttachment, setShowStreakAttachment] = useState(true);
  const [allowComments, setAllowComments] = useState(true);
  const [allowReactions, setAllowReactions] = useState(true);
  const [audience, setAudience] = useState('Friends');
  const [showAudienceMenu, setShowAudienceMenu] = useState(false);

  const handlePost = () => {
    // In real app, persist post to database/state
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#0E0F19" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>CREATE POST</Text>
        <TouchableOpacity onPress={handlePost}>
          <Text style={styles.headerPostAction}>POST</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Info & Audience */}
        <View style={[styles.userRow, { width: width * 0.92 }]}>
          <View style={styles.avatarBorder}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }}
              style={styles.avatarImg}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.userName}>Rupesh</Text>
            <View style={styles.userSubRow}>
              <Text style={styles.userLevelText}>Level 18 • </Text>
              <MaterialCommunityIcons name="shield" size={13} color="#D97706" style={{ marginRight: 2 }} />
              <Text style={styles.userRankText}>Bronze II</Text>
            </View>
            <TouchableOpacity
              style={styles.audiencePill}
              onPress={() => setShowAudienceMenu(!showAudienceMenu)}
            >
              <Ionicons name="people-outline" size={13} color="#475569" style={{ marginRight: 4 }} />
              <Text style={styles.audienceText}>{audience}</Text>
              <Feather name="chevron-down" size={13} color="#475569" style={{ marginLeft: 2 }} />
            </TouchableOpacity>

            {showAudienceMenu && (
              <View style={styles.audienceDropdown}>
                {['Public', 'Friends', 'Only Me'].map(opt => (
                  <TouchableOpacity
                    key={opt}
                    style={styles.audienceItem}
                    onPress={() => {
                      setAudience(opt);
                      setShowAudienceMenu(false);
                    }}
                  >
                    <Text style={[styles.audienceItemText, audience === opt && { color: '#7F45FF', fontWeight: '800' }]}>
                      {opt}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {/* Text Input Area */}
        <View style={[styles.inputContainer, { width: width * 0.92 }]}>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Share your progress with friends..."
            placeholderTextColor="#94A3B8"
            value={postText}
            onChangeText={setPostText}
            maxLength={500}
          />
          <Text style={styles.charCount}>{postText.length}/500</Text>
        </View>

        {/* Attached Media 1: Photo Attachment */}
        {showPhotoAttachment && (
          <View style={[styles.photoCard, { width: width * 0.92 }]}>
            <Image
              source={require('../../../assets/images/workout_post.jpg')}
              style={styles.photoImg}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowPhotoAttachment(false)}
            >
              <Feather name="x" size={14} color="#0E0F19" />
            </TouchableOpacity>
          </View>
        )}

        {/* Attached Media 2: Streak Milestone Card */}
        {showStreakAttachment && (
          <View style={[styles.milestoneCard, { width: width * 0.92 }]}>
            <View style={styles.milestoneIconBox}>
              <MaterialCommunityIcons name="fire" size={28} color="#F97316" />
              <Text style={styles.milestoneNumber}>14</Text>
              <Text style={styles.milestoneNumberSub}>DAYS</Text>
            </View>
            <View style={styles.milestoneTextCol}>
              <Text style={styles.milestoneTag}>STREAK MILESTONE</Text>
              <Text style={styles.milestoneTitle}>14 DAY STREAK</Text>
              <Text style={styles.milestoneDesc}>Keep the momentum going!</Text>
            </View>
            <TouchableOpacity
              style={styles.milestoneCloseBtn}
              onPress={() => setShowStreakAttachment(false)}
            >
              <Feather name="x" size={14} color="#64748B" />
            </TouchableOpacity>
          </View>
        )}

        {/* Section: ADD TO YOUR POST */}
        <View style={[styles.sectionCard, { width: width * 0.92 }]}>
          <Text style={styles.sectionHeaderTitle}>ADD TO YOUR POST</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.addButtonsRow}
          >
            <TouchableOpacity
              style={styles.addFeatureBtn}
              onPress={() => setShowPhotoAttachment(true)}
            >
              <Ionicons name="camera-outline" size={22} color="#7F45FF" />
              <Text style={styles.addFeatureText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFeatureBtn}>
              <Ionicons name="trophy-outline" size={22} color="#D97706" />
              <Text style={styles.addFeatureText}>Achievement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addFeatureBtn}
              onPress={() => setShowStreakAttachment(true)}
            >
              <MaterialCommunityIcons name="fire" size={22} color="#F97316" />
              <Text style={styles.addFeatureText}>Streak</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFeatureBtn}>
              <MaterialCommunityIcons name="arrow-up-bold" size={22} color="#7F45FF" />
              <Text style={styles.addFeatureText}>Level Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFeatureBtn}>
              <Ionicons name="diamond-outline" size={22} color="#3B82F6" />
              <Text style={styles.addFeatureText}>Crystal</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addFeatureBtn}>
              <MaterialCommunityIcons name="target" size={22} color="#DB2777" />
              <Text style={styles.addFeatureText}>Milestone</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Section: POST OPTIONS */}
        <View style={[styles.sectionCard, { width: width * 0.92 }]}>
          <Text style={styles.sectionHeaderTitle}>POST OPTIONS</Text>
          
          <View style={styles.optionRow}>
            <View style={styles.optionLeft}>
              <Ionicons name="checkbox" size={18} color="#7F45FF" style={{ marginRight: 8 }} />
              <Text style={styles.optionLabel}>Allow comments</Text>
            </View>
            <Switch
              value={allowComments}
              onValueChange={setAllowComments}
              trackColor={{ false: '#CBD5E1', true: '#7F45FF' }}
              thumbColor="#FFF"
            />
          </View>

          <View style={[styles.optionRow, { borderTopWidth: 1, borderTopColor: '#F8FAFC' }]}>
            <View style={styles.optionLeft}>
              <Ionicons name="checkbox" size={18} color="#7F45FF" style={{ marginRight: 8 }} />
              <Text style={styles.optionLabel}>Allow reactions</Text>
            </View>
            <Switch
              value={allowReactions}
              onValueChange={setAllowReactions}
              trackColor={{ false: '#CBD5E1', true: '#7F45FF' }}
              thumbColor="#FFF"
            />
          </View>
        </View>

        {/* Bottom Post Actions */}
        <View style={[styles.bottomActionsRow, { width: width * 0.92 }]}>
          <TouchableOpacity
            style={styles.bottomAudienceBtn}
            onPress={() => setShowAudienceMenu(!showAudienceMenu)}
          >
            <Ionicons name="people-outline" size={16} color="#475569" style={{ marginRight: 6 }} />
            <Text style={styles.bottomAudienceText}>{audience}</Text>
            <Feather name="chevron-down" size={14} color="#475569" style={{ marginLeft: 4 }} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.postSubmitBtn}
            activeOpacity={0.8}
            onPress={handlePost}
          >
            <Text style={styles.postSubmitBtnText}>POST</Text>
          </TouchableOpacity>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: 0.5,
  },
  headerPostAction: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7F45FF',
  },
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingBottom: 40,
  },

  // User Row
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarBorder: {
    width: 54,
    height: 54,
    borderRadius: 27,
    padding: 2,
    borderWidth: 2,
    borderColor: '#C4B5FD',
  },
  avatarImg: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
  },
  userName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E0F19',
  },
  userSubRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  userLevelText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  userRankText: {
    fontSize: 12,
    color: '#D97706',
    fontWeight: '700',
  },
  audiencePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  audienceText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  audienceDropdown: {
    position: 'absolute',
    top: 50,
    left: 0,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    zIndex: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    width: 110,
  },
  audienceItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  audienceItemText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },

  // Input
  inputContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    minHeight: 120,
  },
  textInput: {
    fontSize: 14,
    color: '#0E0F19',
    lineHeight: 22,
    minHeight: 80,
  },
  charCount: {
    fontSize: 10,
    color: '#94A3B8',
    textAlign: 'right',
    marginTop: 8,
    fontWeight: '600',
  },

  // Attached Photo
  photoCard: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 16,
    position: 'relative',
    height: 200,
    backgroundColor: '#0E0F19',
  },
  photoImg: {
    width: '100%',
    height: '100%',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Attached Milestone Card
  milestoneCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 14,
    borderWidth: 1,
    borderColor: '#FED7AA',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  milestoneIconBox: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFEDD5',
  },
  milestoneNumber: {
    fontSize: 15,
    fontWeight: '900',
    color: '#EA580C',
    marginTop: -2,
  },
  milestoneNumberSub: {
    fontSize: 8,
    fontWeight: '800',
    color: '#EA580C',
  },
  milestoneTextCol: {
    flex: 1,
    marginLeft: 14,
  },
  milestoneTag: {
    fontSize: 9,
    fontWeight: '800',
    color: '#EA580C',
    letterSpacing: 0.5,
  },
  milestoneTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0E0F19',
    marginTop: 2,
  },
  milestoneDesc: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  milestoneCloseBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F8FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Generic Section Card
  sectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  sectionHeaderTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
    marginBottom: 12,
  },
  addButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  addFeatureBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 68,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#FAF9FF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  addFeatureText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#475569',
    marginTop: 4,
  },

  // Options
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0E0F19',
  },

  // Bottom Actions
  bottomActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  bottomAudienceBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 14,
  },
  bottomAudienceText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#475569',
  },
  postSubmitBtn: {
    flex: 1,
    height: 48,
    backgroundColor: '#7F45FF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  postSubmitBtnText: {
    fontSize: 14,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: 1,
  },
});
