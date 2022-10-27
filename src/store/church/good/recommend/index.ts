import { defineStore } from 'pinia'
import { Recommend } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  CreateAppRecommendRequest,
  CreateAppRecommendResponse,
  GetAppRecommendsRequest,
  GetAppRecommendsResponse,
  UpdateAppRecommendRequest,
  UpdateAppRecommendResponse
} from './types'

export const useChurchRecommendStore = defineStore('church-recommend-v4', {
  state: () => ({
    AppRecommends: {
      AppRecommends: new Map<string, Array<Recommend>>(),
      Total: 0
    }
  }),
  getters: {
    getRecommendsByAppID () {
      return (appID: string) => {
        const data = this.AppRecommends.AppRecommends.get(appID)
        return !data ? [] as Array<Recommend> : data
      }
    }
  },
  actions: {
    getAppRecommends (req: GetAppRecommendsRequest, done: (appRecommends: Array<Recommend>, error: boolean) => void) {
      doActionWithError<GetAppRecommendsRequest, GetAppRecommendsResponse>(
        API.GET_APP_RECOMMENDS,
        req,
        req.Message,
        (resp: GetAppRecommendsResponse): void => {
          const data = this.getRecommendsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.AppRecommends.AppRecommends.set(req.TargetAppID, data)
          this.AppRecommends.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppRecommend (req: UpdateAppRecommendRequest, done: (appRecommend: Recommend, error: boolean) => void) {
      doActionWithError<UpdateAppRecommendRequest, UpdateAppRecommendResponse>(
        API.UPDATE_APP_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: UpdateAppRecommendResponse): void => {
          const data = this.getRecommendsByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.AppRecommends.AppRecommends.set(req.TargetAppID, data)
          done(resp.Info, false)
        }, () => {
          done({} as Recommend, true)
        })
    },
    createAppRecommend (req: CreateAppRecommendRequest, done: (appRecommend: Recommend, error: boolean) => void) {
      doActionWithError<CreateAppRecommendRequest, CreateAppRecommendResponse>(
        API.CREATE_APP_RECOMMEND,
        req,
        req.NotifyMessage,
        (resp: CreateAppRecommendResponse): void => {
          const data = this.getRecommendsByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.AppRecommends.AppRecommends.set(req.TargetAppID, data)
          this.AppRecommends.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Recommend, true)
        })
    }
  }
})
