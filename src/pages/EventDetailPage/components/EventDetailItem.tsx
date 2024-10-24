import { Link } from 'react-router-dom';
import { Event } from '../../../types/event.type';
import path from '../../../constant/path';


export default function EventDetailItem({ eventProps }: { eventProps: Event }) {
  const {coverImage, title, description, location, type,  tag} = eventProps;

  return (
      <div className="h-[600px] w-full bg-[#F7F7F7] p-3 border border-black rounded-md mb-3">
        <div className="p-2 flex">
          <Link to={path.newFeed}>
            BACK
          </Link>
          <p className="border-l-2 border-black text-ellipsis text-justify text-[#686868] ml-3 pl-3">
            <span className='font-bold'></span>{type === 0 ? "Seminar" : "Workshop"}
          </p>
        </div>
        <div className='h-[85%] grid grid-cols-10'>
          <div className="h-full col-span-3 p-2 overflow-hidden">
            <img src={coverImage} className="h-full w-full object-cover" />
          </div>
          <div className='col-span-7 pl-2'>
            <div>
              <p className="mt-2 text-3xl font-[500] ">{title}</p>
            </div>
            <p className="mt-2 text-ellipsis text-justify text-[#686868] ">
              aaaa
              {/* <span className='font-bold'>Time</span>: {startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()} <span className='font-bold'> On</span> {endDate.getDay().toString()}.{startDate.getMonth().toString()}.{endDate.getFullYear().toString()} */}
            </p>
            <p className="text-ellipsis text-justify text-[#686868] mb-5">
              <span className='font-bold'>Location</span>: {location}
            </p>
            <div>
              <p className="text-lg font-[400] mb-16">{description}</p>
            </div>

              <p className="text-ellipsis text-justify text-[#686868] ">
                {tag}
              </p>
              <div className=''>
                <button className='bg-black w-full p-1.5 text-white rounded-md'>
                  Join
                </button>
              </div>
          </div>
        </div>
      </div>
  )
}
