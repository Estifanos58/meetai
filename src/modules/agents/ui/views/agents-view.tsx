"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  
  return <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4 ">
    <DataTable data={data} columns={columns} />
    {data.length === 0 && <EmptyState title="Create your first Agent" description="Create an agent to Join your meetings. Each agent will follow your instructions and can interact with participants during the chat."/>}
  </div>;
};

export const AgentsLoadingView = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentsErrorView = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later or contact support."
    />
  );
};
