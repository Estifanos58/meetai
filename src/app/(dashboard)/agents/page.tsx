import { auth } from '@/lib/auth';
import { loadSearchParams } from '@/modules/agents/params';
import { ListHeader } from '@/modules/agents/ui/components/list-headers';
import { AgentsLoadingView, AgentsView } from '@/modules/agents/ui/views/agents-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type{ SearchParams } from 'nuqs';
import React, { Suspense } from 'react'

interface Props {
  searchParams: Promise<SearchParams>
}

async function page({searchParams}: Props) {
  const params = await loadSearchParams(searchParams);
    const session =  await auth.api.getSession({
          headers: await headers(),
      });
  
      if(!session)  {
          redirect("/sign-in")
      }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions({
      ...params
    }));
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