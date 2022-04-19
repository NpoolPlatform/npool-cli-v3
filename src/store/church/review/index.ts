import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { KYCReview, WithdrawAddressReview, WithdrawReview } from '../../admin'
import {
  GetAppKYCReviewsRequest,
  GetAppKYCReviewsResponse,
  GetAppWithdrawAddressReviewsRequest,
  GetAppWithdrawAddressReviewsResponse,
  GetAppWithdrawReviewsRequest,
  GetAppWithdrawReviewsResponse,
  UpdateAppWithdrawReviewRequest,
  UpdateAppWithdrawReviewResponse
} from './types'

export const useChurchReviewStore = defineStore('churchreview', {
  state: (): ReviewState => ({
    KYCReviews: new Map<string, Array<KYCReview>>(),
    WithdrawAddressReviews: new Map<string, Array<WithdrawAddressReview>>(),
    WithdrawReviews: new Map<string, Array<WithdrawReview>>()
  }),
  getters: {},
  actions: {
    getKYCReviews (req: GetAppKYCReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppKYCReviewsRequest, GetAppKYCReviewsResponse>(
        API.GET_KYC_REVIEWS,
        req,
        req.Message,
        (resp: GetAppKYCReviewsResponse): void => {
          this.KYCReviews.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getWithdrawAddressReviews (req: GetAppWithdrawAddressReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppWithdrawAddressReviewsRequest, GetAppWithdrawAddressReviewsResponse>(
        API.GET_WITHDRAW_ADDRESS_REVIEWS,
        req,
        req.Message,
        (resp: GetAppWithdrawAddressReviewsResponse): void => {
          this.WithdrawAddressReviews.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getWithdrawReviews (req: GetAppWithdrawReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppWithdrawReviewsRequest, GetAppWithdrawReviewsResponse>(
        API.GET_WITHDRAW_REVIEWS,
        req,
        req.Message,
        (resp: GetAppWithdrawReviewsResponse): void => {
          this.WithdrawReviews.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    updateWithdrawReview (req: UpdateAppWithdrawReviewRequest, done: () => void) {
      doAction<UpdateAppWithdrawReviewRequest, UpdateAppWithdrawReviewResponse>(
        API.UPDATE_WITHDRAW_REVIEW,
        req,
        req.Message,
        (resp: UpdateAppWithdrawReviewResponse): void => {
          const reviews = this.WithdrawReviews.get(req.TargetAppID)
          if (!reviews) {
            return
          }
          const index = reviews.findIndex((el) => el.Review.ID === resp.Info.Review.ID)
          if (index === undefined) {
            return
          }
          reviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.WithdrawReviews.set(req.TargetAppID, reviews)
          done()
        })
    }
  }
})

export * from './types'
