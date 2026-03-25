import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";

type HeaderProps = {
  title: string;
  showBack?: boolean;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
};

export function Header({ title, showBack = true, rightAction }: HeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 py-3">
      {showBack ? (
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons
            name="chevron-back"
            size={24}
            color={colors.text.DEFAULT}
          />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
      <Text className="text-lg font-semibold text-text">{title}</Text>
      {rightAction ? (
        <TouchableOpacity onPress={rightAction.onPress} className="p-1">
          <Ionicons
            name={rightAction.icon}
            size={24}
            color={colors.text.DEFAULT}
          />
        </TouchableOpacity>
      ) : (
        <View className="w-8" />
      )}
    </View>
  );
}
