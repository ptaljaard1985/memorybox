import { useState, useEffect } from "react";
import { View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "@/src/components/ui/Header";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import { useFamily, useUpdateFamily } from "@/src/hooks/useFamily";

export default function FamilyScreen() {
  const router = useRouter();
  const { data: family } = useFamily();
  const updateFamily = useUpdateFamily();
  const [name, setName] = useState("");

  useEffect(() => {
    if (family) setName(family.name);
  }, [family]);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Family name is required");
      return;
    }
    if (!family) return;

    updateFamily.mutate(
      { familyId: family.id, name: name.trim() },
      {
        onSuccess: () => router.back(),
        onError: (err) => Alert.alert("Error", err.message),
      }
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title="Family Name" />
      <View className="px-4 mt-4 gap-6">
        <Input
          label="Family Name"
          placeholder="e.g. Taljaard"
          value={name}
          onChangeText={setName}
          autoFocus
        />
        <Button
          title="Save"
          onPress={handleSave}
          loading={updateFamily.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
