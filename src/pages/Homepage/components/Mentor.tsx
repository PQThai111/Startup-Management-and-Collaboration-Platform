import { MentorProps } from './FeaturedMentors';

const Mentor = ({ mentorProps }: { mentorProps: MentorProps }) => {
  const {coverImg,name,title,description} = mentorProps;
  return (
    <>
      <div className="h-[565px] w-full bg-[#F7F7F7]">
        <div className="h-[275px] w-full">
          <img src={coverImg} className="h-full w-full object-cover" />
        </div>
        <div className="mx-3 my-3 flex h-[266px] flex-col justify-between">
          <div>
            <p className="mt-2 text-lg font-[500] text-[#FF7426]">{name}</p>
          </div>
          <div>
            <p className="text-lg font-[400]">{title}</p>
          </div>
          <p className="mt-2 text-ellipsis text-justify text-[#686868] truncate">
            {description}
          </p>
        </div>
      </div>
    </>
  );
};

export default Mentor;
