import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateMomentScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-2xl font-bold text-text">New Moment</Text>
        <Text className="text-base text-text-muted mt-2 text-center">
          Capture a new moment
        </Text>
      </View>
    </SafeAreaView>
  );
}
