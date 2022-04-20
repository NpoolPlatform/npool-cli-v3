import { Account } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAccountsRequest extends BaseRequest {
}

interface GetAccountsResponse {
  Infos: Array<Account>
}

interface CreatePlatformAccountRequest extends BaseRequest {
  CoinTypeID: string
}

interface CreatePlatformAccountResponse {
  Info: Account
}

interface CreateUserAccountRequest extends BaseRequest {
  Info: Account
}

interface CreateUserAccountResponse {
  Info: Account
}

export {
  GetAccountsRequest,
  GetAccountsResponse,
  CreatePlatformAccountRequest,
  CreatePlatformAccountResponse,
  CreateUserAccountRequest,
  CreateUserAccountResponse
}
