import Logo from '../common/components/Logo';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Link, useLocation } from 'react-router-dom';
import path from '../constant/path';
import classNames from 'classnames';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/app.context';
import { toast } from 'react-toastify';
import { clearLS } from '../util/auth';
import Invitation from './components/Invitation';
import Notification from './components/Notification';
import { Project } from '../types/project.type';
import { useMutation } from '@tanstack/react-query';
import projectApi from '../apis/project.api';

const Header = () => {
  let pathname = useLocation().pathname;
  const { setIsAuthenticated, setProfile, profile } = useContext(AppContext);
  const [project, setProject] = useState<Project>();
  const handleLogout = () => {
    clearLS();
    setIsAuthenticated(false);
    setProfile(null);
    toast.success('Logout Successfully !', { autoClose: 1000 });
  };

  const getCurrentProject = useMutation({
    mutationFn: () => projectApi.getCurrentProject({}),
  });

  useEffect(() => {
    getCurrentProject.mutate(undefined, {
      onSuccess: (projectData) => {
        setProject(projectData.data.data.data[0]);
      },
    });
  }, []);

  return (
    <div className="grid h-16 grid-cols-10 items-center gap-10 px-20 pb-5 pt-7">
      <div className="col-span-1">
        <Logo />
      </div>
      <div className="col-span-5 pl-20">
        <ul className="flex gap-7">
          <li>
            {profile?.role === 3 && (
              <Link
                to={path.home}
                className={classNames(
                  'krona-one-regular font-semibold text-main',
                  {
                    'underline decoration-yellow-500 underline-offset-4':
                      pathname == path.home,
                    '': pathname != path.home,
                  },
                )}
              >
                Home
              </Link>
            )}
            {profile?.role !== 3 && (
              <Link
                to={path.all_management}
                className={classNames(
                  'krona-one-regular font-semibold text-main',
                  {
                    'underline decoration-yellow-500 underline-offset-4':
                      pathname == path.home,
                    '': pathname != path.home,
                  },
                )}
              >
                Home
              </Link>
            )}
          </li>
          <li>
            <Link
              to={path.newFeed}
              className={classNames(
                'krona-one-regular font-semibold text-main',
                {
                  'underline decoration-yellow-500 underline-offset-4':
                    pathname == path.newFeed,
                  '': pathname != path.newFeed,
                },
              )}
            >
              Events
            </Link>
          </li>
          <li className="krona-one-regular font-semibold text-main decoration-yellow-500 hover:underline hover:underline-offset-4">
            <Link
              to={path.project}
              className={classNames(
                'krona-one-regular font-semibold text-main',
                {
                  'underline decoration-yellow-500 underline-offset-4':
                    pathname == path.project,
                  '': pathname != path.project,
                },
              )}
            >
              Projects
            </Link>
          </li>
        </ul>
      </div>
      {profile ? (
        <div className="col-span-4 flex items-center justify-end gap-5">
          {profile?.role == 3 && (
            <>
              {' '}
              <Link
                to={path.createProject}
                className="h-9 w-[50%] truncate rounded-3xl border-2 border-main px-2 py-1 text-center text-[110%] font-semibold text-main"
              >
                Create A Project
              </Link>
              <Invitation />
              {project?.team.teamId &&
                project?.team.members.find(
                  (item) => item.studentId === profile.studentId,
                )?.isLeader && <Notification teamId={project?.team.teamId} />}
            </>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="border border-black"
                  src={
                    profile.avatarUrl ||
                    'https://cdn-icons-png.flaticon.com/512/1144/1144760.png'
                  }
                  alt="avatar"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                {profile?.role == 3 && (
                  <DropdownMenuItem>
                    <a href="/projectManagement">My Projects</a>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem>
                  <a href="/inbox">Inbox</a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="col-span-4 flex justify-end gap-5">
          <Link
            to={path.login}
            className="h-9 w-24 rounded-3xl border-2 border-main px-2 py-1 text-center font-semibold text-main"
          >
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
