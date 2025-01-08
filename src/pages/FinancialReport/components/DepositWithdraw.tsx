import { useState } from 'react';
import Input from '../../../components/Input';
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
import { toast } from 'react-toastify';
import financialApi, { AddFinancialRequest } from '../../../apis/financial.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const DepositWithdraw = ({ projectId }: { projectId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [dialogState, setDialogState] = useState<'Deposit' | 'Withdraw'>(
    'Deposit',
  );
  const [file, setFile] = useState<File>();
  const [Description, setDescription] = useState<string>('');
  const [Amount, setAmount] = useState<number>(0);

  const addFinancial = useMutation({
    mutationFn: (data: AddFinancialRequest) => financialApi.addFinancial(data),
  });

  const handleSubmit = () => {
    if (Description === '') {
      toast.error('Please fill in the description');
      return;
    }
    if (Amount === 0) {
      toast.error('Please fill in the amount');
      return;
    }
    if (!file) {
      toast.error('Please select an image');
      return;
    }

    addFinancial.mutate(
      {
        Description,
        Amount: dialogState === 'Deposit' ? Amount : -Amount,
        TransactionDate: Date.now().toString(),
        ImageFile: file as File,
        ProjectId: projectId,
      },
      {
        onSuccess: () => {
          toast.success('Transaction success');
          queryClient.invalidateQueries({
            queryKey: ['financial', { page: 1, projectId }],
          });
          setDescription('');
          setAmount(0);
          setFile(undefined);
          setOpen(false);
        },
        onError: () => {
          toast.error('Transaction failed');
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setDialogState('Deposit')}
          variant="default"
          className="mr-4"
        >
          Deposit
        </Button>
      </DialogTrigger>
      <DialogTrigger asChild>
        <Button
          onClick={() => setDialogState('Withdraw')}
          variant="destructive"
        >
          Withdraw
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogState}</DialogTitle>
          <DialogDescription>Input detail for {dialogState}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Description" className="text-right">
              Description
            </Label>
            <Input
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              id="Description"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="Amount" className="text-right">
              Amount
            </Label>
            <Input
              id="Amount"
              value={Amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              type="number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ImageFile" className="text-right">
              Image
            </Label>
            <Input
              id="ImageFile"
              className="col-span-3"
              type="file"
              onChange={(e) => {
                const selectedFile = e.target?.files?.[0] as File; // Get the first selected file
                if (selectedFile) {
                  setFile(selectedFile);
                }
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DepositWithdraw;
