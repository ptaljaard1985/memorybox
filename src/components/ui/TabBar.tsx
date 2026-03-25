import { View, TouchableOpacity, Text } from "react-native";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/src/theme/colors";

const TAB_CONFIG: Record<
  string,
  { label: string; icon: keyof typeof Ionicons.glyphMap; activeIcon: keyof typeof Ionicons.glyphMap }
> = {
  index: { label: "Home", icon: "home-outline", activeIcon: "home" },
  explore: { label: "Explore", icon: "grid-outline", activeIcon: "grid" },
  create: { label: "", icon: "add", activeIcon: "add" },
  inbox: { label: "Inbox", icon: "images-outline", activeIcon: "images" },
  "profile/index": {
    label: "Profile",
    icon: "person-outline",
    activeIcon: "person",
  },
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View className="flex-row bg-surface border-t border-border pb-6 pt-2 px-2">
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const config = TAB_CONFIG[route.name];
        const isCreateButton = route.name === "create";

        if (!config) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        if (isCreateButton) {
          return (
            <View key={route.key} className="flex-1 items-center">
              <TouchableOpacity
                onPress={onPress}
                className="bg-primary w-14 h-14 rounded-full items-center justify-center -mt-5 shadow-lg"
                style={{ elevation: 5 }}
              >
                <Ionicons name="add" size={28} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        }

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center py-1"
          >
            <Ionicons
              name={isFocused ? config.activeIcon : config.icon}
              size={24}
              color={isFocused ? colors.primary.DEFAULT : colors.text.muted}
            />
            <Text
              className={`text-xs mt-0.5 ${
                isFocused ? "text-primary font-medium" : "text-text-muted"
              }`}
            >
              {config.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
