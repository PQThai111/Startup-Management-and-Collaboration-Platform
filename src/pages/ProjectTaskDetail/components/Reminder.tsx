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
};

const Reminder = ({ start, end }: ReminderProps) => {
  const [startDate, setStartDate] = useState<Date>(start);
  const [endDate, setEndDate] = useState<Date>(end);

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="mb-3 font-bold">Time</p>
      </div>

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
    </>
  );
};

export default Reminder;
