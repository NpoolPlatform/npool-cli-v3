import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { GetKYCReviewsRequest, GetKYCReviewsResponse, UpdateKYCReviewRequest, UpdateKYCReviewResponse } from './types'

export const useReviewStore = defineStore('review', {
  state: (): ReviewState => ({
    KYCReviews: []
  }),
  getters: {},
  actions: {
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
    }
  }
})

export * from './types'
