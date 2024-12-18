import { Link } from 'react-router-dom';
import { Event } from '../../../types/event.type';
import path from '../../../constant/path';

export default function EventItem({ eventProps }: { eventProps: Event }) {
  const {id, title, description, location, type, startDate, endDate, tag, registrationLink} = eventProps;
  let start = new Date(startDate);
  let end = new Date(endDate);

  return (
      <Link to={`${path.newFeed}`+ "/" + `${id}`} className="h-[340px] w-full bg-[#F7F7F7] grid grid-cols-10 p-3 border border-black rounded-md mb-3">
        <div className="h-full col-span-3 p-2 overflow-hidden">
          <img src="https://s3-alpha-sig.figma.com/img/0f72/2667/d6a634bbd4e7c1dfc12adaf9e8ce1984?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PZae~MRFDyeiqgAfKt4RLCHnU5~VtTfmFV7mqTlM1gH9R7oI8ORJFXCcZfRl-H71sOFoMQ~Pl2maVdMMR6ozMIJj-Qb9uXRzpGiWkFgelhVMoh0JY36zO3ZT0zB2ViscAIRuO0XmWGZLOBDs7fcF1Sb~5uOHv8dIjCdIS1QVAj8XZOM4FbD3gW5eRO4Hl8o54iOFbGqHJAfQikZGyv4cJppvIShWwk3mzuis3XhOgLRyig7YVgUn3WPhbe08kVvwttKYbVbM5gwmAkVfXBd-HWyxQ1AAkbwSz~m-cb9zXzzRjvVeTGgztWvNts6ps0yUrCaednr5RjFjGz4eVMwS3w__" className="h-full w-full object-cover " />
        </div>
        <div className="col-span-7 p-2">
          <div>
            <p className="mt-2 text-3xl font-[500]">{title}</p>
          </div>
          <div>
            <p className="text-lg font-[400] truncate mb-16">{description}</p>
          </div>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] truncate">
              <span className='font-bold'>Time</span>: {start.getHours()}:{start.getMinutes()} - {end.getHours()}:{end.getMinutes()} On {end.getDay().toString()}.{start.getMonth().toString()}.{end.getFullYear().toString()}
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
      </Link>
  )
}
