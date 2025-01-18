import { IoSettingsOutline } from 'react-icons/io5';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Member } from '../../../types/team.type';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamMemberApis from '../../../apis/team-member.api';
import { toast } from 'react-toastify';

const EditMember = ({
  member,
  projectId,
  memberList,
  setMembers,
}: {
  member: Member;
  projectId: string;
  memberList: Member[];
  setMembers: React.Dispatch<React.SetStateAction<Member[]>>;
}) => {
  const queryClient = useQueryClient();
  const [isLeader, setIsLeader] = useState<'true' | 'false'>(
    member.isLeader ? 'true' : 'false',
  );
  const [open, setOpen] = useState(false);
  const { register, handleSubmit } = useForm<{
    id: string;
    note: string;
    memberRole: string;
  }>({
    defaultValues: {
      id: member.id,
      note: member.note,
      memberRole: member.memberRole,
    },
  });

  const onSubmit: SubmitHandler<{
    id: string;
    note: string;
    memberRole: string;
  }> = (data) => {
    updateTeamMember.mutate(
      {
        ...data,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['projectDetail', projectId],
          });
          let newMemberList: Member[] = [];
          if (isLeader === 'true') {
            const oldLeader = memberList.find((item) => item.isLeader);
            newMemberList = memberList.map((item) => {
              if (item.id === member.id) {
                return { ...item, ...data, isLeader: true };
              }
              if (oldLeader && item.id === oldLeader.id) {
                return { ...oldLeader, isLeader: false };
              }
              return item;
            });
          } else {
            newMemberList = memberList.map((item) =>
              item.id === member.id
                ? { ...item, ...data, isLeader: false }
                : item,
            );
          }
          setMembers(newMemberList);
          setOpen(false);
          toast.success('Update member successfully');
        },
        onError: () => {
          toast.error('Update member failed');
        },
      },
    );
  };

  const updateTeamMember = useMutation({
    mutationFn: ({
      memberRole,
      note,
      id,
    }: {
      id: string;
      note: string;
      memberRole: string;
    }) =>
      teamMemberApis.updateTeamMember({
        id,
        isLeader: isLeader === 'true',
        note,
        memberRole,
      }),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button>
          <IoSettingsOutline />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Team Member</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="Note" className="text-right">
                Note
              </Label>
              <Input id="Note" {...register('note')} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="MemberRole" className="text-right">
                Role
              </Label>
              <Input
                id="MemberRole"
                {...register('memberRole')}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="IsLeader" className="text-right">
                Is Leader
              </Label>
              <Select
                value={isLeader}
                onValueChange={(v) => setIsLeader(v as 'true' | 'false')}
              >
                <SelectTrigger className="col-span-3 w-full">
                  <SelectValue placeholder="Is Leader" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="true">Leader</SelectItem>
                    <SelectItem value="false">Member</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMember;
