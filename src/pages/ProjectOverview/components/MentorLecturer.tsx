import { HTMLAttributes } from 'react';
import { Project } from '../../../types/project.type';

const MentorLecturer = ({
  project,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { project: Project }) => {
  return (
    <div
      className={`mb-3 w-full justify-between rounded-xl bg-[#EEF2F5] px-3 py-3 ${className}`}
      {...props}
    >
      <div className="col-span-2">
        <p className="text-xl font-bold">Mentor & Lecturer</p>
        <div className="">
          <div className="flex gap-2">
            <p className="font-semibold">Mentor:</p>
            {
              project.mentorsAndLecturers.find(
                (item) => item.roleType === 'Mentor',
              )?.name
            }
          </div>
          <div className="flex gap-2">
            <p className="font-semibold">Lecturer:</p>
            {
              project.mentorsAndLecturers.find(
                (item) => item.roleType === 'Lecturer',
              )?.name
            }
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2">
              <p className="font-semibold">Semester:</p>{' '}
              {project.semesterAndCourse.semester}
            </div>
            <div className="flex gap-2">
              <p className="font-semibold">Course:</p>
              {project.semesterAndCourse.course}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorLecturer;
