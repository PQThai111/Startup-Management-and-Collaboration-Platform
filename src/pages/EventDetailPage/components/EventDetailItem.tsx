import { Link } from 'react-router-dom';
import { Event } from '../../../types/event.type';
import path from '../../../constant/path';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

export default function EventDetailItem({
  eventProp,
  handleJoinEvent,
}: {
  eventProp: Event;
  handleJoinEvent: () => void;
}) {
  const { profile } = useContext(AppContext);
  const { coverImage, title, description, location, type, tag } = eventProp;

  return (
    <div className="mb-3 h-[600px] w-full rounded-md border border-black bg-[#F7F7F7] p-3">
      <div className="flex p-2">
        <Link to={path.newFeed}>BACK</Link>
        <p className="ml-3 text-ellipsis border-l-2 border-black pl-3 text-justify text-[#686868]">
          <span className="font-bold"></span>
          {type === 0 ? 'Seminar' : 'Workshop'}
        </p>
      </div>
      <div className="grid h-[85%] grid-cols-10">
        <div className="col-span-3 h-full overflow-hidden p-2">
          <img src={coverImage} className="h-full w-full object-cover" />
        </div>
        <div className="col-span-7 pl-2">
          <div>
            <p className="mt-2 text-3xl font-[500]">{title}</p>
          </div>
          <p className="mt-2 text-ellipsis text-justify text-[#686868]">
            aaaa
            {/* <span className='font-bold'>Time</span>: {startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()} <span className='font-bold'> On</span> {endDate.getDay().toString()}.{startDate.getMonth().toString()}.{endDate.getFullYear().toString()} */}
          </p>
          <p className="mb-5 text-ellipsis text-justify text-[#686868]">
            <span className="font-bold">Location</span>: {location}
          </p>
          <div>
            <p className="mb-16 text-lg font-[400]">{description}</p>
          </div>

          <p className="text-ellipsis text-justify text-[#686868]">{tag}</p>
          {profile?.role == 3 && (
            <div className="">
              <button
                type="button"
                onClick={() => {
                  handleJoinEvent();
                }}
                className="w-full rounded-md bg-black p-1.5 text-white"
              >
                Join
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
