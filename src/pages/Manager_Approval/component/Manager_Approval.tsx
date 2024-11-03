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
        <div className="col-span-6 grid h-full grid-rows-10 gap-3 rounded-md">
          <div className="row-span-8 rounded-sm border border-slate-300 bg-slate-100 p-2">
            <div className="text-[20px] font-semibold">Detail request</div>
          </div>
          <div className="row-span-2 rounded-sm border border-slate-300 bg-slate-100 p-2">
            <div className="flex h-full items-center justify-end">
              <button className="mr-5 rounded-md bg-green-600 px-12 py-4 text-2xl text-white">
                Accept
              </button>
              <button className="rounded-md bg-red-600 px-12 py-4 text-2xl text-white">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
