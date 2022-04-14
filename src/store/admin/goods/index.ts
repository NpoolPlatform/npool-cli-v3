import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  CreatePromotionRequest,
  CreatePromotionResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  OfflineGoodRequest,
  OfflineGoodResponse,
  OnlineGoodRequest,
  OnlineGoodResponse,
  SetGoodPriceRequest,
  SetGoodPriceResponse,
  UpdatePromotionRequest,
  UpdatePromotionResponse,
  UpdateRecommendRequest,
  UpdateRecommendResponse
} from './types'
import { GoodState } from './state'

export const useAdminGoodStore = defineStore('admingood', {
  state: (): GoodState => ({
    AppGoods: [],
    Recommends: [],
    Promotions: []
  }),
  getters: {},
  actions: {
    setGoodPrice (req: SetGoodPriceRequest, done: () => void) {
      doAction<SetGoodPriceRequest, SetGoodPriceResponse>(
        API.SET_GOOD_PRICE,
        req,
        req.Message,
        (resp: SetGoodPriceResponse): void => {
          const index = this.AppGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppGoods.splice(index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    onlineGood (req: OnlineGoodRequest, done: () => void) {
      doAction<OnlineGoodRequest, OnlineGoodResponse>(
        API.ONSALE_GOOD,
        req,
        req.Message,
        (resp: OnlineGoodResponse): void => {
          const index = this.AppGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppGoods.splice(index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    offlineGood (req: OfflineGoodRequest, done: () => void) {
      doAction<OfflineGoodRequest, OfflineGoodResponse>(
        API.OFFSALE_GOOD,
        req,
        req.Message,
        (resp: OfflineGoodResponse): void => {
          const index = this.AppGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppGoods.splice(index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    createRecommend (req: CreateRecommendRequest, done: () => void) {
      doAction<CreateRecommendRequest, CreateRecommendResponse>(
        API.CREATE_RECOMMEND,
        req,
        req.Message,
        (resp: CreateRecommendResponse): void => {
          this.Recommends.splice(0, 0, resp.Info)
          done()
        })
    },
    updateRecommend (req: UpdateRecommendRequest, done: () => void) {
      doAction<UpdateRecommendRequest, UpdateRecommendResponse>(
        API.UPDATE_RECOMMEND,
        req,
        req.Message,
        (resp: UpdateRecommendResponse): void => {
          const index = this.Recommends.findIndex((el) => el.ID === resp.Info.ID)
          this.Recommends.splice(index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    createPromotion (req: CreatePromotionRequest, done: () => void) {
      doAction<CreatePromotionRequest, CreatePromotionResponse>(
        API.CREATE_PROMOTION,
        req,
        req.Message,
        (resp: CreatePromotionResponse): void => {
          this.Promotions.splice(0, 0, resp.Info)
          done()
        })
    },
    updatePromotion (req: UpdatePromotionRequest, done: () => void) {
      doAction<UpdatePromotionRequest, UpdatePromotionResponse>(
        API.UPDATE_PROMOTION,
        req,
        req.Message,
        (resp: UpdatePromotionResponse): void => {
          const index = this.Promotions.findIndex((el) => el.ID === resp.Info.ID)
          this.Promotions.splice(index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
