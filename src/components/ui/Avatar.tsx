import { View, Text, Image } from "react-native";

type AvatarSize = "sm" | "md" | "lg";

type AvatarProps = {
  uri?: string | null;
  name: string;
  size?: AvatarSize;
};

const sizeStyles: Record<AvatarSize, { container: string; text: string; dimension: number }> = {
  sm: { container: "w-8 h-8", text: "text-xs", dimension: 32 },
  md: { container: "w-12 h-12", text: "text-base", dimension: 48 },
  lg: { container: "w-20 h-20", text: "text-2xl", dimension: 80 },
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function Avatar({ uri, name, size = "md" }: AvatarProps) {
  const styles = sizeStyles[size];

  if (uri) {
    return (
      <Image
        source={{ uri }}
        className={`${styles.container} rounded-full`}
        style={{ width: styles.dimension, height: styles.dimension }}
      />
    );
  }

  return (
    <View
      className={`${styles.container} rounded-full bg-primary-light items-center justify-center`}
      style={{ width: styles.dimension, height: styles.dimension }}
    >
      <Text className={`${styles.text} font-semibold text-white`}>
        {getInitials(name)}
      </Text>
    </View>
  );
}
