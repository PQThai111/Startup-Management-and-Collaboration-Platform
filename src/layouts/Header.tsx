import IconWithNum from '../common/components/IconWithNum';
import Logo from '../common/components/Logo';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { VscMail } from 'react-icons/vsc';
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

const user = {
  name: 'John Doe',
  avatar_url: 'https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg',
};

const Header = () => {
  let pathname = useLocation().pathname;
  return (
    <div className="grid h-16 grid-cols-10 items-center gap-10 px-20 pb-5 pt-7">
      <div className="col-span-1">
        <Logo />
      </div>
      <div className="col-span-5 pl-20">
        <ul className="flex gap-7">
          <li>
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
      {user ? (
        <div className="col-span-4 flex items-center justify-end gap-5">
          <Link
            to={path.createProject}
            className="h-9 w-[50%] truncate rounded-3xl border-2 border-main px-2 py-1 text-center text-[110%] font-semibold text-main"
          >
            Create A Project
          </Link>
          <IconWithNum
            Icon={VscMail}
            number={0}
            onClick={() => console.log('ahihi')}
          />
          <IconWithNum
            Icon={IoMdNotificationsOutline}
            number={1}
            onClick={() => console.log('ahihi')}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage
                  className="border"
                  src={user.avatar_url}
                  alt="avatar"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <a href="/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/projectManagement">My Projects</a>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="col-span-3 flex justify-end gap-5">
          <button className="h-9 w-24 rounded-3xl border-2 border-main px-2 py-1 font-semibold text-main">
            Login
          </button>
          <button className="h-9 w-24 rounded-3xl border bg-main px-2 py-1 font-semibold text-white">
            Signup
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
