import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomeScreen" />
      <Stack.Screen name="SignIn" />
      <Stack.Screen name="Signup" />
      <Stack.Screen name="OTPScreen" />
    </Stack>
  );
}
