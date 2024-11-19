import { Account, QueryAccount } from "../types/account.type"
import { SuccessResponse } from "../types/utils.type"
import http from "../util/http"

const URL = 'Account'
const accountApi = {
  getAccounts(params: QueryAccount){
    return http.get<SuccessResponse<Account[]>>(URL, {
      params
    })
  }
}

export default accountApi