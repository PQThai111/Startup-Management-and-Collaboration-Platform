import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import semesterApi from '../../apis/semester.api';
import { DateTimePicker } from '../../common/components/DateTimePicker';
import { useState } from 'react';
import { toast } from 'react-toastify';
import courseApi from '../../apis/course.api';
import dayjs from 'dayjs';

const Admin_semester_course = () => {
  const queryClient = useQueryClient();
  const { data: semesters } = useQuery({
    queryKey: ['semesters'],
    queryFn: () => semesterApi.getAllSemester(),
  });
  const { data: courses } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseApi.getCourses(),
  });
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const addSemester = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      startDate: string;
      endDate: string;
    }) => semesterApi.createSemester(data),
  });

  const handleAddSemester = () => {
    if (!name || !startDate || !endDate) {
      toast.error('Please fill all fields');
      return;
    }

    addSemester.mutate(
      {
        name,
        description,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      },
      {
        onSuccess: () => {
          toast.success('Semester added successfully');
          setName('');
          setDescription('');
          setStartDate(undefined);
          setEndDate(undefined);
          queryClient.invalidateQueries({
            queryKey: ['semesters'],
          });
          setOpen(false);
        },
      },
    );
  };

  return (
    <div>
      <Tabs defaultValue="semester" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="semester">Semester</TabsTrigger>
          <TabsTrigger value="course">Course</TabsTrigger>
        </TabsList>
        <TabsContent value="semester">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Semester</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesters?.data.data &&
                    semesters.data.data.map(
                      ({
                        description,
                        endDate,
                        startDate,
                        status,
                        id,
                        name,
                      }) => (
                        <TableRow key={id}>
                          <TableCell>{name}</TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>
                            {dayjs(startDate).format('YYYY-MM-DD').toString()}
                          </TableCell>
                          <TableCell>
                            {dayjs(endDate).format('YYYY-MM-DD').toString()}
                          </TableCell>
                          <TableCell>{status}</TableCell>
                        </TableRow>
                      ),
                    )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => setOpen(true)}>Add Semester</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add new semester</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Name
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Description
                      </Label>
                      <Input
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="startDate" className="text-right">
                        Start Date
                      </Label>
                      <div className="col-span-3">
                        <DateTimePicker
                          showTime={false}
                          value={startDate}
                          onChange={setStartDate}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="endDate" className="text-right">
                        End Date
                      </Label>
                      <div className="col-span-3">
                        <DateTimePicker
                          showTime={false}
                          value={endDate}
                          onChange={setEndDate}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleAddSemester}>Save changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="course">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Courses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[200px]">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses?.data.data &&
                    courses.data.data.map(
                      ({ description, status, id, name }) => (
                        <TableRow key={id}>
                          <TableCell>{name}</TableCell>
                          <TableCell>{description}</TableCell>
                          <TableCell>{status}</TableCell>
                        </TableRow>
                      ),
                    )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin_semester_course;
