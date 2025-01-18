import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import accountApi from '../../../apis/account.api';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../components/ui/table';
import { AccountRole, AccountStatus } from '../../../constant/account';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../../../components/ui/pagination';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../components/ui/select';
import { enumToObjectArray } from '../../../util/util';
import Edit from './Edit';
import AddAccount from './AddAccount';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { useDebouncedCallback } from 'use-debounce';
import { Button } from '../../../components/ui/button';
import { Account } from '../../../types/account.type';
import { toast } from 'react-toastify';

export default function Admin_account_list() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<string>('Student');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const queryClient = useQueryClient();
  const debounce = useDebouncedCallback((value) => {
    setSearchTerm(value);
  }, 500);
  const { data: account, isLoading } = useQuery({
    queryKey: [
      'accountList',
      { page: currentPage, roles: selectedRole, SearchTerm: searchTerm },
    ],
    queryFn: () =>
      accountApi.getAllAccountsWithPagination({
        limit: 10,
        page: currentPage,
        roles: selectedRole,
        SearchTerm: searchTerm,
      }),
  });

  const updateAccountStatus = useMutation({
    mutationFn: (data: { id: string; status: AccountStatus }) =>
      accountApi.updateAccount(data),
  });

  const handleDisableStudent = (item: Account) => {
    const status =
      item.status === AccountStatus.Active
        ? AccountStatus.Unactive
        : AccountStatus.Active;
    updateAccountStatus.mutate(
      {
        id: item.id,
        status,
      },
      {
        onSuccess: () => {
          toast.success('Update status successfully');
          queryClient.invalidateQueries({
            queryKey: [
              'accountList',
              {
                page: currentPage,
                roles: selectedRole,
                SearchTerm: searchTerm,
              },
            ],
          });
        },
        onError: () => {
          toast.error('Update status failed');
        },
      },
    );
  };

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <div className="pb-5">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold">ALL ACCOUNTS</p>
        <div className="flex w-80 items-center gap-5">
          <Label>Search</Label>
          <Input
            defaultValue={searchTerm}
            onChange={(e) => debounce(e.target.value)}
          />
        </div>
        <div className="flex gap-5">
          <AddAccount />
          <Select defaultValue="Student" onValueChange={setSelectedRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Role</SelectLabel>
                {enumToObjectArray(AccountRole).map((item) => {
                  if (item.label !== 'Admin')
                    return (
                      <SelectItem key={item.value} value={item.label}>
                        {item.label}
                      </SelectItem>
                    );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table className="">
        <TableHeader className="">
          <TableRow className="">
            <TableHead className="w-[100px]">FullName</TableHead>
            <TableHead className="w-[200px]">FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Expertise</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[200px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading ? (
            account?.data.data.data?.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="h-[100px] w-[100px] font-medium">
                  <img
                    src={item.avatarUrl}
                    className="h-full w-full object-fill"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {item.student?.studentName ||
                    item.lecturer?.lecturerName ||
                    item.mentor?.name}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {item.student?.studentDepartment ||
                    item.lecturer?.department ||
                    ''}
                </TableCell>
                <TableCell>
                  {item.lecturer?.expertise || item.mentor?.expertise || ''}
                </TableCell>
                <TableCell className="">
                  {item.student?.phoneNumber ||
                    item.lecturer?.phoneNumber ||
                    item.mentor?.contactPhone}
                </TableCell>
                <TableCell className="">{AccountRole[item.role]}</TableCell>
                <TableCell className="">{AccountStatus[item.status]}</TableCell>
                <TableCell className="">
                  <Edit key={item.id} account={item} />
                  <Button
                    className="ml-3"
                    onClick={() => handleDisableStudent(item)}
                  >
                    {item.status === AccountStatus.Active
                      ? 'Disable'
                      : 'Enable'}
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <div>Loading</div>
          )}
        </TableBody>
      </Table>
      <Pagination className="mt-2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
              }}
              size="default"
              href="#"
            />
          </PaginationItem>
          {Array.from({
            length: account?.data.data.pagination.limit || 1,
          }).map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={currentPage === index + 1}
                onClick={() => setCurrentPage(index + 1)}
                size={currentPage === index + 1 ? 'default' : 'icon'}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {account?.data.data.pagination.limit && (
            <PaginationItem>
              <PaginationNext
                onClick={() => {
                  setCurrentPage((prev) =>
                    prev < account?.data.data.pagination.limit
                      ? prev + 1
                      : account?.data.data.pagination.limit,
                  );
                }}
                size="default"
                href="#"
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
