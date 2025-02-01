import { useUserDataQuery } from "@/libs/services/queries/user.query";
import AdminHomeFeature from "./admin-home";
import UserHomeFeature from "./faculty-home";

export default function HomeFeature() {
    const userDataQuery = useUserDataQuery();

    if (userDataQuery.isLoading) return <div>loading...</div>
    if (userDataQuery.isError) return <div>error occured</div>

    if (userDataQuery.data.permissions.includes('user:write')) return <AdminHomeFeature />;
    if (userDataQuery.data.permissions.includes('research_paper:own_read')) return <UserHomeFeature />;
}