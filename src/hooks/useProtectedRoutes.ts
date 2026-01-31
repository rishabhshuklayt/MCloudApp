import { useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export function useProtectedRoutes(isLoggedIn: boolean | null) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn === null) return; // Wait until we know the auth status

    const inAuthGroup = segments[0] === "(auth)";

    if (!isLoggedIn && !inAuthGroup) {
      // 1. No token + trying to access main app -> Redirect to Welcome
      router.replace("/(auth)/WelcomeScreen");
    } else if (isLoggedIn && inAuthGroup) {
      // 2. Has token + trying to access login screens -> Redirect to Home
      router.replace("/(main)/HomeScreen");
    }
  }, [isLoggedIn, segments]);
}
