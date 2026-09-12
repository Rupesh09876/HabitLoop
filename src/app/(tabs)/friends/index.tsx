import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, useWindowDimensions, Image, Modal, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

type FriendTab = 'ALL' | 'MY_FRIENDS' | 'REQUESTS' | 'MY_POSTS';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  liked?: boolean;
}

interface Post {
  id: string;
  author: string;
  isMe?: boolean;
  level: number;
  time: string;
  avatar: string;
  type: 'streak' | 'levelup' | 'achievement' | 'custom';
  streakNumber?: number;
  levelNumber?: number;
  title: string;
  subtitle: string;
  tags: string[];
  reactionsCount: number;
  commentsCount: number;
  reacted: boolean;
  comments: Comment[];
  image?: any;
}

export default function FriendsScreen() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [activeTab, setActiveTab] = useState<FriendTab>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [encouragedToast, setEncouragedToast] = useState<string | null>(null);

  // Active Comments Modal state
  const [selectedPostForComments, setSelectedPostForComments] = useState<Post | null>(null);
  const [newCommentText, setNewCommentText] = useState('');

  // Pending Requests state
  const [pendingRequests, setPendingRequests] = useState([
    { id: '1', name: 'Alex', level: 24, rank: 'Silver V', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
    { id: '2', name: 'Maya', level: 31, rank: 'Silver IV', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
  ]);

  // Suggestions state
  const [suggestions, setSuggestions] = useState([
    { id: 's1', name: 'Saurav Karki', level: 17, rank: 'Bronze II', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', added: false },
    { id: 's2', name: 'Anjali Sharma', level: 16, rank: 'Bronze I', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80', added: false },
    { id: 's3', name: 'Rohit Thapa', level: 14, rank: 'Bronze III', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80', added: false },
  ]);

  // Posts Feed state
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 'p1',
      author: 'Rupesh',
      isMe: true,
      level: 18,
      time: '2h ago',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      type: 'streak',
      streakNumber: 30,
      title: 'Reached a 30-day streak! 🔥',
      subtitle: 'Consistency is the key.',
      tags: ['#Discipline', '#KeepGoing'],
      reactionsCount: 24,
      commentsCount: 8,
      reacted: false,
      comments: [
        { id: 'c1', author: 'Priya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', text: 'Insane consistency brother! 🔥 Let’s go!', time: '1h ago', likes: 4 },
        { id: 'c2', author: 'Saurav', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', text: '30 days already? Keep pushing!', time: '45m ago', likes: 2 },
        { id: 'c3', author: 'Alex', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', text: 'Top tier discipline 💪', time: '30m ago', likes: 1 },
      ],
    },
    {
      id: 'p2',
      author: 'Priya',
      isMe: false,
      level: 19,
      time: '5h ago',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      type: 'levelup',
      levelNumber: 19,
      title: 'Reached Level 19! 🎉',
      subtitle: 'On to bigger goals!',
      tags: ['#LevelUp'],
      reactionsCount: 18,
      commentsCount: 6,
      reacted: false,
      comments: [
        { id: 'c4', author: 'Rupesh', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', text: 'Congrats Priya! Level 20 is right around the corner 🚀', time: '4h ago', likes: 3 },
        { id: 'c5', author: 'Maya', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', text: 'Proud of you girl! ✨', time: '3h ago', likes: 2 },
      ],
    },
    {
      id: 'p3',
      author: 'Saurav',
      isMe: false,
      level: 17,
      time: '1d ago',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      type: 'achievement',
      title: 'Unlocked "Early Bird" achievement 🥇',
      subtitle: 'Waking up early is becoming a habit!',
      tags: ['#SmallHabitsBigChanges'],
      reactionsCount: 12,
      commentsCount: 3,
      reacted: false,
      comments: [
        { id: 'c6', author: 'Alex', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80', text: 'Early mornings change everything 🌅', time: '1d ago', likes: 1 },
      ],
    },
  ]);

  const handleToggleReaction = (id: string) => {
    setPosts(prev =>
      prev.map(p => {
        if (p.id === id) {
          return {
            ...p,
            reacted: !p.reacted,
            reactionsCount: p.reacted ? p.reactionsCount - 1 : p.reactionsCount + 1,
          };
        }
        return p;
      })
    );
  };

  const handleEncourage = (author: string) => {
    setEncouragedToast(`Sent high-five to ${author}! 👏🔥`);
    setTimeout(() => {
      setEncouragedToast(null);
    }, 2000);
  };

  const handleOpenComments = (post: Post) => {
    setSelectedPostForComments(post);
  };

  const handleAddComment = () => {
    if (!newCommentText.trim() || !selectedPostForComments) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'Rupesh',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80',
      text: newCommentText.trim(),
      time: 'Just now',
      likes: 0,
    };

    const updatedComments = [newComment, ...selectedPostForComments.comments];
    const updatedPost = {
      ...selectedPostForComments,
      comments: updatedComments,
      commentsCount: selectedPostForComments.commentsCount + 1,
    };

    setSelectedPostForComments(updatedPost);
    setPosts(prev => prev.map(p => (p.id === updatedPost.id ? updatedPost : p)));
    setNewCommentText('');
  };

  const handleAcceptRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleDeclineRequest = (id: string) => {
    setPendingRequests(prev => prev.filter(r => r.id !== id));
  };

  const handleAddFriend = (id: string) => {
    setSuggestions(prev =>
      prev.map(s => (s.id === id ? { ...s, added: true } : s))
    );
  };

  const openChatWithUser = (name: string, avatar: string, status?: string) => {
    router.push({
      pathname: '/chat',
      params: { name, avatar, status: status || 'Active now' },
    });
  };

  // Filtered friends
  const myFriendsList = [
    { name: 'Calvin Panday', msg: 'You: oi', time: '8:32 am', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80', status: 'Online' },
    { name: 'Drêëmã Kâtüwãl', msg: 'The audio call ended.', time: 'Sun', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80', status: 'Active 2h ago' },
    { name: 'Prashant Dangi', msg: 'Aayo dai', time: 'Sun', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80', status: 'Online' },
    { name: 'Jenisha Khatri', msg: 'Jenisha sent a photo.', time: 'Sun', img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80', status: 'Active 1d ago' },
    { name: 'Mani Kumar', msg: 'You missed an audio call from Mani.', time: 'Fri', img: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80', status: 'Active 3d ago' },
    { name: 'Rudra Katwal', msg: 'Rudra sent an attachment.', time: 'Thu', img: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80', status: 'Online' },
  ];

  const myPostsList = posts.filter(p => p.isMe);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Toast Notification */}
      {encouragedToast && (
        <View style={styles.toastBox}>
          <Text style={styles.toastText}>{encouragedToast}</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={[styles.header, { width: width * 0.92 }]}>
          <View>
            <Text style={styles.title}>FRIENDS</Text>
            <Text style={styles.subtitle}>Stay motivated together.</Text>
          </View>
          <TouchableOpacity
            style={styles.plusBtn}
            activeOpacity={0.8}
            onPress={() => router.push('/create-post')}
          >
            <Feather name="plus" size={24} color="#FFF" />
          </TouchableOpacity>
        </View>

        {/* Tab Segment Controls: ALL | MY FRIENDS | REQUESTS | MY POSTS */}
        <View style={[styles.tabBarContainer, { width: width * 0.92 }]}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'ALL' && styles.tabBtnActive]}
            onPress={() => setActiveTab('ALL')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'ALL' && styles.tabBtnTextActive]}>
              ALL
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'MY_FRIENDS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('MY_FRIENDS')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'MY_FRIENDS' && styles.tabBtnTextActive]}>
              MY FRIENDS
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'REQUESTS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('REQUESTS')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.tabBtnText, activeTab === 'REQUESTS' && styles.tabBtnTextActive]}>
                REQUESTS
              </Text>
              {pendingRequests.length > 0 && (
                <View style={styles.requestsBadge}>
                  <Text style={styles.requestsBadgeText}>{pendingRequests.length}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'MY_POSTS' && styles.tabBtnActive]}
            onPress={() => setActiveTab('MY_POSTS')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'MY_POSTS' && styles.tabBtnTextActive]}>
              MY POSTS
            </Text>
          </TouchableOpacity>
        </View>

        {/* ─── TAB 1: ALL (FEED & REQUESTS SUMMARY) ─── */}
        {activeTab === 'ALL' && (
          <View style={{ width: width * 0.92 }}>
            
            {/* Pending Requests Preview */}
            {pendingRequests.length > 0 && (
              <View style={styles.previewRequestsCard}>
                <View style={styles.sectionHeaderRow}>
                  <Text style={styles.sectionHeaderTitle}>FRIEND REQUESTS</Text>
                  <TouchableOpacity onPress={() => setActiveTab('REQUESTS')}>
                    <Text style={styles.viewAllLink}>View all &gt;</Text>
                  </TouchableOpacity>
                </View>

                {pendingRequests.map(req => (
                  <View key={req.id} style={styles.requestItemRow}>
                    <Image source={{ uri: req.avatar }} style={styles.avatarImg} />
                    <View style={styles.reqInfoCol}>
                      <Text style={styles.reqName}>{req.name}</Text>
                      <View style={styles.levelRankRow}>
                        <MaterialCommunityIcons name="shield-outline" size={12} color="#64748B" style={{ marginRight: 2 }} />
                        <Text style={styles.levelRankText}>Level {req.level} • {req.rank}</Text>
                      </View>
                    </View>
                    <View style={styles.reqActionsRow}>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleAcceptRequest(req.id)}
                      >
                        <Text style={styles.acceptBtnText}>ACCEPT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineBtn}
                        onPress={() => handleDeclineRequest(req.id)}
                      >
                        <Text style={styles.declineBtnText}>DECLINE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Posts Feed */}
            {posts.map(post => (
              <View key={post.id} style={styles.postCard}>
                {/* Author Info */}
                <View style={styles.postHeader}>
                  <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={styles.postAuthorName}>{post.author}</Text>
                      <View style={styles.postLevelBadge}>
                        <Text style={styles.postLevelBadgeText}>Lv. {post.level}</Text>
                      </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                      <Text style={styles.postTimeText}>{post.time} • </Text>
                      <Ionicons name="globe-outline" size={12} color="#94A3B8" />
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Feather name="more-horizontal" size={20} color="#94A3B8" />
                  </TouchableOpacity>
                </View>

                {/* Post Content Banner / Achievement Box */}
                <View style={styles.achievementBox}>
                  {post.type === 'streak' && (
                    <View style={styles.streakBadgeBox}>
                      <MaterialCommunityIcons name="fire" size={28} color="#F97316" />
                      <Text style={styles.streakBadgeNumber}>{post.streakNumber}</Text>
                    </View>
                  )}
                  {post.type === 'levelup' && (
                    <View style={styles.levelUpBadgeBox}>
                      <MaterialCommunityIcons name="arrow-up-bold" size={28} color="#FFF" />
                    </View>
                  )}
                  {post.type === 'achievement' && (
                    <View style={styles.trophyBadgeBox}>
                      <Ionicons name="trophy" size={28} color="#F59E0B" />
                    </View>
                  )}
                  
                  <View style={styles.achievementTextCol}>
                    <Text style={styles.achievementTitle}>{post.title}</Text>
                    <Text style={styles.achievementSubtitle}>{post.subtitle}</Text>
                    <View style={styles.tagsRow}>
                      {post.tags.map((t, idx) => (
                        <Text key={idx} style={styles.tagText}>{t} </Text>
                      ))}
                    </View>
                  </View>
                </View>

                {/* Reaction Summary Counts & Comments Trigger */}
                <View style={styles.reactionSummaryRow}>
                  <TouchableOpacity
                    style={styles.reactionIconsCluster}
                    onPress={() => handleToggleReaction(post.id)}
                  >
                    <Text style={{ fontSize: 13 }}>💜 👏 🚀</Text>
                    <Text style={styles.reactionCountText}>{post.reactionsCount}</Text>
                  </TouchableOpacity>

                  {/* Clickable Comments counter opening Comments modal */}
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleOpenComments(post)}
                  >
                    <Text style={styles.commentsCountText}>{post.commentsCount} comments</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.postDivider} />

                {/* Post Action Buttons */}
                <View style={styles.postActionsRow}>
                  <TouchableOpacity
                    style={styles.postActionBtn}
                    onPress={() => handleToggleReaction(post.id)}
                  >
                    <Ionicons
                      name={post.reacted ? 'heart' : 'heart-outline'}
                      size={18}
                      color={post.reacted ? '#7F45FF' : '#64748B'}
                    />
                    <Text style={[styles.postActionText, post.reacted && { color: '#7F45FF', fontWeight: '800' }]}>
                      React
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.postActionBtn}
                    onPress={() => handleOpenComments(post)}
                  >
                    <Ionicons name="chatbubble-outline" size={17} color="#64748B" />
                    <Text style={styles.postActionText}>Comment</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.postActionBtn}
                    onPress={() => handleEncourage(post.author)}
                  >
                    <Feather name="share-2" size={17} color="#64748B" />
                    <Text style={styles.postActionText}>Encourage</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

          </View>
        )}

        {/* ─── TAB 2: MY FRIENDS (ACTIVE STORIES & CHAT LIST) ─── */}
        {activeTab === 'MY_FRIENDS' && (
          <View style={{ width: width * 0.92 }}>
            {/* Search Bar */}
            <View style={styles.searchBarRow}>
              <View style={styles.searchInputBox}>
                <Feather name="search" size={18} color="#94A3B8" style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Search friends..."
                  placeholderTextColor="#94A3B8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={styles.searchInput}
                />
              </View>
              <TouchableOpacity style={styles.filterBtn}>
                <Ionicons name="options-outline" size={20} color="#0E0F19" />
              </TouchableOpacity>
            </View>

            {/* Active Friends / Stories Carousel */}
            <View style={styles.myFriendsSection}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeaderTitle}>MY FRIENDS</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.onlineLabel}>Online </Text>
                  <View style={styles.onlineDot} />
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesContainer}
              >
                {/* Add Friend Button */}
                <TouchableOpacity
                  style={styles.storyItem}
                  onPress={() => setActiveTab('REQUESTS')}
                >
                  <View style={styles.addFriendCircle}>
                    <Feather name="plus" size={22} color="#7F45FF" />
                  </View>
                  <Text style={styles.storyName}>Add Friend</Text>
                </TouchableOpacity>

                {/* Friends Avatars */}
                {[
                  { name: 'Priya', lv: 19, img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Saurav', lv: 17, img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Maya', lv: 31, img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Alex', lv: 24, img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' },
                  { name: 'Anjali', lv: 16, img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80' },
                ].map((f, i) => (
                  <TouchableOpacity
                    key={i}
                    style={styles.storyItem}
                    activeOpacity={0.7}
                    onPress={() => openChatWithUser(f.name, f.img, `Level ${f.lv} • Active now`)}
                  >
                    <View style={styles.storyAvatarWrapper}>
                      <Image source={{ uri: f.img }} style={styles.storyAvatarImg} />
                      <View style={styles.storyOnlineDot} />
                    </View>
                    <Text style={styles.storyName}>{f.name}</Text>
                    <Text style={styles.storyLevel}>Lv. {f.lv}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Direct Message Conversations List */}
            <View style={styles.chatListContainer}>
              {myFriendsList
                .filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((chat, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={styles.chatRowItem}
                    activeOpacity={0.7}
                    onPress={() => openChatWithUser(chat.name, chat.img, chat.status)}
                  >
                    <Image source={{ uri: chat.img }} style={styles.chatAvatar} />
                    <View style={styles.chatInfoCol}>
                      <Text style={styles.chatName}>{chat.name}</Text>
                      <Text style={styles.chatLastMsg} numberOfLines={1}>{chat.msg}</Text>
                    </View>
                    <Text style={styles.chatTimeText}>{chat.time}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>
        )}

        {/* ─── TAB 3: REQUESTS (PENDING, SENT, SUGGESTIONS) ─── */}
        {activeTab === 'REQUESTS' && (
          <View style={{ width: width * 0.92 }}>
            
            {/* Top Illustration Banner */}
            <View style={styles.requestsBanner}>
              <View style={styles.requestsBannerIconCircle}>
                <Ionicons name="person-add-outline" size={24} color="#7F45FF" />
              </View>
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.requestsBannerTitle}>Friend requests</Text>
                <Text style={styles.requestsBannerSub}>Review and accept or decline friend requests.</Text>
              </View>
              <Ionicons name="mail-unread-outline" size={32} color="#C4B5FD" style={{ marginLeft: 8 }} />
            </View>

            {/* Pending Requests Section */}
            <View style={styles.requestsSectionCard}>
              <Text style={styles.sectionHeaderTitle}>PENDING REQUESTS</Text>
              {pendingRequests.length === 0 ? (
                <Text style={styles.emptyText}>No pending requests right now.</Text>
              ) : (
                pendingRequests.map(req => (
                  <View key={req.id} style={styles.requestItemRow}>
                    <Image source={{ uri: req.avatar }} style={styles.avatarImg} />
                    <View style={styles.reqInfoCol}>
                      <Text style={styles.reqName}>{req.name}</Text>
                      <View style={styles.levelRankRow}>
                        <MaterialCommunityIcons name="shield-outline" size={12} color="#64748B" style={{ marginRight: 2 }} />
                        <Text style={styles.levelRankText}>Level {req.level} • {req.rank}</Text>
                      </View>
                    </View>
                    <View style={styles.reqActionsRow}>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleAcceptRequest(req.id)}
                      >
                        <Text style={styles.acceptBtnText}>ACCEPT</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.declineBtn}
                        onPress={() => handleDeclineRequest(req.id)}
                      >
                        <Text style={styles.declineBtnText}>DECLINE</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>

            {/* Sent Requests Section */}
            <View style={styles.requestsSectionCard}>
              <Text style={styles.sectionHeaderTitle}>SENT REQUESTS</Text>
              <View style={styles.emptySentContainer}>
                <View style={styles.emptyIconCircle}>
                  <Ionicons name="time-outline" size={28} color="#7F45FF" />
                </View>
                <Text style={styles.emptySentTitle}>No pending sent requests.</Text>
                <Text style={styles.emptySentSub}>Requests you send will appear here.</Text>
              </View>
            </View>

            {/* People You May Know Section */}
            <View style={styles.requestsSectionCard}>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionHeaderTitle}>PEOPLE YOU MAY KNOW</Text>
                <TouchableOpacity>
                  <Text style={styles.viewAllLink}>View all</Text>
                </TouchableOpacity>
              </View>

              {suggestions.map(s => (
                <View key={s.id} style={styles.requestItemRow}>
                  <Image source={{ uri: s.avatar }} style={styles.avatarImg} />
                  <View style={styles.reqInfoCol}>
                    <Text style={styles.reqName}>{s.name}</Text>
                    <View style={styles.levelRankRow}>
                      <MaterialCommunityIcons name="shield-outline" size={12} color="#64748B" style={{ marginRight: 2 }} />
                      <Text style={styles.levelRankText}>Level {s.level} • {s.rank}</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[styles.addFriendBtn, s.added && styles.addFriendBtnDone]}
                    onPress={() => handleAddFriend(s.id)}
                    disabled={s.added}
                  >
                    <Ionicons
                      name={s.added ? 'checkmark' : 'person-add-outline'}
                      size={14}
                      color={s.added ? '#16A34A' : '#7F45FF'}
                      style={{ marginRight: 4 }}
                    />
                    <Text style={[styles.addFriendBtnText, s.added && { color: '#16A34A' }]}>
                      {s.added ? 'ADDED' : 'ADD FRIEND'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>

          </View>
        )}

        {/* ─── TAB 4: MY POSTS (USER'S PERSONAL SHARED POSTS) ─── */}
        {activeTab === 'MY_POSTS' && (
          <View style={{ width: width * 0.92 }}>
            
            {/* User Profile Stats Header */}
            <View style={styles.myPostsHeaderCard}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }}
                style={styles.myPostProfileAvatar}
              />
              <View style={{ flex: 1, marginLeft: 14 }}>
                <Text style={styles.myPostProfileName}>Rupesh</Text>
                <Text style={styles.myPostProfileLevel}>Level 18 • Bronze II</Text>
              </View>
              <TouchableOpacity
                style={styles.newPostMiniBtn}
                onPress={() => router.push('/create-post')}
              >
                <Feather name="edit-3" size={14} color="#7F45FF" style={{ marginRight: 4 }} />
                <Text style={styles.newPostMiniText}>New Post</Text>
              </TouchableOpacity>
            </View>

            {myPostsList.length === 0 ? (
              <View style={styles.emptyMyPostsCard}>
                <Ionicons name="document-text-outline" size={48} color="#C4B5FD" />
                <Text style={styles.emptyMyPostsTitle}>No posts shared yet</Text>
                <Text style={styles.emptyMyPostsSub}>Share your daily achievements and streak milestones with your friends.</Text>
                <TouchableOpacity
                  style={styles.createFirstPostBtn}
                  onPress={() => router.push('/create-post')}
                >
                  <Text style={styles.createFirstPostText}>Create Post</Text>
                </TouchableOpacity>
              </View>
            ) : (
              myPostsList.map(post => (
                <View key={post.id} style={styles.postCard}>
                  {/* Post Header */}
                  <View style={styles.postHeader}>
                    <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.postAuthorName}>{post.author} (You)</Text>
                        <View style={styles.postLevelBadge}>
                          <Text style={styles.postLevelBadgeText}>Lv. {post.level}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                        <Text style={styles.postTimeText}>{post.time} • </Text>
                        <Ionicons name="globe-outline" size={12} color="#94A3B8" />
                      </View>
                    </View>
                    <TouchableOpacity>
                      <Feather name="more-horizontal" size={20} color="#94A3B8" />
                    </TouchableOpacity>
                  </View>

                  {/* Achievement Box */}
                  <View style={styles.achievementBox}>
                    {post.type === 'streak' && (
                      <View style={styles.streakBadgeBox}>
                        <MaterialCommunityIcons name="fire" size={28} color="#F97316" />
                        <Text style={styles.streakBadgeNumber}>{post.streakNumber}</Text>
                      </View>
                    )}
                    <View style={styles.achievementTextCol}>
                      <Text style={styles.achievementTitle}>{post.title}</Text>
                      <Text style={styles.achievementSubtitle}>{post.subtitle}</Text>
                      <View style={styles.tagsRow}>
                        {post.tags.map((t, idx) => (
                          <Text key={idx} style={styles.tagText}>{t} </Text>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Reaction Summary & Comments Trigger */}
                  <View style={styles.reactionSummaryRow}>
                    <View style={styles.reactionIconsCluster}>
                      <Text style={{ fontSize: 13 }}>💜 👏 🚀</Text>
                      <Text style={styles.reactionCountText}>{post.reactionsCount}</Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleOpenComments(post)}
                    >
                      <Text style={styles.commentsCountText}>{post.commentsCount} comments</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.postDivider} />

                  {/* Action Buttons */}
                  <View style={styles.postActionsRow}>
                    <TouchableOpacity
                      style={styles.postActionBtn}
                      onPress={() => handleToggleReaction(post.id)}
                    >
                      <Ionicons
                        name={post.reacted ? 'heart' : 'heart-outline'}
                        size={18}
                        color={post.reacted ? '#7F45FF' : '#64748B'}
                      />
                      <Text style={[styles.postActionText, post.reacted && { color: '#7F45FF', fontWeight: '800' }]}>
                        React
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.postActionBtn}
                      onPress={() => handleOpenComments(post)}
                    >
                      <Ionicons name="chatbubble-outline" size={17} color="#64748B" />
                      <Text style={styles.postActionText}>Comment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.postActionBtn}
                      onPress={() => handleEncourage(post.author)}
                    >
                      <Feather name="share-2" size={17} color="#64748B" />
                      <Text style={styles.postActionText}>Encourage</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        )}

      </ScrollView>

      {/* ─── INTERACTIVE COMMENTS MODAL / BOTTOM SHEET ─── */}
      <Modal
        visible={selectedPostForComments !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedPostForComments(null)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setSelectedPostForComments(null)}
          />

          <View style={[styles.commentsModalContent, { maxHeight: height * 0.75 }]}>
            {/* Modal Drag Bar & Header */}
            <View style={styles.dragHandle} />
            <View style={styles.commentsModalHeader}>
              <Text style={styles.commentsModalTitle}>
                Comments ({selectedPostForComments?.commentsCount || 0})
              </Text>
              <TouchableOpacity
                style={styles.modalCloseBtn}
                onPress={() => setSelectedPostForComments(null)}
              >
                <Feather name="x" size={20} color="#0E0F19" />
              </TouchableOpacity>
            </View>

            {/* Comments List */}
            <ScrollView
              style={styles.commentsListScroll}
              showsVerticalScrollIndicator={false}
            >
              {selectedPostForComments?.comments && selectedPostForComments.comments.length > 0 ? (
                selectedPostForComments.comments.map(c => (
                  <View key={c.id} style={styles.commentRow}>
                    <Image source={{ uri: c.avatar }} style={styles.commentAvatar} />
                    <View style={styles.commentBubble}>
                      <View style={styles.commentAuthorRow}>
                        <Text style={styles.commentAuthorName}>{c.author}</Text>
                        <Text style={styles.commentTime}>{c.time}</Text>
                      </View>
                      <Text style={styles.commentBodyText}>{c.text}</Text>
                    </View>
                    <TouchableOpacity style={styles.commentLikeBtn}>
                      <Ionicons name="heart-outline" size={14} color="#94A3B8" />
                      {c.likes > 0 && <Text style={styles.commentLikesText}>{c.likes}</Text>}
                    </TouchableOpacity>
                  </View>
                ))
              ) : (
                <View style={styles.noCommentsBox}>
                  <Ionicons name="chatbubbles-outline" size={36} color="#CBD5E1" />
                  <Text style={styles.noCommentsText}>No comments yet. Be the first to cheer!</Text>
                </View>
              )}
            </ScrollView>

            {/* Add Comment Input Bar */}
            <View style={styles.addCommentInputBar}>
              <Image
                source={{ uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80' }}
                style={styles.inputAvatar}
              />
              <TextInput
                placeholder="Add a comment for Rupesh..."
                placeholderTextColor="#94A3B8"
                value={newCommentText}
                onChangeText={setNewCommentText}
                style={styles.commentTextInput}
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendCommentBtn,
                  newCommentText.trim().length > 0 && styles.sendCommentBtnActive,
                ]}
                onPress={handleAddComment}
                disabled={!newCommentText.trim()}
              >
                <Ionicons name="arrow-up" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

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
    paddingTop: 10,
    paddingBottom: 40,
  },

  // Toast
  toastBox: {
    position: 'absolute',
    top: 50,
    alignSelf: 'center',
    zIndex: 999,
    backgroundColor: '#1E1B4B',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  toastText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#0E0F19',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    marginTop: 2,
  },
  plusBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7F45FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },

  // Tab Controls
  tabBarContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBtnActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#7F45FF',
  },
  tabBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.3,
  },
  tabBtnTextActive: {
    color: '#7F45FF',
    fontWeight: '800',
  },
  requestsBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#7F45FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  requestsBadgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#FFF',
  },

  // Friend Requests Card / Previews
  previewRequestsCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0E0F19',
    letterSpacing: 0.5,
  },
  viewAllLink: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7F45FF',
  },
  requestItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  avatarImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E2E8F0',
  },
  reqInfoCol: {
    flex: 1,
    marginLeft: 12,
  },
  reqName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
  },
  levelRankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  levelRankText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#64748B',
  },
  reqActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  acceptBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F45FF',
    backgroundColor: '#FAF5FF',
  },
  acceptBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F45FF',
  },
  declineBtn: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFF',
  },
  declineBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },

  // Post Card
  postCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E2E8F0',
  },
  postAuthorName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
  },
  postLevelBadge: {
    backgroundColor: '#EDE9FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 6,
  },
  postLevelBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F45FF',
  },
  postTimeText: {
    fontSize: 11,
    color: '#94A3B8',
  },

  // Achievement Card
  achievementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9FF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#F3E8FF',
    marginBottom: 12,
  },
  streakBadgeBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FED7AA',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  streakBadgeNumber: {
    fontSize: 14,
    fontWeight: '900',
    color: '#7F45FF',
    marginTop: -2,
  },
  levelUpBadgeBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyBadgeBox: {
    width: 54,
    height: 54,
    borderRadius: 14,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementTextCol: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
  },
  achievementSubtitle: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7F45FF',
  },

  // Reactions Row
  reactionSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  reactionIconsCluster: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reactionCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748B',
    marginLeft: 4,
  },
  commentsCountText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#64748B',
  },
  postDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginBottom: 8,
  },
  postActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  postActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  postActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },

  // My Friends Tab Styles
  searchBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  searchInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 44,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0E0F19',
  },
  filterBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  myFriendsSection: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  onlineLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#16A34A',
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#16A34A',
  },
  storiesContainer: {
    flexDirection: 'row',
    gap: 14,
    paddingVertical: 8,
  },
  storyItem: {
    alignItems: 'center',
    width: 60,
  },
  addFriendCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: '#C4B5FD',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  storyAvatarWrapper: {
    position: 'relative',
    marginBottom: 6,
  },
  storyAvatarImg: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E2E8F0',
  },
  storyOnlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#22C55E',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  storyName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0E0F19',
    textAlign: 'center',
  },
  storyLevel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#94A3B8',
  },
  chatListContainer: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  chatRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E2E8F0',
  },
  chatInfoCol: {
    flex: 1,
    marginLeft: 12,
  },
  chatName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
  },
  chatLastMsg: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  chatTimeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#94A3B8',
  },

  // Requests Tab Styles
  requestsBanner: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EDE9FF',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requestsBannerIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#EDE9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestsBannerTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0E0F19',
  },
  requestsBannerSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  requestsSectionCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
    paddingVertical: 16,
  },
  emptySentContainer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  emptyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FAF5FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emptySentTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0E0F19',
    marginBottom: 2,
  },
  emptySentSub: {
    fontSize: 11,
    color: '#94A3B8',
  },
  addFriendBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F45FF',
    backgroundColor: '#FAF5FF',
  },
  addFriendBtnDone: {
    borderColor: '#DCFCE7',
    backgroundColor: '#F0FDF4',
  },
  addFriendBtnText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#7F45FF',
  },

  // My Posts Tab Styles
  myPostsHeaderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    marginBottom: 16,
  },
  myPostProfileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#C4B5FD',
  },
  myPostProfileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E0F19',
  },
  myPostProfileLevel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  newPostMiniBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5FF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EDE9FF',
  },
  newPostMiniText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#7F45FF',
  },
  emptyMyPostsCard: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  emptyMyPostsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0E0F19',
    marginTop: 12,
    marginBottom: 6,
  },
  emptyMyPostsSub: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  createFirstPostBtn: {
    backgroundColor: '#7F45FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  createFirstPostText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFF',
  },

  // Modal / Comments Sheet Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  modalBackdrop: {
    flex: 1,
  },
  commentsModalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 10,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E2E8F0',
    alignSelf: 'center',
    marginVertical: 6,
  },
  commentsModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  commentsModalTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0E0F19',
  },
  modalCloseBtn: {
    padding: 4,
  },
  commentsListScroll: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E2E8F0',
    marginTop: 2,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 10,
    marginRight: 8,
  },
  commentAuthorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthorName: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0E0F19',
  },
  commentTime: {
    fontSize: 10,
    color: '#94A3B8',
  },
  commentBodyText: {
    fontSize: 13,
    color: '#334155',
    lineHeight: 18,
  },
  commentLikeBtn: {
    alignItems: 'center',
    paddingTop: 8,
  },
  commentLikesText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 2,
  },
  noCommentsBox: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  noCommentsText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 8,
  },
  addCommentInputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    backgroundColor: '#FFF',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  commentTextInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginHorizontal: 10,
    fontSize: 13,
    color: '#0E0F19',
    maxHeight: 80,
  },
  sendCommentBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendCommentBtnActive: {
    backgroundColor: '#7F45FF',
  },
});
