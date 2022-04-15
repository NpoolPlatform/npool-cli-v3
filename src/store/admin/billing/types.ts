import { BaseRequest } from '../../base'
import { Benefit, Transaction, UserWithdraw, Payment } from '../../frontend'

interface GetUserBenefitsRequest extends BaseRequest {
}

interface GetUserBenefitsResponse {
  Infos: Array<Benefit>
}

interface GetAppTransactionsRequest extends BaseRequest {
}

interface GetAppTransactionsResponse {
  Infos: Array<Transaction>
}

interface GetWithdrawsRequest extends BaseRequest {
}

interface GetWithdrawsResponse {
  Infos: Array<UserWithdraw>
}

interface GetPaymentsRequest extends BaseRequest {
}

interface GetPaymentsResponse {
  Infos: Array<Payment>
}

interface UserPaymentBalance {
  ID?: string
  UserID?: string
  PaymentID: string
  Amount: number
}

interface GetUserPaymentBalancesRequest extends BaseRequest {
}

interface GetUserPaymentBalancesResponse {
  Infos: Array<UserPaymentBalance>
}

interface BillingState {
  UserBenefits: Array<Benefit>
  Transactions: Array<Transaction>
  Payments: Array<Payment>
  PaymentBalances: Array<UserPaymentBalance>
  Withdraws: Array<UserWithdraw>
}

export {
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  GetAppTransactionsRequest,
  GetAppTransactionsResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  UserPaymentBalance,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse,
  BillingState
}
