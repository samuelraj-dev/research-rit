import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setAcademicIdentityApi } from "../apis/academic-identity.api";

export function useSetAcademicIdentityMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { scopusId: string, vidhwanId: string, orcidId: string, wosId: string, googleScholarLink: string }) => setAcademicIdentityApi(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["academic_identity"] });
        }
    })
}