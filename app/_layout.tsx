// import { tokenStorage } from "@/src/lib/storage";
// import { Stack, useRouter } from "expo-router";
// import { useEffect, useState } from "react";
// import "../global.css";

// export default function RootLayout() {
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

//   useEffect(() => {
//     checkToken();
//   }, []);

//   const checkToken = async () => {
//     try {
//       const token = await tokenStorage.getToken();
//       console.log("Token from storage:", token);

//       if (token) {
//         setIsLoggedIn(true);
//         console.log("User is logged in, token found");
//         // Redirect to home/dashboard
//         router.replace("/(main)/HomeScreen");
//       } else {
//         setIsLoggedIn(false);
//         console.log("No token found, redirecting to auth");
//         // Redirect to welcome/auth screen
//         router.replace("/(auth)/WelcomeScreen");
//       }
//     } catch (error) {
//       console.error("Error checking token:", error);
//       setIsLoggedIn(false);
//       router.replace("/(auth)/WelcomeScreen");
//     }
//   };

//   // Show loading while checking token
//   if (isLoggedIn === null) {
//     return null; // or a loading screen if you prefer
//   }

//   return (
//     <Stack screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//       <Stack.Screen name="(main)" options={{ headerShown: false }} />
//     </Stack>
//   );
// }

import { AuthProvider, useAuth } from "@/context/AuthContext";
import { useProtectedRoutes } from "@/src/hooks/useProtectedRoutes";
import { Stack } from "expo-router";
import "../global.css";

function RootLayoutNav() {
  const { isLoggedIn } = useAuth();

  // This hook handles all the logic we discussed!
  useProtectedRoutes(isLoggedIn);

  if (isLoggedIn === null) return null; // Or a <LoadingSpinner />

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
