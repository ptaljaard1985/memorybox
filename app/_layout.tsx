import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";
import "../global.css";

import { AuthProvider, useAuth } from "@/src/providers/AuthProvider";
import { QueryProvider } from "@/src/providers/QueryProvider";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const { session, profile, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    SplashScreen.hideAsync();

    const inAuthGroup = segments[0] === "(auth)";

    if (!session) {
      if (!inAuthGroup) {
        router.replace("/(auth)/sign-in");
      }
    } else if (inAuthGroup) {
      if (profile && !profile.onboarding_completed) {
        router.replace("/(app)/onboarding");
      } else {
        router.replace("/(app)");
      }
    }
  }, [session, loading, profile?.onboarding_completed]);

  if (loading) return null;

  return <Slot />;
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <RootLayoutNav />
      </AuthProvider>
    </QueryProvider>
  );
}
