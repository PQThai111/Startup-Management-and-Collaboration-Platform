import { useMutation } from "@tanstack/react-query";
import { yupResolver } from '@hookform/resolvers/yup'
import Logo from "../common/components/Logo";
import Input from "../components/Input";
import { schema, Schema } from '../util/rules'
import authApi from "../apis/auth.api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import path from "../constant/path";

type FormData = Pick<Schema, 'email' | 'password'>
const loginSchema = schema.pick(['email', 'password'])

const Login = (): JSX.Element => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    //setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => authApi.loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    loginAccountMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        navigate(path.home)
        // setIsAuthenticated(true)
        // setProfile(data.data.data.user)
      },
      onError: (error) => {
        console.log(error)
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
      }
    })
  })

  return <>
  <div className="container7">
    <div className="my-9 mx-auto w-[600px] h-[630px] bg-[#013C5A] p-5 px-14">
      <div className=" flex justify-center mt-5">
        <Logo isLogin/>
      </div>
      <div >
        <p className=" text-white font-extrabold text-[50px] text-center my-2">
          Welcome back
        </p>
      </div>
      <form noValidate onSubmit={onSubmit}>
        <div className="text-white">
          Gmail:
        </div>
        <Input register={register} name="email" type='email' placeholder=" Gmail" className="w-[490px] mb-8 h-10 rounded-sm"
        errorMessage={errors.email?.message}/>
        {/* <input type="text" /> */}
        <div className="text-white">
          Password:
        </div>
        <Input register={register} name='password' type='password' placeholder=" Password" className="w-[490px] mb-8 h-10 rounded-sm" errorMessage={errors.password?.message}/>
        <a href="" className="text-white underline">Forgot password ?</a>
        <button type="submit" className=" w-full bg-orange-400 rounded-lg mt-10 text-center h-9 font-bold text-[20px]">
            Login
        </button>
      </form>
      <div className=" w-[490px]">
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
