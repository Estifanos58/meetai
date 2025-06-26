import { authClient } from "@/lib/auth-client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import GeneratedAvatar from "@/components/ui/generated-avatar";
import { ChevronDownIcon } from "lucide-react";

function DashboardUserButton() {
  const { data, isPending } = authClient.useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (!data?.user && !isPending) {
    return <div className="text-red-500">User not found</div>;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-white/10 overflow-hidden">
        {data?.user?.image ? (
          <Avatar>
            <AvatarImage src={data.user.image} alt="User Avatar" />
          </Avatar>
        ) : (
          <GeneratedAvatar
            seed={data?.user.name}
            variant="initials"
            className="size-9 mr-3"
          />
        )}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm truncate w-full">
                {data?.user.name}
            </p>
            <p className="text-xs truncate w-full">
                {data?.user.email}
            </p>
        </div>
        <ChevronDownIcon className="size-4 shrink-0"/>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72">
        <DropdownMenuLabel>
            <div className="flex flex-col gap-1">
                <span className="font-medium truncate">{data?.user.name}</span>
                <span className="text-sm font-normal text-muted-foreground truncate">{data?.user.email}</span>
            </div>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DashboardUserButton;
