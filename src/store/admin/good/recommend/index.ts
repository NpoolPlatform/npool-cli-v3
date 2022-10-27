import { defineStore } from 'pinia'
import { Recommend } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  CreateRecommendRequest,
  CreateRecommendResponse,
  GetRecommendsRequest,
  GetRecommendsResponse,
  UpdateRecommendRequest,
  UpdateRecommendResponse
} from './types'

export const useAdminRecommendStore = defineStore('admin-recommend-v4', {
  state: () => ({
    Recommends: {
      Recommends: [] as Array<Recommend>,
      Total: 0
    }
  }),
  getters: {
    getRecommendByID () {
      return (goodID: string) => this.Recommends.Recommends.find((el) => el.GoodID === goodID)
    }
  },
  actions: {
    getRecommends (req: GetRecommendsRequest, done: (promotions: Array<Recommend>, error: boolean) => void) {
      doActionWithError<GetRecommendsRequest, GetRecommendsResponse>(
        API.GET_RECOMMENDS,
        req,
        req.Message,
        (resp: GetRecommendsResponse): void => {
          this.Recommends.Recommends.push(...resp.Infos)
          this.Recommends.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateRecommend (req: UpdateRecommendRequest, done: (promotion: Recommend, error: boolean) => void) {
      doActionWithError<UpdateRecommendRequest, UpdateRecommendResponse>(
        API.UPDATE_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: UpdateRecommendResponse): void => {
          const index = this.Recommends.Recommends.findIndex((el) => el.ID === resp.Info.ID)
          this.Recommends.Recommends.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Recommend, true)
        })
    },
    createRecommend (req: CreateRecommendRequest, done: (promotion: Recommend, error: boolean) => void) {
      doActionWithError<CreateRecommendRequest, CreateRecommendResponse>(
        API.CREATE_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: CreateRecommendResponse): void => {
          this.Recommends.Recommends.push(resp.Info)
          this.Recommends.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Recommend, true)
        })
    }
  }
})
