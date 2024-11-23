import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import { FiUserPlus } from 'react-icons/fi';

const Members = () => {
  const members = [
    {
      id: 1,
      name: 'Nguyễn Thị Bình',
      role: 'Project Owner',
      avatar:
        'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
    },
    {
      id: 2,
      name: 'Jerome Bell',
      role: 'Developer',
      avatar:
        'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
    },
    {
      id: 3,
      name: 'Jerome Bell',
      role: 'Developer',
      avatar:
        'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
    },
    {
      id: 4,
      name: 'Jerome Bell',
      role: 'Developer',
      avatar:
        'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
    },
    {
      id: 5,
      name: 'Jerome Bell',
      role: 'Developer',
      avatar:
        'https://cdn.kona-blue.com/upload/kona-blue_com/post/images/2024/08/13/356/avatar-vo-tri-meo-3.jpg',
    },
  ];

  return (
    <>
      <p className="mb-3 font-bold">Project Members</p>
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-white px-3 pt-3 text-sm">
        {members.map(({ avatar, id, name, role }) => (
          <div key={id} className="mt-3 flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={avatar} alt="avatar" />
            </Avatar>
            <div>
              <p>{name}</p>
              <p className="text-[#828282]">{role}</p>
            </div>
          </div>
        ))}
        <button className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-black text-lg">
            <FiUserPlus />
          </div>
          <p>Add member</p>
        </button>
      </div>
    </>
  );
};

export default Members;
