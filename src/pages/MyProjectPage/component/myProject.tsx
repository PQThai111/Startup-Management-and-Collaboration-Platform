import { Link } from 'react-router-dom'
import path from '../../../constant/path'
import InputSearch from '../../EventPage/components/InputSearch'

export default function MyProject() {
  return (
    <div className='container mb-20 mt-10 px-20 mx-auto'>
      <div className='mb-3'>
        <InputSearch/>
      </div>
      <div className='border border-black h-10 w-full rounded-md flex items-center p-2 mt-3'>
        <Link to={path.home}>
          <div className='flex'>
            <p className='mr-2 border-e-2 border-black pr-2'>exe1</p>
            <p className='mr-3'>Project English name</p>
            <p> - </p>
            <p className='mx-3 border-e-2 border-black pr-2'>Tên tiếng Việt của dự án</p>
            <p className='mr-3 border-e-2 border-black pr-2'> Lorem ipsum dolor sit, amet con Nulsitatibus a neque doloente.</p>
            <p className='mr-3 border-e-2 border-black pr-2'>Tui</p>
            <p className='text-green-700 font-semibold'>Trạng thái đây</p>
          </div>
        </Link>
      </div>
      <div className='border border-black h-10 w-full rounded-md flex items-center p-2 mt-3'>
        <Link to={path.home}>
          <div className='flex'>
            <p className='mr-2 border-e-2 border-black pr-2'>exe2</p>
            <p className='mr-3'>Project English name</p>
            <p> - </p>
            <p className='mx-3 border-e-2 border-black pr-2'>Tên tiếng Việt của dự án</p>
            <p className='mr-3 border-e-2 border-black pr-2'> Lorem ipsum dolor, sit amet consect etuObca ecati .....</p>
            <p className='mr-3 border-e-2 border-black pr-2'>Tui</p>
            <p className='text-green-700 font-semibold'>Trạng thái đây</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
