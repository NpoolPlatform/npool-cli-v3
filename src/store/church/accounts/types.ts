import { Account, WithdrawAddress } from '../../frontend'
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

interface GoodPayment {
  ID: string
  GoodID: string
  PaymentCoinTypeID: string
  AccountID: string
  Idle: boolean
}

interface GetGoodPaymentsRequest extends BaseRequest {
}

interface GetGoodPaymentsResponse {
  Infos: Array<GoodPayment>
}

interface UpdateGoodPaymentRequest extends BaseRequest {
  Info: GoodPayment
}

interface UpdateGoodPaymentResponse {
  Info: GoodPayment
}

interface GetWithdrawAddressesRequest extends BaseRequest {
  TargetAppID: string
}

interface GetWithdrawAddressesResponse {
  Infos: Array<WithdrawAddress>
}

export {
  GetAccountsRequest,
  GetAccountsResponse,
  CreatePlatformAccountRequest,
  CreatePlatformAccountResponse,
  CreateUserAccountRequest,
  CreateUserAccountResponse,
  GoodPayment,
  GetGoodPaymentsRequest,
  GetGoodPaymentsResponse,
  UpdateGoodPaymentRequest,
  UpdateGoodPaymentResponse,
  GetWithdrawAddressesRequest,
  GetWithdrawAddressesResponse
}
