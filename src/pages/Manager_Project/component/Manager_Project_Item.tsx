import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../../../types/project.type';

export default function Manager_Project_Item({
  projectProps,
}: {
  projectProps: Project;
}) {
  const { projectName, leaderName, lecturerName, type, projectStatus } =
    projectProps;

  return (
    <div className="mb-2 grid h-11 grid-cols-12 rounded-md border border-slate-300 bg-white">
      <p className="col-span-3 mr-4 flex items-center truncate pl-2">
        {projectName ?? 'kakakakka'}
      </p>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {leaderName ?? 'kakakakka'}
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {lecturerName ?? 'kakakakka'}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="rounded-sm bg-yellow-500 px-3 py-1 text-white">
          {type}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="rounded-sm bg-green-500 px-3 py-1 text-white">
          {projectStatus}
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
