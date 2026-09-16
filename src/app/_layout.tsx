import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(ProfileSetup)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add-habit/index" options={{ presentation: 'card' }} />
      <Stack.Screen name="create-post/index" options={{ presentation: 'modal' }} />
      <Stack.Screen name="chat/index" options={{ presentation: 'card' }} />
    </Stack>
  );
}
