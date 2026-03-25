import { View, Text } from "react-native";

type CategoryBadgeProps = {
  emoji: string;
  label: string;
  compact?: boolean;
};

export function CategoryBadge({
  emoji,
  label,
  compact = false,
}: CategoryBadgeProps) {
  if (compact) {
    return (
      <View className="flex-row items-center bg-background rounded-full px-2 py-0.5">
        <Text className="text-xs">{emoji}</Text>
      </View>
    );
  }

  return (
    <View className="flex-row items-center bg-background rounded-full px-3 py-1 gap-1">
      <Text className="text-sm">{emoji}</Text>
      <Text className="text-xs text-text-muted font-medium">{label}</Text>
    </View>
  );
}
