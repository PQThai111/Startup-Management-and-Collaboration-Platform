import LogoFPT from '../../src/assets/FPT.png';

const Footer = () => {
  return (
    <div className="h-[300px] bg-[#FCF3E4] min-h-fit p-3">
      <div className="h-[70px] w-[150px] mx-10 mt-10 mb-5">
        <img className='h-full w-full' src={LogoFPT} alt="" />
      </div>
      <div className='flex gap-20'>
        <div className="ml-14">
          <h1 className="font-bold">OUR LINK</h1>
          <div className="flex flex-col">
            <a href="http://">Educate</a>
            <a href="http://">Support</a>
            <a href="http://">Contact</a>
          </div>
        </div>
        <div>
          <h1 className="font-bold">TP. Hồ Chí Minh</h1>
          <p>Địa chỉ: Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh
          </p>
          <p>Điện thoại: 028 7300 1866</p>
          <p>Email: daihocfpt@fpt.edu.vn</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
