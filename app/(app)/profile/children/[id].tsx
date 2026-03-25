import { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Header } from "@/src/components/ui/Header";
import { Input } from "@/src/components/ui/Input";
import { Button } from "@/src/components/ui/Button";
import {
  useChild,
  useCreateChild,
  useUpdateChild,
  useDeleteChild,
} from "@/src/hooks/useChildren";
import { useFamily } from "@/src/hooks/useFamily";
import { useAuth } from "@/src/providers/AuthProvider";

export default function ChildFormScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const isNew = id === "new";
  const router = useRouter();
  const { user } = useAuth();
  const { data: family } = useFamily();
  const { data: existingChild } = useChild(isNew ? undefined : id);

  const createChild = useCreateChild();
  const updateChild = useUpdateChild();
  const deleteChild = useDeleteChild();

  const [name, setName] = useState("");
  const [isExpecting, setIsExpecting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
  const [dueDate, setDueDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (existingChild) {
      setName(existingChild.name);
      setIsExpecting(existingChild.status === "expecting");
      if (existingChild.date_of_birth) {
        setDateOfBirth(new Date(existingChild.date_of_birth));
      }
      if (existingChild.expected_due_date) {
        setDueDate(new Date(existingChild.expected_due_date));
      }
    }
  }, [existingChild]);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Name is required");
      return;
    }
    if (!user || !family) return;

    const childData = {
      name: name.trim(),
      status: isExpecting ? ("expecting" as const) : ("born" as const),
      date_of_birth: isExpecting ? null : dateOfBirth.toISOString().split("T")[0],
      expected_due_date: isExpecting ? dueDate.toISOString().split("T")[0] : null,
    };

    if (isNew) {
      createChild.mutate(
        { ...childData, user_id: user.id, family_id: family.id },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert("Error", err.message),
        }
      );
    } else {
      updateChild.mutate(
        { childId: id, updates: childData },
        {
          onSuccess: () => router.back(),
          onError: (err) => Alert.alert("Error", err.message),
        }
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Child",
      `Are you sure you want to remove ${name}? This will also delete all their moments.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteChild.mutate(id, {
              onSuccess: () => router.back(),
              onError: (err) => Alert.alert("Error", err.message),
            });
          },
        },
      ]
    );
  };

  const isPending = createChild.isPending || updateChild.isPending;

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Header title={isNew ? "Add Child" : "Edit Child"} />
      <ScrollView className="flex-1 px-4 mt-4">
        <View className="gap-5">
          <Input
            label="Name"
            placeholder="Child's name or nickname"
            value={name}
            onChangeText={setName}
            autoFocus={isNew}
          />

          <View className="flex-row items-center justify-between py-2">
            <Text className="text-base text-text">Expecting</Text>
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

          <Button title="Save" onPress={handleSave} loading={isPending} />

          {!isNew && (
            <Button
              title="Delete Child"
              onPress={handleDelete}
              variant="destructive"
              loading={deleteChild.isPending}
              className="mt-4"
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
