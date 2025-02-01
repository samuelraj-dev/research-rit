import { Outlet } from "@tanstack/react-router";
import Navbar from "@/app/components/Navbar";
import { SidebarProvider } from "@/app/components/ui/sidebar"
import { AppSidebar } from "@/app/components/Sidebar";

export function DashboardLayout() {
    return (
        <>
            <SidebarProvider>
                <div className="flex w-[100vw] h-[100vh] overflow-hidden">                    
                    <AppSidebar />
                    <main className="flex flex-col w-full h-full overflow-hidden">
                        <Navbar />
                        <div className="w-full h-full px-[1rem] py-[1rem] overflow-x-auto bg-gray-50">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </>
    )
}