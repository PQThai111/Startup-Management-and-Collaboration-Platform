import { Project, ProjectList } from '../../../types/project.type';
import classNames from 'classnames';
import Popover from '../../../components/popover';
import Manager_Project_Detail from './Manager_Project_Detail';
import { Button } from '../../../components/ui/button';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';
import { useNavigate } from 'react-router-dom';
import path from '../../../constant/path';
import { useContext } from 'react';
import { AppContext } from '../../../context/app.context';

export default function Manager_Project_Item({
  projectProps,
  handleClose,
  handleSelect,
  isOpen,
  isEdit,
  refetchProject,
}: {
  projectProps: Project;
  isOpen?: boolean;
  isEdit?: Project;
  handleClose?: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleSelect?: (mentor: Project) => void;
  refetchProject?: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<ProjectList>, any>, Error>
  >;
}) {
  const {
    id,
    projectName,
    semesterAndCourse,
    mentorsAndLecturers,
    team,
    projectStatus,
    isDeleted,
  } = projectProps;
  const { profile } = useContext(AppContext);
  const lecturer = mentorsAndLecturers.find(
    (x) => x.roleType == 'Lecturer' && x.isMain,
  )!;
  const mentor = mentorsAndLecturers.find(
    (x) => x.roleType == 'Mentor' && x.isMain,
  )!;
  const leader = team.members.find((x) => x.isLeader == true)!;
  const navigate = useNavigate();

  // Trạng thái của project Pending-0 Approved-1 Started-2 Done-3
  var status;
  // if (isDeleted == true) {
  //   status = 'Deleted';
  // } else if (projectStatus == 0) {
  //   status = 'Not Start';
  // } else if (projectStatus == 1) {
  //   status = 'Approved';
  // } else if (projectStatus == 2) {
  //   status = 'Stared';
  // } else {
  //   status = 'Done';
  // }

  if (isDeleted == true) {
    status = 'Deleted';
  } else if (projectStatus == 0) {
    status = 'Not Started';
  } else if (projectStatus == 1) {
    status = 'In Progress';
  } else if (projectStatus == 2) {
    status = 'Completed';
  } else if (projectStatus == 3) {
    status = 'Canceled';
  } else if (projectStatus == 4) {
    status = 'Under Review';
  } else if (projectStatus == 5) {
    status = 'Passed';
  } else {
    status = 'Fail';
  }

  return (
    <div className="mb-2 grid h-11 grid-cols-12 rounded-md border border-slate-300 bg-white">
      <p className="col-span-2 mr-4 flex items-center truncate pl-2">
        {projectName ?? 'Empty...'}
      </p>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {leader.studentName ?? 'Empty...'}
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {lecturer.name ?? 'Empty...'}
      </div>
      <div className="col-span-2 mr-3 flex items-center truncate pl-2">
        {mentor?.name ?? 'Empty...'}
      </div>
      <div className="col-span-1 flex items-center justify-center">
        <div className="rounded-sm bg-neutral-400 px-3 py-1 text-white">
          {semesterAndCourse.course}
        </div>
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div
          className={classNames('rounded-sm px-3 py-1 text-white', {
            'bg-yellow-500': projectStatus == 0 && isDeleted == false,
            'bg-blue-500': projectStatus == 1,
            'bg-green-500': projectStatus == 2,
            'bg-red-300': projectStatus == 3,
            'bg-slate-400': projectStatus == 4,
            'bg-green-700': projectStatus == 5,
            'bg-red-500': isDeleted == true || projectStatus == 6,
          })}
        >
          {status}
        </div>
      </div>
      <div className="col-span-1 flex items-center justify-center">
        {profile?.role != 1 ? (
          <Button
            className="bg-slate-500"
            onClick={() => {
              navigate({
                pathname: `/${path.projectManagement}/${id}`,
              });
            }}
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
        ) : (
          <Popover
            initialOpen={isOpen}
            renderPopover={
              isEdit && (
                <Manager_Project_Detail
                  project={isEdit}
                  handleOpen={handleClose!}
                  refetchProject={refetchProject!}
                />
              )
            }
          >
            <Button
              className="bg-slate-500"
              onClick={() => handleSelect!(projectProps)}
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
        )}
      </div>
    </div>
  );
}
