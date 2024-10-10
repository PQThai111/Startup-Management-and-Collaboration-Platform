import ButtonSearch from './ButtonSearch'
import InputSearch from './InputSearch'
import AsideFilter from './AsideFilter'
import EventItem from './EventItem'
import { Event, EventType } from '../../../types/event.type'
import { useQuery } from '@tanstack/react-query'
import eventApi from '../../../apis/event.api'

const EventItemTest : Event ={
    id: '1',
    coverImage: 'https://s3-alpha-sig.figma.com/img/0f72/2667/d6a634bbd4e7c1dfc12adaf9e8ce1984?Expires=1729468800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PZae~MRFDyeiqgAfKt4RLCHnU5~VtTfmFV7mqTlM1gH9R7oI8ORJFXCcZfRl-H71sOFoMQ~Pl2maVdMMR6ozMIJj-Qb9uXRzpGiWkFgelhVMoh0JY36zO3ZT0zB2ViscAIRuO0XmWGZLOBDs7fcF1Sb~5uOHv8dIjCdIS1QVAj8XZOM4FbD3gW5eRO4Hl8o54iOFbGqHJAfQikZGyv4cJppvIShWwk3mzuis3XhOgLRyig7YVgUn3WPhbe08kVvwttKYbVbM5gwmAkVfXBd-HWyxQ1AAkbwSz~m-cb9zXzzRjvVeTGgztWvNts6ps0yUrCaednr5RjFjGz4eVMwS3w__',
    title: 'CƠ HỘI CÓ 1-0-2 TRÒ CHUYỆN VỀ A.I CÙNG KỸ SƯ ĐẾN TỪ AMAZON LONDON NGAY TẠI TẠI ĐH FPT',
    description: 'Kayeon Yoo là tiến sĩ về Ngôn ngữ học từ Đại học Cambridge (Anh), hiện đang dẫn dắt dự án phát triển công nghệ giọng nói tại Amazon London. Là người đam mê không ngừng với Xử lý Ngôn ngữ Tự nhiên và sự phát triển của ngôn ngữ, Dr Yoo sẽ chia sẻ về hành trình từ một người ngoại đạo đến vị trí chuyên gia AI tại Amazon.',
    location: 'FPT University (HCM City)',
    endDate: new Date(),
    startDate: new Date(),
    registrationLink: 'https://www.figma.com/design/y7qpQN0CWVc7MCQggExeTd/SMC-WEB?node-id=62-154&node-type=frame&t=KoktOydCUnRksUFh-0',
    type: EventType.Meeting,
    tag: '#AllMajor',
}

export default function EventList() {

  const { data : eventsData } = useQuery({
    queryKey: ['events', 'queryConfig'],
    queryFn: () => {
      return eventApi.getEventss()
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000
  })

  console.log(eventsData)


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
