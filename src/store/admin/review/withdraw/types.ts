import { BaseRequest, MyRequest,  ReviewState, WithdrawReview } from '../../../base'


export interface UpdateWithdrawReviewRequest extends MyRequest{
  ReviewID: string;
  UserID: string;
  LangID: string;
  State: ReviewState;
  Message: string;
}

export interface UpdateWithdrawReviewResponse {
  Info: WithdrawReview
}

export interface GetWithdrawReviewsRequest extends BaseRequest{
  offset: number;
  limit: number;
}
export interface GetWithdrawReviewsResponse {
  Infos: Array<WithdrawReview>;
  Total: number;
}