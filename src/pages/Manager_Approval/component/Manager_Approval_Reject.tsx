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
    if (request) {
      reset({ Reason: '' });
    }
  }, [request, reset]);

  const onButtonSubmit = handleSubmit((data) => {
    rejectStartupRequestsMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['requests', param],
          exact: true,
        });
        toast.success('Rejected Successfully!', {
          autoClose: 500,
        });
      },
      onError: () => {
        toast.error('Rejection Failed!', {
          autoClose: 500,
        });
      },
    });
  });

  return (
    <div className="h-[35%] w-[50%] max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      {/* Header Section */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-700">Reject Request</h2>
        <button
          onClick={handleOpen}
          className="rounded-md bg-gray-200 p-2 text-gray-500 hover:bg-gray-300"
          aria-label="Close modal"
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
              d="M9 15l-6-6m0 0l6-6M3 9h12a6 6 0 0 1 0 12h-3"
            />
          </svg>
        </button>
      </div>

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
    </div>
  );
}
