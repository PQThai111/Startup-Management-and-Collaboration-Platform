import { BsThreeDots } from 'react-icons/bs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import { Button } from '../../../components/ui/button';
import { useState } from 'react';
import { Textarea } from '../../../components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import projectTaskApi from '../../../apis/project-task.api';
import { ProjectTask } from '../../../types/project-task.type';
import { toast } from 'react-toastify';

const Description = ({
  id,
  description,
}: {
  id: string;
  description: string;
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [des, setDes] = useState<string>(description);

  const handleUpdateDescription = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<ProjectTask> }) =>
      projectTaskApi.editProjectTask({ id, body }),
  });

  const handleSave = () => {
    setIsEditing(false);
    handleUpdateDescription.mutate(
      {
        id: id,
        body: {
          description: des,
          id,
        },
      },
      {
        onSuccess: (data) => {
          toast.success('Description updated successfully');
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  const handleCancel = () => {
    setDes(description);
    setIsEditing(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="font-bold">Description</p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="border-none bg-transparent hover:border-none hover:bg-transparent"
            >
              <BsThreeDots />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <Button variant="ghost" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-max rounded-lg bg-white px-3 py-3 text-justify text-sm">
        {isEditing ? (
          <div>
            <Textarea
              value={des}
              onChange={(e) => setDes(e.target.value)}
              className="min-h-48"
            />
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                className="rounded-xl bg-[#013C5A] py-1 font-semibold text-white"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="rounded-xl border border-[#013C5A] py-1 font-semibold text-[#013C5A]"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p>{des}</p>
        )}
      </div>
    </>
  );
};

export default Description;
