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

export {
  Review,
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse
}
