import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  AuthorizeGoodRequest,
  AuthorizeGoodResponse,
  CreateAppPromotionRequest,
  CreateAppPromotionResponse,
  CreateAppRecommendRequest,
  CreateAppRecommendResponse,
  CreateGoodRequest,
  CreateGoodResponse,
  CreatePriceCurrencyRequest,
  CreatePriceCurrencyResponse,
  GetAppPromotionsRequest,
  GetAppPromotionsResponse,
  GetAppRecommendsRequest,
  GetAppRecommendsResponse,
  GetPriceCurrenciesRequest,
  GetPriceCurrenciesResponse,
  GetTargetAppGoodsRequest,
  GetTargetAppGoodsResponse,
  OfflineAppGoodRequest,
  OfflineAppGoodResponse,
  OnlineAppGoodRequest,
  OnlineAppGoodResponse,
  SetAppGoodPriceRequest,
  SetAppGoodPriceResponse,
  UnauthorizeGoodRequest,
  UnauthorizeGoodResponse,
  UpdateGoodRequest,
  UpdateGoodResponse
} from './types'
import { GoodState } from './state'
import { AppGood, Recommend, Promotion, PriceCurrency } from '../../frontend'

export const useChurchGoodStore = defineStore('churchgood', {
  state: (): GoodState => ({
    AppGoods: new Map<string, Array<AppGood>>(),
    Recommends: new Map<string, Array<Recommend>>(),
    Promotions: new Map<string, Array<Promotion>>(),
    PriceCurrencies: []
  }),
  getters: {
    getPriceCurrencyByID (): (id: string) => PriceCurrency {
      return (id: string) => {
        const index = this.PriceCurrencies.findIndex((el) => el.ID === id)
        if (index < 0) {
          return undefined as unknown as PriceCurrency
        }
        return this.PriceCurrencies[index]
      }
    }
  },
  actions: {
    getAppGoods (req: GetTargetAppGoodsRequest, done: (error: boolean) => void) {
      doActionWithError<GetTargetAppGoodsRequest, GetTargetAppGoodsResponse>(
        API.GET_APP_GOODS,
        req,
        req.Message,
        (resp: GetTargetAppGoodsResponse): void => {
          this.AppGoods.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    authorizeGood (req: AuthorizeGoodRequest, done: () => void) {
      doAction<AuthorizeGoodRequest, AuthorizeGoodResponse>(
        API.AUTHORIZE_GOOD,
        req,
        req.Message,
        (resp: AuthorizeGoodResponse): void => {
          let goods = this.AppGoods.get(req.TargetAppID)
          if (!goods) {
            goods = []
          }
          goods.push(resp.Info)
          this.AppGoods.set(req.TargetAppID, goods)
          done()
        })
    },
    unauthorizeGood (req: UnauthorizeGoodRequest, done: () => void) {
      doAction<UnauthorizeGoodRequest, UnauthorizeGoodResponse>(
        API.UNAUTHORIZE_GOOD,
        req,
        req.Message,
        (): void => {
          for (const [k, v] of this.AppGoods) {
            const index = v.findIndex((el) => el.ID === req.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1)
            this.AppGoods.set(k, v)
            break
          }
          done()
        })
    },
    setGoodPrice (req: SetAppGoodPriceRequest, done: () => void) {
      doAction<SetAppGoodPriceRequest, SetAppGoodPriceResponse>(
        API.SET_GOOD_PRICE,
        req,
        req.Message,
        (resp: SetAppGoodPriceResponse): void => {
          let goods = this.AppGoods.get(req.TargetAppID)
          if (!goods) {
            goods = []
          }
          const index = goods.findIndex((el) => el.ID === resp.Info.ID)
          goods.splice(index, index < 0 ? 0 : 1, resp.Info)
          this.AppGoods.set(req.TargetAppID, goods)
          done()
        })
    },
    onlineGood (req: OnlineAppGoodRequest, done: () => void) {
      doAction<OnlineAppGoodRequest, OnlineAppGoodResponse>(
        API.ONSALE_GOOD,
        req,
        req.Message,
        (resp: OnlineAppGoodResponse): void => {
          let goods = this.AppGoods.get(req.TargetAppID)
          if (!goods) {
            goods = []
          }
          const index = goods.findIndex((el) => el.ID === resp.Info.ID)
          goods.splice(index, index < 0 ? 0 : 1, resp.Info)
          this.AppGoods.set(req.TargetAppID, goods)
          done()
        })
    },
    offlineGood (req: OfflineAppGoodRequest, done: () => void) {
      doAction<OfflineAppGoodRequest, OfflineAppGoodResponse>(
        API.OFFSALE_GOOD,
        req,
        req.Message,
        (resp: OfflineAppGoodResponse): void => {
          let goods = this.AppGoods.get(req.TargetAppID)
          if (!goods) {
            goods = []
          }
          const index = goods.findIndex((el) => el.ID === resp.Info.ID)
          goods.splice(index, index < 0 ? 0 : 1, resp.Info)
          this.AppGoods.set(req.TargetAppID, goods)
          done()
        })
    },
    getRecommends (req: GetAppRecommendsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppRecommendsRequest, GetAppRecommendsResponse>(
        API.GET_RECOMMENDS,
        req,
        req.Message,
        (resp: GetAppRecommendsResponse): void => {
          this.Recommends.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createRecommend (req: CreateAppRecommendRequest, done: () => void) {
      doAction<CreateAppRecommendRequest, CreateAppRecommendResponse>(
        API.CREATE_RECOMMEND,
        req,
        req.Message,
        (resp: CreateAppRecommendResponse): void => {
          let recommends = this.Recommends.get(req.TargetAppID)
          if (!recommends) {
            recommends = []
          }
          recommends.push(resp.Info)
          this.Recommends.set(req.TargetAppID, recommends)
          done()
        })
    },
    getPromotions (req: GetAppPromotionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppPromotionsRequest, GetAppPromotionsResponse>(
        API.GET_PROMOTIONS,
        req,
        req.Message,
        (resp: GetAppPromotionsResponse): void => {
          this.Promotions.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createPromotion (req: CreateAppPromotionRequest, done: () => void) {
      doAction<CreateAppPromotionRequest, CreateAppPromotionResponse>(
        API.CREATE_PROMOTION,
        req,
        req.Message,
        (resp: CreateAppPromotionResponse): void => {
          let promotions = this.Promotions.get(req.TargetAppID)
          if (!promotions) {
            promotions = []
          }
          promotions.push(resp.Info)
          this.Promotions.set(req.TargetAppID, promotions)
          done()
        })
    },
    createGood (req: CreateGoodRequest, done: () => void) {
      doAction<CreateGoodRequest, CreateGoodResponse>(
        API.CREATE_GOOD,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    updateGood (req: UpdateGoodRequest, done: () => void) {
      doAction<UpdateGoodRequest, UpdateGoodResponse>(
        API.UPDATE_GOOD,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    getPriceCurrencies (req: GetPriceCurrenciesRequest, done: (error: boolean) => void) {
      doActionWithError<GetPriceCurrenciesRequest, GetPriceCurrenciesResponse>(
        API.GET_PRICE_CURRENCIES,
        req,
        req.Message,
        (resp: GetPriceCurrenciesResponse): void => {
          this.PriceCurrencies = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createPriceCurrency (req: CreatePriceCurrencyRequest, done: () => void) {
      doAction<CreatePriceCurrencyRequest, CreatePriceCurrencyResponse>(
        API.CREATE_PRICE_CURRENCY,
        req,
        req.Message,
        (resp: CreatePriceCurrencyResponse): void => {
          this.PriceCurrencies.push(resp.Info)
          done()
        })
    }
  }
})

export * from './types'
export { BenefitTypes, BenefitType } from './const'
