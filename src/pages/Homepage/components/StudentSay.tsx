import { StudentProps } from './FeaturedStudentSay';

const Student = ({ studentProps }: { studentProps: StudentProps }) => {
  const {coverImg,name,title,quote,id} = studentProps;
  return (
    <>{
    id === 1 ?
      <div className="h-[500px] col-start-2 col-span-1 w-full bg-[#F7F7F7] ">
        <p className=" text-ellipsis text-justify text-[#686868] truncate">
          {quote}
        </p>
        <div className="h-[200px] w-full">
          <img src={coverImg} className="h-full w-full object-cover" />
        </div>
        <div className="mx-3 my-3 flex h-[266px] flex-col justify-between">
          <p className="mt-1 text-lg font-[500] text-[#FF7426]">{name}</p>
          <p className="text-lg font-[400]">{title}</p>
        </div>
      </div>:
      <div className="h-[500px] col-span-1 w-full bg-[#F7F7F7] ">
      <p className=" text-ellipsis text-justify text-[#686868] truncate">
        {quote}
      </p>
      <div className="h-[200px] w-full">
        <img src={coverImg} className="h-full w-full object-cover" />
      </div>
      <div className="mx-3 my-3 flex h-[266px] flex-col justify-between">
        <p className="mt-1 text-lg font-[500] text-[#FF7426]">{name}</p>
        <p className="text-lg font-[400]">{title}</p>
      </div>
    </div>
      }
    </>
  );
};

export default Student;
