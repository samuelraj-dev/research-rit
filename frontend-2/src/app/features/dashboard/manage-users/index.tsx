import DataTable from "./data-table";
// import { data } from "./data-table/data";
import { columns } from "./data-table/columns";
import { useAllUsersQuery } from "@/libs/services/queries/user.query";

export default function UsersFeature() {

  const { data } = useAllUsersQuery();
  console.log(data)

  return (
    <>
      <DataTable columns={columns} data={data?.users || []} columnVisibilityState={{
      }}  />
    </>
  )
}