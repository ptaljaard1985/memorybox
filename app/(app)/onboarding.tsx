import { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/providers/AuthProvider";
import { useCreateFamily } from "@/src/hooks/useFamily";
import { useCreateChild } from "@/src/hooks/useChildren";
import { supabase } from "@/src/lib/supabase";

type Step = "welcome" | "family" | "child" | "done";

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const createFamily = useCreateFamily();
  const createChild = useCreateChild();

  const [step, setStep] = useState<Step>("welcome");
  const [familyName, setFamilyName] = useState("");
  const [childName, setChildName] = useState("");
  const [isExpecting, setIsExpecting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleComplete = async () => {
    if (!childName.trim()) {
      Alert.alert("Error", "Please enter your child's name");
      return;
    }
    if (!user) return;

    setLoading(true);
    try {
      // Create family
      const family = await createFamily.mutateAsync(familyName.trim());

      // Create first child
      await createChild.mutateAsync({
        user_id: user.id,
        family_id: family.id,
        name: childName.trim(),
        status: isExpecting ? "expecting" : "born",
        date_of_birth: isExpecting
          ? null
          : dateOfBirth.toISOString().split("T")[0],
        expected_due_date: isExpecting
          ? dueDate.toISOString().split("T")[0]
          : null,
      });

      // Mark onboarding complete
      await supabase
        .from("users")
        .update({ onboarding_completed: true })
        .eq("id", user.id);

      await refreshProfile();
      setStep("done");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  if (step === "welcome") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-8">
          <Text className="text-4xl font-bold text-text text-center">
            Welcome to{"\n"}MemoryBox
          </Text>
          <Text className="text-lg text-text-muted text-center mt-4 leading-relaxed">
            A safe place to capture and preserve your children's most meaningful
            moments — from first steps to first days of school.
          </Text>
          <View className="mt-10">
            <Button
              title="Get Started"
              onPress={() => setStep("family")}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (step === "family") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center px-8">
          <Text className="text-3xl font-bold text-text text-center">
            Your Family
          </Text>
          <Text className="text-base text-text-muted text-center mt-2">
            What's your family name?
          </Text>
          <View className="mt-8">
            <Input
              placeholder="e.g. Taljaard"
              value={familyName}
              onChangeText={setFamilyName}
              autoFocus
            />
          </View>
          <View className="mt-6">
            <Button
              title="Next"
              onPress={() => {
                if (!familyName.trim()) {
                  Alert.alert("Error", "Please enter your family name");
                  return;
                }
                setStep("child");
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (step === "child") {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView
          contentContainerClassName="flex-1 justify-center px-8"
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-3xl font-bold text-text text-center">
            Your First Child
          </Text>
          <Text className="text-base text-text-muted text-center mt-2">
            Add your child to start capturing moments
          </Text>

          <View className="mt-8 gap-5">
            <Input
              label="Name"
              placeholder="Your child's name"
              value={childName}
              onChangeText={setChildName}
              autoFocus
            />

            <View className="flex-row items-center justify-between py-2">
              <Text className="text-base text-text">Still expecting?</Text>
              <Switch
                value={isExpecting}
                onValueChange={setIsExpecting}
                trackColor={{ true: "#4A90D9" }}
              />
            </View>

            <View>
              <Text className="text-sm font-medium text-text mb-1">
                {isExpecting ? "Due Date" : "Date of Birth"}
              </Text>
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="bg-surface border border-border rounded-xl px-4 py-3"
              >
                <Text className="text-base text-text">
                  {(isExpecting ? dueDate : dateOfBirth).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={isExpecting ? dueDate : dateOfBirth}
                  mode="date"
                  onChange={(_, date) => {
                    setShowDatePicker(false);
                    if (date) {
                      isExpecting ? setDueDate(date) : setDateOfBirth(date);
                    }
                  }}
                />
              )}
            </View>

            <Button
              title="Complete Setup"
              onPress={handleComplete}
              loading={loading}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // step === "done"
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center px-8">
        <Text className="text-4xl font-bold text-text text-center">
          You're all set!
        </Text>
        <Text className="text-lg text-text-muted text-center mt-4 leading-relaxed">
          Start capturing moments for {childName}. Every memory matters.
        </Text>
        <View className="mt-10">
          <Button
            title="Start Capturing Moments"
            onPress={() => router.replace("/(app)")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
