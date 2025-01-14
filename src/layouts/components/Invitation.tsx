import { useQuery } from '@tanstack/react-query';
import DrawerWithIcon from '../../common/components/DrawerWithIcon';
import IconWithNum from '../../common/components/IconWithNum';
import { VscMail } from 'react-icons/vsc';
import teamRequestApis from '../../apis/team-request.api';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { Button } from '../../components/ui/button';
import { useNavigate } from 'react-router-dom';
import { TeamRequestStatus } from '../../constant/team-request';

const Invitation = () => {
  const { profile } = useContext(AppContext);
  const nav = useNavigate();

  const { data } = useQuery({
    queryKey: [
      'invitations',
      {
        PageSize: 10,
        PageNumber: 1,
        ReceiverId: profile?.id,
        Status: TeamRequestStatus.Pending,
      },
    ],
    queryFn: () =>
      teamRequestApis.findTeamRequest({
        PageSize: 10,
        PageNumber: 1,
        ReceiverId: profile?.id,
        Status: TeamRequestStatus.Pending,
      }),
  });

  return (
    <>
      <DrawerWithIcon
        title="Invitation"
        icon={
          <IconWithNum
            Icon={VscMail}
            number={data?.data.data.data.length || 0}
            // onClick={() => console.log('ahihi')}
          />
        }
      >
        {data?.data.data.data.map((invitation) => (
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
