import { defineStore } from 'pinia'
import { API } from './const'
import { 
  GetCoinsRequest,
  GetCoinsResponse,
  CreateCoinRequest, 
  CreateCoinResponse, 
  UpdateCoinRequest,
  UpdateCoinResponse
} from './types'
import { Coin } from '../../../base'
import { doActionWithError } from '../../../action'

export const useChurchCoinStore = defineStore('church-coin-v4', {
  state: () => ({
    Coins: {
      Coins: [] as Array<Coin>,
      Total: 0
    }
  }),
  getters: {
    getCoinByID () {
      return (ID: string) => {
        return this.Coins.Coins.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getCoins (req: GetCoinsRequest, done: (error: boolean, coins: Array<Coin>) => void) {
      doActionWithError<GetCoinsRequest, GetCoinsResponse>(
        API.GET_COINS,
        req,
        req.Message,
        (resp: GetCoinsResponse): void => {
          this.Coins.Coins.push(...resp.Infos)
          this.Coins.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
      })
    },
    updateCoin (req: UpdateCoinRequest, done: (error: boolean, coin: Coin) => void) {
      doActionWithError<UpdateCoinRequest, UpdateCoinResponse>(
        API.UPDATE_COIN,
        req,
        req.Message,
        (resp: UpdateCoinResponse): void => {
          const index = this.Coins.Coins.findIndex((el) => el.ID === resp.Info.ID)
          this.Coins.Coins.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Coin)
      })
    },
    createCoin (req: CreateCoinRequest, done: (error: boolean, coin: Coin) => void) {
      doActionWithError<CreateCoinRequest, CreateCoinResponse>(
        API.CREATE_COIN,
        req,
        req.Message,
        (resp: CreateCoinResponse): void => {
          const index = this.Coins.Coins.findIndex((el) => el.ID === resp.Info.ID)
          this.Coins.Coins.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Coin)
      })
    }
  }
})
