import { Account } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAccountsRequest extends BaseRequest {
}

interface GetAccountsResponse {
  Infos: Array<Account>
}

export {
  GetAccountsRequest,
  GetAccountsResponse
}
