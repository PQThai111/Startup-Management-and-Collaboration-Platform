import { useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useMutation } from '@tanstack/react-query';
import teamRequestApis from '../../../apis/team-request.api';
import { TeamRequestType } from '../../../constant/team-request';
import { toast } from 'react-toastify';

const ApplyButton = ({ teamId }: { teamId: string }) => {
  const [comment, setComment] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleApplyForProject = useMutation({
    mutationFn: (data: {
      type: TeamRequestType;
      teamId?: string;
      comment: string;
    }) => teamRequestApis.applyForProject(data),
  });

  const handleSubmit = () => {
    if (comment.length === 0) {
      toast.error("Comment can't be empty");
      return;
    }

    handleApplyForProject.mutate(
      {
        type: TeamRequestType.Join,
        teamId,
        comment,
      },
      {
        onSuccess: () => {
          setIsOpen(false);
          toast.success('Apply successfully');
        },
        onError: (error) => {
          toast.error(error.response.data.errors[0]);
        },
      },
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="w-20 rounded-sm border border-orange-500 p-2">
          Apply
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Apply For This Project</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Input
              id="comment"
              value={comment}
              placeholder="Why you want to join this project?"
              onChange={(e) => setComment(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApplyButton;
