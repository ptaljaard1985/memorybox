import { useState, useEffect } from "react";
import { View, Alert, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Header } from "@/src/components/ui/Header";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import {
  usePeople,
  useCreatePerson,
  useUpdatePerson,
  useDeletePerson,
} from "@/src/hooks/usePeople";
import { useAuth } from "@/src/providers/AuthProvider";

export default function PersonFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === "new";
  const router = useRouter();
  const { user } = useAuth();
  const { data: people } = usePeople();
  const existingPerson = people?.find((p) => p.id === id);

  const createPerson = useCreatePerson();
  const updatePerson = useUpdatePerson();
  const deletePerson = useDeletePerson();

  const [name, setName] = useState("");
  const [relationship, setRelationship] = useState("");

  useEffect(() => {
    if (existingPerson) {
      setName(existingPerson.name);
      setRelationship(existingPerson.relationship ?? "");
    }
  }, [existingPerson]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    if (!user) return;

    if (isNew) {
      createPerson.mutate(
        {
          user_id: user.id,
          name: name.trim(),
          relationship: relationship.trim() || null,
        },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert("Error", err.message),
        }
      );
    } else {
      updatePerson.mutate(
        {
          personId: id,
          updates: {
            name: name.trim(),
            relationship: relationship.trim() || null,
          },
        },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert("Error", err.message),
        }
      );
    }
  };

  const handleDelete = () => {
    Alert.alert("Delete Person", `Remove ${name} from your people list?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          deletePerson.mutate(id, {
            onSuccess: () => router.back(),
            onError: (err) => Alert.alert("Error", err.message),
          });
        },
      },
    ]);
  };

  const isPending = createPerson.isPending || updatePerson.isPending;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={isNew ? "Add Person" : "Edit Person"} />
      <ScrollView className="flex-1 px-4 mt-4">
        <View className="gap-5">
          <Input
            label="Name"
            placeholder='e.g. "Grandma Rose"'
            value={name}
            onChangeText={setName}
            autoFocus={isNew}
          />
          <Input
            label="Relationship (optional)"
            placeholder='e.g. "Grandmother", "Teacher"'
            value={relationship}
            onChangeText={setRelationship}
          />
          <Button title="Save" onPress={handleSave} loading={isPending} />
          {!isNew && (
            <Button
              title="Delete Person"
              onPress={handleDelete}
              variant="destructive"
              loading={deletePerson.isPending}
              className="mt-4"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
