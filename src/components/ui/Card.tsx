import { View, type ViewProps } from "react-native";

type CardProps = ViewProps & {
  className?: string;
};

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <View
      className={`bg-surface rounded-2xl p-4 border border-border ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}
