import { ImageType, BaseRequest, ReqMessage, KYCReview, KYCReviewState } from '../../../base'
export interface GetKycReviewsRequest extends BaseRequest{
  Offset: number
  Limit: number
}
export interface GetKycReviewsResponse {
  Infos: Array<KYCReview>
  Total: number
}

interface NotifyMessage {
  NotifyMessage: ReqMessage
}

export interface UpdateKycReviewRequest extends NotifyMessage{
  LangID?: string
  ReviewID: string
  State?: KYCReviewState
  Message: string
  UserID?: string
}

export interface UpdateKycReviewResponse {
  Info: KYCReview
}

export interface GetUserKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  TargetUserID: string
}

export interface GetUserKYCImageResponse {
  Info: string
}
