import { useState } from 'react';
import { DateTimePicker } from '../../../common/components/DateTimePicker';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { REMINDER_OPTIONS } from '../../../constant/reminder';

type ReminderProps = {
  start: Date;
  end: Date;
  reminder: number;
  isLecturerOrMentor: boolean;
};

const Reminder = ({
  start,
  end,
  isLecturerOrMentor,
  reminder,
}: ReminderProps) => {
  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="mb-3 font-bold">Time</p>
      </div>
      {!isLecturerOrMentor ? (
        <form className="rounded-lg bg-white px-3 py-3 text-sm">
          <div>
            <p>Start date</p>
            <DateTimePicker
              value={startDate}
              onChange={setStartDate}
              timeZone="UTC+08:00"
            />
          </div>
          <div className="mt-2">
            <p>Due date</p>
            <DateTimePicker value={endDate} onChange={setEndDate} />
          </div>
          <p className="mt-3">Set due date reminder</p>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select reminder option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {REMINDER_OPTIONS.map(({ label, value }) => (
                  <SelectItem value={value.toString()} key={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 flex justify-end gap-2">
            <button className="w-full rounded-xl bg-[#013C5A] py-1 font-semibold text-white">
              Save
            </button>
            {/* <button className="rounded-xl border border-[#013C5A] py-1 font-semibold text-[#013C5A]">
              Remove
            </button> */}
          </div>
        </form>
      ) : (
        <div>
          <div className="rounded-lg bg-white px-3 py-3 text-sm">
            <div>
              <p>Start date</p>
              <DateTimePicker
                value={startDate}
                onChange={setStartDate}
                timeZone="UTC+07:00"
                disabled={true}
              />
            </div>
            <div className="mt-2">
              <p>Due date</p>
              <DateTimePicker
                timeZone="UTC+07:00"
                value={endDate}
                disabled={true}
                onChange={setEndDate}
              />
            </div>
            <div className="mt-3 flex gap-3">
              <p className="">Set due date reminder: </p>
              <p>
                {
                  REMINDER_OPTIONS.find((item) => item.value === reminder)
                    ?.label
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Reminder;
