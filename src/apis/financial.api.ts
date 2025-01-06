import { Financial } from '../types/financial.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';
import { convertToFormData } from '../util/util';

const URL = 'Financial';

export interface AddFinancialRequest {
  ProjectId: string;
  Description: string;
  Amount: number;
  TransactionDate: string;
  ImageFile: File;
}

const financialApi = {
  getFinancials(params: {
    PageSize: number;
    PageNumber: number;
    ProjectId: string;
  }) {
    return http.get<
      SuccessResponse<{
        total: number;
        cashOut: number;
        transactions: {
          data: Financial[];
          pagination: {
            number: number;
            limit: number;
            pageSize: number;
          };
        };
      }>
    >(`${URL}/transactions`, {
      params,
    });
  },

  addFinancial(data: AddFinancialRequest) {
    return http.post<SuccessResponse<Financial>>(
      `${URL}/addTransaction`,
      convertToFormData(data),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
  },
};

export default financialApi;
