import ButtonSearch from './ButtonSearch'
import InputSearch from './InputSearch'
import AsideFilter from './AsideFilter'
import EventItem from './EventItem'
import { Event, EventType } from '../../../types/event.type'

const EventItemTest : Event ={
    id: '1',
    coverImage: '#',
    title: 'CƠ HỘI CÓ 1-0-2 TRÒ CHUYỆN VỀ A.I CÙNG KỸ SƯ ĐẾN TỪ AMAZON LONDON NGAY TẠI TẠI ĐH FPT',
    description: 'Kayeon Yoo là tiến sĩ về Ngôn ngữ học từ Đại học Cambridge (Anh), hiện đang dẫn dắt dự án phát triển công nghệ giọng nói tại Amazon London. Là người đam mê không ngừng với Xử lý Ngôn ngữ Tự nhiên và sự phát triển của ngôn ngữ, Dr Yoo sẽ chia sẻ về hành trình từ một người ngoại đạo đến vị trí chuyên gia AI tại Amazon.',
    location: 'FPT University (HCM City)',
    endDate: new Date(),
    startDate: new Date(),
    registrationLink: 'link đây nè',
    type: EventType.Meeting,
    tag: '#AllMajor',
}

export default function EventList() {
  return (
    <div className='container mb-20 px-20'>
      <div className=' h-[32px] mb-3 grid grid-cols-12'>
        <div className="border border-blue-600 col-span-2">
          <ButtonSearch/>
        </div>
        <div className="border border-red-600 col-span-10">
          <InputSearch/>
        </div>
      </div>
      <div className="body grid grid-cols-10">
        <div className="filter-list border h-[500px] border-blue-500 col-span-2">
          <AsideFilter/>
        </div>
        <div className="event_list col-span-8">
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
          <EventItem eventProps={EventItemTest}/>
        </div>
      </div>
    </div>
  )
}
