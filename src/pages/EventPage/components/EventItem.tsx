import { Link } from 'react-router-dom';
import { Event } from '../../../types/event.type';
import path from '../../../constant/path';

export default function EventItem({ eventProps }: { eventProps: Event }) {
  const {
    id,
    title,
    description,
    location,
    type,
    startDate,
    endDate,
    tag,
    isMandatory,
    registrationLink,
  } = eventProps;
  let start = new Date(startDate);
  let end = new Date(endDate);

  return (
    <Link
      to={`${path.newFeed}` + '/' + `${id}`}
      className="mb-3 grid h-[340px] w-full grid-cols-10 rounded-md border border-black bg-[#F7F7F7] p-3"
    >
      <div className="col-span-3 h-full overflow-hidden p-2">
        <img
          src={eventProps.coverImage}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="col-span-7 p-2">
        <div>
          <p className="mt-2 text-3xl font-[500]">{title}</p>
        </div>
        <div>
          <p className="mb-16 truncate text-lg font-[400]">{description}</p>
        </div>
        <p className="mt-2 truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Time</span>: {start.getHours()}:
          {start.getMinutes()} - {end.getHours()}:{end.getMinutes()} On{' '}
          {end.getDay().toString()}.{start.getMonth().toString()}.
          {end.getFullYear().toString()}
        </p>
        <p className="truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Location</span>: {location}
        </p>
        <p className="truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Event Type</span>:{' '}
          {type === 0 ? 'Seminar' : 'Workshop'}
        </p>
        <p className="truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Domain</span>:{' '}
          {isMandatory ? 'True' : 'False'}
        </p>
        <p className="truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Is Mandatory</span>:{' '}
          {isMandatory ? 'True' : 'False'}
        </p>
        <div className="flex justify-between">
          <p className="truncate text-ellipsis text-justify text-[#686868]">
            <span className="font-bold">Hash Tag</span>: {tag}
          </p>
          <a
            href={registrationLink}
            target="_blank"
            className="flex justify-between text-ellipsis text-justify font-bold text-[#F4A258]"
          >
            Register Now
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </Link>
  );
}
