import { Controller, useForm } from 'react-hook-form';
import { QueryRequest, Request } from '../../../types/request.type';
import { rejectSchema, RejectSchema } from '../../../util/rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import startupRequestsApi from '../../../apis/startupRequest.api';
import { toast } from 'react-toastify';

interface Props {
  request: Request;
  handleOpen: (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

type FormData = Pick<RejectSchema, 'Reason'>;

const schema = rejectSchema.pick(['Reason']);

export default function Manager_Approval_Reject({
  request,
  handleOpen,
}: Props) {
  const queryClient = useQueryClient();
  const param: QueryRequest = {
    RequestStatus: 0,
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      Reason: '',
    },
  });

  const rejectStartupRequestsMutation = useMutation({
    mutationFn: (body: FormData) =>
      startupRequestsApi.rejectStartupRequests(request.id, {
        reason: body.Reason,
        notifyByEmail: true,
      }),
  });

  useEffect(() => {
    if (request != undefined) {
      reset({
        Reason: '',
      });
    }
  }, [request, reset]);

  console.log(errors);

  const onSubmit = handleSubmit((data) => {
    rejectStartupRequestsMutation.mutate(data, {
      onSuccess: (_) => {
        queryClient.invalidateQueries({
          queryKey: ['requests', param],
          exact: true,
        });
        toast.success('Reject Successfully !', {
          autoClose: 500,
        });
      },
      onError: (error) => {
        console.log(error);
        toast.success('Reject Fail !', {
          autoClose: 500,
        });
      },
    });
  });

  return (
    <div className="h-[60%] w-[50%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">Reject Reason</div>
        <button
          onClick={handleOpen}
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
      <form className="h-full overflow-y-auto py-4">
        <div className="mb-2">Project title: {request.startupIdea.title}</div>
        <div className="mb-5 h-[50%]">
          <div className="mb-1">Reason: </div>
          <div className="h-full">
            <Controller
              control={control}
              name="Reason"
              defaultValue=""
              render={({ field }) => (
                <textarea
                  id="Reason"
                  className="h-[88%] w-[100%] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder="Write your thoughts here..."
                  {...field}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
          {errors.Reason && (
            <p className="text-sm text-red-500">{errors.Reason.message}</p>
          )}
        </div>
        <button
          type="button"
          onClick={(e) => {
            onSubmit(e);
            handleOpen(e);
          }}
          className="h-[15%] w-[100%] bg-slate-500 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
