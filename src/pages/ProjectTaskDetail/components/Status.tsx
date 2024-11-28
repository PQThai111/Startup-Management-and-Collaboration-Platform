import { Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../../components/ui/command';
import { cn } from '../../../lib/utils';
import { useState } from 'react';
import { ProjectTaskStatus } from '../../../constant/project_task.enum';
import { useMutation } from '@tanstack/react-query';
import projectTaskApi from '../../../apis/project-task.api';
import { toast } from 'react-toastify';

const Status = ({
  projectTaskId,
  status,
}: {
  projectTaskId: string;
  status: number;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>(status.toString());

  const updateStatus = useMutation({
    mutationFn: (status: string) =>
      projectTaskApi.editProjectTask({
        id: projectTaskId,
        body: {
          id: projectTaskId,
          status: Number(status),
        },
      }),
  });

  const projectStatus = Object.entries(ProjectTaskStatus)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({
      key: Number(value),
      label: key,
    }));

  const handleUpdateStatus = () => {
    updateStatus.mutate(value, {
      onSuccess: () => {
        toast.success('Update status successfully');
      },
    });
  };

  return (
    <>
      <p className="mb-3 font-bold">Project Task Status</p>
      <div className="mt-3 flex items-center justify-between gap-2 font-semibold">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              {value
                ? projectStatus.find((item) => item.key.toString() === value)
                    ?.label
                : 'Select status...'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandList>
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {projectStatus.map((item) => (
                    <CommandItem
                      key={item.key}
                      value={item.key.toString()}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? '' : currentValue);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          'ml-auto',
                          value === item.key.toString()
                            ? 'opacity-100'
                            : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Button onClick={handleUpdateStatus}>Submit</Button>
      </div>
    </>
  );
};

export default Status;
