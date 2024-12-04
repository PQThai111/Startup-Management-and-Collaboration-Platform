import { useMutation } from '@tanstack/react-query';
import DrawerWithIcon from '../../common/components/DrawerWithIcon';
import IconWithNum from '../../common/components/IconWithNum';
import { VscMail } from 'react-icons/vsc';
import teamRequestApis from '../../apis/team-request.api';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { TeamRequest } from '../../types/team-request.type';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';

const Invitation = () => {
  const { profile } = useContext(AppContext);
  const nav = useNavigate();
  const [invitations, setInvitations] = useState<
    (TeamRequest & {
      teamLeaderName: string;
      projectName: string;
      projectId: string;
    })[]
  >([]);

  const getAllRequest = useMutation({
    mutationFn: () =>
      teamRequestApis.findTeamRequest({
        PageSize: 10,
        PageNumber: 1,
        ReceiverId: profile?.studentId,
      }),
  });

  useEffect(() => {
    getAllRequest.mutate(undefined, {
      onSuccess: (data) => {
        setInvitations(data.data.data.data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <>
      <DrawerWithIcon
        title="Invitation"
        icon={
          <IconWithNum
            Icon={VscMail}
            number={invitations.length}
            // onClick={() => console.log('ahihi')}
          />
        }
      >
        {invitations.map((invitation) => (
          <div className="rounded-md border bg-slate-200 px-2 py-1">
            <p className="text-sm italic">You are invited to join project</p>
            <p className="text-lg font-bold">{invitation.projectName}</p>
            <p className="text-sm italic">
              Send by: {invitation.teamLeaderName}
            </p>
            <Button
              onClick={() => nav(`/projectManagement/${invitation.projectId}`)}
              className="mt-2 w-full"
              variant="outline"
            >
              View Project
            </Button>
          </div>
        ))}
      </DrawerWithIcon>
    </>
  );
};

export default Invitation;
