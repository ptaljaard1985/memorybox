import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getFamily, createFamily, updateFamily } from "@/src/api/families";
import { useAuth } from "@/src/providers/AuthProvider";

export function useFamily() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["family", user?.id],
    queryFn: () => getFamily(user!.id),
    enabled: !!user,
  });
}

export function useCreateFamily() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (name: string) => createFamily(user!.id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family", user?.id] });
    },
  });
}

export function useUpdateFamily() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ familyId, name }: { familyId: string; name: string }) =>
      updateFamily(familyId, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["family", user?.id] });
    },
  });
}
