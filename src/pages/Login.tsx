import Logo from "../common/components/Logo";

const Login = (): JSX.Element => {
  return <>
  <div className="container7">
    <div className="my-10 mx-auto w-[600px] h-[630px] bg-[#013C5A] p-5 px-14">
      <div className=" flex justify-center mt-5">
        <Logo isLogin/>
      </div>
      <div >
        <p className=" text-white font-extrabold text-[50px] text-center my-2">
          Welcome back
        </p>
      </div>
      <p className="text-white">
        Gmail:
      </p>
        <input type="text" className="w-[490px] mb-2 h-10 rounded-sm pl-5" placeholder=" Gmail"/>
        <p className="text-white">
        Password:
      </p>
        <input type="password" className="w-[490px] h-10 mb-2 rounded-sm pl-5" placeholder=" Password"/>
        <a href="" className="text-white underline">Forgot password ?</a>
        <div className=" w-[490px]">
          <button className=" w-full bg-orange-400 rounded-lg mt-10 text-center h-9 font-bold text-[20px]">
            Login
          </button>
          <p className="mt-5 text-center text-white">Or?</p>
          <button className=" w-full bg-white rounded-lg mt-5 text-center text-main h-9 font-bold text-[20px]">
            Sign up
          </button>
        </div>
    </div>
  </div>;
</>
};

export default Login;
