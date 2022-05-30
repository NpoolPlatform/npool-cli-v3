import { BaseRequest } from '../../base'
import { Benefit, Transaction, UserWithdraw, Payment, UserPaymentBalance } from '../../frontend'

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

interface GetAppPaymentBalancesRequest extends BaseRequest {
}

interface GetAppPaymentBalancesResponse {
  Infos: Array<UserPaymentBalance>
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
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse
}
