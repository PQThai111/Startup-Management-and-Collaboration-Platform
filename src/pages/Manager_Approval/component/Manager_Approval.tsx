import Manager_Approval_Detail from './Manager_Approval_Detail';
import Manager_Approval_Item from './Manager_Approval_Item';

export default function Manager_Approval() {
  return (
    <div className="p-2">
      <div className="mt-[-20px] grid h-[80vh] grid-cols-10 gap-3">
        <div className="col-span-4 h-full rounded-md border border-slate-300 bg-slate-100 p-2">
          <div className="mb-4 mt-3 grid h-8 grid-cols-10 rounded-md border border-slate-500 bg-slate-500 text-white">
            <div className="col-span-4 flex items-center border-r border-white pl-10">
              Name
            </div>
            <div className="col-span-4 flex items-center border-r border-white pl-2">
              Leader Name
            </div>
            <div className="col-span-2 flex items-center justify-center">
              Type
            </div>
          </div>
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <Manager_Approval_Item />
          <div className="text-center">Phaan ne</div>
        </div>
        <div className="col-span-6 grid h-full grid-rows-12 gap-3 rounded-md">
          <div className="row-span-10 rounded-md border border-slate-300 bg-slate-100 p-1">
            <Manager_Approval_Detail />
          </div>
          <div className="row-span-2 grid grid-cols-12 rounded-md border border-slate-300 bg-slate-100 px-3 py-1">
            <div className="col-span-8">
              <div className="mb-1 grid grid-cols-10 items-center">
                <p className="col-span-3 mr-3">Mentor Name:</p>
                <select
                  id="countries"
                  className="col-span-7 block h-[35px] w-[280px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option selected>Choose a lecturer</option>
                  <option value="1">Miss Thảo</option>
                  <option value="2">Miss Grand</option>
                  <option value="3">Miss Univer</option>
                  <option value="4">Mr. Khầy</option>
                </select>
              </div>
              <div className="mb-1 grid grid-cols-10 items-center">
                <p className="col-span-3 mr-3">Lecturer Name:</p>
                <select
                  id="countries"
                  className="col-span-7 block h-[35px] w-[280px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                >
                  <option selected>Choose a lecturer</option>
                  <option value="1">Miss Thảo</option>
                  <option value="2">Miss Grand</option>
                  <option value="3">Miss Univer</option>
                  <option value="4">Mr. Khầy</option>
                </select>
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <button className="mr-3 rounded-md bg-green-600 px-3 py-1 text-2xl text-white">
                Accept
              </button>
              <button className="rounded-md bg-red-600 px-3 py-1 text-2xl text-white">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
