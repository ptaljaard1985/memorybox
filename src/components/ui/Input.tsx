import { View, Text, TextInput, type TextInputProps } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <View>
      {label && (
        <Text className="text-sm font-medium text-text mb-1">{label}</Text>
      )}
      <TextInput
        className={`bg-surface border rounded-xl px-4 py-3 text-base text-text ${
          error ? "border-error" : "border-border"
        } ${className}`}
        placeholderTextColor="#6B7280"
        {...props}
      />
      {error && (
        <Text className="text-xs text-error mt-1">{error}</Text>
      )}
    </View>
  );
}
