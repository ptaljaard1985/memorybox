import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/src/components/ui/Header";
import { Avatar } from "@/src/components/ui/Avatar";
import { EmptyState } from "@/src/components/ui/EmptyState";
import { usePeople } from "@/src/hooks/usePeople";
import { colors } from "@/src/theme/colors";
import type { Person } from "@/src/api/people";

export default function PeopleListScreen() {
  const router = useRouter();
  const { data: people, isLoading } = usePeople();

  const renderPerson = ({ item }: { item: Person }) => (
    <TouchableOpacity
      onPress={() => router.push(`/(app)/profile/people/${item.id}`)}
      className="flex-row items-center py-3 px-4 bg-surface border-b border-border"
    >
      <Avatar uri={item.avatar_url} name={item.name} size="md" />
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium text-text">{item.name}</Text>
        {item.relationship && (
          <Text className="text-sm text-text-muted">{item.relationship}</Text>
        )}
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.border} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header
        title="People"
        rightAction={{
          icon: "add",
          onPress: () => router.push("/(app)/profile/people/new"),
        }}
      />
      {!isLoading && (!people || people.length === 0) ? (
        <EmptyState
          title="No People Yet"
          description="Add family members, friends, or teachers to tag them in moments."
          actionLabel="Add Person"
          onAction={() => router.push("/(app)/profile/people/new")}
        />
      ) : (
        <FlatList
          data={people}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}
