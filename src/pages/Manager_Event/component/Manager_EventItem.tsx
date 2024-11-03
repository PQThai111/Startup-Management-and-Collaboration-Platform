import { Link } from 'react-router-dom';
// import { Event } from '../../../types/event.type';
// import path from '../../../constant/path';

export default function EventItem() {
  return (
    <div className="mb-2 grid h-11 grid-cols-12 rounded-md border border-slate-300 bg-white">
      <p className="col-span-3 mr-4 flex items-center truncate pl-2">
        Name Lorem ipsum dolor sit amet abc xyz
      </p>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        Nha van hoa
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        08:00 06-07-2025
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="rounded-sm bg-yellow-500 px-3 py-1 text-white">
          Workshop
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="rounded-sm bg-red-500 px-3 py-1 text-white">
          Not Existed
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Link to={''} className="rounded-sm bg-slate-400 px-3 py-1 text-white">
          Show detail
        </Link>
      </div>
    </div>
  );
}
