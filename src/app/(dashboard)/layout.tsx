import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import { ReactNode } from "react";

const Layout = ({children}: {children: React.ReactNode}) => {
    // <SidebarProvider>
    //     <DashboardSidebar/>
        <main className="flex flex-col h-screen w-screen bg-muted">
        {children}
        </main>
    // </SidebarProvider>
} 

export default Layout;