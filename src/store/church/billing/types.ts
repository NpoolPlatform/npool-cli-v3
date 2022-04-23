import { BaseRequest } from '../../base'
import {
  GetAppTransactionsRequest,
  GetAppTransactionsResponse,
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse
} from '../../admin'

interface GetAppPaymentsRequest extends GetPaymentsRequest {
  TargetAppID: string
}

interface GetAppPaymentsResponse extends GetPaymentsResponse {
}

interface GetAppPaymentBalancesRequest extends GetUserPaymentBalancesRequest {
  TargetAppID: string
}

interface GetAppPaymentBalancesResponse extends GetUserPaymentBalancesResponse {
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
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse,
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
