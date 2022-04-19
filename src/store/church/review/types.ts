import {
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateWithdrawReviewRequest,
  UpdateWithdrawReviewResponse
} from '../../admin'

interface GetAppWithdrawAddressReviewsRequest extends GetWithdrawAddressReviewsRequest {
  TargetAppID: string
}

interface GetAppWithdrawAddressReviewsResponse extends GetWithdrawAddressReviewsResponse {
}

interface GetAppWithdrawReviewsRequest extends GetWithdrawReviewsRequest {
  TargetAppID: string
}

interface  GetAppWithdrawReviewsResponse extends GetWithdrawReviewsResponse {
}

interface UpdateAppWithdrawReviewRequest extends UpdateWithdrawReviewRequest {
  TargetAppID: string
}

interface UpdateAppWithdrawReviewResponse extends UpdateWithdrawReviewResponse {
}

interface GetAppKYCReviewsRequest extends GetKYCReviewsRequest {
  TargetAppID: string
}

interface GetAppKYCReviewsResponse extends GetKYCReviewsResponse {
}

export {
  GetAppWithdrawAddressReviewsRequest,
  GetAppWithdrawAddressReviewsResponse,
  GetAppWithdrawReviewsRequest,
  GetAppWithdrawReviewsResponse,
  UpdateAppWithdrawReviewRequest,
  UpdateAppWithdrawReviewResponse,
  GetAppKYCReviewsRequest,
  GetAppKYCReviewsResponse
}
