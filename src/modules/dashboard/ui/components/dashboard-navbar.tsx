"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/components/ui/sidebar"
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react"

export const DashboardNavbar = () => {

    const {toggleSidebar, isMobile, state} = useSidebar();

    return (
        <>
        
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
            {(state === "collapsed" || isMobile) ?  <PanelLeftIcon className="size-4" /> : <PanelLeftCloseIcon className="size-4"/>}
        </Button>
        <Button variant="outline" className="h-9 w-[240px] justify-start font-normal text-muted-forground hover:text-muted-foreground" size="sm" onClick={() => {}}>
            <SearchIcon/>
            Search
            <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">&#8984;</span>K
            </kbd>
        </Button>
      </nav>
      </>
    )
}