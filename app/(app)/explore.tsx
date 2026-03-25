import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-text">Explore</Text>
        <Text className="text-base text-text-muted mt-2 text-center">
          Browse by category or person
        </Text>
      </View>
    </SafeAreaView>
  );
}
