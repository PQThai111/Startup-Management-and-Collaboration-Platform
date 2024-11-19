import { Event, EventType } from '../../../types/event.type';

interface Props {
  event: Event;
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Manager_Event_Detail({ event, handleOpen }: Props) {
  const startHandle = new Date(event.startDate);
  const shours = startHandle.getHours().toString().padStart(2, '0');
  const sminutes = startHandle.getMinutes().toString().padStart(2, '0');
  const sday = startHandle.getDate().toString().padStart(2, '0');
  const smonth = (startHandle.getMonth() + 1).toString().padStart(2, '0');
  const syear = startHandle.getFullYear();

  const formattedTime = `${shours}:${sminutes}  ${sday}-${smonth}-${syear}`;

  const endHandle = new Date(event.endDate);
  const ehours = endHandle.getHours().toString().padStart(2, '0');
  const eminutes = endHandle.getMinutes().toString().padStart(2, '0');
  const eday = endHandle.getDate().toString().padStart(2, '0');
  const emonth = (endHandle.getMonth() + 1).toString().padStart(2, '0');
  const eyear = endHandle.getFullYear();

  const formattedETime = `${ehours}:${eminutes}   ${eday}-${emonth}-${eyear}`;

  var eventType;
  if (event.type == EventType.Seminar) {
    eventType = 'Seminar';
  } else if (event.type == EventType.Meeting) {
    eventType = 'Meeting';
  } else {
    eventType = 'Workshop';
  }
  return (
    <div className="h-[95%] w-[70%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">
          Event Information
        </div>
        <button
          onClick={handleOpen}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>
      <div className="h-full overflow-y-auto py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-8 space-y-6">
            <div className="flex h-[30%] items-center justify-center">
              <div className="h-full w-full">
                <img className="h-full w-full" src={event.coverImage} alt="" />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Name
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {event.title}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Description
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {event.description}
                {event.description}
                {event.description}
                {event.description}
                {event.description}
                {event.description}
                {event.description}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Location
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {event.location}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Time
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {formattedTime} - {formattedETime}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Type
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {eventType}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Tag
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {event.tag}
              </div>
            </div>
            <div className="col-span-12 flex items-center justify-start pb-10">
              <button className="h-[45px] w-[100px] rounded-sm bg-green-400">
                Save
              </button>
              <button className="ml-7 h-[45px] w-[100px] rounded-sm bg-red-400">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
