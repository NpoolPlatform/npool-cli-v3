import { BaseRequest } from '../../base'

interface UserPaymentBalance {
  ID?: string
  UserID?: string
  PaymentID: string
  Amount: number
  UsedByPaymentID: string
}

interface GetUserPaymentBalancesRequest extends BaseRequest {
}

interface GetUserPaymentBalancesResponse {
  Infos: Array<UserPaymentBalance>
}

interface BillingState {
  PaymentBalances: Array<UserPaymentBalance>
}

export {
  UserPaymentBalance,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse,
  BillingState
}
