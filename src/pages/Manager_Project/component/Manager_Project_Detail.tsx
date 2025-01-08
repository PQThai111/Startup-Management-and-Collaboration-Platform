import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useStudentQueryConfig } from '../../../hooks/useQueryConfig';
import { Project, ProjectList } from '../../../types/project.type';
import studentApi from '../../../apis/student.api';
import { QueryConfig as ConfigPaging } from '../../../types/event.type';
import { useContext, useState } from 'react';
import { Student } from '../../../types/student.type';
import Pagination from '../../../components/pagination';
import path from '../../../constant/path';
// import useSearchStudent from './hook/useSearchStudent';
import teamMemberApis from '../../../apis/team-member.api';
import { toast } from 'react-toastify';
import { AppContext } from '../../../context/app.context';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';
import accountApi from '../../../apis/account.api';
import { QueryAccount } from '../../../types/account.type';
import teamApis from '../../../apis/team.api';

interface Props {
  project: Project;
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  refetchProject: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<ProjectList>, any>, Error>
  >;
}

export type QueryConfig = {
  [key in keyof ConfigPaging]: string;
};

export enum ProjectStatusEnum {
  NotStarted,
  InProgress,
  Completed,
  Canceled,
  UnderReview,
  Passed,
  Fail,
}

function Manager_Project_Detail({
  project,
  handleOpen,
  refetchProject,
}: Props) {
  const { profile } = useContext(AppContext);
  const [student, setStudent] = useState<Student | null>(null);
  const queryConfig = useStudentQueryConfig();
  // const { register, onSubmitSearch } = useSearchStudent();

  const { data: studentData, refetch } = useQuery({
    queryKey: ['students', queryConfig],
    queryFn: () => {
      return studentApi.getStudentNoTeam(queryConfig as QueryConfig);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const paramMentor: QueryAccount = {
    roles: 'mentor',
  };

  const { data: mentorsData, refetch: refetchMentors } = useQuery({
    queryKey: ['mentors', paramMentor],
    queryFn: () => {
      return accountApi.getAccounts(paramMentor);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const mentors =
    mentorsData?.data?.data.filter((user) => {
      return (
        user.mentor?.accountId !=
        project.mentorsAndLecturers.find(
          (x) =>
            x.roleType === 'Mentor' && x.accountId === user.mentor?.accountId,
        )?.accountId
      );
    }) || [];
  console.log(mentors);

  const addMemberMutation = useMutation({
    mutationFn: (body: {
      studentCode: string;
      memberRole: string;
      note: string;
      isLeader: boolean;
      teamId: string;
    }) => teamMemberApis.addMemberToTeam(body),
    onSuccess: (_) => {
      toast.success('Add Member Successfully !', {
        autoClose: 500,
      });
      refetch();
      refetchProject();
    },
    onError: (_) => {
      toast.error('Add Member Fail !', {
        autoClose: 500,
      });
    },
  });

  const handleAddMember = () => {
    if (student) {
      const studentAdd: {
        studentCode: string;
        memberRole: string;
        note: string;
        isLeader: boolean;
        teamId: string;
      } = {
        studentCode: student.studentCode,
        memberRole: student.studentDepartment,
        note: 'Add by Manager',
        isLeader: false,
        teamId: project.team.teamId,
      };
      addMemberMutation.mutate(studentAdd);
    }
  };

  const userList = studentData?.data?.data?.data;

  const addMentorToProjectMutation = useMutation({
    mutationFn: teamApis.addUserTeam,
    onError: (_) => {
      toast.error('Fail to add Mentor !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Add mentor successfully !', {
        autoClose: 500,
      });
      refetchProject();
      refetchMentors();
    },
  });

  const removeMentorToProjectMutation = useMutation({
    mutationFn: teamApis.deleteUserTeam,
    onError: (_) => {
      toast.error('Fail to remove mentor !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Remove mentor successfully !', {
        autoClose: 500,
      });
      refetchProject();
      refetchMentors();
    },
  });

  const handleRemove = (accountId: string) => {
    if (project?.team?.teamId) {
      removeMentorToProjectMutation.mutate({
        teamId: project.team.teamId,
        accountId: accountId,
        roleType: 1,
      });
    }
  };

  const handleAdd = (accountId: string) => {
    if (project?.team?.teamId) {
      addMentorToProjectMutation.mutate({
        teamId: project.team.teamId,
        body: {
          accountId: accountId,
          description: 'Add by manager',
          roleType: 1,
        },
      });
    }
  };

  return (
    <div className="h-[95%] w-[90%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">
          Project Information
        </div>
        <button
          onClick={handleOpen}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>
      <div className="h-full overflow-y-auto py-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 space-y-6">
            <div className="flex h-[30%] items-center justify-center">
              <div className="h-full w-full">
                <img
                  className="h-full w-full"
                  src={project.coverImage}
                  alt=""
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Name
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {project.projectName}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 truncate text-lg font-semibold text-gray-700">
                Description
              </div>
              <div className="w-3/4 truncate rounded-md border border-gray-300 p-3">
                {project.projectDetail}
                {project.projectDetail}
                {project.projectDetail}
                {project.projectDetail}
                {project.projectDetail}
                {project.projectDetail}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Category
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {project.category}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Full Member
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {project.memberWantedStatus ? 'Not Full' : 'Full'}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Type
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {project.semesterAndCourse.course}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Tag
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {project.semesterAndCourse.semester}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Status
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {ProjectStatusEnum[project.projectStatus]}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Members
              </div>
              <div className="w-3/4">
                {project.team.members.map((x) => {
                  return (
                    <div
                      key={x.id}
                      className="mb-2 grid grid-cols-8 rounded-md border border-gray-300 p-3"
                    >
                      <div className="col-span-1 truncate border-r border-r-slate-500">
                        {x.studentCode}
                      </div>
                      <div className="col-span-3 truncate border-r border-r-slate-500 pl-2">
                        {x.studentName}
                      </div>
                      <div className="col-span-2 truncate border-r border-r-slate-500 pl-2">
                        {x.memberRole}
                      </div>
                      <div className="col-span-2 truncate pl-2">
                        {x.isLeader ? 'Leader' : 'Member'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-1/4 text-lg font-semibold text-gray-700">
                Lecturer
              </div>
              <div className="w-3/4 rounded-md border border-gray-300 p-3">
                {
                  project.mentorsAndLecturers.find(
                    (x) => x.roleType == 'Lecturer',
                  )?.name
                }
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-full w-1/4 text-lg font-semibold text-gray-700">
                <div className="relative -top-52">Mentors</div>
              </div>
              <div className="w-3/4">
                <div className="border-b border-b-slate-300 pb-2">
                  {project.mentorsAndLecturers
                    .filter((x) => x.roleType == 'Mentor')
                    .map((x) => (
                      <div className="mb-2 flex items-center justify-between rounded-md border border-gray-300 p-3">
                        <div>{x.name}</div>
                        <button
                          onClick={() => {
                            handleRemove(x.accountId);
                          }}
                          className="w-[15%] rounded-sm bg-red-400 px-3 py-2 text-white"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                </div>
                <div className="mt-4">
                  {mentors.map((x) => (
                    <div
                      key={x.id}
                      className="mb-3 flex items-center justify-between rounded-md border border-gray-300 p-3"
                    >
                      <div>{x.mentor?.name}</div>
                      <button
                        onClick={() => {
                          handleAdd(x.id);
                        }}
                        className="w-[15%] rounded-sm bg-blue-400 px-3 py-2 text-white"
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* <div className="col-span-12 flex items-center justify-start pb-10">
              <button
                type="submit"
                className="h-[45px] w-[100px] rounded-sm bg-green-400"
              >
                Save
              </button>
              <button
                type="button"
                className="ml-7 h-[45px] w-[100px] rounded-sm bg-red-400"
              >
                Delete
              </button>
            </div> */}
          </div>
          {profile?.role == 1 && project.memberWantedStatus && (
            <div className="col-span-5">
              <div className="mb-5 border-b border-b-black/60">
                <div className="mb-3 text-center text-2xl">
                  Student Information
                </div>
                <div className="mb-3 flex items-center justify-start">
                  <div className="text-md w-[15%] font-semibold text-gray-700">
                    Code
                  </div>
                  <div className="h-8 w-[85%] rounded-md border border-gray-300 p-1 pl-3">
                    {student?.studentCode}
                  </div>
                </div>
                <div className="mb-3 flex items-center justify-start">
                  <div className="text-md w-[15%] font-semibold text-gray-700">
                    Name
                  </div>
                  <div className="h-8 w-[85%] rounded-md border border-gray-300 p-1 pl-3">
                    {student?.studentName}
                  </div>
                </div>
                <div className="mb-3 flex items-center justify-start">
                  <div className="text-md w-[15%] font-semibold text-gray-700">
                    Email
                  </div>
                  <div className="h-8 w-[85%] rounded-md border border-gray-300 p-1 pl-3">
                    {student?.email}
                  </div>
                </div>
                <div className="mb-5 flex items-center justify-start">
                  <div className="text-md w-[15%] font-semibold text-gray-700">
                    Role
                  </div>
                  <div className="h-8 w-[85%] rounded-md border border-gray-300 p-1 pl-3">
                    {student?.studentDepartment}
                  </div>
                </div>
                <div className="mb-7 flex items-center justify-start">
                  <div className="text-md w-[15%] font-semibold text-gray-700"></div>
                  <button
                    onClick={() => {
                      handleAddMember();
                    }}
                    className="w-[85%] rounded-md border border-gray-400 bg-slate-400 p-1 pl-3 text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="w-full">
                {/* <form onSubmit={onSubmitSearch}>
                  <input
                    className="mr-2 w-[80%] border border-slate-400 py-1 pl-3"
                    type="text"
                    placeholder="Find student"
                    {...register('SearchTerm')}
                  />
                  <button
                    type="submit"
                    className="w-[18.1%] rounded-sm border bg-slate-600 px-2 py-1 text-white"
                  >
                    Find
                  </button>
                </form> */}
                <div className="mt-3 w-full">
                  {userList &&
                    userList.map((stu) => {
                      return (
                        <button
                          onClick={() => {
                            setStudent(stu);
                          }}
                          key={stu.id}
                          className="mb-2 grid w-full grid-cols-8 rounded-lg border border-slate-400 px-3 py-2"
                        >
                          <div className="col-span-2 truncate border-r border-r-slate-500">
                            {stu.studentCode}
                          </div>
                          <div className="col-span-3 truncate border-r border-r-slate-500 pl-2">
                            {stu.studentName}
                          </div>
                          <div className="col-span-3 truncate pl-2">
                            {stu.email}
                          </div>
                        </button>
                      );
                    })}
                </div>
                <Pagination
                  queryConfig={queryConfig}
                  PageSize={studentData?.data.data.pagination.limit as number}
                  pathName={path.all_management}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager_Project_Detail;
