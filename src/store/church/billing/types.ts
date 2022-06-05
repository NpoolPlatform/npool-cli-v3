import { BaseRequest } from '../../base'
import {
  GetAppTransactionsRequest,
  GetAppTransactionsResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse
} from '../../admin'
import { UserPaymentBalance } from '../../frontend'

interface GetAppPaymentsRequest extends GetPaymentsRequest {
  TargetAppID: string
}

interface GetAppPaymentsResponse extends GetPaymentsResponse {
}

interface CreateTargetAppUserPaymentBalanceRequest extends BaseRequest {
  TargetAppID: string
  TargetUserID: string
  Info: UserPaymentBalance
}

interface CreateTargetAppUserPaymentBalanceResponse {
  Info: UserPaymentBalance
}

interface GetTargetAppPaymentBalancesRequest extends GetAppPaymentBalancesRequest {
  TargetAppID: string
}

interface GetTargetAppPaymentBalancesResponse extends GetAppPaymentBalancesResponse {
}

interface GetAppUserBenefitsRequest extends GetUserBenefitsRequest {
  TargetAppID: string
}

interface GetAppUserBenefitsResponse extends GetUserBenefitsResponse {
}

interface GetTargetAppTransactionsRequest extends GetAppTransactionsRequest {
  TargetAppID: string
}

interface GetTargetAppTransactionsResponse extends GetAppTransactionsResponse {
}

interface GetAppWithdrawsRequest extends GetWithdrawsRequest {
  TargetAppID: string
}

interface GetAppWithdrawsResponse extends GetWithdrawsResponse {
}

interface PlatformBenefit {
  ID: string
  GoodID: string
  BenefitAccountID: string
  Amount: number
  CreateAt: number
  ChainTransactionID: string
  LastBenefitTimestamp: number
}

interface GetPlatformBenefitsRequest extends BaseRequest {
}

interface GetPlatformBenefitsResponse {
  Infos: Array<PlatformBenefit>
}

export {
  GetAppPaymentsRequest,
  GetAppPaymentsResponse,
  GetTargetAppPaymentBalancesRequest,
  GetTargetAppPaymentBalancesResponse,
  CreateTargetAppUserPaymentBalanceRequest,
  CreateTargetAppUserPaymentBalanceResponse,
  GetAppUserBenefitsRequest,
  GetAppUserBenefitsResponse,
  GetTargetAppTransactionsRequest,
  GetTargetAppTransactionsResponse,
  GetAppWithdrawsRequest,
  GetAppWithdrawsResponse,
  PlatformBenefit,
  GetPlatformBenefitsRequest,
  GetPlatformBenefitsResponse
}
