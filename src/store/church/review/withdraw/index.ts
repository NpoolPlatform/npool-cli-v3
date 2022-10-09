import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { WithdrawReview } from '../../../base'
import { 
  GetAppWithdrawReviewsRequest,
  GetAppWithdrawReviewsResponse,
  UpdateAppWithdrawReviewRequest,
  UpdateAppWithdrawReviewResponse,
} from './types'

export const useChurchWithdrawReviewStore = defineStore('church-withdrawreview-v4', {
  state: () => ({
    WithdrawReviews: {
      WithdrawReviews: new Map<string, Array<WithdrawReview>>(),
      Total: 0
    }
  }),
  getters: {
    getAppWithdrawReviews() : (appID: string) => Array<WithdrawReview> {
      return (appID: string) => {
        const data = this.WithdrawReviews.WithdrawReviews.get(appID)
        return !data ? [] as Array<WithdrawReview> : data
      }
    }
  },
  actions: {
    getAppWithdrawReviews(req: GetAppWithdrawReviewsRequest, done: (reviews: Array<WithdrawReview>, error: boolean) => void) {
      doActionWithError<GetAppWithdrawReviewsRequest, GetAppWithdrawReviewsResponse>(
        API.GET_APP_WITHDRAWREVIEWAS,
        req,
        req.Message,
        (resp: GetAppWithdrawReviewsResponse): void => {
          const data = this.getAppWithdrawReviews(req.TargetAppID)
          data.push(...resp.Infos)
          this.WithdrawReviews.WithdrawReviews.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateAppWithdrawReview(req: UpdateAppWithdrawReviewRequest, done: (review: WithdrawReview, error: boolean) => void) {
      doActionWithError<UpdateAppWithdrawReviewRequest, UpdateAppWithdrawReviewResponse>(
        API.UPDATE_APP_WITHDRAWREVIEWA,
        req,
        req.NotifyMessage,
        (resp: UpdateAppWithdrawReviewResponse): void => {
          const data = this.getAppWithdrawReviews(req.TargetAppID)
          const index = data.findIndex((el) => el.ReviewID === resp.Info.ReviewID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.WithdrawReviews.WithdrawReviews.set(req.TargetAppID, data)
          done(resp.Info, false)
        }, () => {
          done({} as WithdrawReview, true)
      })
    }
  }
})
