import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  GetKYCReviewsRequest,
  GetKYCReviewsResponse,
  GetWithdrawAddressReviewsRequest,
  GetWithdrawAddressReviewsResponse,
  GetWithdrawReviewsRequest,
  GetWithdrawReviewsResponse,
  UpdateKYCReviewRequest,
  UpdateKYCReviewResponse,
  UpdateReviewRequest,
  UpdateReviewResponse,
  UpdateWithdrawReviewRequest,
  UpdateWithdrawReviewResponse
} from './types'

export const useReviewStore = defineStore('review', {
  state: (): ReviewState => ({
    KYCReviews: [],
    WithdrawAddressReviews: [],
    WithdrawReviews: []
  }),
  getters: {},
  actions: {
    updateReview (req: UpdateReviewRequest, done: () => void) {
      doAction<UpdateReviewRequest, UpdateReviewResponse>(
        API.UPDATE_REVIEW,
        req,
        req.Message,
        (resp: UpdateReviewResponse): void => {
          let index = this.KYCReviews.findIndex((el) => el.Review.ID === resp.Info.ID)
          if (index >= 0) {
            this.KYCReviews[index].Review = resp.Info
            done()
            return
          }
          
          index = this.WithdrawAddressReviews.findIndex((el) => el.Review.ID === resp.Info.ID)
          if (index >= 0) {
            this.WithdrawAddressReviews[index].Review = resp.Info
            done()
          }
        })
    },
    getKYCReviews (req: GetKYCReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetKYCReviewsRequest, GetKYCReviewsResponse>(
        API.GET_KYC_REVIEWS,
        req,
        req.Message,
        (resp: GetKYCReviewsResponse): void => {
          this.KYCReviews = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    updateKYCReview (req: UpdateKYCReviewRequest, done: () => void) {
      doAction<UpdateKYCReviewRequest, UpdateKYCReviewResponse>(
        API.UPDATE_KYC_REVIEW,
        req,
        req.Message,
        (resp: UpdateKYCReviewResponse): void => {
          const index = this.KYCReviews.findIndex((el) => el.Review.ID === resp.Info.Review.ID)
          this.KYCReviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    getWithdrawAddressReviews (req: GetWithdrawAddressReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetWithdrawAddressReviewsRequest, GetWithdrawAddressReviewsResponse>(
        API.GET_WITHDRAW_ADDRESS_REVIEWS,
        req,
        req.Message,
        (resp: GetWithdrawAddressReviewsResponse): void => {
          this.WithdrawAddressReviews = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getWithdrawReviews (req: GetWithdrawReviewsRequest, done: (error: boolean) => void) {
      doActionWithError<GetWithdrawReviewsRequest, GetWithdrawReviewsResponse>(
        API.GET_WITHDRAW_REVIEWS,
        req,
        req.Message,
        (resp: GetWithdrawReviewsResponse): void => {
          this.WithdrawReviews = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    updateWithdrawReview (req: UpdateWithdrawReviewRequest, done: () => void) {
      doAction<UpdateWithdrawReviewRequest, UpdateWithdrawReviewResponse>(
        API.UPDATE_WITHDRAW_REVIEW,
        req,
        req.Message,
        (resp: UpdateWithdrawReviewResponse): void => {
          const index = this.WithdrawReviews.findIndex((el) => el.Review.ID === resp.Info.Review.ID)
          this.WithdrawReviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
