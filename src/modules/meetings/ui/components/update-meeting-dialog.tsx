import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting-form";
import { MeetingsGetOne } from "../../type";

interface UpdateMeetingProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues: MeetingsGetOne;
}

export const UpdateMeetingDialog = ({ open, onOpenChange, initialValues }: UpdateMeetingProps) => {
    return (
        <ResponsiveDialog title="Edit Meeting" description="Edit Your meeting" open={open} onOpenChange={onOpenChange}>
           <MeetingForm
           onSuccess={()=>{
            onOpenChange(false);
           }}
           onCancel={() => onOpenChange(false)}
           initialValues={initialValues}
           />
        </ResponsiveDialog>
    )
}