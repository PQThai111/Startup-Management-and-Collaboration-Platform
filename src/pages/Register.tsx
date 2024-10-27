
import Input from "../components/Input";
import Logo from '../common/components/Logo'
import { Link } from "react-router-dom";
import path from "../constant/path";

export default function Register() {

  return (
    <div className="container7">
    <div className="mt-8 mx-auto w-[600px] h-[690px] bg-[#013C5A] p-5 px-14">
      <div className=" flex justify-center mt-2">
        <Logo isLogin/>
      </div>
      <div >
        <p className=" text-white font-extrabold text-[45px] text-center mt-2">
          Welcome !
        </p>
      </div>
      <form noValidate className="mt-[-10px]">
        <div className="text-white">
          Role of you:
        </div>

        <div className="">
          <div className="flex ps-4 mb-1">
            <input
              id="bordered-radio-1"
              type="radio"
              name="bordered-radio"
              className="mt-[2px] w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <div className="flex flex-col w-full ms-2 space-y-0">
              <label
                htmlFor="bordered-radio-1"
                className="font-medium text-white dark:text-gray-300"
              >
                Student
              </label>
            </div>
          </div>

          <div className="flex ps-4 mb-1">
            <input
              id="bordered-radio-2"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4"
            />
            <div className="flex flex-col w-full ms-2 space-y-0">
              <label
                htmlFor="bordered-radio-2"
                className="font-medium text-white"
              >
                Lecturer
              </label>
            </div>
          </div>
          <div className="flex ps-4 mb-1">
            <input
              id="bordered-radio-3"
              type="radio"
              name="bordered-radio"
              className="w-4 h-4"
            />
            <div className="flex flex-col w-full ms-2 space-y-0">
              <label
                htmlFor="bordered-radio-3"
                className="font-medium text-white"
              >
                Mentor
              </label>
            </div>
          </div>
        </div>
        <div className="text-white">
          Gmail:
        </div>
        <Input name="email" type='email' placeholder=" Gmail" className="w-[490px] mb-7 h-7 rounded-sm"/>
        {/* <input type="text" /> */}
        <div className="text-white">
          Password:
        </div>
        <Input name='password' type='password' placeholder=" Password" className="w-[490px] mb-7 h-7 rounded-sm"/>
        <div className="text-white">
          Confirm password:
        </div>
        <Input name='password' type='password' placeholder=" Confirm password" className="w-[490px] mb-7 h-7 rounded-sm"/>
        <div className="text-white">
          Phone number:
        </div>
        <Input name='password' type='password' placeholder=" Confirm password" className="w-[490px] mb-7 h-7 rounded-sm"/>
        <button type="submit" className=" w-full bg-orange-400 rounded-lg mt-7 text-center h-9 font-bold text-[20px]">
        Sign up
        </button>
      </form>
      <div className="mt-3 w-[490px] flex">
        <p className="text-center text-white">You already have an account?</p>
        <Link to={path.login} className="text-gray-400 font-semibold underline-offset-1"> Login</Link>
      </div>
    </div>
  </div>
  )
}
