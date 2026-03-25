import { View, Text } from "react-native";
import { Button } from "./Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center px-8 py-12">
      <Text className="text-xl font-bold text-text text-center">{title}</Text>
      <Text className="text-base text-text-muted text-center mt-2 leading-relaxed">
        {description}
      </Text>
      {actionLabel && onAction && (
        <View className="mt-6">
          <Button title={actionLabel} onPress={onAction} />
        </View>
      )}
    </View>
  );
}
