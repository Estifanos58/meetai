import { Button } from '@/components/ui/button';
import { CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { CommandEmpty } from 'cmdk';
import { ChevronsUpDownIcon } from 'lucide-react';
import React, { ReactNode, useState } from 'react'

interface CommandSelectProps {
    options: Array<{
        id: string;
        value: string;
        children: ReactNode;
    }>;
    onSelect: (value: string) => void;
    onSearch?: (search: string) => void;
    value?: string;
    placeholder?: string;
    isSearchable?: boolean;
    className?: string;
}

function CommandSelect({
    options,
    onSelect,
    onSearch,
    value,
    placeholder = "Select an Onption...",
    isSearchable = true,
    className = "",
    }: CommandSelectProps & {
    children?: ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const selectedOption = options.find(option => option.value === value);

    const handleOpenChange = (value: boolean) => {
        onSearch?.("")
        setOpen(value);
    }
  return (
    <>
        <Button type="button" variant="outline" className={cn("h-9 justify-between font-normal px-2",className, !selectedOption && "text-muted-foreground")} onClick={() => setOpen(!open)}>
            <div>
                {selectedOption?.children ?? placeholder}
            </div>
            <ChevronsUpDownIcon />
        </Button>
        <CommandResponsiveDialog
        shouldFilter={!onSearch}
        open={open}
        onOpenChange={handleOpenChange}
        >
            <CommandInput placeholder='Search ...' onValueChange={onSearch} />
            <CommandList>
                <CommandEmpty>
                    <span className="text-muted-foreground text-sm">
                        No Options found
                    </span>
                </CommandEmpty>
                {
                    options.map((option) => (
                        <CommandItem
                            key={option.id}
                            value={option.value}
                            onSelect={() => {
                                onSelect(option.value);
                                setOpen(false);
                            }}
                        >
                            {option.children}
                        </CommandItem>
                    ))
                }
            </CommandList>
        </CommandResponsiveDialog>
    </>
  )
}

export default CommandSelect