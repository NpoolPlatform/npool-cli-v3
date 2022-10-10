import { defineStore } from 'pinia'
import { WithdrawAddressReview } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetAppWithdrawAddressReviewsRequest,
  GetAppWithdrawAddressReviewsResponse,
  UpdateAppWithdrawAddressReviewRequest,
  UpdateAppWithdrawAddressReviewResponse,
} from './types'

export const useChurchWithdrawAddressReviewStore = defineStore('church-withdrawaddressreview-v4', {
  state: () => ({
    WithdrawAddressReviews: {
      WithdrawAddressReviews: new Map<string,Array<WithdrawAddressReview>>(),
      Total: 0
    }
  }),
  getters: {
    getWithdrawAddressReviewsByID: (state) => {
      return (appID: string) => {
        const data = state.WithdrawAddressReviews.WithdrawAddressReviews.get(appID)
        return !data ? [] as Array<WithdrawAddressReview> : data
      }
    }
  },
  actions: {
    getAppWithdrawAddressReviews (req: GetAppWithdrawAddressReviewsRequest, done: (withdrawAddressReviews: Array<WithdrawAddressReview>, error: boolean) => void) {
      doActionWithError<GetAppWithdrawAddressReviewsRequest, GetAppWithdrawAddressReviewsResponse>(
        API.GET_APP_WITHDRAW_ADDRESS_REVIEWS,
        req,
        req.Message,
        (resp: GetAppWithdrawAddressReviewsResponse): void => {
          const data = this.getWithdrawAddressReviewsByID(req.TargetAppID)
          data.push(...resp.Infos)
          this.WithdrawAddressReviews.WithdrawAddressReviews.set(req.TargetAppID, data)
          this.WithdrawAddressReviews.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppWithdrawAddressReview (req: UpdateAppWithdrawAddressReviewRequest, done: (withdrawAddressReview: WithdrawAddressReview, error: boolean) => void) {
      doActionWithError<UpdateAppWithdrawAddressReviewRequest, UpdateAppWithdrawAddressReviewResponse>(
        API.UPDATE_APP_WITHDRAW_ADDRESS_REVIEW,
        req,
        req.Message,
        (resp: UpdateAppWithdrawAddressReviewResponse): void => {
          const data = this.getWithdrawAddressReviewsByID(req.TargetAppID)
          const index = data.findIndex((el) => el.Review.ID === resp.Info.ID)
          data[index].Review = resp.Info
          this.WithdrawAddressReviews.WithdrawAddressReviews.set(req.TargetAppID, data)
          done(data[index], false)
        }, () => {
          done({} as WithdrawAddressReview, true)
        })
    }
  }
})

export * from './types'
