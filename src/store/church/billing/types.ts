import {
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse
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

export {
  GetAppPaymentsRequest,
  GetAppPaymentsResponse,
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse
}
