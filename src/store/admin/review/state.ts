import { KYCReview, WithdrawAddressReview, WithdrawReview } from './types'

interface ReviewState {
  KYCReviews: Array<KYCReview>
  WithdrawAddressReviews: Array<WithdrawAddressReview>
  WithdrawReviews: Array<WithdrawReview>
}

export {
  ReviewState
}
