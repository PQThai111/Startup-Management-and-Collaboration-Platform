import { HTMLAttributes, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { Card } from '../../../components/ui/card';
import { Financial } from '../../../types/financial.type';
import dayjs from 'dayjs';
import { formatCurrency } from '../../../util/util';
import { Button } from '../../../components/ui/button';
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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import financialApi from '../../../apis/financial.api';
import { toast } from 'react-toastify';

interface HistoryTableProps extends HTMLAttributes<HTMLDivElement> {
  history: Financial[];
}

const HistoryTable = ({ className, history, ...props }: HistoryTableProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const deleteFinancial = useMutation({
    mutationFn: (id: string) => financialApi.deleteFinancial(id),
  });

  const handleDeleteFinancial = (id: string) => {
    deleteFinancial.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['financial'],
        });
        toast.success('Financial deleted successfully', { autoClose: 2000 });
        setOpen(false);
      },
      onError: () => {
        toast.error('Failed to delete financial');
      },
    });
  };

  return (
    <Card className={`px-1 py-4 ${className}`} {...props}>
      <p className="mb-2 ml-5 text-base font-semibold">History</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Description</TableHead>
            <TableHead className="w-[150px]">Amount</TableHead>
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead className="w-[50px]">Status</TableHead>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[100px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map(
            ({
              amount,
              description,
              id,
              transactionDate,
              isDeleted,
              imageUrl,
            }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{description}</TableCell>
                <TableCell>{formatCurrency(amount)}</TableCell>
                <TableCell>
                  {dayjs(transactionDate).format('DD-MM-YYYY HH:mm')}
                </TableCell>
                <TableCell className="text-right">
                  {isDeleted ? 'Deleted' : ''}
                </TableCell>
                <TableCell className="text-right">
                  <Button onClick={() => window.open(imageUrl, '_blank')}>
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  {!isDeleted && (
                    <AlertDialog open={open} onOpenChange={setOpen}>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive">Delete</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteFinancial(id)}
                          >
                            Continue
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default HistoryTable;
