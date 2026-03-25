import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Link } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!displayName || !email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }
    setLoading(true);
    const { error } = await signUp(email, password, displayName);
    setLoading(false);
    if (error) {
      Alert.alert("Sign Up Failed", error.message);
    } else {
      Alert.alert(
        "Check Your Email",
        "We've sent you a confirmation link. Please verify your email to continue."
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-background"
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-12">
          <Text className="text-4xl font-bold text-text text-center">
            Create Account
          </Text>
          <Text className="text-base text-text-muted text-center mt-2">
            Start preserving your family's moments
          </Text>
        </View>

        <View className="gap-4">
          <View>
            <Text className="text-sm font-medium text-text mb-1">
              Your Name
            </Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-text"
              placeholder="e.g. Pierre"
              placeholderTextColor="#6B7280"
              value={displayName}
              onChangeText={setDisplayName}
              autoComplete="name"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-text mb-1">Email</Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-text"
              placeholder="your@email.com"
              placeholderTextColor="#6B7280"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
          </View>

          <View>
            <Text className="text-sm font-medium text-text mb-1">
              Password
            </Text>
            <TextInput
              className="bg-surface border border-border rounded-xl px-4 py-3 text-base text-text"
              placeholder="At least 6 characters"
              placeholderTextColor="#6B7280"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
            />
          </View>

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 items-center mt-2"
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white font-semibold text-base">
                Create Account
              </Text>
            )}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-6">
          <Text className="text-text-muted">Already have an account? </Text>
          <Link href="/(auth)/sign-in" asChild>
            <TouchableOpacity>
              <Text className="text-primary font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
