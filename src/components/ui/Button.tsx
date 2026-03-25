import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

const variantStyles: Record<ButtonVariant, { container: string; text: string }> =
  {
    primary: {
      container: "bg-primary",
      text: "text-white",
    },
    secondary: {
      container: "bg-surface border border-border",
      text: "text-text",
    },
    ghost: {
      container: "bg-transparent",
      text: "text-primary",
    },
    destructive: {
      container: "bg-error",
      text: "text-white",
    },
  };

export function Button({
  title,
  onPress,
  variant = "primary",
  loading = false,
  disabled = false,
  className = "",
}: ButtonProps) {
  const styles = variantStyles[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      className={`rounded-xl py-3.5 px-6 items-center ${styles.container} ${
        disabled ? "opacity-50" : ""
      } ${className}`}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "secondary" || variant === "ghost" ? "#4A90D9" : "#fff"}
        />
      ) : (
        <Text className={`font-semibold text-base ${styles.text}`}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
