import { Event } from '../../../types/event.type';

export default function EventItem({ eventProps }: { eventProps: Event }) {
  const {coverImage, title, description, location, type, startDate, endDate, tag, registrationLink} = eventProps;

  return (
      <div className="h-[340px] w-full bg-[#F7F7F7] grid grid-cols-10 p-3 border border-black rounded-md mb-3">
        <div className="h-full col-span-3 p-2 overflow-hidden">
          <img src={coverImage} className="h-full w-full object-cover " />
        </div>
        <div className="col-span-7 p-2">
          <div>
            <p className="mt-2 text-3xl font-[500]">{title}</p>
          </div>
          <div>
            <p className="text-lg font-[400] truncate mb-16">{description}</p>
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
            <a href={registrationLink} target='_blank' className="flex justify-between text-ellipsis text-justify text-[#F4A258] font-bold">
              Register Now
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"     className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
  )
}
