import classNames from 'classnames';
import ProfileInformation from './ProfileInformation';
import { Link, Outlet, useLocation } from 'react-router-dom';
import path from '../../../constant/path';

export default function Profile() {
  let pathName = useLocation().pathname;
  return (
    <div className="container mx-auto mb-10 mt-10 px-32">
      <div className="grid h-[500px] grid-cols-10 border">
        <div className="col-span-2 bg-slate-100">
          <div className="flex">
            <div className="h-20 w-28 rounded-sm border-b-2">
              <img src="" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="col-span-7 h-20 w-full border-b-2 p-2">
              <div className="text-lg font-semibold">Họ Và Tên</div>
              <div>SE302233</div>
            </div>
          </div>
          <div className="mt-4">
            <Link to={path.profile}>
              <div
                className={classNames(
                  'transition-background mb-2 flex items-center rounded-lg px-3 py-3 font-medium duration-100',
                  {
                    'bg-sky-300 text-black': path.profile === pathName,
                    'text-black hover:bg-slate-100': path.profile !== pathName,
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
                    d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
                Profile information
              </div>
            </Link>
            <Link to={path.manager_approval_management}>
              <div
                className={classNames(
                  'transition-background mb-2 flex items-center rounded-lg px-3 py-3 font-medium text-red-600 duration-100',
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
        <div className="col-span-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
