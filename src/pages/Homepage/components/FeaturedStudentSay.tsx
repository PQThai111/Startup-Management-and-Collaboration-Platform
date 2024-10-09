import StudentSay1 from '../../../assets/StudentSay/StudentSay.png';
import Student from './StudentSay';

export type StudentProps = {
  id: number;
  name: string;
  title: string;
  quote: string;
  coverImg: string;
};

const data: StudentProps[] = [
  {
    id: 1,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    quote:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: StudentSay1.toString(),
  },
  {
    id: 2,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    quote:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: StudentSay1.toString(),
  },
  {
    id: 3,
    name: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    title: 'Phát triển bền vững cho doanh nghiệp thương mại điện tử đa kênh',
    quote:
      'Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử Sự hiện diện của hai quý diễn giả trong Biz Talkshow Season 4 lần này, hứa hẹn sẽ mang lại thật nhiều thông tin thật chuyên sâu về thị trường thương mại điện tử ',
    coverImg: StudentSay1.toString(),
  }
];

const FeaturedStudentSay = () => {
  return (
    <div className="mt-16 w-full px-20 pt-5">
      <p className="items-center pb-5 text-center text-5xl">What Student's say</p>
      <div className="mt-5 w-full grid grid-cols-5 gap-4 border border-black ">
        {data.map((student) => (
          <Student key={student.id} studentProps={student} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedStudentSay;
