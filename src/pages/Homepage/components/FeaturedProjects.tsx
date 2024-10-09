import project1 from '../../../assets/project/project1.png';
import Project from './Project';

export type ProjectProps = {
  id: number;
  title: string;
  description: string;
  teacher: string;
  teacherComments: string;
  coverImg: string;
};
const data: ProjectProps[] = [
  {
    id: 1,
    title: 'Đạt doanh số 17 triệu trong 3 ngày mở bán',
    description:'Sau nhiều trăn trở, cuối cùng Vệt Gốm đặt mục tiêu cung cấp những sản phẩm gốm sứ mới mẻ và thú vị, không đơn thuần là sản phẩm gia dụng mà còn có thể sử dụng như một tác phẩm nghệ thuật, có thể dùng để trang trí hoặc làm quà tặng. ',
    teacher: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    teacherComments: '"Về tổng quan, thầy đánh giá Vệt Gốm là một dự án hay và có triển vọng, các bạn đã chuẩn bị cho bản report khá kỹ, phần hỏi đáp thể hiện được sự cố gắng. Tuy nhiên, nhóm nên cân nhắc lại khía cạnh nguồn cung và đưa ra giải pháp để đảm bảo quyền lợi của mình, tránh trường hợp sau khi xây dựng được thị trường lại biến chính suppliers thành competitors."',
    coverImg: project1.toString(),
  },
  {
    id: 2,
    title: 'Đạt doanh số 17 triệu trong 3 ngày mở bán',
    description:'Sau nhiều trăn trở, cuối cùng Vệt Gốm đặt mục tiêu cung cấp những sản phẩm gốm sứ mới mẻ và thú vị, không đơn thuần là sản phẩm gia dụng mà còn có thể sử dụng như một tác phẩm nghệ thuật, có thể dùng để trang trí hoặc làm quà tặng. ',
    teacher: 'ThS. NCS. Trương Đình Hồng Thụy, Cô Phương Thảo',
    teacherComments: '"Về tổng quan, thầy đánh giá Vệt Gốm là một dự án hay và có triển vọng, các bạn đã chuẩn bị cho bản report khá kỹ, phần hỏi đáp thể hiện được sự cố gắng. Tuy nhiên, nhóm nên cân nhắc lại khía cạnh nguồn cung và đưa ra giải pháp để đảm bảo quyền lợi của mình, tránh trường hợp sau khi xây dựng được thị trường lại biến chính suppliers thành competitors."',
    coverImg: project1.toString(),
  }
]

const FeaturedProjects = () => {
  return (
    <div className="mt-16 w-full px-20 pt-5">
      <p className="items-center pb-5 text-center text-5xl">Featured Projects</p>
      <div className="project-List">
        {data.map((project) => (
          <Project key={project.id} projectProps={project} />
        ))}
        <div className="project-img">
        </div>
      </div>
    </div>
  );
};
export default FeaturedProjects;
