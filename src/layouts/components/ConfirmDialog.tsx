import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import teamRequestApis from '../../apis/team-request.api';
import teamMemberApis from '../../apis/team-member.api';

const ConfirmDialog = ({
  isOpen,
  setIsOpen,
  status,
  selectedTeamRequestId,
  setMainDialog,
  teamId,
}: {
  status: 'accept' | 'reject';
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  selectedTeamRequestId: string;
  setMainDialog: (value: boolean) => void;
  teamId: string;
}) => {
  const queryClient = useQueryClient();
  const [role, setRole] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [notifyByEmail, setNotifyByEmail] = useState<'true' | 'false'>('true');

  const handleApprove = useMutation({
    mutationFn: (data: {
      memberRole: string;
      note: string;
      teamRequestId: string;
    }) => teamMemberApis.acceptTeamMemberRequest(data),
  });

  const handleReject = useMutation({
    mutationFn: (data: {
      id: string;
      reason: string;
      notifyByEmail: boolean;
    }) => teamRequestApis.rejectTeamRequest(data),
  });

  const handleSubmit = () => {
    if (status === 'accept') {
      // handle accept
      if (!role) {
        toast.error('Role is required');
        return;
      }
      if (!note) {
        toast.error('Note is required');
        return;
      }
      handleApprove.mutate(
        {
          memberRole: role,
          note,
          teamRequestId: selectedTeamRequestId,
        },
        {
          onSuccess: () => {
            toast.success('Request accepted successfully');
            setIsOpen(false);
            setMainDialog(false);
          },
        },
      );
    } else {
      // handle reject
      if (!reason) {
        toast.error('Reason is required');
        return;
      }
      handleReject.mutate(
        {
          id: selectedTeamRequestId,
          reason,
          notifyByEmail: notifyByEmail == 'true' ? true : false,
        },
        {
          onSuccess: () => {
            setIsOpen(false);
            setMainDialog(false);
            toast.success('Request rejected successfully');
          },
        },
      );
    }
    queryClient.invalidateQueries({ queryKey: ['notifications', teamId] });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {status === 'accept' ? 'Accept request' : 'Reject request'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {status === 'accept' ? (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="">
                  Role
                </Label>
                <Input
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="note" className="">
                  Note
                </Label>
                <Input
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="">
                Reason
              </Label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="col-span-3"
              />
            </div>
          )}
          <div className="flex items-center gap-5">
            <Label htmlFor="notifyByEmail" className="w-40">
              Notify By Email
            </Label>
            <Select
              value={notifyByEmail}
              onValueChange={(value) =>
                setNotifyByEmail(value as 'true' | 'false')
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Notify By Email" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
