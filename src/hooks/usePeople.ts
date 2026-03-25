import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getPeople,
  createPerson,
  updatePerson,
  deletePerson,
  type CreatePersonInput,
  type Person,
} from "@/src/api/people";
import { useAuth } from "@/src/providers/AuthProvider";

export function usePeople() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["people", user?.id],
    queryFn: () => getPeople(user!.id),
    enabled: !!user,
  });
}

export function useCreatePerson() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: CreatePersonInput) => createPerson(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people", user?.id] });
    },
  });
}

export function useUpdatePerson() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({
      personId,
      updates,
    }: {
      personId: string;
      updates: Partial<Omit<Person, "id" | "user_id" | "created_at">>;
    }) => updatePerson(personId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people", user?.id] });
    },
  });
}

export function useDeletePerson() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (personId: string) => deletePerson(personId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["people", user?.id] });
    },
  });
}
