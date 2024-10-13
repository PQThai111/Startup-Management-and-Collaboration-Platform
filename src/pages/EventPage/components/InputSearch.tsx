import React from 'react'

export default function InputSearch() {
  return (
    // <div className='border border-black rounded-md grid grid-cols-12'>
    //   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 col-span-1 border border-blue-400">
    //     <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    //   </svg>
    //   <input type="text" className='col-span-11 border border-yellow-400'/>
    // </div>
    <div>
      <label className='relative block'>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </span>
  <input className='placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm' placeholder="Search ..." type="text" name="search"/>
</label>
    </div>
  )
}
