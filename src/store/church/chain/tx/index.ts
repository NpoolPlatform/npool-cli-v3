import { defineStore } from 'pinia'
import { API } from './const'
import { GetTxsRequest, GetTxsResponse } from './types'
import { Tx } from '../../../base'
import { doActionWithError } from '../../../action'

export const useChurchTxStore = defineStore('church-tx-v4', {
  state: () => ({
    Txs: {
      Txs: [] as Array<Tx>,
      Total: 0
    }
  }),
  getters: {
    getCoinByID () {
      return (ID: string) => {
        return this.Txs.Txs.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getCoins (req: GetTxsRequest, done: (error: boolean, coins: Array<Tx>) => void) {
      doActionWithError<GetTxsRequest, GetTxsResponse>(
        API.GET_TXS,
        req,
        req.Message,
        (resp: GetTxsResponse): void => {
          this.Txs.Txs.push(...resp.Infos)
          this.Txs.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    }
  }
})
