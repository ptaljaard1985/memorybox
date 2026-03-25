import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/src/components/ui/Header";
import { Avatar } from "@/src/components/ui/Avatar";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { useChildren } from "@/src/hooks/useChildren";
import { colors } from "@/src/theme/colors";
import type { Child } from "@/src/api/children";

export default function ChildrenListScreen() {
  const router = useRouter();
  const { data: children, isLoading } = useChildren();

  const renderChild = ({ item }: { item: Child }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/profile/children/${item.id}`)}
      className="flex-row items-center py-3 px-4 bg-surface border-b border-border"
    >
      <Avatar uri={item.avatar_url} name={item.name} size="md" />
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-text">{item.name}</Text>
        <Text className="text-sm text-text-muted">
          {item.status === "expecting"
            ? `Due: ${item.expected_due_date ?? "Not set"}`
            : item.date_of_birth ?? ""}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.border} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="Children"
        rightAction={{
          icon: "add",
          onPress: () => router.push("/(app)/profile/children/new"),
        }}
      />
      {!isLoading && (!children || children.length === 0) ? (
        <EmptyState
          title="No Children Yet"
          description="Add your first child to start capturing moments."
          actionLabel="Add Child"
          onAction={() => router.push("/(app)/profile/children/new")}
        />
      ) : (
        <FlatList
          data={children}
          renderItem={renderChild}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
