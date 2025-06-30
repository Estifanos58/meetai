"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


function MeetingsView() {
    const trpc = useTRPC();
    const {data} = useQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <div>meetings-view</div>
  )
}

export default MeetingsView


export const MeetingLoadingView = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingErrorView = () => {
  return (
    <ErrorState
      title="Error loading Meeting"
      description="Please try again later or contact support."
    />
  );
};