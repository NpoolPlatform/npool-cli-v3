import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { GetKYCReviewsRequest, GetKYCReviewsResponse } from './types'

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
    }
  }
})

export * from './types'
