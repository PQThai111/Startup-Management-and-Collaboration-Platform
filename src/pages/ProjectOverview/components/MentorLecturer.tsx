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
          {/* Lecturer */}
          <div className="mb-2 flex gap-2 border-b border-b-slate-500 pb-2">
            <div className="w-[20%] font-semibold">Lecturer:</div>
            {project.mentorsAndLecturers.map((item, idx) => {
              if (item.roleType === 'Lecturer')
                return (
                  <div key={idx}>
                    <div>{item.name}</div>
                    <div className="text-sm text-slate-500">
                      {item.isMain ? 'Main Lecturer' : 'Extra Lecturer'}
                    </div>
                  </div>
                );
            })}
          </div>
          <div className="mb-2 flex gap-2 border-b border-b-slate-500 pb-2">
            <div className="w-[20%] font-semibold">Mentor:</div>
            <div>
              {project.mentorsAndLecturers.map((item, idx) => {
                if (item.roleType === 'Mentor')
                  return (
                    <div key={idx}>
                      <div>{item.name}</div>
                      <div className="text-sm text-slate-500">
                        {item.isMain ? 'Main Mentor' : 'Extra Mentor'}
                      </div>
                    </div>
                  );
              })}
            </div>
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
