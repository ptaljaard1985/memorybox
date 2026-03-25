import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getChildren,
  getChild,
  createChild,
  updateChild,
  deleteChild,
  type CreateChildInput,
  type Child,
} from "@/src/api/children";
import { useAuth } from "@/src/providers/AuthProvider";

export function useChildren() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["children", user?.id],
    queryFn: () => getChildren(user!.id),
    enabled: !!user,
  });
}

export function useChild(childId: string | undefined) {
  return useQuery({
    queryKey: ["child", childId],
    queryFn: () => getChild(childId!),
    enabled: !!childId,
  });
}

export function useCreateChild() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (input: CreateChildInput) => createChild(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children", user?.id] });
    },
  });
}

export function useUpdateChild() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({
      childId,
      updates,
    }: {
      childId: string;
      updates: Partial<Omit<Child, "id" | "user_id" | "created_at" | "updated_at">>;
    }) => updateChild(childId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children", user?.id] });
    },
  });
}

export function useDeleteChild() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (childId: string) => deleteChild(childId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children", user?.id] });
    },
  });
}
