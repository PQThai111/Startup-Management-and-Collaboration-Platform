import { Request } from '../../../types/request.type';

export default function Manager_Approval_Item({
  request,
  onChooseRequest,
}: {
  request: Request;
  onChooseRequest: (item: Request) => void;
}) {
  return (
    <button
      key={request.id}
      className="h-15 mb-2 grid w-full grid-cols-10 items-center rounded-md border border-slate-300 bg-white p-2"
      onClick={(_) => onChooseRequest(request)}
    >
      <p className="col-span-4 mr-4 flex items-center truncate pl-2">
        {request.startupIdea.title}
      </p>
      <div className="col-span-4 mr-2 flex items-center truncate">
        {request.senderInfo.studentName}
      </div>
      <div className="col-span-2 flex items-center justify-center">
        <div className="rounded-sm bg-yellow-500 px-3 py-1 text-white">
          {request.semesterAndCourse.course}
        </div>
      </div>
    </button>
  );
}
