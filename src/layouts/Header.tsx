import { Link, useLocation } from 'react-router-dom';
import Logo from '../common/components/Logo';
import path from '../constant/path';
import classNames from 'classnames';

const Header = () => {
  let pathname = useLocation().pathname

  return (
    <div className="grid h-16 grid-cols-10 items-center gap-9 px-20 pb-5 pt-7 mb-5">
      <div className="col-span-1">
        <Logo />
      </div>
      <div className="col-span-6 pl-20">
        <ul className="flex gap-7">
          <li >
            <Link to={path.home} className={classNames('text-main krona-one-regular font-semibold', {
              'underline decoration-yellow-500 underline-offset-4': pathname == path.home,
              '': pathname != path.home,
            })}>
              Home
            </Link>
          </li>
          <li>
            <Link to={path.newFeed} className={classNames('text-main krona-one-regular font-semibold', {
                'underline decoration-yellow-500 underline-offset-4': pathname == path.newFeed,
                '': pathname != path.newFeed,
              })}>
              New feed
            </Link>
          </li>
          <li className="text-main krona-one-regular font-semibold decoration-yellow-500 hover:underline hover:underline-offset-4">
            <Link to={path.project} className={classNames('text-main krona-one-regular font-semibold', {
                'underline decoration-yellow-500 underline-offset-4': pathname == path.project,
                '': pathname != path.project,
              })}>
              Projects
            </Link>
          </li>
        </ul>
      </div>
      <div className='col-span-1 w-36'>
        <Link to={path.createProject} className='text-main h-9 font-bold'>
          Create a project
        </Link>
      </div>
      <div className="col-span-2 flex justify-end gap-5">
        <button className="text-main border-main h-9 w-24 rounded-3xl border-2 px-2 py-1 font-semibold">
          Login
        </button>
        <button className="bg-main h-9 w-24 rounded-3xl border px-2 py-1 font-semibold text-white">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Header;
