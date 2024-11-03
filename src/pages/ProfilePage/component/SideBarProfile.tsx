import { Link, Outlet, useLocation } from 'react-router-dom'
import path from '../../../constant/path'
import classNames from 'classnames'
import Logo from '../../../common/components/Logo'
import IconWithNum from '../../../common/components/IconWithNum'
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import { VscMail } from 'react-icons/vsc'
import { IoMdNotificationsOutline } from 'react-icons/io'

export default function SideBarLayout() {

  const user = {
    name: 'John Doe',
    avatar_url:
      'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
  };

  let pathName = useLocation().pathname
  return (
    <div className='grid grid-cols-12 h-[100vh]'>
      <div className='py-4 px-2 col-start-1 col-span-2 bg-slate-200 h-full'>
        <div className='flex items-end ml-3'>
          <Logo/>
          <div className='ml-2 text-lg font-sans'>MANAGER</div>
        </div>
        <div className='mt-4'>
          <Link
            to={path.manager_project_management}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-black': path.manager_project_management === pathName,
                  'text-black hover:bg-slate-100': path.manager_project_management !== pathName
                }
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 ml-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
              </svg>
              Project
            </div>
          </Link>
          <Link
            to={path.manager_event_management}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-black': path.manager_project_management +'/'+ path.manager_event_management === pathName,
                  'text-black hover:bg-slate-100': path.manager_project_management +'/'+ path.manager_event_management !== pathName
                }
              )}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2 ml-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
              </svg>
              Event
            </div>
          </Link>
          <Link
            to={path.manager_approval_management}
          >
            <div
              className={classNames(
                'py-3 px-3 rounded-lg mb-2 font-medium flex items-center transition-background duration-100',
                {
                  'bg-sky-300 text-black': path.manager_project_management +'/'+ path.manager_approval_management === pathName,
                  'text-black hover:bg-slate-100': path.manager_project_management +'/'+ path.manager_approval_management !== pathName
                }
              )}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-6 mr-2 ml-3'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75'
                />
              </svg>
              Approval
            </div>
          </Link>
        </div>
      </div>
      <div className='col-span-10'>
        <div><Outlet/></div>
      </div>
    </div>
  )
}
