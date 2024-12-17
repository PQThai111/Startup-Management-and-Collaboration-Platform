import { useMutation, useQuery } from '@tanstack/react-query';
import DrawerWithIcon from '../../common/components/DrawerWithIcon';
import IconWithNum from '../../common/components/IconWithNum';
import teamRequestApis from '../../apis/team-request.api';
import { useState } from 'react';
import { Button } from '../../components/ui/button';
import {
  TeamRequestStatus,
  TeamRequestType,
} from '../../constant/team-request';
import { IoMdNotificationsOutline } from 'react-icons/io';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import studentApi from '../../apis/student.api';
import { Student } from '../../types/student.type';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import ConfirmDialog from './ConfirmDialog';

const Notification = ({ teamId }: { teamId: string }) => {
  const { data: notifications } = useQuery({
    queryKey: ['notifications', teamId],
    queryFn: () => {
      return teamRequestApis.findTeamRequest({
        PageSize: 10,
        PageNumber: 1,
        TeamId: teamId,
        Type: TeamRequestType.Join,
        Status: TeamRequestStatus.Pending,
      });
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subDialogOpen, setSubDialogOpen] = useState<boolean>(false);
  const [subDialogStatus, setSubDialogStatus] = useState<'accept' | 'reject'>(
    'accept',
  );
  const [selectedStudent, setSelectedStudent] = useState<Student>();
  const [selectedTeamRequestId, setSelectedTeamRequestId] =
    useState<string>('');
  const [comment, setComment] = useState<string>('');

  const getStudentDetail = useMutation({
    mutationFn: (accountId: string) =>
      studentApi.getStudentByAccountId(accountId),
  });

  const handleViewProfile = (
    accountId: string,
    comment: string,
    teamRequestId: string,
  ) => {
    setComment(comment);
    setSelectedTeamRequestId(teamRequestId);
    getStudentDetail.mutate(accountId, {
      onSuccess: (data) => {
        setSelectedStudent(data.data.data);
      },
    });
  };

  const handleAcceptRequest = () => {
    setSubDialogOpen(true);
    setSubDialogStatus('accept');
  };

  const handleRejectRequest = () => {
    setSubDialogOpen(true);
    setSubDialogStatus('reject');
  };

  return (
    <>
      <DrawerWithIcon
        title="Invitation"
        icon={
          <IconWithNum
            Icon={IoMdNotificationsOutline}
            number={notifications?.data.data.data.length || 0}
          />
        }
      >
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          {notifications?.data.data.data.map((notification) => (
            <div className="rounded-md border bg-slate-200 px-2 py-1">
              <p className="text-sm italic">Requests to join your team</p>
              <p className="text-lg font-bold">{notification.senderName}</p>
              <p className="text-sm italic">from {notification.senderEmail}</p>
              <DialogTrigger asChild>
                <Button
                  onClick={() =>
                    handleViewProfile(
                      notification.senderId,
                      notification.comment,
                      notification.teamRequestId,
                    )
                  }
                  className="mt-2 w-full"
                  variant="outline"
                >
                  View Profile
                </Button>
              </DialogTrigger>
            </div>
          ))}
          <DialogContent className="w-[800px]">
            <DialogHeader>
              <DialogTitle>Student Profile</DialogTitle>
            </DialogHeader>
            <div className="">
              <div className="flex items-center justify-between">
                <p>
                  {selectedStudent?.studentName} -{' '}
                  {selectedStudent?.studentCode}
                </p>
                <p>Campus: {selectedStudent?.campus}</p>
                <p>{selectedStudent?.studentDepartment}</p>
                <p>Phone: {selectedStudent?.phoneNumber}</p>
              </div>
              <p>Comment: {comment} </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Skill Name</TableHead>
                    <TableHead className="">Description</TableHead>
                    <TableHead className="">Type</TableHead>
                    <TableHead className="">Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {selectedStudent?.skills.map((skill) => (
                    <TableRow key={skill.id}>
                      <TableCell className="font-medium">
                        {skill.skillName}
                      </TableCell>
                      <TableCell>{skill.skillDescription}</TableCell>
                      <TableCell>{skill.skillType}</TableCell>
                      <TableCell className="text-right">
                        {skill.skillLevel}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <ConfirmDialog
                teamId={teamId}
                status={subDialogStatus}
                isOpen={subDialogOpen}
                setIsOpen={setSubDialogOpen}
                selectedTeamRequestId={selectedTeamRequestId}
                setMainDialog={setIsOpen}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleRejectRequest}
                variant="destructive"
              >
                Reject
              </Button>
              <Button
                type="submit"
                onClick={handleAcceptRequest}
                variant="default"
              >
                Accept
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DrawerWithIcon>
    </>
  );
};

export default Notification;
