import { Request } from '../../../types/request.type';

export default function Manager_Approval_Detail({
  request,
}: {
  request?: Request;
}) {
  const categoryMap = new Map([
    [0, 'Healthcare'],
    [1, 'Fintech'],
    [2, 'Sharing Economy'],
    [3, 'Ed Tech'],
    [4, 'E-commerce'],
    [5, 'SaaS'],
    [6, 'GreenTech'],
    [7, 'AI & Machine Learning'],
    [8, 'Prop Tech'],
    [9, 'Ag Tech'],
    [10, 'Logistics & Supply Chain'],
    [11, 'Entertainment & Media'],
    [12, 'Mobility'],
    [13, 'Cybersecurity'],
    [14, 'Others'],
  ]);

  return (
    <div className="w-full px-3">
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Leader Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.senderInfo.studentName : '.'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.startupIdea.title : '.'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Domain:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined
            ? categoryMap.get(request.startupIdea.category)
            : '.'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Type:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.semesterAndCourse.course : '.'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Mentor despise:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.desiredLecturerName : '.'}
        </div>
      </div>
      <div className="mb-1">
        <p className="">Project Description:</p>
        <textarea
          id="message"
          className="block h-[200px] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Write your thoughts here..."
          value={request != undefined ? request.startupIdea.description : '.'}
          readOnly
        />
      </div>
    </div>
  );
}
