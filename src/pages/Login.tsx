import { useMutation } from '@tanstack/react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from '../common/components/Logo';
import Input from '../components/Input';
import { schema, Schema } from '../util/rules';
import authApi from '../apis/auth.api';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import path from '../constant/path';
import { useContext } from 'react';
import { AppContext } from '../context/app.context';

type FormData = Pick<Schema, 'email' | 'password'>;
const loginSchema = schema.pick(['email', 'password']);

const Login = (): JSX.Element => {
  const { setIsAuthenticated, setProfile } = useContext(AppContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user);
        if (data.data.data.user.role == 1) {
          navigate(path.manager_project_management);
        } else if (data.data.data.user.role == 2) {
          navigate('/');
        } else if (data.data.data.user.role == 3) {
          navigate('/');
        }
      },
      onError: (error) => {
        console.log(error);
        // if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        //   const formError = error.response?.data.data
        //   if (formError) {
        //     Object.keys(formError).forEach((key) => {
        //       setError(key as keyof FormData, {
        //         message: formError[key as keyof FormData],
        //         type: 'Server'
        //       })
        //     })
        //   }
        // }
      },
    });
  });

  return (
    <>
      <div className="container7">
        <div className="mx-auto my-9 h-[630px] w-[600px] bg-[#013C5A] p-5 px-14">
          <div className="mt-5 flex justify-center">
            <Logo isLogin />
          </div>
          <div>
            <p className="my-2 text-center text-[50px] font-extrabold text-white">
              Welcome back
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="text-white">Gmail:</div>
            <Input
              register={register}
              name="email"
              type="email"
              placeholder=" Gmail"
              className="mb-8 h-10 w-[490px] rounded-sm"
              errorMessage={errors.email?.message}
            />
            {/* <input type="text" /> */}
            <div className="text-white">Password:</div>
            <Input
              register={register}
              name="password"
              type="password"
              placeholder=" Password"
              className="mb-8 h-10 w-[490px] rounded-sm"
              errorMessage={errors.password?.message}
            />
            <a href="" className="text-white underline">
              Forgot password ?
            </a>
            <button
              type="submit"
              className="mt-10 h-9 w-full rounded-lg bg-orange-400 text-center text-[20px] font-bold"
            >
              Login
            </button>
          </form>
          <div className="w-[490px]">
            <p className="mt-5 text-center text-white">Or?</p>
            <Link to={path.register}>
              <button className="mt-5 h-9 w-full rounded-lg bg-white text-center text-[20px] font-bold text-main">
                Sign up
              </button>
            </Link>
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default Login;
