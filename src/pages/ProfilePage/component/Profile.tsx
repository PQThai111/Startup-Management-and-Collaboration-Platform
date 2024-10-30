
export default function Profile() {
  return (
    <div className='container mb-10 mt-10 px-20 mx-auto'>
      <div className="grid grid-cols-10 border h-[500px]">
        <div className="col-span-2 bg-slate-100 grid grid-cols-10">
          <div className="h-20 col-span-3 rounded-sm border-b-2">
            <img src="" alt=""  className="h-full w-full object-cover"/>
          </div>
          <div className="col-span-7 h-20 w-full p-2 border-b-2">
            <div className=" font-semibold text-lg">Họ Và Tên</div>
            <div>SE302233</div>
          </div>
          <div className="col-span-10">
            <div className=" col-span-10 p-2 border">
              Thông tin tài khoản
            </div>
            <div className=" col-span-10 p-2 border">
              Thông tin tài khoản
            </div>
            <div className=" col-span-10 p-2 border">
              Thông tin tài khoản
            </div>
          </div>
        </div>
        <div className="col-span-8 ">

        </div>
      </div>
    </div>
  )
}
