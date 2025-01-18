import { yupResolver } from '@hookform/resolvers/yup';
import { Request } from '../../../types/request.type';
import { projectSchema, ProjectSchema } from '../../../util/rules';
import { Controller, useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import accountApi from '../../../apis/account.api';
import { QueryAccount } from '../../../types/account.type';
import startupRequestsApi from '../../../apis/startupRequest.api';
import { toast } from 'react-toastify';
import { AppContext } from '../../../context/app.context';

type FormData = Pick<
  ProjectSchema,
  | 'StartupIdeaId'
  | 'DesiredLecturerId'
  | 'StartupIdeaCategory'
  | 'StartupIdeaDescription'
  | 'StartupIdeaTitle'
>;

const schema = projectSchema.pick([
  'StartupIdeaId',
  'DesiredLecturerId',
  'StartupIdeaCategory',
  `StartupIdeaDescription`,
  `StartupIdeaTitle`,
]);

function RequestStartup({
  handleClose,
  requestStartup,
}: {
  requestStartup: Request;
  handleClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { profile } = useContext(AppContext);
  const [file, setFile] = useState<File | null>(null);
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

  const UpdateRequestMutation = useMutation({
    mutationFn: startupRequestsApi.updateStartupRequests,
    onError: (_) => {
      toast.error('Fail to Update request !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Update request successfully !', {
        autoClose: 500,
      });
      queryClient.invalidateQueries({
        queryKey: ['requestsStu', profile?.id],
        exact: true,
      });
      handleClose();
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      StartupIdeaId: requestStartup.startupIdea.id,
      DesiredLecturerId: requestStartup.desiredLecturerId,
      StartupIdeaCategory: requestStartup.startupIdea.category,
      StartupIdeaDescription: requestStartup.startupIdea.description,
      StartupIdeaTitle: requestStartup.startupIdea.title,
    },
  });

  const onSubmit = handleSubmit((data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('startupIdeaId', data.StartupIdeaId);
    formData.append('desiredLecturerAccountId', data.DesiredLecturerId);
    formData.append('startupIdeaCategory', data.StartupIdeaCategory.toString());
    formData.append('startupIdeaDescription', data.StartupIdeaDescription);
    formData.append('startupIdeaTitle', data.StartupIdeaTitle);
    formData.append('startupIdeaStatus', '0');
    formData.append('status', '0');
    if (file) {
      formData.append('startupIdeaCoverImage', file);
    }
    console.log(data.DesiredLecturerId);
    UpdateRequestMutation.mutate({ id: requestStartup.id, body: formData });
  });

  const handleRemove = () => {
    const formData = new FormData();
    formData.append('startupIdeaId', requestStartup.startupIdea.id);
    formData.append(
      'desiredLecturerAccountId',
      requestStartup.desiredLecturerId,
    );
    formData.append(
      'startupIdeaCategory',
      requestStartup.startupIdea.category.toString(),
    );
    formData.append(
      'startupIdeaDescription',
      requestStartup.startupIdea.description,
    );
    formData.append('startupIdeaTitle', requestStartup.startupIdea.title);
    // formData.append('StartupRequestStatus', requestStartup.);
    formData.append('status', '3');
    UpdateRequestMutation.mutate({ id: requestStartup.id, body: formData });
  };

  return (
    <div className="h-[95%] w-[50%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">
          Startup Request Information
        </div>
        <button
          onClick={() => {
            handleClose();
          }}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>
      <div className="h-full overflow-y-auto py-4">
        <form onSubmit={onSubmit} className="mb-3 px-3">
          <div className="mb-1 flex justify-start">
            <p>
              <span className="font-semibold">Leader: </span>
            </p>
            <p className="ml-2">{requestStartup?.senderInfo.studentName}</p>
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
                        checked={domain.value === field.value}
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
                  value={field.value}
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
                  value={field.value}
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
              className="w-20 rounded-sm border-2 border-main bg-main font-semibold text-white"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => handleRemove()}
              className="mx-2 w-20 rounded-sm border-2 border-main bg-red-500 font-semibold text-white"
            >
              Remove
            </button>
            <button
              type="button"
              onClick={(_) =>
                reset({
                  DesiredLecturerId: requestStartup.desiredLecturerId,
                  StartupIdeaCategory: requestStartup.startupIdea.category,
                  StartupIdeaDescription:
                    requestStartup.startupIdea.description,
                  StartupIdeaTitle: requestStartup.startupIdea.title,
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

export default RequestStartup;
