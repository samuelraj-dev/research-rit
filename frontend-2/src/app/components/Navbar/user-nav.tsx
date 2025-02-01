// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
// } from "@/app/components/ui/avatar"
// import { Button } from "@/app/components/ui/button"
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuGroup,
//     DropdownMenuItem,
//     DropdownMenuLabel,
//     DropdownMenuSeparator,
//     DropdownMenuShortcut,
//     DropdownMenuTrigger,
// } from "@/app/components/ui/dropdown-menu"

// import defaultAvatar from "@/assets/icons/default_avatar.jpg";
  
// export function UserNav() {
//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//             <Avatar className="h-8 w-8">
//               <AvatarImage src={defaultAvatar} alt="@shadcn" />
//               <AvatarFallback>Hi</AvatarFallback>
//             </Avatar>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="w-auto" align="end" forceMount>
//           <DropdownMenuLabel className="font-normal">
//             <div className="flex flex-col space-y-1">
//               <p className="text-sm font-medium leading-none">Mr. Sachin</p>
//               <p className="text-xs leading-none text-muted-foreground">
//                 sachin.s.2023.csbs@ritchennai.edu.in
//               </p>
//               <p className="text-xs leading-none text-muted-foreground">
//                 CSBS
//               </p>
//             </div>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuGroup>
//             <DropdownMenuItem>
//               Profile
//               <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
//             </DropdownMenuItem>
//             <DropdownMenuItem>
//               Settings
//               <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
//             </DropdownMenuItem>
//           </DropdownMenuGroup>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem>
//             <span className="text-red-500">Log out</span>
//             <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
// }
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  Grid2X2,
  IdCard,
  LogOut,
  Sparkles,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/app/components/ui/sidebar"

import defaultAvatar from "@/assets/icons/default_avatar.jpg"
import { Link } from "@tanstack/react-router"
import { LogoutDialog } from "../logout"

export function NavUser({
  user,
}: {
  user: any
}) {
  const { isMobile } = useSidebar()

  function logoutTrigger() {
    return (
      // <DropdownMenuItem className="text-red-500 focus:text-red-500 focus:underline">
      // <div className="w-full">

      <SidebarMenuButton className="w-full text-red-500 hover:text-red-500 hover:underline" >
        <LogOut />
        Log out
      </SidebarMenuButton>
      // </div>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="max-w-[15rem] data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.avatarUrl || defaultAvatar} alt={user.fullName} />
                <AvatarFallback className="rounded-lg">Hi</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                {user?.permissions?.includes('research_paper:own_write')
                ? <>
                  <span className="truncate font-semibold">{user.prefix} {user.fullName}</span>
                  <span className="truncate text-xs">{user.designation}</span>
                </> :
                <span className="truncate font-xs text-ellipsis">{user.workEmail}</span>
                }
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div>
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.avatarUrl || defaultAvatar} alt={user.fullName} />
                    <AvatarFallback className="rounded-lg">Hi</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{user.prefix} {user.fullName}</span>
                    <span className="truncate text-xs">{user.workEmail}</span>
                  </div>
                </div>
                {user?.permissions?.includes('research_paper:own_write') &&
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <div className="flex items-end py-2 pl-2 truncate max-w-full">
                        <BadgeCheck size={15} className="mr-1 text-muted-foreground" />
                        <span className="text-[0.7rem] leading-none text-muted-foreground mr-2">Designation: </span>
                        <span className="leading-none font-medium truncate">{user.designation}</span>
                      </div>
                      <div className="flex items-end py-2 pl-2">
                        <Grid2X2 size={15} className="mr-1 text-muted-foreground" />
                        <span className="text-[0.7rem] leading-none text-muted-foreground mr-2">Department: </span>
                        <span className="leading-none font-medium">{user.department}</span>
                      </div>
                      <div className="flex items-end py-2 pl-2">
                        <IdCard size={15} className="mr-1 text-muted-foreground" />
                        <span className="text-[0.7rem] leading-none text-muted-foreground mr-2">Employee ID: </span>
                        <span className="leading-none font-medium">{user.employeeId}</span>
                      </div>
                    </DropdownMenuGroup>
                  </>
                }
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link to="/dashboard/profile">
                <DropdownMenuItem>
                <User />
                Full Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <LogoutDialog Trigger={logoutTrigger} />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
