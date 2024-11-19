import { useQuery } from '@tanstack/react-query';
import ButtonSearch from '../../EventPage/components/Buttonsearch';
import eventApi from '../../../apis/event.api';
import InputSearch from '../../EventPage/components/InputSearch';
import CreateButton from './CreateButton';
import Event_Item from './Manager_EventItem';
import { QueryConfig as ConfigPaging, Event } from '../../../types/event.type';
import { useEventQueryConfig } from '../../../hooks/useQueryConfig';
import Pagination from '../../../components/pagination';
import path from '../../../constant/path';
import { useState } from 'react';

export type QueryConfig = {
  [key in keyof ConfigPaging]: string;
};

export default function Manager_Event() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Event>();
  const queryConfig = useEventQueryConfig();
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
        pathName={path.manager_project_management + '/event'}
      />
    </div>
  );
}
