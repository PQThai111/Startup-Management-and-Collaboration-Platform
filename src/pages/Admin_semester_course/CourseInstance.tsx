import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  CourseInstance as CourseInstanceType,
  CourseInstanceStatus,
} from '../../types/course-instance.type';
import EditCourseInstance from './EditCourseInstance';

const CourseInstance = ({
  courseInstances,
}: {
  courseInstances: CourseInstanceType[];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Course By Semester</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[200px]">Status</TableHead>
              <TableHead className="w-[200px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseInstances.map((courseInstance) => (
              <TableRow key={courseInstance.id}>
                <TableCell>{courseInstance.semesterName}</TableCell>
                <TableCell>{courseInstance.courseName}</TableCell>
                <TableCell>
                  {CourseInstanceStatus[courseInstance.status]}
                </TableCell>
                <TableCell>
                  <EditCourseInstance courseInstance={courseInstance} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <CreateCourse /> */}
      </CardContent>
    </Card>
  );
};

export default CourseInstance;
