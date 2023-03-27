import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateAppDefaultGoodRequest,
  CreateAppDefaultGoodResponse,
  GetAppDefaultGoodsRequest,
  GetAppDefaultGoodsResponse,
  DeleteAppDefaultGoodRequest,
  DeleteAppDefaultGoodResponse,
  UpdateAppDefaultGoodRequest,
  UpdateAppDefaultGoodResponse
} from './types'
import { AppDefaultGood } from '../../../base'
import { doActionWithError } from '../../../action'

export const useChurchAppDefaultGoodStore = defineStore('church-appdefaultgood-v4', {
  state: () => ({
    AppDefaultGoods: {
      AppDefaultGoods: new Map<string, Array<AppDefaultGood>>(),
      Total: 0
    }
  }),
  getters: {
    getGoodsByAppID () {
      return (appID: string) => {
        const rows = this.AppDefaultGoods.AppDefaultGoods.get(appID)
        return !rows ? [] as Array<AppDefaultGood> : rows
      }
    }
  },
  actions: {
    getAppDefaultGoods (req: GetAppDefaultGoodsRequest, done: (error: boolean, rows: Array<AppDefaultGood>) => void) {
      doActionWithError<GetAppDefaultGoodsRequest, GetAppDefaultGoodsResponse>(
        API.GET_APP_DEFAULT_GOODS,
        req,
        req.Message,
        (resp: GetAppDefaultGoodsResponse): void => {
          const rows = this.getGoodsByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.AppDefaultGoods.AppDefaultGoods.set(req.TargetAppID, rows)
          this.AppDefaultGoods.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppDefaultGood (req: DeleteAppDefaultGoodRequest, done: (error: boolean, row: AppDefaultGood) => void) {
      doActionWithError<DeleteAppDefaultGoodRequest, DeleteAppDefaultGoodResponse>(
        API.DELETE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: DeleteAppDefaultGoodResponse): void => {
          const rows = this.getGoodsByAppID(req.TargetAppID)
          const index = rows.findIndex((el) => el.ID === resp.Info.ID)
          rows.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.AppDefaultGoods.AppDefaultGoods.set(req.TargetAppID, rows)
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppDefaultGood)
        }
      )
    },
    createAppDefaultGood (req: CreateAppDefaultGoodRequest, done: (error: boolean, row: AppDefaultGood) => void) {
      doActionWithError<CreateAppDefaultGoodRequest, CreateAppDefaultGoodResponse>(
        API.CREATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: CreateAppDefaultGoodResponse): void => {
          const rows = this.getGoodsByAppID(req.TargetAppID)
          rows.push(resp.Info)
          this.AppDefaultGoods.AppDefaultGoods.set(req.TargetAppID, rows)
          this.AppDefaultGoods.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppDefaultGood)
        }
      )
    },
    updateAppDefaultGood (req: UpdateAppDefaultGoodRequest, done: (row: AppDefaultGood, error: boolean) => void) {
      doActionWithError<UpdateAppDefaultGoodRequest, UpdateAppDefaultGoodResponse>(
        API.UPDATE_APP_DEFAULT_GOOD,
        req,
        req.Message,
        (resp: UpdateAppDefaultGoodResponse): void => {
          const rows = this.getGoodsByAppID(req.TargetAppID)
          const index = rows.findIndex((el) => el.ID === resp.Info.ID)
          rows.splice(index, 1)
          this.AppDefaultGoods.AppDefaultGoods.set(req.TargetAppID, rows)
          done(resp.Info, false)
        }, () => {
          done({} as AppDefaultGood, true)
        }
      )
    }
  }
})
