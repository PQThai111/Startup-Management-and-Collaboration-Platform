import { Event } from '../../../types/event.type';

export default function EventItem({ eventProps }: { eventProps: Event }) {
  const {coverImage, id, title, description, location, type, startDate, endDate, tag, registrationLink} = eventProps;

  return (
      <div className="h-[400] w-full bg-[#F7F7F7] grid grid-cols-10 p-3 border border-black rounded-md mb-3">
        <div className="h-[275px] w-full col-span-3 p-2">
          <img src={coverImage} className="h-full w-full object-cover" />
        </div>
        <div className="h-[266px] col-span-7 p-2">
          <div>
            <p className="mt-2 text-lg font-[500] text-[#FF7426] ">{title}</p>
          </div>
          <div>
            <p className="text-lg font-[400] truncate mb-20">{description}</p>
          </div>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] truncate">
              <span className='font-bold'>Time</span>: {startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()} On {endDate.getDay().toString()}.{startDate.getMonth().toString()}.{endDate.getFullYear().toString()}
            </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Location</span>: {location}
          </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Event Type</span>: {type === 0 ? "Seminar" : "Workshop"}
          </p>
          <div className='flex justify-between'>
            <p className="text-ellipsis text-justify text-[#686868] truncate">
              {tag}
            </p>
            <a className="text-ellipsis text-justify text-[#686868] truncate border border-red-700">
              {registrationLink}
            </a>
          </div>
        </div>
      </div>
  )
}
