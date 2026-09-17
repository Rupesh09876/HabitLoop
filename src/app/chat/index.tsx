import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; avatar?: string; status?: string }>();
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef<ScrollView>(null);

  const friendName = params.name || 'Friend';
  const friendAvatar =
    params.avatar ||
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
  const friendStatus = params.status || 'Active now';

  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'them',
      text: `Hey Rupesh! How is your habit streak going today? 🔥`,
      time: '8:28 AM',
    },
    {
      id: '2',
      sender: 'me',
      text: 'Just finished my morning workout and meditation! Day 14 locked in.',
      time: '8:30 AM',
    },
    {
      id: '3',
      sender: 'them',
      text: 'Awesome progress! Keep it up, we need to climb the season leaderboard together 🚀',
      time: '8:31 AM',
    },
    {
      id: '4',
      sender: 'me',
      text: 'oi',
      time: '8:32 AM',
    },
  ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, newMsg]);
    setInputMessage('');

    // Simulate instant friendly reply after 1.2s
    setTimeout(() => {
      const replies = [
        'Great job! Stay consistent! 💪',
        'Let’s conquer this season! 🏆',
        'Checked your latest quest update, looking good!',
        'See you on the leaderboard! ⚡',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'them',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1200);
  };

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Feather name="arrow-left" size={24} color="#0E0F19" />
          </TouchableOpacity>

          <View style={styles.headerProfile}>
            <View style={styles.avatarWrapper}>
              <Image source={{ uri: friendAvatar }} style={styles.avatarImg} />
              <View style={styles.onlineDot} />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.friendNameText} numberOfLines={1}>{friendName}</Text>
              <Text style={styles.friendStatusText}>{friendStatus}</Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="call-outline" size={20} color="#0E0F19" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerActionBtn}>
              <Ionicons name="videocam-outline" size={22} color="#0E0F19" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Message List */}
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.dateDivider}>
            <Text style={styles.dateDividerText}>TODAY</Text>
          </View>

          {messages.map(item => {
            const isMe = item.sender === 'me';
            return (
              <View
                key={item.id}
                style={[
                  styles.messageRow,
                  isMe ? styles.messageRowMe : styles.messageRowThem,
                ]}
              >
                {!isMe && (
                  <Image source={{ uri: friendAvatar }} style={styles.msgAvatar} />
                )}
                <View
                  style={[
                    styles.messageBubble,
                    isMe ? styles.messageBubbleMe : styles.messageBubbleThem,
                  ]}
                >
                  <Text style={[styles.messageText, isMe && styles.messageTextMe]}>
                    {item.text}
                  </Text>
                  <View style={styles.timeRow}>
                    <Text style={[styles.timeText, isMe && styles.timeTextMe]}>
                      {item.time}
                    </Text>
                    {isMe && (
                      <Ionicons name="checkmark-done" size={13} color="#DDD6FE" style={{ marginLeft: 3 }} />
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Bottom Input Area */}
        <View style={styles.inputBar}>
          <TouchableOpacity style={styles.attachBtn}>
            <Feather name="plus-circle" size={22} color="#7F45FF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.attachBtn}>
            <Ionicons name="image-outline" size={22} color="#64748B" />
          </TouchableOpacity>

          <View style={styles.textInputBox}>
            <TextInput
              placeholder="Type a message..."
              placeholderTextColor="#94A3B8"
              value={inputMessage}
              onChangeText={setInputMessage}
              style={styles.textInput}
              multiline
            />
            <TouchableOpacity style={styles.micBtn}>
              <Feather name="mic" size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.sendBtn,
              inputMessage.trim().length > 0 && styles.sendBtnActive,
            ]}
            onPress={handleSendMessage}
            disabled={!inputMessage.trim()}
          >
            <Ionicons name="send" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 4,
  },
  headerProfile: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatarImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  friendNameText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0E0F19',
  },
  friendStatusText: {
    fontSize: 11,
    color: '#16A34A',
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerActionBtn: {
    padding: 6,
  },

  // Messages
  messageList: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  dateDivider: {
    alignItems: 'center',
    marginBottom: 16,
  },
  dateDividerText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-end',
  },
  messageRowMe: {
    justifyContent: 'flex-end',
  },
  messageRowThem: {
    justifyContent: 'flex-start',
  },
  msgAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    marginBottom: 2,
  },
  messageBubble: {
    maxWidth: '75%',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
  },
  messageBubbleMe: {
    backgroundColor: '#7F45FF',
    borderBottomRightRadius: 4,
  },
  messageBubbleThem: {
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.02,
    shadowRadius: 3,
    elevation: 1,
  },
  messageText: {
    fontSize: 14,
    color: '#0E0F19',
    lineHeight: 20,
  },
  messageTextMe: {
    color: '#FFF',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontSize: 9,
    color: '#94A3B8',
    fontWeight: '500',
  },
  timeTextMe: {
    color: '#DDD6FE',
  },

  // Input Bar
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  attachBtn: {
    padding: 6,
    marginRight: 4,
  },
  textInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    color: '#0E0F19',
    maxHeight: 100,
  },
  micBtn: {
    paddingLeft: 6,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendBtnActive: {
    backgroundColor: '#7F45FF',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
});
