import EventDetailItem from './EventDetailItem';
import { Event, EventType } from '../../../types/event.type';

export default function EventDetail() {
  const EventItemTest: Event = {
    id: '1',
    coverImage: 'https://picsum.photos/200/300',
    title:
      'CƠ HỘI CÓ 1-0-2 TRÒ CHUYỆN VỀ A.I CÙNG KỸ SƯ ĐẾN TỪ AMAZON LONDON NGAY TẠI TẠI ĐH FPT',
    description:
      'Kayeon Yoo là tiến sĩ về Ngôn ngữ học từ Đại học Cambridge (Anh), hiện đang dẫn dắt dự án phát triển công nghệ giọng nói tại Amazon London. Là người đam mê không ngừng với Xử lý Ngôn ngữ Tự nhiên và sự phát triển của ngôn ngữ, Dr Yoo sẽ chia sẻ về hành trình từ một người ngoại đạo đến vị trí chuyên gia AI tại Amazon.',
    location: 'FPT University (HCM City)',
    endDate: 'FPT University (HCM City)',
    startDate: 'FPT University (HCM City)',
    registrationLink:
      'https://www.figma.com/design/y7qpQN0CWVc7MCQggExeTd/SMC-WEB?node-id=62-154&node-type=frame&t=KoktOydCUnRksUFh-0',
    type: EventType.Meeting,
    tag: '#AllMajor',
    isMandatory: true,
  };

  return (
    <div className="mx-auto my-20 w-full px-20">
      <div>
        <EventDetailItem eventProps={EventItemTest} />
      </div>
    </div>
  );
}
