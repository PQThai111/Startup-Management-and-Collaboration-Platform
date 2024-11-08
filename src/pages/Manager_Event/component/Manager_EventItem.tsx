import { Link } from 'react-router-dom';
import { Event } from '../../../types/event.type';

export default function Event_Item({ eventProps }: { eventProps: Event }) {
  const { title, location, startDate, type } = eventProps;

  return (
    <div className="mb-2 grid h-11 grid-cols-12 rounded-md border border-slate-300 bg-white">
      <p className="col-span-3 mr-4 flex items-center truncate pl-2">{title}</p>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {location}
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {startDate}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="rounded-sm bg-yellow-500 px-3 py-1 text-white">
          {type}
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
