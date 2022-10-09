import { BaseRequest, MyRequest,  ReviewState, WithdrawReview } from '../../../base'


export interface GetAppWithdrawReviewsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppWithdrawReviewsResponse {
  Infos: WithdrawReview[];
  Total: number;
}

export interface UpdateAppWithdrawReviewRequest extends MyRequest {
  TargetAppID: string;
  ReviewID: string;
  AppID: string;
  UserID: string;
  LangID: string;
  State: ReviewState;
  Message: string;
}

export interface UpdateAppWithdrawReviewResponse {
  Info: WithdrawReview;
}