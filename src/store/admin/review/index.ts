import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { GetKYCsRequest, GetKYCsResponse } from './types'

export const useReviewStore = defineStore('review', {
  state: (): ReviewState => ({
    KYCs: []
  }),
  getters: {},
  actions: {
    getKYCs (req: GetKYCsRequest, done: (error: boolean) => void) {
      doActionWithError<GetKYCsRequest, GetKYCsResponse>(
        API.GET_KYCS,
        req,
        req.Message,
        (resp: GetKYCsResponse): void => {
          this.KYCs = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
