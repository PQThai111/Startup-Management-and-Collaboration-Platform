import { Request } from '../../../types/request.type';

export default function Manager_Approval_Detail({
  request,
}: {
  request?: Request;
}) {
  const categoryMap = new Map([
    [1, 'Healthcare'],
    [2, 'Fin Tech'],
    [3, 'Sharing'],
    [4, 'Economy'],
    [5, 'Ed Tech'],
    [6, 'E-commerce'],
    [7, 'SaaS'],
    [8, 'GreenTech'],
    [9, 'AI & Machine Learning'],
    [10, 'Prop Tech'],
    [11, 'Ag Tech'],
    [12, 'Logistics & Supply Chain'],
    [13, 'Entertainment & Media'],
    [14, 'Mobility'],
    [15, 'Cybersecurity'],
    [16, 'Others'],
  ]);

  return (
    <div className="w-full px-3">
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Leader Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.senderInfo.studentName : 'aaa'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Name:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.startupIdea.title : 'aaa'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Domain:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined
            ? categoryMap.get(request.startupIdea.category)
            : 'aaa'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Project Type:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.semesterAndCourse.course : 'aaa'}
        </div>
      </div>
      <div className="mb-2 grid w-full grid-cols-10">
        <p className="col-span-2 flex items-center">Mentor despise:</p>
        <div className="col-span-8 border bg-white py-2 pl-2">
          {request != undefined ? request.desiredLecturerId : 'aaa'}
        </div>
      </div>
      <div className="mb-1">
        <p className="">Project Description:</p>
        <textarea
          id="message"
          className="block h-[200px] w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Write your thoughts here..."
          defaultValue={''}
          value={request != undefined ? request.startupIdea.description : 'aaa'}
        />
      </div>
    </div>
  );
}
