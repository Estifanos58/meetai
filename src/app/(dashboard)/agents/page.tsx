import { ListHeader } from '@/modules/agents/ui/components/list-headers';
import { AgentsLoadingView, AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'

async function page() {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
  return (
    <>
    <ListHeader />
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsLoadingView/>}>
         <AgentsView />
        </Suspense>
    </HydrationBoundary>
   </>
  )
}

export default page