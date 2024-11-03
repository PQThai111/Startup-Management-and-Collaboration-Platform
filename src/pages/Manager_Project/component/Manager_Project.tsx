import InputSearch from '../../EventPage/components/InputSearch';
import ButtonSearch from '../../EventPage/components/Buttonsearch';
import projectApi from '../../../apis/project.api';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import path from '../../../constant/path';
import Manager_Project_Item from './Manager_Project_Item';

export default function Manager_Project() {
  // const { data : projectsData, isLoading } = useQuery({
  //   queryKey: ['projects', 'queryConfig'],
  //   queryFn: () => {
  //     return projectApi.getProjectss()
  //   },
  //   placeholderData: (prevData) => prevData,
  //   staleTime: 3 * 60 * 1000
  // })

  return (
    <div className="container h-[580px] rounded-lg border border-slate-300 bg-slate-200 p-3 shadow-md">
      <div className="mb-5 grid h-8 grid-cols-12">
        <div className="col-span-10">
          <InputSearch />
        </div>
        <div className="col-span-2">
          <ButtonSearch />
        </div>
      </div>
      <div className="mb-4 grid h-10 grid-cols-12 rounded-md border border-slate-500 bg-slate-500 text-white">
        <div className="col-span-3 flex items-center border-r border-white pl-10">
          Name
        </div>
        <div className="col-span-2 flex items-center border-r border-white pl-2">
          Leader Name
        </div>
        <div className="col-span-2 flex items-center border-r border-white pl-2">
          Lecturer Name
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
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <Manager_Project_Item />
      <div className="text-center">Phaan ne</div>
    </div>
  );
}
