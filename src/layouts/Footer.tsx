import LogoFPT from '../../src/assets/FPT.png';

const Footer = () => {
  return (
    <div className="h-[300px] bg-[#FCF3E4] grid grid-cols-7">
      <div className="mx-10 mt-10 col-start-1 col-span-1 ">
        <img src={LogoFPT} alt="" />
      </div>
      <div className="col-span-6 ">
      </div>
      <div className="ml-14 mt-[-2rem] col-span-1 ">
        <h1 className="font-bold">OUR LINK</h1>
        <div className="flex flex-col">
            <a href="http://">Educate</a>
            <a href="http://">Support</a>
            <a href="http://">Contact</a>
        </div>
      </div>
      <div className=" mt-[-2rem] cols-start-4 col-span-4">
          <h1 className="font-bold">TP. Hồ Chí Minh</h1>
          <p>Địa chỉ: Lô E2a-7, Đường D1 Khu Công nghệ cao, P. Long Thạnh Mỹ, TP. Thủ Đức, TP. Hồ Chí Minh
          </p>
          <p>Điện thoại: 028 7300 1866</p>
          <p>Email: daihocfpt@fpt.edu.vn</p>
      </div>
    </div>
  );
};

export default Footer;
