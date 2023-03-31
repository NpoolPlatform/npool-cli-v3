import { defineStore } from 'pinia'
import { AppDefaultGood } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetAppDefaultGoodsRequest,
  GetAppDefaultGoodsResponse,
  CreateAppDefaultGoodRequest,
  CreateAppDefaultGoodResponse,
  DeleteAppDefaultGoodRequest,
  DeleteAppDefaultGoodResponse,
  UpdateAppDefaultGoodRequest,
  UpdateAppDefaultGoodResponse,
} from './types'
import { InvalidID } from 'src/const/const'

export const useAdminAppDefaultGoodStore = defineStore('admin-appdefaultgood-v4', {
  state: () => ({
    AppDefaultGoods: {
      AppDefaultGoods: [] as Array<AppDefaultGood>,
      Total: 0
    }
  }),
  getters: {
    getAppDefaultGoodByID () {
      return (id: string) => this.AppDefaultGoods.AppDefaultGoods.find((el) => el.ID === id)
    },
    getGoodIDByCoinUnit () {
      return (unit: string) => {
        const row = this.AppDefaultGoods.AppDefaultGoods.find((el) => el.CoinUnit === unit)
        return !row ? InvalidID : row.GoodID
      }
    }
  },
  actions: {
    getAppDefaultGoods (req: GetAppDefaultGoodsRequest, done: (rows: Array<AppDefaultGood>, error: boolean) => void) {
      doActionWithError<GetAppDefaultGoodsRequest, GetAppDefaultGoodsResponse>(
        API.GET_APP_DEFAULT_GOODS,
        req,
        req.Message,
        (resp: GetAppDefaultGoodsResponse): void => {
          this.AppDefaultGoods.AppDefaultGoods.push(...resp.Infos)
          this.AppDefaultGoods.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        }
      )
    },
    createAppDefaultGood (req: CreateAppDefaultGoodRequest, done: (row: AppDefaultGood, error: boolean) => void) {
      doActionWithError<CreateAppDefaultGoodRequest, CreateAppDefaultGoodResponse>(
        API.CREATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: CreateAppDefaultGoodResponse): void => {
          const index = this.AppDefaultGoods.AppDefaultGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppDefaultGoods.AppDefaultGoods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as AppDefaultGood, true)
        }
      )
    },
    deleteAppDefaultGood (req: DeleteAppDefaultGoodRequest, done: (row: AppDefaultGood, error: boolean) => void) {
      doActionWithError<DeleteAppDefaultGoodRequest, DeleteAppDefaultGoodResponse>(
        API.DELETE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: DeleteAppDefaultGoodResponse): void => {
          const index = this.AppDefaultGoods.AppDefaultGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppDefaultGoods.AppDefaultGoods.splice(index, 1)
          done(resp.Info, false)
        }, () => {
          done({} as AppDefaultGood, true)
        }
      )
    },
    updateAppDefaultGood (req: UpdateAppDefaultGoodRequest, done: (row: AppDefaultGood, error: boolean) => void) {
      doActionWithError<UpdateAppDefaultGoodRequest, UpdateAppDefaultGoodResponse>(
        API.UPDATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: UpdateAppDefaultGoodResponse): void => {
          const index = this.AppDefaultGoods.AppDefaultGoods.findIndex((el) => el.ID === resp.Info.ID)
          this.AppDefaultGoods.AppDefaultGoods.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as AppDefaultGood, true)
        }
      )
    }
  }
})
