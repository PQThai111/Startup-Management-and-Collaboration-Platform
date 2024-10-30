import { BsFiletypeXls } from 'react-icons/bs';

const FilesAttachment = () => {
  return (
    <>
      <p className="mb-3 font-bold">Files Attachment</p>
      <div className="rounded-lg bg-white px-3 py-3 text-sm">
        <div className="mt-2 flex items-center gap-2">
          <BsFiletypeXls className="text-3xl" />
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-semibold">Data-structures.xls</p>
              <p className="text-[#828282]">1.4 MB</p>
            </div>
            <p className="text-[#828282]">Courtney Henry</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <BsFiletypeXls className="text-3xl" />
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-semibold">Data-structures.xls</p>
              <p className="text-[#828282]">1.4 MB</p>
            </div>
            <p className="text-[#828282]">Courtney Henry</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <BsFiletypeXls className="text-3xl" />
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-semibold">Data-structures.xls</p>
              <p className="text-[#828282]">1.4 MB</p>
            </div>
            <p className="text-[#828282]">Courtney Henry</p>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <BsFiletypeXls className="text-3xl" />
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <p className="text-base font-semibold">Data-structures.xls</p>
              <p className="text-[#828282]">1.4 MB</p>
            </div>
            <p className="text-[#828282]">Courtney Henry</p>
          </div>
        </div>
        <div className="flex justify-end">
          <button className="mt-2 rounded-lg border px-3 py-1">
            Add new file
          </button>
        </div>
      </div>
    </>
  );
};

export default FilesAttachment;
