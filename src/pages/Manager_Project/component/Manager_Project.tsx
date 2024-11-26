import InputSearch from '../../EventPage/components/InputSearch';
import ButtonSearch from '../../EventPage/components/Buttonsearch';
import projectApi from '../../../apis/project.api';
import { useQuery } from '@tanstack/react-query';
import path from '../../../constant/path';
import Manager_Project_Item from './Manager_Project_Item';
import Pagination from '../../../components/pagination';
import { Project, ProjectConfig } from '../../../types/project.type';
import { useState } from 'react';
import { useProjectQueryConfig } from '../../../hooks/useQueryConfig';

export type QueryConfig = {
  [key in keyof ProjectConfig]: string;
};

export default function Manager_Project() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState<Project>();
  const queryConfig = useProjectQueryConfig();
  //, isLoading
  const { data: projectsData } = useQuery({
    queryKey: ['projects', queryConfig],
    queryFn: () => {
      return projectApi.getProjects(queryConfig as QueryConfig);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const handleClose = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (project: Project) => {
    setIsOpen(!isOpen);
    setIsEdit(project);
  };

  console.log(projectsData?.data.data.data);

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
      <div className="min-h-[420px]">
        {projectsData && (
          <>
            {projectsData?.data?.data?.data.map((project) => (
              <Manager_Project_Item
                key={project.id}
                projectProps={project}
                handleClose={handleClose}
                handleSelect={handleSelect}
                isOpen={isOpen}
                isEdit={isEdit as Project}
              />
            ))}
          </>
        )}
      </div>
      <Pagination
        queryConfig={queryConfig}
        PageSize={projectsData?.data.data.pagination.limit as number}
        pathName={path.manager_project_management}
      />
    </div>
  );
}
