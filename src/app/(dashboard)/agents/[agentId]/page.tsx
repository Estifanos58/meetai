import { AgentIdView } from '@/modules/agents/ui/views/agent-id-view';
import { AgentsErrorView, AgentsLoadingView } from '@/modules/agents/ui/views/agents-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react'
import {ErrorBoundary} from "react-error-boundary";
interface Props {
    params: Promise<{agentId: string}>
}

async function page({params}: Props) {
    const {agentId} = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(
        trpc.agents.getOne.queryOptions({id: agentId}),
    )

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsLoadingView />}>
            <ErrorBoundary fallback={<AgentsErrorView/>}>
                <AgentIdView agentId={agentId}/>
            </ErrorBoundary>
        </Suspense>
    </HydrationBoundary>
  )
}

export default page