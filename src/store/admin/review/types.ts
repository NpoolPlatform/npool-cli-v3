import { BaseRequest } from 'src/store/base'
import { KYC, UserInfo } from '../../frontend'

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
  Kyc: KYC
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
