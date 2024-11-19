import { Event, EventType } from '../../../types/event.type';
import classNames from 'classnames';
import Popover from '../../../components/popover';
import { Button } from '../../../components/ui/button';
import Manager_Event_Detail from './Manager_Event_Detail';

export default function Event_Item({
  eventProps,
  handleClose,
  handleSelect,
  isOpen,
  isEdit,
}: {
  eventProps: Event;
  isOpen: boolean;
  isEdit: Event;
  handleClose: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSelect: (mentor: Event) => void;
}) {
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
  const month = (startHandle.getMonth() + 1).toString().padStart(2, '0');
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
            'bg-red-500 text-white': new Date(endDate) < new Date(),
          })}
        >
          {status}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <Popover
          initialOpen={isOpen}
          renderPopover={
            isEdit && (
              <Manager_Event_Detail event={isEdit} handleOpen={handleClose} />
            )
          }
        >
          <Button
            className="bg-slate-500"
            onClick={() => handleSelect(eventProps)}
          >
            <div className="flex items-center justify-center">
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
              <div className="text-medium ml-2">Details</div>
            </div>
          </Button>
        </Popover>
      </div>
    </div>
  );
}
