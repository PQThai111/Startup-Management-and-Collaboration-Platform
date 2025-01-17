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
<<<<<<< HEAD
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
=======
    if (request) {
      reset({ Reason: '' });
    }
  }, [request, reset]);

  const onButtonSubmit = handleSubmit((data) => {
    rejectStartupRequestsMutation.mutate(data, {
      onSuccess: () => {
>>>>>>> 5175638 (New Inbox, Fix small bug)
        queryClient.invalidateQueries({
          queryKey: ['requests', param],
          exact: true,
        });
<<<<<<< HEAD
        toast.success('Reject Successfully !', {
          autoClose: 500,
        });
      },
      onError: (error) => {
        console.log(error);
        toast.success('Reject Fail !', {
=======
        toast.success('Rejected Successfully!', {
          autoClose: 500,
        });
      },
      onError: () => {
        toast.error('Rejection Failed!', {
>>>>>>> 5175638 (New Inbox, Fix small bug)
          autoClose: 500,
        });
      },
    });
  });

  return (
<<<<<<< HEAD
    <div className="h-[60%] w-[50%] overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">Reject Reason</div>
        <button
          onClick={handleOpen}
          className="rounded-md bg-gray-200 px-4 py-2 text-gray-500 hover:bg-gray-300"
=======
    <div className="h-[35%] w-[50%] max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Reject Request</h2>
        <button
          onClick={handleOpen}
          className="rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
          aria-label="Close modal"
>>>>>>> 5175638 (New Inbox, Fix small bug)
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
<<<<<<< HEAD
              d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
=======
              d="M9 15l-6-6m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
>>>>>>> 5175638 (New Inbox, Fix small bug)
            />
          </svg>
        </button>
      </div>
<<<<<<< HEAD
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
=======

      {/* Body Section */}
      <div className="space-y-4">
        <p className="text-gray-600">
          <strong>Project Title:</strong> {request.startupIdea.title}
        </p>

        <div>
          <label htmlFor="Reason" className="block text-gray-700">
            Reason for Rejection
          </label>
          <Controller
            control={control}
            name="Reason"
            render={({ field }) => (
              <textarea
                id="Reason"
                {...field}
                className={`mt-2 w-full resize-none rounded-lg border ${
                  errors.Reason
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:border-blue-500'
                } bg-gray-50 p-3 text-sm text-gray-900 focus:ring focus:ring-blue-500`}
                placeholder="Write your rejection reason here..."
              />
            )}
          />
          <p className="mt-1 text-sm text-red-500">
            {errors?.Reason?.message ? errors?.Reason?.message : ''}
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleOpen}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-600 hover:bg-gray-50"
          aria-label="Cancel rejection"
        >
          Cancel
        </button>
        <button
          onClick={onButtonSubmit}
          type="button"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          aria-label="Submit rejection"
        >
          Submit
        </button>
      </div>
>>>>>>> 5175638 (New Inbox, Fix small bug)
    </div>
  );
}
