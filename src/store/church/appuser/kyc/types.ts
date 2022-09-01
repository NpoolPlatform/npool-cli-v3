import { ImageType, BaseRequest, ReqMessage, KYCReview, KYCReviewState } from '../../../base'
export interface GetAppKycReviewsRequest extends BaseRequest{
  TargetAppID: string;
  Offset: number
  Limit: number
}
export interface GetAppKycReviewsResponse {
  Infos: Array<KYCReview>
  Total: number
}

interface NotifyMessage {
  NotifyMessage: ReqMessage
}

export interface UpdateAppKycReviewRequest extends NotifyMessage{
  TargetAppID: string;
  LangID?: string
  ReviewID: string
  State?: KYCReviewState
  Message: string
  UserID?: string
}

export interface UpdateAppKycReviewResponse {
  Info: KYCReview
}

export interface GetAppUserKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  TargetUserID: string
  TargetAppID: string
}

export interface GetAppUserKYCImageResponse {
  Info: string
}
