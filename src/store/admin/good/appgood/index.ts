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
import { date } from 'quasar'

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
        const good = this.getGoodByID(goodID)
        return !good ? false : good.Online
      }
    },
    visible() {
      return (goodID: string) => {
        const good = this.AppGoods.AppGoods.find((el) => el.GoodID === goodID)
        return !good ? false : good.Visible
      }
    },
    canBuy() {
      return (goodID: string, coinTypeID: string) => {
        const good = this.getGoodByID(goodID)
        return good?.CoinTypeID === coinTypeID && good.Visible && good.Online
      }
    },
    goodPrice() {
      return (good: AppGood) => {
        return !good ? '' : Number(good?.Price).toFixed(4)
      }
    },
    getPriceByID() {
      return (goodID: string) => {
        const g = this.getGoodByID(goodID)
        return Number(g?.Price)?.toFixed(4)
      }
    },
    getPrice() {
      return (goodID: string) => {
        const good = this.getGoodByID(goodID)
        return parseFloat(good?.Price as string)
      }
    },
    classic() {
      return (good: AppGood) => {
        return good.GoodType === GoodType.GoodTypeClassicMining
      }
    },
    goodEffectiveDate() {
      return (g: AppGood) => {
        if(!g) {
          return ''
        }
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
    },
    getStartTime() {
      return (goodID: string) => {
        const good = this.getGoodByID(goodID)
        return date.formatDate(good?.StartAt as number * 1000, 'YYYY/MM/DD')
      }
    },
    getFormatTime() {
      return (timestamp: number) => date.formatDate(timestamp * 1000, 'YYYY/MM/DD')
    },
    getPurchaseLimit() {
      return (good : AppGood) => {
        const min = Math.min(good?.PurchaseLimit, Number(good?.Total) - Number(good?.InService) - Number(good?.Locked)- Number(good?.WaitStart))
        return Math.floor(min)
      }
    },
    haveSale () {
      return (good: AppGood) => {
        if (!good) {
          return false
        }
        const now = Math.floor(Date.now() / 1000)
        if (good?.SaleEndAt === 0 || good?.SaleStartAt ===0 || now > good?.SaleEndAt) {
          return false
        }
        return true
      }
    },
    getGoodBtnMsg() {
      return (good: AppGood) => {
        if (!good) {
          return 'MSG_SOLD_OUT'
        }
        const now = Math.floor(Date.now() / 1000)
        if (now < good?.SaleStartAt) {
          return 'MSG_NOT_YET_AVAILABLE'
        }
        if (now > good?.SaleEndAt || this.getPurchaseLimit(good) <= 0) {
          return 'MSG_SOLD_OUT'
        }
        return 'MSG_PURCHASE'
      }
    },
    getSaleEndDate () {
      return (good: AppGood) => {
        if (!good.SaleEndAt) {
          return '*'
        }
        /* format to jst time */ 
        return good.SaleEndAt === 0 ? '*' : date.formatDate((good?.SaleEndAt + 60 * new Date().getTimezoneOffset() + 9 * 60 * 60) * 1000, 'YYYY-MM-DD')
      }
    },
    getSaleEndTime () {
      return (good: AppGood) => {
        if (!good.SaleEndAt) {
          return '*'
        }
        /* format to jst time */ 
        return  good.SaleEndAt === 0 ? '*' : date.formatDate((good?.SaleEndAt + 60 * new Date().getTimezoneOffset() + 9 * 60 * 60) * 1000, 'HH:mm')
      }
    },
    settleType () {
      return (goodID: string) => {
        const good = this.getGoodByID(goodID)
        return good?.CommissionSettleType
      }
    },
    enableSetCommission() {
      return (goodID: string) => {
        const good = this.AppGoods.AppGoods.find((el) => el.GoodID === goodID)
        return !good ? false : good.EnableSetCommission
      }
    },
  },
  actions: {
    getAppGoods (req: GetAppGoodsRequest, done: (rows: Array<AppGood>, error: boolean) => void) {
      doActionWithError<GetAppGoodsRequest, GetAppGoodsResponse>(
        API.GET_APPGOODS,
        req,
        req.Message,
        (resp: GetAppGoodsResponse): void => {
          resp.Infos.forEach((el) => {
            if (!this.getGoodByID(el.GoodID)) {
              this.AppGoods.AppGoods.push(el)
            }
          })
          this.AppGoods.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppGood (req: UpdateAppGoodRequest, done: (row: AppGood, error: boolean) => void) {
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
    getAppGood (req: GetAppGoodRequest, done: (row: AppGood, error: boolean) => void) {
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
    getOne (req: GetAppGoodRequest, done: (error: boolean, row: AppGood) => void) {
      doActionWithError<GetAppGoodRequest, GetAppGoodResponse>(
        API.GET_APPGOOD,
        req,
        req.Message,
        (resp: GetAppGoodResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppGood)
        })
    },
  }
})
