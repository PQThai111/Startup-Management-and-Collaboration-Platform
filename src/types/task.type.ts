type TaskTypes = 'Design' | 'Development' | 'Media' | 'Marketing' | 'Economic';

const TaskColor: Record<
  TaskTypes,
  {
    textColor: string;
    bgColor: string;
  }
> = {
  Design: {
    textColor: '#DA802A',
    bgColor: '#F9EEE3',
  },
  Development: {
    textColor: '#20A420',
    bgColor: '#E6F3EB',
  },
  Media: {
    textColor: '#2565B1',
    bgColor: '#E3F0F9',
  },
  Marketing: {
    textColor: '#D857BC',
    bgColor: '#F9E3EF',
  },
  Economic: {
    textColor: '#C42424',
    bgColor: '#FFBABA',
  },
};

interface ITask {
  id: number;
  name: string;
  start: string;
  end: string;
  type: TaskTypes;
  rowIndex?: number;
}

export { TaskColor };
export type { ITask, TaskTypes };
