export default function Manager_Approval_Detail() {
  return (
    <div className="w-full px-3">
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Leader Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">ThaiVQ</div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          Quan ly sinh vien
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Domain:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">Edtech</div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Type:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">EXE101</div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Mentor despise:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">Tao chu ai</div>
      </div>
      <div className="mb-1">
        <p className="">Project Description:</p>
        <textarea
          id="message"
          className="block h-[200px] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Write your thoughts here..."
          defaultValue={''}
        />
      </div>
    </div>
  );
}
