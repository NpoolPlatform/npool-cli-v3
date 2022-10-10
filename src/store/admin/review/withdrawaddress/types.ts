import { BaseRequest, Review, WithdrawAddressReview } from '../../../base'



export interface GetWithdrawAddressReviewsRequest extends BaseRequest {
}

export interface GetWithdrawAddressReviewsResponse {
  Infos: Array<WithdrawAddressReview>
  Total: number;
}

export interface UpdateWithdrawAddressReviewRequest extends BaseRequest {
  Info: Review;
}

export interface UpdateWithdrawAddressReviewResponse {
  Info: Review;
}