import { defineStore } from 'pinia'
import { API } from './const'
import {
  Currency,
  GetHistoriesRequest,
  GetHistoriesResponse
} from './types'
import { doActionWithError } from '../../../../../action'

export const useFiatCurrencyHistoryStore = defineStore('fiatcurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<Currency>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getHistories (req: GetHistoriesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetHistoriesRequest, GetHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetHistoriesResponse): void => {
          this.Histories.Histories.push(...resp.Infos)
          this.Histories.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Currency>)
        }
      )
    }
  }
})
