import { ProjectProps } from './FeaturedProjects';

const Project = ({ projectProps }: { projectProps: ProjectProps }) => {
  const {id, coverImg, title, description, teacher, teacherComments} = projectProps;
    return <>{
    id === 1 ?
      <div className="h-[565px] w-full bg-[#F7F7F7] grid grid-cols-10 mb-5">
        <div className="mx-3 my-3 col-span-5">
          <div>
            <p className="mt-10 text-xl font-[700]">{title}</p>
          </div>
          <p className="mt-10 h-[30%] w-full text-ellipsis text-justify text-[#686868] line-clamp-5">
            {description}
          </p>
          <p className="mt-2 text-ellipsis text-justify text-md ">
            {teacher}
          </p>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] italic ">
            {teacherComments}
          </p>
        </div>
        <div className="h-[563px] col-span-5">
          <img src={coverImg} className="h-full w-full object-cover" />
        </div>
      </div> :
    <div className="h-[565px] w-full bg-[#F7F7F7] grid grid-cols-10 mb-5">
      <div className="h-[563px] col-span-5">
        <img src={coverImg} className="h-full w-full object-cover" />
      </div>
      <div className="mx-3 my-3 col-span-5">
      <div>
            <p className="mt-10 text-xl font-[700]">{title}</p>
          </div>
          <p className="mt-10 h-[30%] w-full text-ellipsis text-justify text-[#686868] line-clamp-5">
            {description}
          </p>
          <p className="mt-2 text-ellipsis text-justify text-md ">
            {teacher}
          </p>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] italic ">
            {teacherComments}
          </p>
      </div>
    </div>
    }
    </>
};

export default Project
