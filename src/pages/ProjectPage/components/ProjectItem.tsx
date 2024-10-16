import { ProjectPost } from '../../../types/project.type';

export default function ProjectPostItem({ projectPostProps }: { projectPostProps: ProjectPost }) {
  const {projectName,description,leader,lecturer,mentor,memberWanted,projectDetails,type,coverImage,startDate,endDate} = projectPostProps;
  //id,
  return (
      <div className="h-[340px] bg-[rgb(247,247,247)] col-span-5 grid grid-cols-12 p-1 border border-black rounded-md mb-3">
        <div className="h-full col-span-4 p-2 overflow-hidden">
          <img src={coverImage} className="h-full w-full object-cover " />
        </div>
        <div className="col-span-8 p-2">
          <div>
            <p className="text-lg font-[400] truncate mb-5">{description}</p>
          </div>
          <div>
            <p className="text-3xl font-[500]">{projectName}</p>
          </div>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Mo ta</span>: {projectDetails}
          </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Leader</span>: {leader}
          </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Lecturer</span>: {lecturer}
          </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Mentor</span>: {mentor}
          </p>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] truncate">
              <span className='font-bold'>Time</span>: {startDate.getHours()}:{startDate.getMinutes()} - {endDate.getHours()}:{endDate.getMinutes()} On {endDate.getDay().toString()}.{startDate.getMonth().toString()}.{endDate.getFullYear().toString()}
            </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Type</span>: {type === 0 ? "exe1" : "exe2"}
          </p>
          <p className="text-ellipsis text-justify text-[#686868] truncate">
            <span className='font-bold'>Recruitment requirements</span>: {memberWanted}
          </p>

        </div>
      </div>
  )
}
