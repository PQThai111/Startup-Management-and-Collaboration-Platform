import Mentor1 from '../../../assets/Mentor/Mentor1.png';
import Mentor2 from '../../../assets/Mentor/Mentor2.png';
import Mentor3 from '../../../assets/Mentor/Mentor3.png';
import Mentor from './Mentor';

export type MentorProps = {
  id: number;
  name: string;
  title: string;
  description: string;
  coverImg: string;
};

const data: MentorProps[] = [
  {
    id: 1,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    description:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: Mentor1.toString(),
  },
  {
    id:2,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    description:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: Mentor2.toString(),
  },
  {
    id: 3,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    description:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: Mentor3.toString(),
  }
];

const FeaturedMentors = () => {
  return (
    <div className="mt-16  w-full px-20 pt-5">
      <p className="items-center pb-5 text-center text-5xl">Outsanding Mentor</p>
      <div className="mt-5 grid grid-cols-3 gap-6">
        {data.map((mentor) => (
          <Mentor key={mentor.id} mentorProps={mentor} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedMentors;
