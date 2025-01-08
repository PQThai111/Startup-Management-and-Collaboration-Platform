import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import { eventSchema, EventSchema } from '../../../util/rules';
import { useState } from 'react';
import { DatePicker } from '@nextui-org/react';
import { now, getLocalTimeZone } from '@internationalized/date';
import eventApi from '../../../apis/event.api';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { AxiosResponse } from 'axios';
import { SuccessResponse } from '../../../types/utils.type';
import { EventList } from '../../../types/event.type';

interface Props {
  handleClose: () => void;
  refetchEvents: (
    options?: RefetchOptions,
  ) => Promise<
    QueryObserverResult<AxiosResponse<SuccessResponse<EventList>, any>, Error>
  >;
}

type FormData = Pick<
  EventSchema,
  | 'Title'
  | 'Description'
  | 'Type'
  | 'StartDate'
  | 'EndDate'
  | 'Location'
  | 'Tag'
  | 'RegistrationLink'
  | 'IsMandatory'
>;

const schema = eventSchema.pick([
  'Title',
  'Description',
  'Type',
  `StartDate`,
  `EndDate`,
  `Location`,
  `Tag`,
  `RegistrationLink`,
  `IsMandatory`,
]);

const EventType = [
  {
    value: 0,
    label: 'Seminar',
  },
  {
    value: 1,
    label: 'Workshop',
  },
  {
    value: 2,
    label: 'Meeting',
  },
];

const IsMandatory = [
  {
    value: true,
    label: 'Yes',
  },
  {
    value: false,
    label: 'No',
  },
];

export default function CreateEvent({ handleClose, refetchEvents }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    // watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      Title: '',
      Description: '',
      StartDate: '',
      EndDate: '',
      IsMandatory: false,
      Location: '',
      RegistrationLink: '',
      Tag: '',
      Type: 0,
    },
  });

  const createEventMutation = useMutation({
    mutationFn: eventApi.createEvent,
    onError: (_) => {
      toast.error('Fail to create event !', {
        autoClose: 500,
      });
    },
    onSuccess: () => {
      toast.success('Create event successfully !', {
        autoClose: 500,
      });
      refetchEvents();
      handleClose();
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append('Title', data.Title);
    formData.append('Description', data.Description);
    formData.append('Type', data.Type.toString());
    formData.append('StartDate', data.StartDate);
    formData.append('EndDate', data.EndDate);
    formData.append('Location', data.Location);
    formData.append('Tag', data.Tag);
    formData.append('RegistrationLink', data.RegistrationLink);
    formData.append('IsMandatory', data.IsMandatory ? 'true' : 'false');
    if (file) {
      formData.append('CoverImageFile', file);
    }

    createEventMutation.mutate(formData);
  });

  return (
    <div className="h-[95%] w-[70%] overflow-hidden overflow-y-scroll rounded-lg bg-white p-6 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-3xl font-medium text-gray-700">Create Event</div>
        <button
          onClick={() => handleClose()}
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
      <form onSubmit={onSubmit}>
        {/* Title */}
        <div className="my-4 border-b-2 pb-2">
          <p>
            <span className="font-semibold">Event title:</span>
          </p>
          <div>
            <Controller
              control={control}
              name="Title"
              render={({ field }) => (
                <input
                  type="text"
                  className="mb-2 h-[30px] w-[50%] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  placeholder=" English name of project"
                  {...field}
<<<<<<< HEAD
                  onChange={field.onChange}
=======
                  onChange={(e) => {
                    const value = e.target.value;
                    console.log('Value entered:', value); // Debugging line
                    field.onChange(value); // Make sure spaces are passed here
                  }}
>>>>>>> e31efde (Staff manage main)
                  value={field.value}
                />
              )}
            />
          </div>
          {errors.Title && (
            <p className="text-sm text-red-500">{errors.Title.message}</p>
          )}
        </div>

        {/* Dess */}
        <div className="my-4 border-b-2 pb-4">
          <p className="font-semibold">Description:</p>
          <p className="text-gray-500">
            * The description includes context, problem, solution, features,...
          </p>
          <Controller
            control={control}
            name="Description"
            render={({ field }) => (
              // Ben tren cai nao cung giong nhau
              // Khac nhau trong cai render
              <textarea
                id="Description"
                className="block h-[200px] w-[80%] resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Write your thoughts here..."
                {...field}
                onChange={field.onChange}
              />
            )}
          />
          {errors.Description && (
            <p className="text-sm text-red-500">{errors.Description.message}</p>
          )}
        </div>

        {/* Type */}
        <div className="my-2 flex border-b-2 py-4">
          <p className="font-semibold">Event Type:</p>
          {EventType.map((domain, index) => (
            <div className="ps-4" key={index}>
              <Controller
                name="Type"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id={`radio-${domain.value}`}
                      type="radio"
                      value={domain.value}
                      checked={Number(field.value) === domain.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`radio-${domain.value}`}
                      className="ml-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      {domain.label}
                    </label>
                  </>
                )}
              />
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="my-2 flex items-center border-b-2 py-4">
          <div className="font-semibold">Cover image: </div>
          <input
            className="ml-2"
            type="file"
            onChange={(e) => {
              const selectedFile = e.target?.files?.[0] as File; // Get the first selected file
              if (selectedFile) {
                setFile(selectedFile);
              }
            }}
          />
        </div>

        {/* StartTime */}
        <div className="my-4 border-b-2 pb-2">
          <span className="font-semibold">Start Time:</span>
          <div>
            <Controller
              control={control}
              name="StartDate"
              render={(_) => (
                <DatePicker
                  aria-label="startDate"
                  hideTimeZone
                  showMonthAndYearPickers
                  // defaultValue={new Date()}
                  defaultValue={now(getLocalTimeZone())}
                  // label="Event Date"
                  onChange={(value) => {
                    if (value) {
                      console.log(value);
                      const localDate = new Date(
                        value.year,
                        value.month - 1, // Month in JavaScript is 0-indexed
                        value.day,
                        value.hour,
                        value.minute,
                        value.second,
                        value.millisecond,
                      );

                      const timezoneOffset =
                        localDate.getTimezoneOffset() * 60 * 1000;

                      const adjustedDate = new Date(
                        localDate.getTime() - timezoneOffset,
                      );

                      const isoTime = adjustedDate.toISOString();

                      setValue('StartDate', isoTime);
                    }
                  }}
                  variant="bordered"
                  className="rounded-md border border-gray-300 bg-slate-200"
                  classNames={{
                    calendarContent: 'w-[300px]',
                    popoverContent: 'bg-slate-200 border border-blue-300',
                  }}
                />
              )}
            />
          </div>
          {errors.StartDate && (
            <p className="text-sm text-red-500">{errors.StartDate.message}</p>
          )}
        </div>

        {/* EndTime */}
        <div className="my-4 border-b-2 pb-2">
          <span className="font-semibold">End Time:</span>
          <div>
            <Controller
              control={control}
              name="EndDate"
              render={(_) => (
                <DatePicker
                  aria-label="EndDate"
                  hideTimeZone
                  showMonthAndYearPickers
                  // defaultValue={new Date()}
                  defaultValue={now(getLocalTimeZone())}
                  // label="Event Date"
                  onChange={(value) => {
                    if (value) {
                      console.log(value);
                      const localDate = new Date(
                        value.year,
                        value.month - 1, // Month in JavaScript is 0-indexed
                        value.day,
                        value.hour,
                        value.minute,
                        value.second,
                        value.millisecond,
                      );

                      const timezoneOffset =
                        localDate.getTimezoneOffset() * 60 * 1000;

                      const adjustedDate = new Date(
                        localDate.getTime() - timezoneOffset,
                      );

                      const isoTime = adjustedDate.toISOString();

                      setValue('EndDate', isoTime);
                    }
                  }}
                  variant="bordered"
                  className="rounded-md border border-gray-300 bg-slate-200"
                  classNames={{
                    calendarContent: 'w-[300px]',
                    popoverContent: 'bg-slate-200 border border-blue-300',
                  }}
                />
              )}
            />
          </div>
          {errors.EndDate && (
            <p className="text-sm text-red-500">{errors.EndDate.message}</p>
          )}
        </div>

        {/* Loca */}
        <div className="my-4 border-b-2 pb-2">
          <p>
            <span className="font-semibold">Location:</span>
          </p>
          <div>
            <Controller
              control={control}
              name="Location"
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
          {errors.Location && (
            <p className="text-sm text-red-500">{errors.Location.message}</p>
          )}
        </div>

        {/* Tag */}
        <div className="my-4 border-b-2 pb-2">
          <p>
            <span className="font-semibold">Tag: </span>
          </p>
          <div>
            <Controller
              control={control}
              name="Tag"
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
          {errors.Tag && (
            <p className="text-sm text-red-500">{errors.Tag.message}</p>
          )}
        </div>

        {/* REgis Link */}
        <div className="my-4 border-b-2 pb-2">
          <span className="font-semibold">Registration Link: </span>
          <div>
            <Controller
              control={control}
              name="RegistrationLink"
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
          {errors.RegistrationLink && (
            <p className="text-sm text-red-500">
              {errors.RegistrationLink.message}
            </p>
          )}
        </div>

        {/* Mandatory */}
        <div className="my-2 flex items-center border-b-2 py-4">
          <div className="font-semibold">Is Mandatory:</div>
          {IsMandatory.map((domain, index) => (
            <div className="ps-4" key={index}>
              <Controller
                name="IsMandatory"
                control={control}
                render={({ field }) => (
                  <>
                    <input
                      id={`radio-${domain.value}`}
                      type="radio"
                      checked={field.value === domain.value}
                      onChange={(_) => {
                        setValue('IsMandatory', domain.value);
                      }}
                      className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                    />
                    <label
                      htmlFor={`radio-${domain.value}`}
                      className="ml-2 font-medium text-gray-900 dark:text-gray-300"
                    >
                      {domain.label}
                    </label>
                  </>
                )}
              />
            </div>
          ))}
        </div>

        <div className="flex">
          <button
            className="mr-3 rounded-lg bg-slate-400 px-6 py-2 text-white"
            type="submit"
          >
            Create
          </button>
          <button
            className="rounded-lg border border-slate-300 px-6 py-2"
            type="button"
            onClick={() => {
              reset({
                Title: '',
                Description: '',
                StartDate: '',
                EndDate: '',
                IsMandatory: false,
                Location: '',
                RegistrationLink: '',
                Tag: '',
                Type: 0,
              });
            }}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
