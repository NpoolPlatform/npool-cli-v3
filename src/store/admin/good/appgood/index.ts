import { defineStore } from 'pinia'
import { AppGood } from '../../../base'
import { doActionWithError } from '../../../action'
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
