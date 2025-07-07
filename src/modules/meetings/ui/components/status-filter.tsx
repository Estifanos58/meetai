import React from 'react'
import { MeetingStatus } from '../../type'
import { CircleCheckIcon, CircleXIcon, ClockArrowDownIcon, LoaderIcon, VideoIcon } from 'lucide-react'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters';
import CommandSelect from './command-select';

const options = [
    {
        id: MeetingStatus.Upcoming,
        value: MeetingStatus.Upcoming,
        children: (
            <div className='flex items-center gap-x-2 capitalize'>
                <ClockArrowDownIcon />
                {MeetingStatus.Upcoming}
            </div>
        )
    },
    {
        id: MeetingStatus.Completed,
        value: MeetingStatus.Completed,
        children: (
            <div className='flex items-center gap-x-2 capitalize'>
                <CircleCheckIcon />
                {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id: MeetingStatus.Active,
        value: MeetingStatus.Active,
        children: (
            <div className='flex items-center gap-x-2 capitalize'>
                <VideoIcon />
                {MeetingStatus.Active}
            </div>
        )
    },
    {
        id: MeetingStatus.Processing,
        value: MeetingStatus.Processing,
        children: (
            <div className='flex items-center gap-x-2 capitalize'>
                <LoaderIcon />
                {MeetingStatus.Processing}
            </div>
        )
    },
    {
        id: MeetingStatus.Cancelled,
        value: MeetingStatus.Cancelled,
        children: (
            <div className='flex items-center gap-x-2 capitalize'>
                <CircleXIcon />
                {MeetingStatus.Cancelled}
            </div>
        )
    }
]

function StatusFilter() {
    const [filter, setFilter] = useMeetingsFilters();
  return (
    <CommandSelect 
    placeholder='Status'
    className='h-9'
    options={options}
    onSelect={(value) => setFilter({status:value as MeetingStatus})}
    value={filter.status  ?? ""}
    />
  )
}

export default StatusFilter