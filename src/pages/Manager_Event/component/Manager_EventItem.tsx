import { Link } from 'react-router-dom';
import { Event, EventType } from '../../../types/event.type';
import classNames from 'classnames';

export default function Event_Item({ eventProps }: { eventProps: Event }) {
  const { title, location, startDate, type, endDate } = eventProps;
  var eventType;
  if (type == EventType.Seminar) {
    eventType = 'Seminar';
  } else if (type == EventType.Meeting) {
    eventType = 'Meeting';
  } else {
    eventType = 'Workshop';
  }

  var status;
  if (new Date(startDate) > new Date()) {
    status = 'Coming';
  } else if (
    new Date(startDate) <= new Date() &&
    new Date() <= new Date(endDate)
  ) {
    status = 'Occur';
  } else if (new Date(endDate) < new Date()) {
    status = 'Finished';
  }

  const startHandle = new Date(startDate);

  const hours = startHandle.getHours().toString().padStart(2, '0');
  const minutes = startHandle.getMinutes().toString().padStart(2, '0');
  const day = startHandle.getDate().toString().padStart(2, '0');
  const month = (startHandle.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because getMonth() returns zero-based month
  const year = startHandle.getFullYear();

  const formattedTime = `${hours}:${minutes}   ${day}-${month}-${year}`;

  return (
    <div className="mb-2 grid h-11 grid-cols-12 rounded-md border border-slate-300 bg-white">
      <p className="col-span-3 mr-4 flex items-center truncate pl-2">{title}</p>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {location}
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {formattedTime}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div
          className={classNames('rounded-sm px-3 py-1 text-white', {
            'bg-blue-900': type == EventType.Seminar,
            'bg-blue-600': type == EventType.Meeting,
            'bg-blue-300': type == EventType.Workshop,
          })}
        >
          {eventType}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div
          className={classNames('rounded-sm px-3 py-1 text-black', {
            'bg-yellow-500': new Date(startDate) > new Date(),
            'bg-green-500':
              new Date(startDate) <= new Date() &&
              new Date() <= new Date(endDate),
            'bg-red-500': new Date(endDate) < new Date(),
          })}
        >
          {status}
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
