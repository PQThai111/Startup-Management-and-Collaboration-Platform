import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { ITask, TaskColor } from '../../types/task.type';
import GanttChart from './components/GanttChart';
import ContentContainer from '../ProjectManagementPage/components/ContentContainer';

const tasks: ITask[] = [
  {
    id: 1,
    name: 'Design LOGO',
    start: '2024-06-03',
    end: '2024-06-27',
    type: 'Design',
  },
  {
    id: 2,
    name: 'Banner',
    start: '2024-06-07',
    end: '2024-06-30',
    type: 'Design',
  },
  {
    id: 3,
    name: 'Research UI/UX',
    start: '2024-06-12',
    end: '2024-06-20',
    type: 'Design',
  },
  {
    id: 4,
    name: 'Make SRS',
    start: '2024-06-01',
    end: '2024-06-25',
    type: 'Development',
  },
  {
    id: 5,
    name: 'FE',
    start: '2024-06-19',
    end: '2024-06-28',
    type: 'Development',
  },
  {
    id: 6,
    name: 'Media Idea',
    start: '2024-06-10',
    end: '2024-06-17',
    type: 'Media',
  },
  {
    id: 7,
    name: 'Ask Investors',
    start: '2024-06-13',
    end: '2024-06-29',
    type: 'Media',
  },
  {
    id: 8,
    name: 'Ask Investors',
    start: '2024-07-13',
    end: '2024-08-29',
    type: 'Media',
  },
  {
    id: 9,
    name: 'Marketing Idea',
    start: '2024-06-07',
    end: '2024-06-30',
    type: 'Marketing',
  },
  {
    id: 10,
    name: 'Research Market',
    start: '2024-06-24',
    end: '2024-07-15',
    type: 'Economic',
  },
  {
    id: 11,
    name: 'Research Market',
    start: '2024-06-24',
    end: '2024-08-15',
    type: 'Economic',
  },
];

const Timeline = () => {
  const [filter, setFilter] = useState<'year' | 'month'>('year');
  console.log(filter);

  return (
    <ContentContainer>
      <div className="flex items-center justify-between">
        <p className="text-4xl font-bold">Timeline</p>
        <div>
          <Select
            value={filter}
            onValueChange={(value) => setFilter(value as 'year' | 'month')}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="month">Month</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-5 flex gap-10">
        <div className="w-fit">
          <div className="mt-3 w-40 rounded-lg bg-[#EDEDED] py-1 text-center">
            ALL
          </div>
          <div
            className="mt-3 w-40 rounded-lg border-2 py-1 text-center"
            style={{
              borderColor: TaskColor.Design.bgColor,
              color: TaskColor.Design.textColor,
            }}
          >
            Design
          </div>
          <div
            className="mt-3 w-40 rounded-lg border-2 py-1 text-center"
            style={{
              borderColor: TaskColor.Development.bgColor,
              color: TaskColor.Development.textColor,
            }}
          >
            Development
          </div>
          <div
            className="mt-3 w-40 rounded-lg border-2 py-1 text-center"
            style={{
              borderColor: TaskColor.Media.bgColor,
              color: TaskColor.Media.textColor,
            }}
          >
            Media
          </div>
          <div
            className="mt-3 w-40 rounded-lg border-2 py-1 text-center"
            style={{
              borderColor: TaskColor.Marketing.bgColor,
              color: TaskColor.Marketing.textColor,
            }}
          >
            Marketing
          </div>
          <div
            className="mt-3 w-40 rounded-lg border-2 py-1 text-center"
            style={{
              borderColor: TaskColor.Economic.bgColor,
              color: TaskColor.Economic.textColor,
            }}
          >
            Economic
          </div>
        </div>
        <div className="w-full">
          <GanttChart tasks={tasks} filter={filter} />
        </div>
      </div>
    </ContentContainer>
  );
};

export default Timeline;
