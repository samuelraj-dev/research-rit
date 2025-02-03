// export const getUserResearchPapersCountByTypeApi = async () => {
//     return (await axiosInstance.get("research-papers/research-paper/count-by-type")).data;
// };

import { useQuery } from "@tanstack/react-query"
import { getResearchPapersByTypeApi, getResearchPapersCountByTypeApi, getUserResearchPapersByTypeApi, getUserResearchPapersCountByTypeApi, getUsersCountByDeptApi } from "../apis/research-paper.api"

export function useUserResearchPapersCountByTypeQuery() {
    return useQuery({
        queryKey: ['user_research_papers_count_by_type'],
        queryFn: getUserResearchPapersCountByTypeApi,
    })
}

export function useUserResearchPapersByTypeQuery({ type }: { type: string }) {
    return useQuery({
        queryKey: ['user_research_papers_type', type],
        queryFn: () => getUserResearchPapersByTypeApi({type}),
    })
}

export function useResearchPapersByTypeQuery({ type }: { type: string }) {
    return useQuery({
        queryKey: ['research_papers_type', type],
        queryFn: () => getResearchPapersByTypeApi({type}),
    })
}

export function useResearchPapersCountByTypeQuery() {
    return useQuery({
        queryKey: ['research_papers_count_type'],
        queryFn: () => getResearchPapersCountByTypeApi(),
    })
}

export function useUsersCountByDeptQuery() {
    return useQuery({
        queryKey: ['users_count_dept'],
        queryFn: () => getUsersCountByDeptApi(),
    })
}