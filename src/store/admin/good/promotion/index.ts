import { defineStore } from 'pinia'
import { Promotion } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  CreatePromotionRequest,
  CreatePromotionResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  UpdatePromotionRequest,
  UpdatePromotionResponse
} from './types'

export const useAdminPromotionStore = defineStore('admin-promotion-v4', {
  state: () => ({
    Promotions: {
      Promotions: [] as Array<Promotion>,
      Total: 0
    }
  }),
  getters: {
    getGoodsByID () {
      return (ID: string) => this.Promotions.Promotions.find((el) => el.ID === ID)
    }
  },
  actions: {
    getPromotions (req: GetPromotionsRequest, done: (promotions: Array<Promotion>, error: boolean) => void) {
      doActionWithError<GetPromotionsRequest, GetPromotionsResponse>(
        API.GET_PROMOTIONS,
        req,
        req.Message,
        (resp: GetPromotionsResponse): void => {
          this.Promotions.Promotions.push(...resp.Infos)
          this.Promotions.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updatePromotion (req: UpdatePromotionRequest, done: (promotion: Promotion, error: boolean) => void) {
      doActionWithError<UpdatePromotionRequest, UpdatePromotionResponse>(
        API.UPDATE_PROMOTION,
        req,
        req.NotifyMessage,
        (resp: UpdatePromotionResponse): void => {
          const index = this.Promotions.Promotions.findIndex((el) => el.ID === resp.Info.ID)
          this.Promotions.Promotions.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Promotion, true)
        })
    },
    createPromotion (req: CreatePromotionRequest, done: (promotion: Promotion, error: boolean) => void) {
      doActionWithError<CreatePromotionRequest, CreatePromotionResponse>(
        API.UPDATE_PROMOTION,
        req,
        req.NotifyMessage,
        (resp: CreatePromotionResponse): void => {
          this.Promotions.Promotions.push(resp.Info)
          this.Promotions.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Promotion, true)
        })
    }
  }
})
