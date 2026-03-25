import { Tabs } from "expo-router";
import { TabBar } from "@/src/components/ui/TabBar";

export default function AppLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="explore" options={{ title: "Explore" }} />
      <Tabs.Screen
        name="create"
        options={{
          title: "Add",
          // Present as modal when tapped
        }}
      />
      <Tabs.Screen name="inbox" options={{ title: "Inbox" }} />
      <Tabs.Screen name="profile/index" options={{ title: "Profile" }} />

      {/* Hidden routes — accessible via navigation but not shown as tabs */}
      <Tabs.Screen
        name="onboarding"
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="profile/family"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="profile/children/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="profile/children/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="profile/people/index"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="profile/people/[id]"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="moment/[id]"
        options={{ href: null }}
      />
    </Tabs>
  );
}
