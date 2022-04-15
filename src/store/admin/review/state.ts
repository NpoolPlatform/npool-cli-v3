import { KYCReview, WithdrawAddressReview } from './types'

interface ReviewState {
  KYCReviews: Array<KYCReview>
  WithdrawAddressReviews: Array<WithdrawAddressReview>
}

export {
  ReviewState
}
