import { HTMLAttributes } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '../../../components/ui/table';
import { Card } from '../../../components/ui/card';

const history = [
  {
    id: 'INV001',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV002',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV003',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV004',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV005',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV006',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
  {
    id: 'INV00u',
    name: 'Nguyễn Thị B',
    titleCash: 'Title Cash',
    timestamp: '13 Dec 2024',
    ammoung: '-1.000.000Đ',
  },
];

const HistoryTable = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <Card className={`px-1 py-4 ${className}`} {...props}>
      <p className="mb-2 ml-5 text-base font-semibold">History</p>
      <Table>
        <TableBody>
          {history.map(({ ammoung, id, name, timestamp, titleCash }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{name}</TableCell>
              <TableCell>{titleCash}</TableCell>
              <TableCell>{timestamp}</TableCell>
              <TableCell className="text-right">{ammoung}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default HistoryTable;
