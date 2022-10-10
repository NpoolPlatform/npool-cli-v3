import { defineStore } from 'pinia'
import { WithdrawAddressReview } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  UpdateWithdrawAddressReviewRequest,
  UpdateWithdrawAddressReviewResponse,
} from './types'

export const useAdminWithdrawAddressReviewStore = defineStore('admin-withdrawaddressreview-v4', {
  state: () => ({
    WithdrawAddressReviews: {
      WithdrawAddressReviews: [] as Array<WithdrawAddressReview>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getWithdrawAddressReviews (req: GetWithdrawAddressReviewsRequest, done: (withdrawAddressReviews: Array<WithdrawAddressReview>, error: boolean) => void) {
      doActionWithError<GetWithdrawAddressReviewsRequest, GetWithdrawAddressReviewsResponse>(
        API.GET_WITHDRAW_ADDRESS_REVIEWS,
        req,
        req.Message,
        (resp: GetWithdrawAddressReviewsResponse): void => {
          this.WithdrawAddressReviews.WithdrawAddressReviews.push(...resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateWithdrawAddressReview (req: UpdateWithdrawAddressReviewRequest, done: (withdrawAddressReview: WithdrawAddressReview, error: boolean) => void) {
      doActionWithError<UpdateWithdrawAddressReviewRequest, UpdateWithdrawAddressReviewResponse>(
        API.UPDATE_WITHDRAW_ADDRESS_REVIEW,
        req,
        req.Message,
        (resp: UpdateWithdrawAddressReviewResponse): void => {
          const index = this.WithdrawAddressReviews.WithdrawAddressReviews.findIndex((el) => el.Review.ID === resp.Info.ID)
          this.WithdrawAddressReviews.WithdrawAddressReviews[index].Review = resp.Info
          done(this.WithdrawAddressReviews.WithdrawAddressReviews[index], false)
        }, () => {
          done({} as WithdrawAddressReview, true)
        })
    }
  }
})

export * from './types'
