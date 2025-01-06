import { useContext, useState } from 'react';
import { ProfileContext } from '../../../context/profile.context';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Button } from '../../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import Input from '../../../components/Input';
import { Skill } from '../../../types/skill.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import skillApi from '../../../apis/skill.api';
import { AppContext } from '../../../context/app.context';
import { toast } from 'react-toastify';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import DeleteButton from './DeleteButton';

const SkillTypes: { name: string; description: string }[] = [
  {
    name: 'Cognitive',
    description: 'Skills related to thinking and understanding',
  },
  {
    name: 'Communication',
    description: 'Skills for effective interaction and expression',
  },
  {
    name: 'Personal',
    description: 'Skills for self-management and personal growth',
  },
  {
    name: 'Social',
    description: 'Skills for interacting and working with others',
  },
  {
    name: 'Technological',
    description: 'Skills related to using and understanding technology',
  },
  {
    name: 'Artistic',
    description: 'Skills in creative arts like music, painting, etc.',
  },
  {
    name: 'Physical',
    description: 'Skills involving physical activities and sports',
  },
  {
    name: 'Leadership',
    description: 'Skills for leading and managing teams',
  },
  {
    name: 'Analytical',
    description: 'Skills for analyzing and interpreting data',
  },
  {
    name: 'Creative',
    description: 'Skills for generating innovative ideas and solutions',
  },
];

const SkillLevels: { name: string; description: string }[] = [
  {
    name: 'Beginner',
    description:
      'Just starting to learn the skill, with limited knowledge and experience.',
  },
  {
    name: 'Intermediate',
    description:
      'Moderate level of skill and understanding, with some practical experience.',
  },
  {
    name: 'Advanced',
    description: 'Superior performance, with significant practical experience.',
  },
  {
    name: 'Expert',
    description:
      'High level of skill and extensive experience, capable of lecturer peers and lead projects.',
  },
];

export default function ProfileSkills() {
  const student = useContext(ProfileContext).profile;
  const { profile } = useContext(AppContext);
  const [selectedSkill, setSelectedSkill] = useState<Skill | undefined>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const updateSkill = useMutation({
    mutationFn: () => skillApi.editSkill(selectedSkill as Skill),
  });

  const addNewSkill = useMutation({
    mutationFn: (data: {
      skillName: string;
      skillDescription: string;
      skillType: string;
      skillLevel: string;
      studentId: string;
    }) => skillApi.addSkill(data),
  });

  const handleUpdateSkill = () => {
    if (selectedSkill?.id === '') {
      addNewSkill.mutate(
        {
          skillDescription: selectedSkill?.skillDescription as string,
          skillLevel: selectedSkill?.skillLevel as string,
          skillName: selectedSkill?.skillName as string,
          skillType: selectedSkill?.skillType as string,
          studentId: profile?.studentId as string,
        },
        {
          onSuccess: () => {
            toast.success('Skill added successfully');
            setIsOpen(false);
            queryClient.invalidateQueries({
              queryKey: ['student', profile?.id],
            });
          },
        },
      );
    } else {
      updateSkill.mutate(undefined, {
        onSuccess: () => {
          toast.success('Skill updated successfully');
          setIsOpen(false);
          queryClient.invalidateQueries({
            queryKey: ['student', profile?.id],
          });
        },
      });
    }
  };

  return (
    <div className="p-5">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <div className="mb-3 flex items-center justify-between border-b-2 pb-2 text-2xl font-semibold">
          <p>Skills</p>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setSelectedSkill(undefined)}
            >
              Add Skills
            </Button>
          </DialogTrigger>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Level</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {student &&
              student.skills?.length > 0 &&
              student?.skills?.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell className="font-medium">
                    {skill.skillName}
                  </TableCell>
                  <TableCell>{skill.skillDescription}</TableCell>
                  <TableCell>{skill.skillType}</TableCell>
                  <TableCell className="text-right">
                    {skill.skillLevel}
                  </TableCell>
                  <TableCell className="flex gap-3">
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setSelectedSkill(skill);
                        }}
                      >
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DeleteButton
                      skill={skill}
                      profileId={profile?.id as string}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <DialogContent className="w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSkill ? 'Edit selected' : 'Add new'} skill
            </DialogTitle>
            <DialogDescription>
              Make changes to your skill here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid py-4">
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={selectedSkill?.skillName || ''}
                onChange={(e) =>
                  setSelectedSkill({
                    ...selectedSkill!,
                    skillName: e.target.value,
                    skillDescription: selectedSkill?.skillDescription || '',
                    skillType: selectedSkill?.skillType || '',
                    skillLevel: selectedSkill?.skillLevel || '',
                    studentId: selectedSkill?.studentId || '',
                    id: selectedSkill?.id || '',
                    status: selectedSkill?.status || 0,
                    isDeleted: selectedSkill?.isDeleted || false,
                  })
                }
                className="col-span-6 w-full py-0"
              />
            </div>
            <div className="grid grid-cols-7 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                className="col-span-6 my-0"
                value={selectedSkill?.skillDescription || ''}
                onChange={(e) =>
                  setSelectedSkill({
                    ...selectedSkill!,
                    skillName: selectedSkill?.skillName || '',
                    skillDescription: e.target.value,
                    skillType: selectedSkill?.skillType || '',
                    skillLevel: selectedSkill?.skillLevel || '',
                    studentId: selectedSkill?.studentId || '',
                    id: selectedSkill?.id || '',
                    status: selectedSkill?.status || 0,
                    isDeleted: selectedSkill?.isDeleted || false,
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-10 pl-[60px]">
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={selectedSkill?.skillType}
                  onValueChange={(e) =>
                    setSelectedSkill({
                      ...selectedSkill!,
                      skillName: selectedSkill?.skillName || '',
                      skillDescription: selectedSkill?.skillDescription || '',
                      skillType: e,
                      skillLevel: selectedSkill?.skillLevel || '',
                      studentId: selectedSkill?.studentId || '',
                      id: selectedSkill?.id || '',
                      status: selectedSkill?.status || 0,
                      isDeleted: selectedSkill?.isDeleted || false,
                    })
                  }
                >
                  <SelectTrigger
                    id="type"
                    className="col-span-6 h-[52px] -translate-y-3"
                  >
                    <SelectValue placeholder="Select skill type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Skill Type</SelectLabel>
                      {SkillTypes.map(({ description, name }) => (
                        <SelectItem id={name} value={name}>
                          {name} - {description}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-7 items-center gap-4">
                <Label htmlFor="level" className="text-right">
                  Level
                </Label>
                <Select
                  value={selectedSkill?.skillLevel}
                  onValueChange={(e) =>
                    setSelectedSkill({
                      ...selectedSkill!,
                      skillName: selectedSkill?.skillName || '',
                      skillDescription: selectedSkill?.skillDescription || '',
                      skillType: selectedSkill?.skillType || '',
                      skillLevel: e,
                      studentId: selectedSkill?.studentId || '',
                      id: selectedSkill?.id || '',
                      status: selectedSkill?.status || 0,
                      isDeleted: selectedSkill?.isDeleted || false,
                    })
                  }
                >
                  <SelectTrigger
                    id="level"
                    className="col-span-6 h-[52px] -translate-y-3"
                  >
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Skill Level</SelectLabel>
                      {SkillLevels.map(({ description, name }) => (
                        <SelectItem id={name} value={name}>
                          {name} - {description}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={handleUpdateSkill}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
