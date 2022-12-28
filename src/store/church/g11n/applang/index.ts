import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppLangsRequest,
  GetAppLangsResponse,
  CreateAppLangRequest,
  CreateAppLangResponse,
  DeleteAppLangRequest,
  DeleteAppLangResponse
} from './types'
import { doActionWithError } from '../../../action'
import { AppLang } from '../../../base'

export const useChurchAppLangStore = defineStore('church-applang-v4', {
  state: () => ({
    AppLangs: {
      AppLangs: new Map<string, Array<AppLang>>(),
      Total: 0
    }
  }),
  getters: {
    getAppLangsByAppID () {
      return (appID: string) => {
        const data = this.AppLangs.AppLangs.get(appID)
        return !data ? [] as Array<AppLang> : data
      }
    }
  },
  actions: {
    getAppLangs (req: GetAppLangsRequest, done: (error: boolean, rows: Array<AppLang>) => void) {
      doActionWithError<GetAppLangsRequest, GetAppLangsResponse>(
        API.GET_APPLANGS,
        req,
        req.Message,
        (resp: GetAppLangsResponse): void => {
          const data = this.getAppLangsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.AppLangs.AppLangs.set(req.TargetAppID, data)
          this.AppLangs.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppLang (req: DeleteAppLangRequest, done: (error: boolean, row: AppLang) => void) {
      doActionWithError<DeleteAppLangRequest, DeleteAppLangResponse>(
        API.DELETE_APPLANG,
        req,
        req.Message,
        (resp: DeleteAppLangResponse): void => {
          const data = this.getAppLangsByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index, 1)
          this.AppLangs.AppLangs.set(req.TargetAppID, data)
          this.AppLangs.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppLang)
        }
      )
    },
    createAppLang (req: CreateAppLangRequest, done: (error: boolean, row: AppLang) => void) {
      doActionWithError<CreateAppLangRequest, CreateAppLangResponse>(
        API.CREATE_APPLANG,
        req,
        req.Message,
        (resp: CreateAppLangResponse): void => {
          const data = this.getAppLangsByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.AppLangs.AppLangs.set(req.TargetAppID, data)
          this.AppLangs.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppLang)
        }
      )
    }
  }
})
