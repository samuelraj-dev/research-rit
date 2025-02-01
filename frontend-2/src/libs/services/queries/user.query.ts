// export const getUserResearchPapersCountByTypeApi = async () => {
//     return (await axiosInstance.get("research-papers/research-paper/count-by-type")).data;
// };

import { useQuery } from "@tanstack/react-query"
import { getAllUsersApi, getUserDataApi } from "../apis/user.api"

export function useUserDataQuery() {
    return useQuery({
        queryKey: ['user_data'],
        queryFn: getUserDataApi,
    })
}

export function useAllUsersQuery() {
    return useQuery({
        queryKey: ['application_users'],
        queryFn: getAllUsersApi,
    })
}