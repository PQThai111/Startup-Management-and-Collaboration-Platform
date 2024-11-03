import { useQuery } from '@tanstack/react-query';
import AsideFilter from '../../EventPage/components/AsideFilter';
import ButtonSearch from '../../EventPage/components/Buttonsearch';
import eventApi from '../../../apis/event.api';
import EventItem from './Manager_EventItem';
import InputSearch from '../../EventPage/components/InputSearch';
import CreateButton from './CreateButton';

export default function Manager_Event() {
  // const { data : eventsData, isLoading } = useQuery({
  //   queryKey: ['events', 'queryConfig'],
  //   queryFn: () => {
  //     return eventApi.getEventss()
  //   },
  //   placeholderData: (prevData) => prevData,
  //   staleTime: 3 * 60 * 1000
  // })

  return (
    <div className="container h-[580px] rounded-lg border border-slate-300 bg-slate-200 p-3 shadow-md">
      <div className="mb-5 grid h-8 grid-cols-12">
        <div className="col-span-8">
          <InputSearch />
        </div>
        <div className="col-span-2">
          <ButtonSearch />
        </div>
        <div className="col-span-2">
          <CreateButton />
        </div>
      </div>
      <div className="mb-4 grid h-10 grid-cols-12 rounded-md border border-slate-500 bg-slate-500 text-white">
        <div className="col-span-3 flex items-center border-r border-white pl-10">
          Name
        </div>
        <div className="col-span-2 flex items-center border-r border-white pl-2">
          Location
        </div>
        <div className="col-span-2 flex items-center border-r border-white pl-2">
          Time
        </div>
        <div className="col-span-1 flex items-center justify-center border-r border-white">
          Type
        </div>
        <div className="col-span-2 flex items-center justify-center border-r border-white">
          Status
        </div>
        <div className="col-span-2 flex items-center justify-center">
          Action
        </div>
      </div>
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />
      <EventItem />

      <div className="text-center">Phaan ne</div>
    </div>
  );
}
