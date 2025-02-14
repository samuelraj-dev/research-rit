import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createUserApi } from "../apis/user.api";

export function useCreateUserMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => createUserApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["application_users"] });
        }
    })
}