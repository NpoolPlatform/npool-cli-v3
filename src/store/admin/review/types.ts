import { BaseRequest } from '../../base'
import { KYCInfo, UserInfo } from '../../frontend'

interface Review {
  ID?: string
  AppID?: string
  ObjectType?: string
  ReviewerID?: string
  State?: string
  Message?: string
  ObjectID?: string
  Domain?: string
  CreateAt?: number
}

interface KYCReview {
  Kyc: KYCInfo
  Review: Review
  User: UserInfo
}

interface GetKYCReviewsRequest extends BaseRequest {
}

interface GetKYCReviewsResponse {
  Infos: Array<KYCReview>
}

interface UpdateKYCReviewRequest extends BaseRequest {
  Info: Review
  TargetLangID: string
}

interface UpdateKYCReviewResponse {
  Info: KYCReview
}

export {
  Review,
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  UpdateKYCReviewRequest,
  UpdateKYCReviewResponse
}
