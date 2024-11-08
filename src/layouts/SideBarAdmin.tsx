import React from 'react';
import Logo from '../common/components/Logo';
import { Link, Outlet, useLocation } from 'react-router-dom';
import path from '../constant/path';
import classNames from 'classnames';
import IconWithNum from '../common/components/IconWithNum';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { VscMail } from 'react-icons/vsc';
import { IoMdNotificationsOutline } from 'react-icons/io';

export default function SideBarAdmin() {
  const user = {
    name: 'John Doe',
    avatar_url:
      'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
  };

  let pathName = useLocation().pathname;
  return (
    <div className="grid h-[100vh] grid-cols-12">
      <div className="col-span-2 col-start-1 h-full bg-slate-200 px-2 py-4">
        <div className="ml-3 flex items-end">
          <Logo />
          <div className="ml-2 font-sans text-lg">ADMIN</div>
        </div>
        <div className="mt-5">
          <Link to={path.admin_account_management}>
            <div
              className={classNames(
                'transition-background mb-2 flex items-center rounded-lg px-3 py-3 font-medium duration-100',
                {
                  'bg-sky-300 text-black':
                    path.admin_account_management === pathName,
                  'text-black hover:bg-slate-100':
                    path.admin_account_management !== pathName,
                },
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-3 mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              Account management
            </div>
          </Link>
          <Link to={path.admin_dashboard}>
            <div
              className={classNames(
                'transition-background mb-2 flex items-center rounded-lg px-3 py-3 font-medium duration-100',
                {
                  'bg-sky-300 text-black':
                    path.admin_account_management +
                      '/' +
                      path.admin_dashboard ===
                    pathName,
                  'text-black hover:bg-slate-100':
                    path.admin_account_management +
                      '/' +
                      path.admin_dashboard !==
                    pathName,
                },
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-3 mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                />
              </svg>
              Dashboard
            </div>
          </Link>
          <Link to={path.manager_approval_management}>
            <div
              className={classNames(
                'transition-background mb-2 flex items-center rounded-lg px-3 py-3 font-medium text-red-500 duration-100',
                {
                  'bg-sky-300 text-black':
                    path.manager_project_management +
                      '/' +
                      path.manager_approval_management ===
                    pathName,
                  'text-black hover:bg-slate-100':
                    path.manager_project_management +
                      '/' +
                      path.manager_approval_management !==
                    pathName,
                },
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="ml-3 mr-2 size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              Logout
            </div>
          </Link>
        </div>
      </div>
      <div className="col-span-10 h-full">
        <div className="w-full bg-slate-100 py-3">
          <div className="flex items-center justify-end gap-5 pr-10">
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
            <Avatar>
              <AvatarImage src={user.avatar_url} alt="avatar" />
            </Avatar>
          </div>
        </div>
        <div className="h-[90%] p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
