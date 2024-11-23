import { useMutation, useQuery } from '@tanstack/react-query';
import Manager_Approval_Detail from './Manager_Approval_Detail';
import Manager_Approval_Item from './Manager_Approval_Item';
import { QueryRequest, Request } from '../../../types/request.type';
import startupRequestsApi from '../../../apis/startupRequest.api';
import Pagination from '../../../components/pagination';
import { useProjectQueryConfig } from '../../../hooks/useQueryConfig';
import path from '../../../constant/path';
import { QueryAccount } from '../../../types/account.type';
import accountApi from '../../../apis/account.api';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { requestSchema, RequestSchema } from '../../../util/rules';
import { useState } from 'react';
import Popover from '../../../components/popover';

import Manager_Approval_Reject from './Manager_Approval_Reject';
import { toast } from 'react-toastify';

type FormData = Pick<RequestSchema, 'RequestId' | 'LecturerId' | 'MentorId'>;

const schema = requestSchema.pick(['RequestId', 'MentorId', 'LecturerId']);

export default function Manager_Approval() {
  const [request, setRequest] = useState<Request | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const param: QueryRequest = {
    status: 0,
  };

  const { data: requestsData, isPending: requestPending } = useQuery({
    queryKey: ['requests', param],
    queryFn: () => {
      return startupRequestsApi.getRequests(param);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const requests = requestsData?.data?.data.data || [];

  const queryConfig = useProjectQueryConfig();

  const paramLecturer: QueryAccount = {
    roles: 'lecturer',
  };

  const { data: lecturersData, isPending: lecturerPending } = useQuery({
    queryKey: ['lecturers', paramLecturer],
    queryFn: () => {
      return accountApi.getAccounts(paramLecturer);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });

  const lecturers = lecturersData?.data?.data || [];

  const paramMentor: QueryAccount = {
    roles: 'mentor',
  };

  const { data: mentorsData, isPending: mentorPending } = useQuery({
    queryKey: ['mentors', paramMentor],
    queryFn: () => {
      return accountApi.getAccounts(paramMentor);
    },
    placeholderData: (prevData) => prevData,
    staleTime: 3 * 60 * 1000,
  });
  const mentors = mentorsData?.data?.data || [];

  const { handleSubmit, control, setValue } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      RequestId: '',
      LecturerId: '',
      MentorId: '',
    },
  });

  const approveStartupRequestsMutation = useMutation({
    mutationFn: (body: FormData) =>
      startupRequestsApi.approveStartupRequests(body.RequestId, {
        lecturerId: body.LecturerId,
        mentorId: body.MentorId,
      }),
  });

  const onChooseRequest = (item: Request) => {
    setRequest(item);
    setValue('RequestId', item.id);
  };

  const onChooseReject = () => {
    if (request === undefined) {
      toast.error('Choose request first !', {
        autoClose: 500,
      });
      return;
    }
    setIsOpen(!isOpen);
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    approveStartupRequestsMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  });

  return (
    <div className="p-2">
      <div className="mt-[-20px] grid h-[80vh] grid-cols-10 gap-3">
        <div className="col-span-4 h-full rounded-md border border-slate-300 bg-slate-100 p-2">
          <div className="mb-4 mt-3 grid h-8 grid-cols-10 rounded-md border border-slate-500 bg-slate-500 text-white">
            <div className="col-span-4 flex items-center border-r border-white pl-10">
              Name
            </div>
            <div className="col-span-4 flex items-center border-r border-white pl-2">
              Leader Name
            </div>
            <div className="col-span-2 flex items-center justify-center">
              Type
            </div>
          </div>
          <div className="min-h-[470px]">
            {requestPending ? (
              <option>Loading...</option>
            ) : (
              requests &&
              requests.map((request) => (
                <Manager_Approval_Item
                  request={request}
                  onChooseRequest={onChooseRequest}
                />
              ))
            )}
            {/* .filter((request) => request.status == 0) */}
          </div>
          <Pagination
            queryConfig={queryConfig}
            PageSize={requestsData?.data.data.pagination.limit as number}
            pathName={path.manager_approval_management + '/approval'}
          />
        </div>
        <div className="col-span-6 grid h-full grid-rows-12 gap-3 rounded-md">
          <div className="row-span-10 rounded-md border border-slate-300 bg-slate-100 p-1">
            <Manager_Approval_Detail request={request} />
          </div>
          <form
            onSubmit={onSubmit}
            className="row-span-2 grid grid-cols-12 rounded-md border border-slate-300 bg-slate-100 px-3 py-1"
          >
            <div className="col-span-8">
              <div className="mb-1 grid grid-cols-10 items-center">
                <p className="col-span-3 mr-3">Mentor Name:</p>
                <Controller
                  control={control}
                  name="MentorId"
                  defaultValue={mentors[0]?.mentor?.id}
                  render={({ field }) => (
                    <select
                      id="mentor"
                      className="block h-[35px] w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      {...field}
                      onChange={field.onChange}
                      defaultValue={mentors[0]?.mentor?.id}
                    >
                      {mentorPending ? (
                        <option>Loading...</option>
                      ) : (
                        mentors.map((mentor) => (
                          <option
                            key={mentor.mentor?.id}
                            value={mentor.mentor?.id}
                          >
                            {mentor.mentor?.name}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                />
              </div>
              <div className="mb-1 grid grid-cols-10 items-center">
                <p className="col-span-3 mr-3">Lecturer Name:</p>
                <Controller
                  control={control}
                  name="LecturerId"
                  defaultValue={lecturers[0]?.lecturer?.id}
                  render={({ field }) => (
                    <select
                      id="lecturer"
                      className="block h-[35px] w-[300px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      {...field}
                      onChange={field.onChange}
                      defaultValue={lecturers[0]?.lecturer?.id}
                    >
                      {lecturerPending ? (
                        <option>Loading...</option>
                      ) : (
                        lecturers.map((lecturer) => (
                          <option
                            key={lecturer.lecturer?.id}
                            value={lecturer.lecturer?.id}
                          >
                            {lecturer.lecturer?.lecturerName}
                          </option>
                        ))
                      )}
                    </select>
                  )}
                />
              </div>
            </div>

            <div className="col-span-4 flex h-full items-center">
              <button
                type="submit"
                className="mr-3 rounded-md bg-green-600 px-3 py-1 text-2xl text-white"
              >
                Accept
              </button>
              <Popover
                initialOpen={isOpen}
                renderPopover={
                  request && (
                    <Manager_Approval_Reject
                      request={request}
                      handleOpen={onChooseReject}
                    />
                  )
                }
              >
                <button
                  onClick={(_) => onChooseReject()}
                  className="rounded-md bg-red-600 px-3 py-1 text-2xl text-white"
                >
                  Reject
                </button>
              </Popover>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
