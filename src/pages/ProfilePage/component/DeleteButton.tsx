import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../../components/ui/alert-dialog';
import { Button } from '../../../components/ui/button';
import { Skill } from '../../../types/skill.type';
import skillApi from '../../../apis/skill.api';
import { toast } from 'react-toastify';

const DeleteButton = ({
  skill,
  profileId,
}: {
  skill: Skill;
  profileId: string;
}) => {
  const deleteSkill = useMutation({
    mutationFn: () =>
      skillApi.editSkill({
        id: skill.id,
        studentId: skill.studentId,
        isDeleted: true,
      }),
  });
  const queryClient = useQueryClient();

  const handleDeleteSkill = () =>
    deleteSkill.mutate(undefined, {
      onSuccess: () => {
        toast.success('Skill deleted successfully');
        queryClient.invalidateQueries({
          queryKey: ['student', profileId],
        });
      },
    });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={'destructive'}>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteSkill}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
