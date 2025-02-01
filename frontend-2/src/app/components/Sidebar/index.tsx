import { Home, Indent, LogOut, Upload, UploadCloud, UserCircle, LucideIcon, User, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/app/components/ui/sidebar"

import ritSplash from "@/assets/images/rit.webp"
import ritLogo from "@/assets/icons/rit-logo.png"
import { Link, useRouter } from "@tanstack/react-router"
import { useEffect, useState } from "react"
import { useUserDataQuery } from "@/libs/services/queries/user.query"
import { LogoutDialog } from "../logout"
import { Button } from "../ui/button"

const sidebarGroups: Array<{
  label: string,
  permission: string,
  items: Array<{
    title: string,
    url: string,
    icon: LucideIcon,
    style?: string,
  }>
}> = [
  {
    label: 'Application',
    permission: 'user:own_read',
    items: [
      {
        title: "Home",
        url: "/dashboard",
        icon: Home,
      },
    ]
  },
  {
    label: 'Administration',
    permission: 'user:write',
    items: [
      {
        title: "User Uploads",
        url: "/dashboard/user-uploads",
        icon: UploadCloud,
      },
      {
        title: "Manage Users",
        url: "/dashboard/users",
        icon: UserCircle,
      },
    ]
  },
  {
    label: 'User',
    permission: 'research_paper:own_write',
    items: [
      {
        title: "Upload Paper",
        url: "/dashboard/upload-paper",
        icon: Upload,
      },
      {
        title: "Previous Uploads",
        url: "/dashboard/previous-uploads",
        icon: UploadCloud,
      },
      {
        title: "Academic Identity",
        url: "/dashboard/academic-identity",
        icon: Indent,
      },
    ]
  },
  {
    label: 'Other',
    permission: 'user:own_read',
    items: [
      {
        title: "Profile",
        url: "/dashboard/profile",
        icon: UserCircle,
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
      },
    ]
  },
]

export function AppSidebar() {
  
  const { state } = useSidebar();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.state.location.pathname);
  const userDataQuery = useUserDataQuery();

  useEffect(() => {
    const unsubscribe = router.subscribe("onBeforeNavigate", () => {
      setCurrentPath(router.state.location.pathname);
    });

    return () => {
      unsubscribe();
    };
  }, [router]);

  if (userDataQuery.isLoading) return <div>loading</div>
  if (userDataQuery.isError) return <div>error</div>

  function logoutTrigger() {
    return (
      <Button variant="outline" className="text-red-500 mb-2 hover:text-red-500"><span><LogOut /></span> Logout</Button>
    )
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {/* <SidebarMenuItem> */}
          {/* <SidebarMenuButton> */}
            <a href={"#"} className="flex items-center h-full">
              {state === "collapsed" ? (
                <img src={ritLogo} alt="" className={` w-auto max-h-[3rem]`} />
              ) : (
                <img src={ritSplash} alt="" className={` w-auto max-h-[3rem]`} />
              )}
            </a>
          {/* </SidebarMenuButton> */}
        {/* </SidebarMenuItem> */}
      </SidebarHeader>
      <SidebarContent className="bg-white flex flex-col justify-between">
        <div>

          {sidebarGroups.map((group) => {
            return (userDataQuery.data.permissions.includes(group.permission) &&
              <>
                <SidebarGroup>
                  <SidebarGroupLabel className="text-sm text-black mb-2">{group.label}</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {group.items.map((item) => (
                          <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={currentPath == item.url || currentPath == item.url + '/'} className={`${item.style} rounded-[3px] transition-colors hover:bg-zinc-100 data-[active=true]:bg-primary data-[active=true]:text-accent`} >
                              <Link to={item.url}>
                                <item.icon />
                                <span>{item.title}</span>
                              </Link>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )
                      )}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator className="mx-0" />
              </>
            )
          })}
        </div>
        <div className="flex flex-col">
          <LogoutDialog Trigger={logoutTrigger} />
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
