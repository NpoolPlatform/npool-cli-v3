import { defineStore } from 'pinia'
import { Promotion } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  CreateAppPromotionRequest,
  CreateAppPromotionResponse,
  GetAppPromotionsRequest,
  GetAppPromotionsResponse,
  UpdateAppPromotionRequest,
  UpdateAppPromotionResponse
} from './types'

export const useChurchPromotionStore = defineStore('church-promotion-v4', {
  state: () => ({
    AppPromotions: {
      AppPromotions: new Map<string, Array<Promotion>>(),
      Total: 0
    }
  }),
  getters: {
    getPromotionsByAppID () {
      return (appID: string) => {
        const data = this.AppPromotions.AppPromotions.get(appID)
        return !data ? [] as Array<Promotion> : data
      }
    }
  },
  actions: {
    getAppPromotions (req: GetAppPromotionsRequest, done: (appPromotions: Array<Promotion>, error: boolean) => void) {
      doActionWithError<GetAppPromotionsRequest, GetAppPromotionsResponse>(
        API.GET_APP_PROMOTIONS,
        req,
        req.Message,
        (resp: GetAppPromotionsResponse): void => {
          const data = this.getPromotionsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.AppPromotions.AppPromotions.set(req.TargetAppID, data)
          this.AppPromotions.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppPromotion (req: UpdateAppPromotionRequest, done: (appPromotion: Promotion, error: boolean) => void) {
      doActionWithError<UpdateAppPromotionRequest, UpdateAppPromotionResponse>(
        API.UPDATE_APP_PROMOTION,
        req,
        req.NotifyMessage,
        (resp: UpdateAppPromotionResponse): void => {
          const data = this.getPromotionsByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.AppPromotions.AppPromotions.set(req.TargetAppID, data)
          done(resp.Info, false)
        }, () => {
          done({} as Promotion, true)
        })
    },
    createAppPromotion (req: CreateAppPromotionRequest, done: (appPromotion: Promotion, error: boolean) => void) {
      doActionWithError<CreateAppPromotionRequest, CreateAppPromotionResponse>(
        API.CREATE_APP_PROMOTION,
        req,
        req.NotifyMessage,
        (resp: CreateAppPromotionResponse): void => {
          const data = this.getPromotionsByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.AppPromotions.AppPromotions.set(req.TargetAppID, data)
          this.AppPromotions.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Promotion, true)
        })
    }
  }
})
