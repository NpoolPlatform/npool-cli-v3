import { KYC, KYCState, ImageType, BaseRequest, ReqMessage } from '../../../base'
export interface GetKycReviewsRequest extends BaseRequest{
  Offset: number
  Limit: number
}
export interface GetKycReviewsResponse {
  Infos: Array<KYC>
  Total: number
}

interface NotifyMessage {
  NotifyMessage: ReqMessage
}

export interface UpdateKycReviewRequest extends NotifyMessage{
  LangID?: string;
  ReviewID: string
  State?: KYCState
  Message: string
  UserID?: string;
}

export interface UpdateKycReviewResponse {
  Info: KYC
}

export interface GetUserKYCImageRequest extends BaseRequest {
  ImageType: ImageType
  TargetUserID: string
}

export interface GetUserKYCImageResponse {
  Info: string
}
