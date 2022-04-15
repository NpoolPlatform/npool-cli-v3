import { BaseRequest } from '../../base'
import { Account, KYCInfo, UserInfo, UserWithdraw, WithdrawAddress } from '../../frontend'

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

interface UpdateReviewRequest extends BaseRequest {
  Info: Review
}

interface UpdateReviewResponse {
  Info: Review
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

interface WithdrawAddressReview {
  Address: WithdrawAddress
  Account: Account
  Review: Review
  User: UserInfo
}

interface GetWithdrawAddressReviewsRequest extends BaseRequest {
}

interface GetWithdrawAddressReviewsResponse {
  Infos: Array<WithdrawAddressReview>
}

interface WithdrawReview {
  Withdraw: UserWithdraw
  Review: Review
  User: UserInfo
}

interface GetWithdrawReviewsRequest extends BaseRequest {
}

interface GetWithdrawReviewsResponse {
  Infos: Array<WithdrawReview>
}

interface UpdateWithdrawReviewRequest extends BaseRequest {
  TargetLangID: string
  Info: Review
}

interface UpdateWithdrawReviewResponse {
  Info: WithdrawReview
}

export {
  Review,
  UpdateReviewRequest,
  UpdateReviewResponse,
  KYCReview,
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  UpdateKYCReviewRequest,
  UpdateKYCReviewResponse,
  WithdrawAddressReview,
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  WithdrawReview,
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateWithdrawReviewRequest,
  UpdateWithdrawReviewResponse
}
