import { defineStore } from 'pinia'
import { API } from './const'
import { 
  CreateAppCoinDescriptionRequest,
  CreateAppCoinDescriptionResponse,
  GetAppCoinDescriptionsRequest, GetAppCoinDescriptionsResponse, UpdateAppCoinDescriptionRequest, UpdateAppCoinDescriptionResponse, 
} from './types'
import { CoinDescription } from '../../../base'
import { doActionWithError } from '../../../action'

export const useChurchAppCoinDescriptionStore = defineStore('church-appcoindescription-v4', {
  state: () => ({
    CoinDescriptions: {
      CoinDescriptions: new Map<string, Array<CoinDescription>>(),
      Total: 0
    }
  }),
  getters: {
    getCoinsByAppID () {
      return (appID: string) => {
        const data = this.CoinDescriptions.CoinDescriptions.get(appID)
        return !data ? [] as Array<CoinDescription> : data
      }
    },
    getCoinByID () {
      return (appID: string, coinTypeID: string) => {
        const data = this.CoinDescriptions.CoinDescriptions.get(appID)
        return data?.find((el) => el.CoinTypeID === coinTypeID)
      }
    }
  },
  actions: {
    getAppCoinDescriptions (req: GetAppCoinDescriptionsRequest, done: (error: boolean, descriptions: Array<CoinDescription>) => void) {
      doActionWithError<GetAppCoinDescriptionsRequest, GetAppCoinDescriptionsResponse>(
        API.GET_APP_COINDESCRIPTIONS,
        req,
        req.Message,
        (resp: GetAppCoinDescriptionsResponse): void => {
          const data = this.getCoinsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.CoinDescriptions.CoinDescriptions.set(req.TargetAppID, data)
          this.CoinDescriptions.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    },
    updateAppCoinDescription (req: UpdateAppCoinDescriptionRequest, done: (error: boolean, description: CoinDescription) => void) {
      doActionWithError<UpdateAppCoinDescriptionRequest, UpdateAppCoinDescriptionResponse>(
        API.UPDATE_APP_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: UpdateAppCoinDescriptionResponse): void => {
          const data = this.getCoinsByAppID(req.AppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.CoinDescriptions.CoinDescriptions.set(req.AppID, data)
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinDescription)
        })
    },
    createAppCoinDescription (req: CreateAppCoinDescriptionRequest, done: (error: boolean, description: CoinDescription) => void) {
      doActionWithError<CreateAppCoinDescriptionRequest, CreateAppCoinDescriptionResponse>(
        API.CREATE_APP_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: CreateAppCoinDescriptionResponse): void => {
          const data = this.getCoinsByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.CoinDescriptions.CoinDescriptions.set(req.TargetAppID, data)
          this.CoinDescriptions.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinDescription)
        })
    }
  }
})
