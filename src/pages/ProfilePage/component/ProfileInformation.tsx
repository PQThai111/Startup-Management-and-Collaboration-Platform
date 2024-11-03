
export default function ProfileInformation() {
  return (
    <div className="p-5">
      <div className="font-semibold text-2xl border-b-2 pb-2 mb-3">
        Profile information
      </div>
      <div className="h-[400px] grid grid-cols-12">
        <div className="h-full col-span-3 p-3">
          <div className=" flex justify-end mb-5">
            Gmail:
          </div>
          <div className="flex justify-end mb-5">
            Full name:
          </div>
          <div className="flex justify-end mb-5">
            Student code:
          </div>
          <div className="flex justify-end mb-5">
            Student department:
          </div>
          <div className="flex justify-end mb-5">
            Phone number:
          </div>
        </div>
        <div className="h-full col-span-9 border border-blue-500 ">

        </div>
      </div>
    </div>
  )
}
