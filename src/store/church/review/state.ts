import {
  KYCReview,
  WithdrawAddressReview,
  WithdrawReview
} from '../../admin'

interface  ReviewState {
  KYCReviews: Map<string, Array<KYCReview>>
  WithdrawAddressReviews: Map<string, Array<WithdrawAddressReview>>
  WithdrawReviews: Map<string, Array<WithdrawReview>>
}

export {
  ReviewState
}
