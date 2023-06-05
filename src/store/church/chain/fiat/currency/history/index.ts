import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetHistoriesRequest,
  GetHistoriesResponse
} from './types'
import { doActionWithError } from '../../../../../action'
import { FiatCurrency } from '../../../../../base'

export const useFiatCurrencyHistoryStore = defineStore('fiatcurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<FiatCurrency>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getHistories (req: GetHistoriesRequest, done: (error: boolean, rows: Array<FiatCurrency>) => void) {
      doActionWithError<GetHistoriesRequest, GetHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetHistoriesResponse): void => {
          this.Histories.Histories.push(...resp.Infos)
          this.Histories.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatCurrency>)
        }
      )
    }
  }
})
export * from './types'