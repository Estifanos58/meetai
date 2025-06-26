import { SidebarProvider } from "@/components/ui/sidebar";
import DashboardSidebar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import React from 'react'

function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
         <DashboardSidebar/>
         <main className="">
         {children}
         </main>
     </SidebarProvider>
  )
}

export default layout