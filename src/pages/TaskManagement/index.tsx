import { HiDotsHorizontal } from 'react-icons/hi';
import TaskItem from './components/TaskItem';
import { useContext, useEffect, useState } from 'react';
import ContentContainer from '../ProjectDetail/components/ContentContainer';
import { useMutation } from '@tanstack/react-query';
import projectTaskApi from '../../apis/project-task.api';
import AddTask from './components/AddTask';
import { ProjectTaskByWeek } from '../../types/project-task.type';
import { ProjectContext } from '../../context/project.context';

type ExeType = 'EXE1' | 'EXE2';

const WeekByExeType: Record<ExeType, number> = {
  EXE1: 10,
  EXE2: 14,
};

const TaskManagement = () => {
  const [tasksByWeek, setTasksByWeek] = useState<ProjectTaskByWeek[]>();
  const { project, isLecturerOrMentor } = useContext(ProjectContext);

  const getAllProjectTask = useMutation({
    mutationFn: ({
      projectId,
      // milestoneId,
      teamId,
    }: {
      projectId: string;
      // milestoneId: string;
      teamId: string;
    }) =>
      projectTaskApi.getProjectTasks({
        // milestoneId,
        projectId,
        teamId,
      }),
  });

  const handleUpdateTask = () => {
    getAllProjectTask.mutate(
      {
        projectId: project?.id as string,
        // milestoneId: data.data.data[0].milestones[0].id,
        teamId: project?.team.teamId as string,
      },
      {
        onSuccess: (data) => {
          setTasksByWeek(data.data.data);
          console.log(data.data.data);
        },
        onError: (err) => {
          console.log(err);
        },
      },
    );
  };

  useEffect(() => {
    project &&
      getAllProjectTask.mutate(
        {
          projectId: project.id,
          // milestoneId: data.data.data[0].milestones[0].id,
          teamId: project.team.teamId,
        },
        {
          onSuccess: (data) => {
            setTasksByWeek(data.data.data);
            console.log(data.data.data);
          },
          onError: (err) => {
            console.log(err);
          },
        },
      );
  }, [project]);

  return (
    <ContentContainer>
      <div className="flex items-center justify-between gap-5">
        <p className="text-4xl font-bold">Task Management</p>
        {project && !isLecturerOrMentor && (
          <AddTask handleUpdateTask={handleUpdateTask} projectId={project.id} />
        )}
      </div>
      <div className="mb-5 mt-2 flex h-fit gap-4 overflow-auto pb-3 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar]:h-3">
        {Array.from(
          {
            length:
              project?.semesterAndCourse.course === 'EXE101'
                ? WeekByExeType.EXE1
                : WeekByExeType.EXE2,
          },
          (_, index) => index + 1,
        ).map((item) => (
          <div
            key={item}
            className="h-full min-h-[80vh] min-w-96 rounded-xl bg-[#EEF2F5] px-3 py-3"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-bold">Week {item}</p>
              <div className="flex gap-2">
                <HiDotsHorizontal />
              </div>
            </div>
            <div>
              {tasksByWeek &&
                tasksByWeek
                  .find((week) => week.weekNumber === item)
                  ?.tasks.filter((item) => item.isDeleted === false)
                  .map((task) => <TaskItem key={task.id} props={task} />)}
            </div>
          </div>
        ))}
      </div>
    </ContentContainer>
  );
};

export default TaskManagement;
