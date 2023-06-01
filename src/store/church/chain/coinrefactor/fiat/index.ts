import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateCoinFiatRequest,
  CreateCoinFiatResponse,
  CoinFiat,
  GetCoinFiatsRequest,
  GetCoinFiatsResponse,
  DeleteCoinFiatRequest,
  DeleteCoinFiatResponse
} from './types'
import { doActionWithError } from '../../../../action'

export const useCoinFiatStore = defineStore('coinCoinFiat-v4', {
  state: () => ({
    CoinFiats: {
      CoinFiats: [] as Array<CoinFiat>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCoinFiats (req: GetCoinFiatsRequest, done: (error: boolean, rows: Array<CoinFiat>) => void) {
      doActionWithError<GetCoinFiatsRequest, GetCoinFiatsResponse>(
        API.GET_COIN_FIATS,
        req,
        req.Message,
        (resp: GetCoinFiatsResponse): void => {
          this.CoinFiats.CoinFiats.push(...resp.Infos)
          this.CoinFiats.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<CoinFiat>)
        }
      )
    },
    createCoinFiat (req: CreateCoinFiatRequest, done: (error: boolean, row: CoinFiat) => void) {
      doActionWithError<CreateCoinFiatRequest, CreateCoinFiatResponse>(
        API.CREATE_COIN_FIAT,
        req,
        req.Message,
        (resp: CreateCoinFiatResponse): void => {
          this.CoinFiats.CoinFiats.push(resp.Info)
          this.CoinFiats.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinFiat)
        }
      )
    },
    deleteCoinFiat (req: DeleteCoinFiatRequest, done: (error: boolean, row: CoinFiat) => void) {
      doActionWithError<DeleteCoinFiatRequest, DeleteCoinFiatResponse>(
        API.DELETE_COIN_FIAT,
        req,
        req.Message,
        (resp: DeleteCoinFiatResponse): void => {
          const index = this.CoinFiats.CoinFiats.findIndex((el) => el.ID === resp.Info.ID)
          this.CoinFiats.CoinFiats.splice(index, 1)
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinFiat)
        }
      )
    }
  }
})

export * from './currency/history'