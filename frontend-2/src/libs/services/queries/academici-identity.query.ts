import { useQuery } from "@tanstack/react-query"
import { getAcademicIdentityApi } from "../apis/academic-identity.api"

export function useGetAcademicIdentityQuery() {
    return useQuery({
        queryKey: ['academic_identity'],
        queryFn: getAcademicIdentityApi,
    })
}