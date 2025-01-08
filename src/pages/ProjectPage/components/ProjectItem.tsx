import { useNavigate } from 'react-router-dom';
import { Project } from '../../../types/project.type';
import ApplyButton from './ApplyButton';

export default function ProjectItem({
  projectProps,
}: {
  projectProps: Project;
}) {
  const {
    projectName,
    team,
    mentorsAndLecturers,
    memberWanted,
    projectDetail,
    semesterAndCourse,
    coverImage,
    id,
<<<<<<< HEAD
=======
    memberWantedStatus,
>>>>>>> e31efde (Staff manage main)
  } = projectProps;
  const nav = useNavigate();

  //id,
  return (
    <div
      onDoubleClick={() => nav(`/projectManagement/${id}`)}
      className="col-span-5 mb-3 h-[340px] rounded-md border border-black bg-[rgb(247,247,247)] p-3"
    >
      <div className="flex justify-between">
        <p className="text-ellipsis text-justify text-[#686868]">
          {semesterAndCourse.course}
        </p>
        <p className="mt-2 truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Semester</span>:{' '}
          {semesterAndCourse.semester}
        </p>
      </div>
      <div className="flex items-center">
        <div className="h-16 w-16 overflow-hidden rounded-full p-2">
          <img src={coverImage} className="h-full w-full object-cover" />
        </div>
        <p className="text-ellipsis text-justify text-[#686868]">
          <span className="font-bold"></span>
          {team.members.find((mem) => mem.isLeader == true)?.studentName}
        </p>
      </div>
      {/* <p className="text-lg font-[400] truncate mb-5">{description}</p> */}
      <div>
        <p className="text-3xl font-[500]">{projectName}</p>
      </div>
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Lecturer</span>:{' '}
        {mentorsAndLecturers.find((men) => men.roleType === 'Lecturer')?.name}
      </p>
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Mentor</span>:{' '}
        {mentorsAndLecturers.find((men) => men.roleType === 'Mentor')?.name}
      </p>
      <p className="truncate text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Mo ta</span>: {projectDetail}
      </p>
<<<<<<< HEAD
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Recruitment requirements</span>:{' '}
        {memberWanted}
      </p>
      <div className="flex justify-end text-orange-500">
        <ApplyButton teamId={team.teamId} />
      </div>
=======
      {memberWantedStatus && (
        <div>
          {' '}
          <p className="text-ellipsis text-justify text-[#686868]">
            <span className="font-bold">Recruitment requirements</span>:{' '}
            {memberWanted}
          </p>
          <div className="flex justify-end text-orange-500">
            <ApplyButton teamId={team.teamId} />
          </div>
        </div>
      )}
>>>>>>> e31efde (Staff manage main)
    </div>
  );
}
