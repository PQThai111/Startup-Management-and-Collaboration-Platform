import { Project } from '../../../types/project.type';

export default function ProjectItem({
  projectProps,
}: {
  projectProps: Project;
}) {
  const {
    projectName,
    leaderName,
    lecturerName,
    mentorName,
    memberWanted,
    projectDetails,
    type,
    coverImage,
    semester,
  } = projectProps;

  //id,
  return (
    <div className="col-span-5 mb-3 h-[340px] rounded-md border border-black bg-[rgb(247,247,247)] p-3">
      <div className="flex justify-between">
        <p className="text-ellipsis text-justify text-[#686868]">
          {type === 0 ? 'exe1' : 'exe2'}
        </p>
        <p className="mt-2 truncate text-ellipsis text-justify text-[#686868]">
          <span className="font-bold">Semester</span>: {semester}
        </p>
      </div>
      <div className="flex items-center">
        <div className="h-16 w-16 overflow-hidden rounded-full p-2">
          <img src={coverImage} className="h-full w-full object-cover" />
        </div>
        <p className="text-ellipsis text-justify text-[#686868]">
          <span className="font-bold"></span>
          {leaderName}
        </p>
      </div>
      {/* <p className="text-lg font-[400] truncate mb-5">{description}</p> */}
      <div>
        <p className="text-3xl font-[500]">{projectName}</p>
      </div>
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Lecturer</span>: {lecturerName}
      </p>
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Mentor</span>: {mentorName}
      </p>
      <p className="truncate text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Mo ta</span>: {projectDetails}
      </p>
      <p className="text-ellipsis text-justify text-[#686868]">
        <span className="font-bold">Recruitment requirements</span>:{' '}
        {memberWanted}
      </p>
      <div className="flex justify-end text-orange-500">
        <button className="w-20 rounded-sm border border-orange-500 p-2">
          Apply
        </button>
      </div>
    </div>
  );
}
