import { HTMLAttributes } from 'react';
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

interface HistoryTableProps extends HTMLAttributes<HTMLDivElement> {
  history: Financial[];
}

const HistoryTable = ({ className, history, ...props }: HistoryTableProps) => {
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map(
            ({
              amount,
              description,
              id,
<<<<<<< HEAD
              imageUrl,
=======
              // imageUrl,
>>>>>>> e31efde (Staff manage main)
              status,
              transactionDate,
            }) => (
              <TableRow key={id}>
                <TableCell className="font-medium">{description}</TableCell>
                <TableCell>{formatCurrency(amount)}</TableCell>
                <TableCell>
                  {dayjs(transactionDate).format('DD-MM-YYYY HH:mm')}
                </TableCell>
                <TableCell className="text-right">{status}</TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default HistoryTable;
