"use client";

import { ErrorState } from '@/components/error-state';
import { LoadingState } from '@/components/loading-state';
import { useTRPC } from '@/trpc/client';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { MeetingIdViewHeader } from '../components/meeting-id-view-header';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useConfirm } from '@/hooks/use-confirm';
import { UpdateMeetingDialog } from '../components/update-meeting-dialog';

interface Props {
    meetingId: string;
}

function MeetingIdView({meetingId}: Props) {
    const trpc = useTRPC();
    const queryClient = useQueryClient();
    const router = useRouter();
    const [updateMeetingDialogOpen, setUpdateAgentDialogOpen] = useState(false);
    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure?",
        "The following action will remove this meeting"
    )
    const {data} = useSuspenseQuery(
        trpc.meetings.getOne.queryOptions({
            id: meetingId
        })
    )
    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess: ()=> {
                queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}))
                // TODO: Invalidate free Tier usage
                router.push('/meetings');
            }
        })
    )

    const handleRemoveMeeting = async () => {
        const ok = await confirmRemove();

        if(!ok) return;
        await removeMeeting.mutateAsync({id: meetingId});
    } 
  return (
    <>
        <RemoveConfirmation/>
        <UpdateMeetingDialog 
            open={updateMeetingDialogOpen}
            onOpenChange={setUpdateAgentDialogOpen}
            initialValues={data}

        />
        <div className='flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4'>
            <MeetingIdViewHeader
            MeetingId={meetingId}
            MeetingName={data.name}
            onEdit={() => setUpdateAgentDialogOpen(true)}
            onRemove={handleRemoveMeeting}
            />
        </div>
    </>
  )
}

export default MeetingIdView;

export const MeetingIdLoadingView = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};

export const MeetingIdErrorView = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Please try again later or contact support."
    />
  );
};
