import { useQuery } from '@tanstack/react-query';
import courseApi from '../../../apis/course.api';
import accountApi from '../../../apis/account.api';
import { QueryAccount } from '../../../types/account.type';
import { projectSchema, ProjectSchema } from '../../../util/rules';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';

type FormData = Pick<
  ProjectSchema,
  | 'CourseId'
  | 'DesiredLecturerId'
  | 'StartupIdea.Category'
  | 'StartupIdeaCoverImage'
  | 'StartupIdeaDescription'
  | 'StartupIdeaTitle'
>;
//  & {
//   StartupIdeaCoverImage: File | undefined;
// };

const schema = projectSchema.pick([
  'CourseId',
  'DesiredLecturerId',
  'StartupIdea.Category',
  'StartupIdeaCoverImage',
  `StartupIdeaDescription`,
  `StartupIdeaTitle`,
]);

export default function CreateProject() {
  const [file, setFile] = useState<File>();

  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);

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
    // setError,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      CourseId: '',
      DesiredLecturerId: '',
      'StartupIdea.Category': 1,
      StartupIdeaDescription: '',
      StartupIdeaTitle: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log(watch(`StartupIdeaCoverImage`));
  console.log(errors);

  useEffect(() => {
    if (courses.length > 0 && accounts.length > 0) {
      reset({
        CourseId: courses[0]?.id,
        DesiredLecturerId: accounts[0]?.lecturer?.accountId,
        'StartupIdea.Category': 1,
        StartupIdeaCoverImage: undefined,
        StartupIdeaDescription: '',
        StartupIdeaTitle: '',
      });
    }
  }, [courses, accounts, reset]);

  return (
    <div className="container mx-auto mt-8 bg-slate-100 px-56 py-5">
      <div className="my-10 rounded-sm border bg-white p-7">
        <h1 className="mb-3 text-2xl font-bold text-main">Create a Project</h1>
        <form onSubmit={onSubmit} className="mb-3 px-3">
          <div className="mb-1 flex justify-start">
            <p>
              <span className="font-semibold">Leader : </span>
            </p>
            <p> Tui</p>
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
                  className="block h-[35px] w-[500px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
              { value: 1, label: 'Healthcare' },
              { value: 2, label: 'Fin Tech' },
              { value: 3, label: 'Sharing' },
              { value: 4, label: 'Economy' },
              { value: 5, label: 'Ed Tech' },
              { value: 6, label: 'E-commerce' },
              { value: 7, label: 'SaaS' },
              { value: 8, label: 'GreenTech' },
              { value: 9, label: 'AI & Machine Learning' },
              { value: 10, label: 'Prop Tech' },
              { value: 11, label: 'Ag Tech' },
              { value: 12, label: 'Logistics & Supply Chain' },
              { value: 13, label: 'Entertainment & Media' },
              { value: 14, label: 'Mobility' },
              { value: 15, label: 'Cybersecurity' },
              { value: 16, label: 'Others' },
            ].map((domain, index) => (
              <div className="col-span-3 mt-2 flex ps-4" key={index}>
                <Controller
                  control={control}
                  name="StartupIdea.Category"
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
                    className="mb-2 h-[30px] w-[500px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
                <textarea
                  id="message"
                  className="block h-[200px] w-[500px] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
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
            <Controller
              control={control}
              name="StartupIdeaCoverImage"
              render={({ field: { onChange, value, ref, ...field } }) => (
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    onChange(file); // Update form value
                  }}
                  ref={ref}
                  {...field}
                />
              )}
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
                  className="block h-[35px] w-[500px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  {...field}
                  onChange={field.onChange}
                  value={field.value || accounts[0]?.lecturer.accountId}
                >
                  {lecturerPending ? (
                    <option>Loading...</option>
                  ) : (
                    accounts.map((account) => (
                      <option
                        key={account.lecturer.accountId}
                        value={account.lecturer.accountId}
                      >
                        {account.lecturer.lecturerName}
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
            >
              Create
            </button>
            <button
              onClick={(_) =>
                reset({
                  CourseId: courses[0]?.id || '',
                  DesiredLecturerId: accounts[0]?.lecturer?.accountId || '',
                  'StartupIdea.Category': 1,
                  StartupIdeaCoverImage: '',
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
