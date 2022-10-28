import { defineStore } from 'pinia'
import { AppGood, GoodType } from '../../../base'
import { doActionWithError } from '../../../action'
import { useI18n } from 'vue-i18n'
import { API } from './const'
import {
  GetAppGoodRequest,
  GetAppGoodResponse,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  UpdateAppGoodRequest,
  UpdateAppGoodResponse
} from './types'

export const useAdminAppGoodStore = defineStore('admin-appgood-v4', {
  state: () => ({
    AppGoods: {
      AppGoods: [] as Array<AppGood>,
      Total: 0
    }
  }),
  getters: {
    getGoodByID () {
      return (goodID: string) => this.AppGoods.AppGoods.find((el) => el.GoodID === goodID)
    },
    online() {
      return (goodID: string) => {
        const g = this.AppGoods.AppGoods.find((el) => el.GoodID === goodID)
        return !g ? false : g.Online
      }
    },
    visible() {
      return (goodID: string) => {
        const g = this.AppGoods.AppGoods.find((el) => el.GoodID === goodID)
        return !g ? false : g.Visible
      }
    },
    canBuy() {
      return (goodID: string, coinTypeID: string) => {
        const g = this.getGoodByID(goodID)
        return g?.CoinTypeID === coinTypeID && g.Visible && g.Online
      }
    },
    total() {
      return (goodID: string) => {
        const g = this.getGoodByID(goodID) as AppGood
        return Math.min(g?.GoodTotal, g?.PurchaseLimit) 
      }
    },
    goodPrice() {
      return (g: AppGood) => {
        return !g ? '' : Number(g?.Price).toFixed(4)
      }
    },
    getPriceByID() {
      return (goodID: string) => {
        const g = this.getGoodByID(goodID)
        return Number(g?.Price)?.toFixed(4)
      }
    },
    classic() {
      return (g: AppGood) => {
        return g.GoodType === GoodType.GoodTypeClassicMining
      }
    },
    goodEffectiveDate() {
      return (g: AppGood) => {
        // eslint-disable-next-line @typescript-eslint/unbound-method
        const { t, locale } = useI18n({ useScope: 'global' })
        if (g.CoinPreSale) {
          return t('MSG_TBA')
        }
        const now = new Date().getTime() / 1000
        if (now < g.StartAt) {
          return new Date(g.StartAt * 1000).toLocaleDateString(locale.value)
        }
        return t('MSG_EFFECTIVE_NEXT_DAY')
      }
    }
  },
  actions: {
    getAppGoods (req: GetAppGoodsRequest, done: (appGoods: Array<AppGood>, error: boolean) => void) {
      doActionWithError<GetAppGoodsRequest, GetAppGoodsResponse>(
        API.GET_APPGOODS,
        req,
        req.Message,
        (resp: GetAppGoodsResponse): void => {
          this.AppGoods.AppGoods.push(...resp.Infos)
          this.AppGoods.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppGood (req: UpdateAppGoodRequest, done: (appGood: AppGood, error: boolean) => void) {
      doActionWithError<UpdateAppGoodRequest, UpdateAppGoodResponse>(
        API.UPDATE_APPGOOD,
        req,
        req.Message,
        (resp: UpdateAppGoodResponse): void => {
          const index = this.AppGoods.AppGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppGoods.AppGoods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as AppGood, true)
        })
    },
    getAppGood (req: GetAppGoodRequest, done: (appGood: AppGood, error: boolean) => void) {
      doActionWithError<GetAppGoodRequest, GetAppGoodResponse>(
        API.GET_APPGOOD,
        req,
        req.Message,
        (resp: GetAppGoodResponse): void => {
          const index = this.AppGoods.AppGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppGoods.AppGoods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as AppGood, true)
        })
    },
  }
})
