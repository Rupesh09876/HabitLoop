import { Tabs } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#7F45FF',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="insights/index"
        options={{
          title: 'Insights',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="season/index"
        options={{
          title: 'Season',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="friends/index"
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Feather name="users" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
      {/* Hide sub-routes from tab bar */}
      <Tabs.Screen
        name="home/achivement"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="insights/month"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="insights/year"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="profile/setting"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="season/leaderboard"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingBottom: 16,
    paddingTop: 10,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
  },
});
