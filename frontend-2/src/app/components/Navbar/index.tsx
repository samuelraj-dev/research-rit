import { SidebarTrigger } from "@/app/components/ui/sidebar";
import { NavUser } from "./user-nav";
import { useUserDataQuery } from "@/libs/services/queries/user.query";

export default function Navbar () {

    const userDataQuery = useUserDataQuery();

    return (
        <div className="border-b w-full">
            <div className="flex h-16 items-center px-4">
                <SidebarTrigger />
                {/* <TeamSwitcher />
                <MainNav className="mx-6" /> */}
                <div className="ml-auto flex items-center space-x-4">
                    {/* <div className="flex flex-col items-end justify-center">
                        <span className="text-sm font-medium">Sachin S</span>
                        <span className="text-[0.7rem] text-zinc-500">Professor</span>
                    </div> */}
                    {/* <Search /> */}
                    <NavUser user={userDataQuery?.data || {}} />
                </div>
            </div>
        </div>
    )
}

{/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
    <div className="flex items-center gap-2 px-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-[1rem] bg-sidebar-border" />
        hi
    </div>
</header> */}