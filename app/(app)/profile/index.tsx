import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/src/providers/AuthProvider";
import { colors } from "@/src/theme/colors";

type SettingsItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
};

function SettingsItem({ icon, label, onPress, danger }: SettingsItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center py-4 px-4 bg-surface border-b border-border"
    >
      <Ionicons
        name={icon}
        size={22}
        color={danger ? colors.error : colors.text.DEFAULT}
      />
      <Text
        className={`flex-1 ml-3 text-base ${
          danger ? "text-error" : "text-text"
        }`}
      >
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={20} color={colors.border} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const { profile, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: signOut },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-text">Settings</Text>
        {profile?.display_name && (
          <Text className="text-base text-text-muted mt-1">
            {profile.display_name}
          </Text>
        )}
      </View>

      <View className="mt-2">
        <Text className="text-xs font-semibold text-text-muted uppercase px-4 mb-2">
          Family
        </Text>
        <SettingsItem
          icon="people-outline"
          label="Family Name"
          onPress={() => router.push("/(app)/profile/family")}
        />
        <SettingsItem
          icon="heart-outline"
          label="Children"
          onPress={() => router.push("/(app)/profile/children")}
        />
        <SettingsItem
          icon="person-add-outline"
          label="People"
          onPress={() => router.push("/(app)/profile/people")}
        />
      </View>

      <View className="mt-6">
        <Text className="text-xs font-semibold text-text-muted uppercase px-4 mb-2">
          Account
        </Text>
        <SettingsItem
          icon="diamond-outline"
          label="Subscription"
          onPress={() => {}}
        />
        <SettingsItem
          icon="notifications-outline"
          label="Notifications"
          onPress={() => {}}
        />
      </View>

      <View className="mt-6">
        <SettingsItem
          icon="log-out-outline"
          label="Sign Out"
          onPress={handleSignOut}
          danger
        />
      </View>
    </SafeAreaView>
  );
}
