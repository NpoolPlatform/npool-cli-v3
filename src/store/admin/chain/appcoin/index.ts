import { defineStore } from 'pinia'
import { API } from './const'
import { 
  GetAppCoinsRequest, 
  GetAppCoinsResponse, 
  UpdateAppCoinRequest, 
  UpdateAppCoinResponse 
} from './types'
import { AppCoin } from '../../../base'
import { doActionWithError } from '../../../action'

export const useAdminAppCoinStore = defineStore('admin-appcoin-v4', {
  state: () => ({
    AppCoins: {
      AppCoins: [] as Array<AppCoin>,
      Total: 0
    }
  }),
  getters: {
    getCoinByID () {
      return (coinTypeID: string) => {
        return this.AppCoins.AppCoins.find((el) => el.CoinTypeID === coinTypeID)
      }
    },
    getProductPage () {
      return (coinTypeID: string) => {
        return this.getCoinByID(coinTypeID)?.ProductPage
      }
    },
    preSale() {
      return (coinTypeID: string) => {
        const coin = this.getCoinByID(coinTypeID)
        return !coin? true : coin.Presale
      }
    },
    forPay() {
      return (coinTypeID: string) => {
        const coin = this.getCoinByID(coinTypeID)
        return !coin? false : coin.ForPay || coin.CoinForPay
      }
    },
    getCurrentFee() {
      return (coinTypeID: string) => this.getCoinByID(coinTypeID)?.WithdrawFeeAmount
    },
    getAvailableCoins () {
      return () => this.AppCoins.AppCoins.filter((el) => !el.Disabled && !el.CoinDisabled && el.ForPay && el.CoinForPay && !el.Presale)
    },
    haveCurrency() {
      return (coinTypeID: string) => this.getCurrency(coinTypeID) === 0 || this.getCurrency(coinTypeID)?.toString()?.length === 0 ? false : true
    },
    getCurrency() {
      return (coinTypeID: string) => {
        const data = this.getCoinByID(coinTypeID)
        return Number(data?.SettleValue)
      }
    },
    stableCoin() {
      return (coinTypeID: string) => this.getCoinByID(coinTypeID)?.StableUSD
    },
    disabled() {
      return (coinTypeID: string) => {
        const coin = this.getCoinByID(coinTypeID)
        return !coin? true : coin.Disabled || coin.CoinDisabled
      }
    },
    displayed() {
      return (coinTypeID: string) => {
        const coin = this.getCoinByID(coinTypeID)
        return !coin? false : coin.Display
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
          this.AppCoins.AppCoins.push(...resp.Infos)
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
          const index = this.AppCoins.AppCoins.findIndex((el) => el.ID === resp.Info.ID)
          this.AppCoins.AppCoins.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCoin)
        })
    },
  }
})
