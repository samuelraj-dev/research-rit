// export const getUserResearchPapersCountByTypeApi = async () => {
//     return (await axiosInstance.get("research-papers/research-paper/count-by-type")).data;
// };

import { useQuery } from "@tanstack/react-query"
import { getUserResearchPapersByTypeApi, getUserResearchPapersCountByTypeApi } from "../apis/research-paper.api"

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