import Input from '../components/Input';
import Logo from '../common/components/Logo';
import { Link } from 'react-router-dom';
import path from '../constant/path';

export default function Register() {
  return (
    <div className="container7">
      <div className="mx-auto mt-8 h-[690px] w-[600px] bg-[#013C5A] p-5 px-14">
        <div className="mt-2 flex justify-center">
          <Logo isLogin />
        </div>
        <div>
          <p className="mt-2 text-center text-[45px] font-extrabold text-white">
            Welcome !
          </p>
        </div>
        <form noValidate className="mt-[-10px]">
          <div className="text-white">Role of you:</div>

          <div className="">
            <div className="mb-1 flex ps-4">
              <input
                id="bordered-radio-1"
                type="radio"
                name="bordered-radio"
                className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-1"
                  className="font-medium text-white dark:text-gray-300"
                >
                  Student
                </label>
              </div>
            </div>

            <div className="mb-1 flex ps-4">
              <input
                id="bordered-radio-2"
                type="radio"
                name="bordered-radio"
                className="h-4 w-4"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-2"
                  className="font-medium text-white"
                >
                  Lecturer
                </label>
              </div>
            </div>
            <div className="mb-1 flex ps-4">
              <input
                id="bordered-radio-3"
                type="radio"
                name="bordered-radio"
                className="h-4 w-4"
              />
              <div className="ms-2 flex w-full flex-col space-y-0">
                <label
                  htmlFor="bordered-radio-3"
                  className="font-medium text-white"
                >
                  Mentor
                </label>
              </div>
            </div>
          </div>
          <div className="text-white">Gmail:</div>
          <Input
            name="email"
            type="email"
            placeholder=" Gmail"
            className="mb-7 h-7 w-[490px] rounded-sm"
          />
          {/* <input type="text" /> */}
          <div className="text-white">Password:</div>
          <Input
            name="password"
            type="password"
            placeholder=" Password"
            className="mb-7 h-7 w-[490px] rounded-sm"
          />
          <div className="text-white">Confirm password:</div>
          <Input
            name="password"
            type="password"
            placeholder=" Confirm password"
            className="mb-7 h-7 w-[490px] rounded-sm"
          />
          <div className="text-white">Phone number:</div>
          <Input
            name="password"
            type="password"
            placeholder=" Confirm password"
            className="mb-7 h-7 w-[490px] rounded-sm"
          />
          <button
            type="submit"
            className="mt-7 h-9 w-full rounded-lg bg-orange-400 text-center text-[20px] font-bold"
          >
            Sign up
          </button>
        </form>
        <div className="mt-3 flex w-[490px]">
          <p className="text-center text-white">You already have an account?</p>
          <Link
            to={path.login}
            className="font-semibold text-gray-400 underline-offset-1"
          >
            {' '}
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
