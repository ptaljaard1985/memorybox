import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { Avatar } from "./Avatar";
import type { Child } from "@/src/api/children";

type ChildSelectorProps = {
  children: Child[];
  selectedId: string | null; // null = "All"
  onSelect: (childId: string | null) => void;
};

export function ChildSelector({
  children,
  selectedId,
  onSelect,
}: ChildSelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="py-3 px-4"
      contentContainerClassName="gap-3"
    >
      <TouchableOpacity
        onPress={() => onSelect(null)}
        className="items-center gap-1"
      >
        <View
          className={`w-12 h-12 rounded-full items-center justify-center ${
            selectedId === null
              ? "bg-primary"
              : "bg-surface border border-border"
          }`}
        >
          <Text
            className={`text-sm font-medium ${
              selectedId === null ? "text-white" : "text-text-muted"
            }`}
          >
            All
          </Text>
        </View>
        <Text className="text-xs text-text-muted">Family</Text>
      </TouchableOpacity>

      {children.map((child) => (
        <TouchableOpacity
          key={child.id}
          onPress={() => onSelect(child.id)}
          className="items-center gap-1"
        >
          <View
            className={`rounded-full ${
              selectedId === child.id
                ? "border-2 border-primary p-0.5"
                : "p-0.5"
            }`}
          >
            <Avatar uri={child.avatar_url} name={child.name} size="md" />
          </View>
          <Text className="text-xs text-text-muted" numberOfLines={1}>
            {child.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
