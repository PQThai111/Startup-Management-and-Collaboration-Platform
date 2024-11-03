import React from 'react';

export default function Manager_Approval_Item() {
  return (
    <div className="mb-2 grid h-11 grid-cols-10 rounded-md border border-slate-300 bg-white">
      <p className="col-span-4 mr-4 flex items-center truncate pl-2">
        Name Lorem ipsum dolor sit amet abc xyz
      </p>
      <div className="col-span-4 mr-3 flex items-center truncate pl-2">
        Leader Name thloztannay
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="rounded-sm bg-yellow-500 px-3 py-1 text-white">
          EXE 1
        </div>
      </div>
    </div>
  );
}
