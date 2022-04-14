import { defineStore } from 'pinia'
import { GetAppGoodsResponse } from '.'
import { GetRecommendsRequest } from '.'
import { GetPromotionsRequest } from '.'
import { GetPromotionsResponse } from '.'
import { GetRecommendsResponse } from '.'
import { GetAppGoodsRequest } from '.'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CreatePromotionRequest, CreatePromotionResponse, CreateRecommendRequest, CreateRecommendResponse, GoodState, OfflineGoodRequest, OfflineGoodResponse, OnlineGoodRequest, OnlineGoodResponse, SetGoodPriceRequest, SetGoodPriceResponse, UpdatePromotionRequest, UpdatePromotionResponse, UpdateRecommendRequest, UpdateRecommendResponse } from './types'

export const useAdminGoodStore = defineStore('admingood', {
  state: (): GoodState => ({
    AppGoods: [],
    Recommends: [],
    Promotions: []
  }),
  getters: {},
  actions: {
    getAppGoods (req: GetAppGoodsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppGoodsRequest, GetAppGoodsResponse>(
        API.GET_APP_GOODS,
        req,
        req.Message,
        (resp: GetAppGoodsResponse): void => {
          this.AppGoods = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
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
    getRecommends (req: GetRecommendsRequest, done: (error: boolean) => void) {
      doActionWithError<GetRecommendsRequest, GetRecommendsResponse>(
        API.GET_RECOMMENDS,
        req,
        req.Message,
        (resp: GetRecommendsResponse): void => {
          this.Recommends = resp.Infos
          done(false)
        }, () => {
          done(true)
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
    getPromotions (req: GetPromotionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetPromotionsRequest, GetPromotionsResponse>(
        API.GET_PROMOTIONS,
        req,
        req.Message,
        (resp: GetPromotionsResponse): void => {
          this.Promotions = resp.Infos
          done(false)
        }, () => {
          done(true)
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
