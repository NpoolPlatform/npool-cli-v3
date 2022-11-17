import { defineStore } from 'pinia'
import { API } from './const'
import { 
  CreateAppCoinRequest, 
  CreateAppCoinResponse, 
  DeleteAppCoinRequest, 
  DeleteAppCoinResponse, 
  GetAppCoinsRequest, 
  GetAppCoinsResponse, 
  UpdateAppCoinRequest, 
  UpdateAppCoinResponse 
} from './types'
import { AppCoin } from '../../../base'
import { doActionWithError } from '../../../action'

export const useChurchAppCoinStore = defineStore('church-appcoin-v4', {
  state: () => ({
    AppCoins: {
      AppCoins: new Map<string, Array<AppCoin>>(),
      Total: 0
    }
  }),
  getters: {
    getCoinsByAppID () {
      return (appID: string) => {
        const data = this.AppCoins.AppCoins.get(appID)
        return !data ? [] as Array<AppCoin> : data
      }
    },
    getCoinByID () {
      return (appID: string, coinTypeID: string) => {
        const data = this.AppCoins.AppCoins.get(appID)
        return data?.find((el) => el.CoinTypeID === coinTypeID)
      }
    }
  },
  actions: {
    getAppCoins (req: GetAppCoinsRequest, done: (error: boolean, appCoins: Array<AppCoin>) => void) {
      doActionWithError<GetAppCoinsRequest, GetAppCoinsResponse>(
        API.GET_APPCOINS,
        req,
        req.Message,
        (resp: GetAppCoinsResponse): void => {
          const data = this.getCoinsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.AppCoins.AppCoins.set(req.TargetAppID, data)
          this.AppCoins.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    },
    updateAppCoin (req: UpdateAppCoinRequest, done: (error: boolean, appCoin: AppCoin) => void) {
      doActionWithError<UpdateAppCoinRequest, UpdateAppCoinResponse>(
        API.UPDATE_APPCOIN,
        req,
        req.Message,
        (resp: UpdateAppCoinResponse): void => {
          const data = this.getCoinsByAppID(req.AppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.AppCoins.AppCoins.set(req.AppID, data)
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCoin)
        })
    },
    createAppCoin (req: CreateAppCoinRequest, done: (error: boolean, appCoin: AppCoin) => void) {
      doActionWithError<CreateAppCoinRequest, CreateAppCoinResponse>(
        API.CREATE_APPCOIN,
        req,
        req.Message,
        (resp: CreateAppCoinResponse): void => {
          const data = this.getCoinsByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.AppCoins.AppCoins.set(req.TargetAppID, data)
          this.AppCoins.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCoin)
        })
    },
    deleteAppCoin (req: DeleteAppCoinRequest, done: (error: boolean, appCoin: AppCoin) => void) {
      doActionWithError<DeleteAppCoinRequest, DeleteAppCoinResponse>(
        API.DELETE_APPCOIN,
        req,
        req.Message,
        (resp: DeleteAppCoinResponse): void => {
          const data = this.getCoinsByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.AppCoins.AppCoins.set(req.TargetAppID, data)
          this.AppCoins.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCoin)
        })
    }
  }
})
