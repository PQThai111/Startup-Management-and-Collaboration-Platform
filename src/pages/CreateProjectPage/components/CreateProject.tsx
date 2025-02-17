import { useMutation, useQuery } from '@tanstack/react-query';
import courseApi from '../../../apis/course.api';
import accountApi from '../../../apis/account.api';
import { QueryAccount } from '../../../types/account.type';
import { projectSchema, ProjectSchema } from '../../../util/rules';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useContext, useEffect, useState } from 'react';
import startupRequestsApi from '../../../apis/startupRequest.api';
import { toast } from 'react-toastify';
import { AppContext } from '../../../context/app.context';

type FormData = Pick<
  ProjectSchema,
  | 'CourseId'
  | 'DesiredLecturerId'
  | 'StartupIdeaCategory'
  | 'StartupIdeaDescription'
  | 'StartupIdeaTitle'
>;

const schema = projectSchema.pick([
  'CourseId',
  'DesiredLecturerId',
  'StartupIdeaCategory',
  `StartupIdeaDescription`,
  `StartupIdeaTitle`,
]);

export default function CreateProject() {
  const { profile } = useContext(AppContext);
  const [file, setFile] = useState<File | null>(null);

  const createRequestMutation = useMutation({
    mutationFn: startupRequestsApi.createStartupRequests,
    onError: (e: any) => {
      console.log(e);
      toast.error(
        e?.response?.data?.errors
          ? e?.response?.data?.errors[0]
          : e?.response?.data?.message,
        {
          autoClose: 1000,
        },
      );
    },
    onSuccess: () => {
      toast.success('Create request successfully !', {
        autoClose: 500,
      });
    },
  });

  const { data: coursesData, isPending: coursePending } = useQuery({
    queryKey: ['courses'],
    queryFn: () => {
      return courseApi.getCourses();
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const courses = coursesData?.data?.data || [];

  const param: QueryAccount = {
    roles: 'lecturer',
  };

  const { data: accountsData, isPending: lecturerPending } = useQuery({
    queryKey: ['accounts'],
    queryFn: () => {
      return accountApi.getAccounts(param);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const accounts = accountsData?.data?.data || [];

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      CourseId: '',
      DesiredLecturerId: '',
      StartupIdeaCategory: 1,
      StartupIdeaDescription: '',
      StartupIdeaTitle: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append('courseId', data.CourseId);
    formData.append('desiredLecturerId', data.DesiredLecturerId);
    formData.append(
      'startupIdea.category',
      data.StartupIdeaCategory.toString(),
    );
    formData.append('startupIdea.description', data.StartupIdeaDescription);
    formData.append('startupIdea.title', data.StartupIdeaTitle);
    if (file) {
      formData.append('startupIdea.coverImage', file);
    }

    createRequestMutation.mutate(formData);
  });

  useEffect(() => {
    if (courses.length > 0 && accounts.length > 0) {
      reset({
        CourseId: courses[0]?.id,
        DesiredLecturerId: accounts[0]?.lecturer?.id,
        StartupIdeaCategory: 1,
        StartupIdeaDescription: '',
        StartupIdeaTitle: '',
      });
    }
  }, [courses, accounts, reset]);

  return (
    <div className="container mx-auto mt-8 grid grid-cols-10 bg-slate-100 py-5">
      <div className="col-span-6 col-start-3 my-10 rounded-sm border bg-white p-7">
        <h1 className="mb-3 text-2xl font-bold text-main">Create a Project</h1>
        <form onSubmit={onSubmit} className="mb-3 px-3">
          <div className="mb-1 flex justify-start">
            <p>
              <span className="font-semibold">Leader: </span>
            </p>
            <p className="ml-2">{profile?.email}</p>
          </div>
          <div className="my-2 border-b-2 py-4">
            <p className="font-semibold">Course:</p>
            <Controller
              control={control}
              name="CourseId"
              defaultValue={courses[0]?.id}
              render={({ field }) => (
                <select
                  id="courses"
                  className="block h-[35px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  {...field}
                  onChange={field.onChange}
                  defaultValue={courses[0]?.id}
                >
                  {coursePending ? (
                    <option>Loading...</option>
                  ) : (
                    courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))
                  )}
                </select>
              )}
            />
          </div>

          <div className="my-2 grid grid-cols-10 border-b-2 py-4">
            <p className="col-span-10 font-semibold">Project domain : </p>
            {[
              { value: 0, label: 'Healthcare' },
              { value: 1, label: 'Fintech' },
              { value: 2, label: 'Sharing Economy' },
              { value: 3, label: 'Ed Tech' },
              { value: 4, label: 'E-commerce' },
              { value: 5, label: 'SaaS' },
              { value: 6, label: 'GreenTech' },
              { value: 7, label: 'AI & Machine Learning' },
              { value: 8, label: 'Prop Tech' },
              { value: 9, label: 'Ag Tech' },
              { value: 10, label: 'Logistics & Supply Chain' },
              { value: 11, label: 'Entertainment & Media' },
              { value: 12, label: 'Mobility' },
              { value: 13, label: 'Cybersecurity' },
              { value: 14, label: 'Others' },
            ].map((domain, index) => (
              <div className="col-span-3 mt-2 flex ps-4" key={index}>
                <Controller
                  control={control}
                  name="StartupIdeaCategory"
                  render={({ field }) => (
                    <>
                      <input
                        id={`radio-${domain.value}`}
                        type="radio"
                        value={domain.value}
                        checked={field.value === domain.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="mt-[2px] h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      <label
                        htmlFor={`radio-${domain.value}`}
                        className="ms-2 font-medium text-gray-900 dark:text-gray-300"
                      >
                        {domain.label}
                      </label>
                    </>
                  )}
                />
              </div>
            ))}
          </div>

          <div className="my-4 border-b-2 pb-2">
            <p>
              <span className="font-semibold">Project title:</span>
            </p>
            <div>
              <Controller
                control={control}
                name="StartupIdeaTitle"
                render={({ field }) => (
                  <input
                    type="text"
                    className="mb-2 h-[30px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    placeholder=" English name of project"
                    {...field}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>
            {errors.StartupIdeaTitle && (
              <p className="text-sm text-red-500">
                {errors.StartupIdeaTitle.message}
              </p>
            )}
          </div>

          <div className="my-4 border-b-2 pb-4">
            <p className="font-semibold">Description:</p>
            <p className="text-gray-500">
              * The description includes context, problem, solution,
              features,...
            </p>
            <Controller
              control={control}
              name="StartupIdeaDescription"
              render={({ field }) => (
                // Ben tren cai nao cung giong nhau
                // Khac nhau trong cai render
                <textarea
                  id="message"
                  className="block h-[200px] w-[80%] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Write your thoughts here..."
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.StartupIdeaDescription && (
              <p className="text-sm text-red-500">
                {errors.StartupIdeaDescription.message}
              </p>
            )}
          </div>

          <div className="my-2 flex border-b-2 py-4">
            <p>
              <span className="font-semibold">Cover image : </span>
            </p>
            <input
              type="file"
              onChange={(e) => {
                const selectedFile = e.target?.files?.[0] as File; // Get the first selected file
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />
          </div>
          {/* //Desired lecture */}
          <div className="my-2 border-b-2 py-4">
            <p className="font-semibold">Desired lecture :</p>
            <Controller
              control={control}
              name="DesiredLecturerId"
              render={({ field }) => (
                <select
                  id="lecturer"
                  className="block h-[35px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  {...field}
                  onChange={field.onChange}
                  value={field.value || accounts[0]?.lecturer?.id}
                >
                  {lecturerPending ? (
                    <option>Loading...</option>
                  ) : (
                    accounts.map((account) => (
                      <option
                        key={account.lecturer?.id}
                        value={account.lecturer?.id}
                      >
                        {account.lecturer?.lecturerName}
                      </option>
                    ))
                  )}
                </select>
              )}
            />
          </div>
          <div>
            <button
              type="submit"
              className="mr-5 w-20 rounded-sm border-2 border-main bg-main font-semibold text-white"
              disabled={createRequestMutation.isPending}
            >
              Create
            </button>
            <button
              onClick={(_) =>
                reset({
                  CourseId: courses[0]?.id || '',
                  DesiredLecturerId: accounts[0]?.lecturer?.id || '',
                  StartupIdeaCategory: 1,
                  StartupIdeaDescription: '',
                  StartupIdeaTitle: '',
                })
              }
              className="w-20 rounded-sm border-2 border-main font-semibold text-main"
            >
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
