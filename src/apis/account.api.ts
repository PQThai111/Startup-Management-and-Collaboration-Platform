import { Account, QueryAccount } from '../types/account.type';
import { SuccessResponse } from '../types/utils.type';
import http from '../util/http';

const URL = 'Account';
const accountApi = {
  getAccounts(params: QueryAccount) {
    return http.get<SuccessResponse<Account[]>>(URL, {
      params,
    });
  },

  getAllAccountsWithPagination({
    roles,
    page,
    limit,
  }: {
    roles?: string;
    page: number;
    limit: number;
  }) {
    const params = roles
      ? { roles, PageNumber: page, PageSize: limit }
      : { PageNumber: page, PageSize: limit };
    return http.get<
      SuccessResponse<{
        data: Account[];
        pagination: {
          number: number;
          limit: number;
          pageSize: number;
        };
      }>
    >(`${URL}/Paging`, {
      params,
    });
  },

  getAccount(id: string) {
    return http.get<SuccessResponse<Account>>(`${URL}/${id}`);
  },

  getAccountDashboard(data: { courseId?: string; semesterId?: string }) {
    return http.get<
      SuccessResponse<{
        total_account: number;
        student: number;
        lecturer: number;
        mentor: number;
      }>
    >(`${URL}/Dashboard`, {
      params: data,
    });
  },
};

export default accountApi;
