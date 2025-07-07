import { auth } from '@/lib/auth';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react'
import MeetingIdView, { MeetingIdErrorView, MeetingIdLoadingView } from '@/modules/meetings/ui/views/meeting-id-view';


interface Props {
  params: Promise<{
    meetingId: string
  }>
}

async function page({params }: Props) {
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    redirect('/sign-in');
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({id: meetingId}),
  )
  //  TODO: Prefetch getTranscript

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingIdLoadingView/>}>
        <ErrorBoundary fallback={<MeetingIdErrorView />}>
          <MeetingIdView meetingId={meetingId}/>
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default page