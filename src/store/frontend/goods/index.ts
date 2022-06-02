import { defineStore } from 'pinia'
import { useI18n } from 'vue-i18n'
import { doAction, doActionWithError } from '../../action'
import { API, FeePayType } from './const'
import {
  Fee,
  FeeType,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  GetFeeTypesRequest,
  GetFeeTypesResponse,
  GetGoodRequest,
  GetGoodResponse,
  GetGoodsRequest,
  GetGoodsResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  GetRecommendGoodsRequest,
  GetRecommendGoodsResponse,
  Good,
  GoodState,
  RecommendGood
} from './types'

export const useGoodStore = defineStore('good', {
  state: (): GoodState => ({
    Goods: [],
    Recommends: [],
    Promotions: [],
    FeeTypes: [],
    AppGoods: []
  }),
  getters: {
    getGoodPrice (): (good: Good) => number {
      return (good: Good): number => {
        for (const promotion of this.Promotions) {
          if (promotion.GoodID === good.Good.Good.ID) {
            if (new Date().getTime() / 1000 < promotion.End && new Date().getTime() / 1000 > promotion.Start) {
              return promotion.Price
            }
          }
        }
        for (const appGood of this.AppGoods) {
          if (appGood.GoodID === good.Good.Good.ID) {
            return appGood.Price
          }
        }
        return good.Good?.Good.Price
      }
    },
    getRecommendGoods (): Array<Good> {
      const goods = [] as Array<Good>
      this.Recommends.forEach((good: RecommendGood) => {
        const index = this.AppGoods.findIndex((el) => el.GoodID === good.Good.Good.Good.ID && el.Online && el.Visible)
        if (index < 0) {
          return
        }
        goods.push(good.Good)
      })
      this.Goods.forEach((good: Good) => {
        const index = this.AppGoods.findIndex((el) => el.GoodID === good.Good.Good.ID && el.Online && el.Visible)
        if (index < 0) {
          return
        }
        for (const myGood of goods) {
          if (myGood.Good.Good.ID === good.Good.Good.ID) {
            return
          }
        }
        goods.push(good)
      })
      return goods
    },
    getFeeTypeByID (): (id: string) => FeeType {
      return (id: string): FeeType => {
        for (const feeType of this.FeeTypes) {
          if (feeType.ID === id) {
            return feeType
          }
        }
        return undefined as unknown as FeeType
      }
    },
    getFeeValue (): (fee: Fee) => string {
      return (fee: Fee): string => {
        const feeType = this.getFeeTypeByID(fee.FeeTypeID)
        if (!feeType) {
          return ''
        }
        switch (feeType.PayType) {
          case FeePayType.Amount:
            return fee.Value.toString()
          case FeePayType.Percent:
            return fee.Value.toString() + '%'
        }
        return ''
      }
    },
    getGoodEffectiveDate (): (good: Good) => string {
      return (good: Good): string => {
        const now = new Date().getTime() / 1000
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { t, locale } = useI18n({ useScope: 'global' })
        if (now < good.Good.Good.StartAt) {
          return new Date(good.Good.Good.StartAt * 1000).toLocaleDateString(locale.value)
        }
        return t('MSG_EFFECTIVE_NEXT_DAY')
      }
    },
    expandGoods (): (goods: Array<Good>, count: number) => Array<Good> {
      return (goods: Array<Good>, count: number) => {
        if (goods.length >= count || goods.length === 0) {
          return goods
        }
        for (let i = goods.length; i < count; i++) {
          goods.push(goods[i - goods.length])
        }
        return goods
      }
    },
    getGoodByID (): (id: string) => Good {
      return (id: string): Good => {
        for (const good of this.Goods) {
          if (id === good.Good.Good.ID) {
            return good
          }
        }
        return undefined as unknown as Good
      }
    },
    getGoodType (): (good: Good) => string {
      return (good: Good): string => {
        return good.Good.Good.Classic ? 'MSG_CLASSIC_MINING' : 'MSG_UNION_MINING'
      }
    }
  },
  actions: {
    getGoods (req: GetGoodsRequest, done: () => void) {
      doAction<GetGoodsRequest, GetGoodsResponse>(
        API.GET_GOODS,
        req,
        req.Message,
        (resp: GetGoodsResponse): void => {
          resp.Infos.forEach((info) => {
            for (const good of this.Goods) {
              if (good.Good.Good.ID === info.Good.Good.ID) {
                return
              }
            }
            this.Goods.push(info)
          })
          done()
        })
    },
    getRecommends (req: GetRecommendGoodsRequest) {
      doAction<GetRecommendGoodsRequest, GetRecommendGoodsResponse>(
        API.GET_RECOMMENDS,
        req,
        req.Message,
        (resp: GetRecommendGoodsResponse): void => {
          this.Recommends = resp.Infos
        })
    },
    getPromotions (req: GetPromotionsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetPromotionsRequest, GetPromotionsResponse>(
        API.GET_PROMOTIONS,
        req,
        req.Message,
        (resp: GetPromotionsResponse): void => {
          this.Promotions = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getFeeTypes (req: GetFeeTypesRequest, done?: (error: boolean) => void) {
      doActionWithError<GetFeeTypesRequest, GetFeeTypesResponse>(
        API.GET_FEE_TYPES,
        req,
        req.Message,
        (resp: GetFeeTypesResponse): void => {
          this.FeeTypes = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getGood (req: GetGoodRequest, done: (good: Good) => void) {
      doAction<GetGoodRequest, GetGoodResponse>(
        API.GET_GOOD,
        req,
        req.Message,
        (resp: GetGoodResponse): void => {
          for (const good of this.Goods) {
            if (good.Good.Good.ID === resp.Info.Good.Good.ID) {
              return
            }
          }
          this.Goods.push(resp.Info)
          done(resp.Info)
        })
    },
    getAppGoods (req: GetAppGoodsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetAppGoodsRequest, GetAppGoodsResponse>(
        API.GET_APP_GOODS,
        req,
        req.Message,
        (resp: GetAppGoodsResponse): void => {
          this.AppGoods = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './types'
export { InitAreaStrategies, InitAreaStrategy } from './const'
