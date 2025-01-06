export interface Financial {
  id: string;
  projectId: string;
  description: string;
  amount: number;
  transactionDate: string;
  imageUrl: string;
  status: number;
  isDeleted: boolean;
}
