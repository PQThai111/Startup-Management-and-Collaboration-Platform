import { useQuery } from '@tanstack/react-query';
import eventApi from '../../../apis/event.api';
import CreateButton from './CreateButton';
import Event_Item from './Manager_EventItem';
import { QueryConfig as ConfigPaging, Event } from '../../../types/event.type';
import { useEventQueryConfig } from '../../../hooks/useQueryConfig';
import Pagination from '../../../components/pagination';
import path from '../../../constant/path';
import { useState } from 'react';
import useSearchEvent from '../hook/useSearchEvent';

export type QueryConfig = {
  [key in keyof ConfigPaging]: string;
};

export default function Manager_Event() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Event>();
  const queryConfig = useEventQueryConfig();
  const { register, onSubmitSearch } = useSearchEvent();
  //isLoading
  const { data: eventsData } = useQuery({
    queryKey: ['events', queryConfig],
    queryFn: () => {
      return eventApi.getEvents(queryConfig as QueryConfig);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (mentor: Event) => {
    setIsOpen(!isOpen);
    setIsEdit(mentor);
  };

  return (
    <div className="container h-[580px] rounded-lg border border-slate-300 bg-slate-200 p-3 shadow-md">
      <form onSubmit={onSubmitSearch} className="mb-5 grid h-8 grid-cols-12">
        <div className="col-span-8">
          <input
            type="text"
            placeholder="Search Any Project !"
            className="block w-full rounded-md border border-slate-300 bg-white py-2 pl-9 shadow-sm placeholder:italic placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
            {...register('SearchTerm')}
          />
        </div>
        <div className="col-span-2">
          <div className="ml-3 rounded-md border border-black text-center">
            <button className="w-full rounded-md bg-black p-1.5 text-white">
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <CreateButton />
        </div>
      </form>
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
      <div className="min-h-[420px]">
        {eventsData && (
          <>
            {eventsData?.data?.data?.data.map((event) => (
              <Event_Item
                key={event.id}
                eventProps={event}
                handleClose={handleClose}
                handleSelect={handleSelect}
                isOpen={isOpen}
                isEdit={isEdit as Event}
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        queryConfig={queryConfig}
        PageSize={eventsData?.data.data.pagination.limit as number}
        pathName={path.all_management + '/event'}
      />
    </div>
  );
}
