import { HTMLAttributes } from 'react';
import { Project } from '../../../types/project.type';
import { StartupCategory } from '../../../constant/startup_category';

const StartupIdea = ({
  project,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { project: Project }) => {
  return (
    <div
      className={`w-full justify-between rounded-xl bg-[#EEF2F5] px-3 py-3 ${className}`}
      {...props}
    >
      <div className="">
        <p className="text-xl font-bold">Startup Idea</p>
        <div className="">
          <div className="flex gap-2">
            <p className="font-semibold">Title:</p>{' '}
            {project.team.startupIdea.title}
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Description:</p>{' '}
            {project.team.startupIdea.description}
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Category:</p>{' '}
            {StartupCategory[project.team.startupIdea.category]}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupIdea;
