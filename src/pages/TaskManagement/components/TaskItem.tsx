// import { FaRegCommentAlt } from 'react-icons/fa';
import { FaRegFileLines } from 'react-icons/fa6';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { ProjectTask } from '../../../types/project-task.type';

// type TaskType = 'Design' | 'Development';
export type TaskStatus = 'todo' | 'doing' | 'done';
// const color: Record<
//   TaskType,
//   {
//     bgColor: string;
//     textColor: string;
//   }
// > = {
//   Design: {
//     bgColor: '#DFA874',
//     textColor: '#D58D49',
//   },
//   Development: {
//     bgColor: '#83C29D',
//     textColor: '#68B266',
//   },
// };

const TaskItem = ({ props }: { props: ProjectTask }) => {
  const {
    // comments,
    description,
    documents,
    // endTime,
    id,
    // isDeleted,
    members,
    name,
    // priority,
    // reminder,
    // startTime,
    // status,
  } = props;
  const navigate = useNavigate();

  return (
    <div
      className="mt-2 min-w-[85%] rounded-lg bg-white px-3 py-3"
      onClick={() => navigate(id)}
    >
      {/* <div className="flex items-center justify-between">
        <p
          style={{
            backgroundColor: `${color[tag].bgColor}20`,
            color: color[tag].textColor,
          }}
          className={`rounded-lg px-2 py-1`}
        >
          {tag}
        </p>
        <HiDotsHorizontal />
      </div> */}
      <p className="mt-2 text-lg font-semibold">{name}</p>
      <p className="mt-2 text-justify text-sm leading-none">{description}</p>
      <div className="mt-2 flex items-center justify-between">
        <div className="flex">
          {/* <Avatar className="h-6 w-6 border-2 border-white">
            <AvatarImage src={users[0].avatar_url} alt="avatar" />
          </Avatar> */}
          {members &&
            members.map((member) => (
              <Avatar
                key={member.userId}
                className="h-6 w-6 -translate-x-1 border-2 border-white"
              >
                <AvatarImage src={member.avatarUrl} alt="avatar" />
              </Avatar>
            ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-opacity-80">
          {/* <div className="flex gap-1">
            <FaRegCommentAlt />
            <p>{comments.length} comments</p>
          </div> */}
          <div className="flex gap-1">
            <FaRegFileLines />
            <p>{documents.length} files</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
