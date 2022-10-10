import { BaseRequest, Review, WithdrawAddressReview } from '../../../base'



export interface GetAppWithdrawAddressReviewsRequest extends BaseRequest {
  TargetAppID: string
}

export interface GetAppWithdrawAddressReviewsResponse {
  Infos: Array<WithdrawAddressReview>
  Total: number;
}

export interface UpdateAppWithdrawAddressReviewRequest extends BaseRequest {
  TargetAppID: string;
  Info: Review;
}

export interface UpdateAppWithdrawAddressReviewResponse {
  Info: Review;
}