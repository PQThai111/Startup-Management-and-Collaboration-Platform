import dayjs, { Dayjs } from 'dayjs';
import { ITask, TaskColor } from '../../../types/task.type';
import { monthBetween } from '../../../util/time';

const GanttChart = ({
  tasks,
  filter,
}: {
  tasks: ITask[];
  filter: 'year' | 'month';
}) => {
  const startDate = tasks.reduce((acc, task) => {
    return dayjs(task.start).isBefore(acc) ? dayjs(task.start) : acc;
  }, dayjs('9999-12-31'));
  const endDate = tasks.reduce((acc, task) => {
    return dayjs(task.end).isAfter(acc) ? dayjs(task.end) : acc;
  }, dayjs('1000-01-01'));

  const months = monthBetween(startDate.toDate(), endDate.toDate());
  const totalDays = startDate.daysInMonth() + 1;

  const calculateWidth = (
    start: string,
    end: string,
    startDateOfMonth: Dayjs,
  ) => {
    const startDiff = dayjs(start).diff(startDateOfMonth, 'day');
    const duration = dayjs(end).diff(dayjs(start), 'day');
    return {
      left: (startDiff / totalDays) * 100 + '%',
      width: (duration / totalDays) * 100 + '%',
    };
  };

  const taskRows: ITask[][] = [];
  tasks.forEach((task) => {
    const taskStart = dayjs(task.start);
    // const taskEnd = dayjs(task.end);

    let rowIndex = 0;
    while (
      (taskRows[rowIndex] &&
        taskRows[rowIndex].some((t) => dayjs(t.end).isAfter(taskStart))) ||
      (taskRows[rowIndex] &&
        taskRows[rowIndex].some((t) => t.type !== task.type))
    ) {
      rowIndex++;
    }

    // Thêm nhiệm vụ vào hàng đã chọn
    if (!taskRows[rowIndex]) taskRows[rowIndex] = [];
    taskRows[rowIndex].push(task);

    // Lưu vị trí hàng của nhiệm vụ
    task.rowIndex = rowIndex;
  });

  return (
    <div className="h-fit min-h-[70vh] w-full overflow-y-auto overflow-x-scroll border-b border-gray-300">
      <div className="flex w-full snap-x">
        {filter === 'year'
          ? months.map((month) => (
              <div className="min-w-[50%] py-2" key={month.text}>
                <p className="text-center text-2xl font-bold">{month.text}</p>
                <div className="relative mt-5">
                  {tasks
                    .filter(
                      (task) => dayjs(task.start).month() + 1 === month.value,
                    )
                    .map((task) => (
                      <div
                        style={{
                          background: TaskColor[task.type].bgColor,
                          color: TaskColor[task.type].textColor,
                          width: calculateWidth(
                            task.start,
                            task.end,
                            dayjs(task.start).startOf('month'),
                          ).width,
                          left: calculateWidth(
                            task.start,
                            task.end,
                            dayjs(task.start).startOf('month'),
                          ).left,
                          top: task.rowIndex! * 40 + 'px',
                        }}
                        className="absolute mt-3 flex items-center justify-center rounded-lg py-1"
                      >
                        {task.name}
                      </div>
                    ))}
                </div>
              </div>
            ))
          : months.map((month) => (
              <div className="min-w-full snap-center py-2" key={month.text}>
                <p className="text-center text-2xl font-bold">{month.text}</p>
                <div className="flex items-center justify-between text-lg font-semibold">
                  {Array.from(
                    {
                      length: dayjs(
                        `${month.year}-${month.value}-01`,
                      ).daysInMonth(),
                    },
                    (_, i) => (
                      <p className="" key={i}>
                        {i + 1}
                      </p>
                    ),
                  )}
                </div>
                <div className="relative mt-5">
                  {tasks
                    .filter(
                      (task) => dayjs(task.start).month() + 1 === month.value,
                    )
                    .map((task) => (
                      <div>
                        <div
                          style={{
                            background: TaskColor[task.type].bgColor,
                            color: TaskColor[task.type].textColor,
                            width: calculateWidth(
                              task.start,
                              task.end,
                              dayjs(task.start).startOf('month'),
                            ).width,
                            left: calculateWidth(
                              task.start,
                              task.end,
                              dayjs(task.start).startOf('month'),
                            ).left,
                            top: task.rowIndex! * 40 + 'px',
                          }}
                          className="absolute mt-3 flex items-center justify-center rounded-lg py-1"
                        >
                          {task.name}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default GanttChart;
