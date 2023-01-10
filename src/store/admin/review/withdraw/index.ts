import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { WithdrawReview } from '../../../base'
import { 
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateWithdrawReviewRequest,
  UpdateWithdrawReviewResponse,
} from './types'

export const useAdminWithdrawReviewStore = defineStore('admin-withdrawreview-v4', {
  state: () => ({
    WithdrawReviews: {
      WithdrawReviews: [] as Array<WithdrawReview>,
      Total: 0
    }
  }),
  getters: {
    withdrawReviews () : Array<WithdrawReview> {
      return this.WithdrawReviews.WithdrawReviews.sort((a, b) => b.State.localeCompare(a.State, 'zh-CN'))
    },
    getWithdrawReviewsByID: (state) => {
      return (reviewID: string) => {
        const index = state.WithdrawReviews.WithdrawReviews.findIndex((el) => el.ReviewID == reviewID)
        return index > -1 ? state.WithdrawReviews.WithdrawReviews[index] : {} as WithdrawReview
      }
    }
  },
  actions: {
    getWithdrawReviews(req: GetWithdrawReviewsRequest, done: (reviews: Array<WithdrawReview>, error: boolean) => void) {
      doActionWithError<GetWithdrawReviewsRequest, GetWithdrawReviewsResponse>(
        API.GET_WITHDRAWREVIEWS,
        req,
        req.Message,
        (resp: GetWithdrawReviewsResponse): void => {
          this.WithdrawReviews.WithdrawReviews.push(...resp.Infos)
          this.WithdrawReviews.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateWithdrawReview(req: UpdateWithdrawReviewRequest, done: (review: WithdrawReview, error: boolean) => void) {
      doActionWithError<UpdateWithdrawReviewRequest, UpdateWithdrawReviewResponse>(
        API.UPDATE_WITHDRAWREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateWithdrawReviewResponse): void => {
          const index = this.WithdrawReviews.WithdrawReviews.findIndex((el) => el.ReviewID === resp.Info.ReviewID)
          this.WithdrawReviews.WithdrawReviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as WithdrawReview, true)
      })
    }
  }
})
