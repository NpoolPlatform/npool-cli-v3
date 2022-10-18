import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../action'
import { GetGoodProfitsRequest, GetGoodProfitsResponse, GetIntervalProfitsRequest, GetIntervalProfitsResponse } from './types'
import { GoodProfit, Profit } from '../../../base'

export const useFrontendProfitStore = defineStore('frontend-profit-v4', {
  state: () => ({
    GoodProfits: {
      GoodProfits: [] as Array<GoodProfit>,
      Total: 0
    },
    IntervalProfits: {
      IntervalProfits: new Map<string, Array<Profit>>(),
      Total: 0
    }
  }),
  getters: {
    getIntervalProfitsByKey() {
      return (intervalKey: string) => {
        const data = this.IntervalProfits.IntervalProfits.get(intervalKey)
        return !data ? [] as Array<Profit> : data
      }
    },
    getIntervalIncoming() {
      return (intervalKey: string, coinTypeID: string) => {
        const data = this.getIntervalProfitsByKey(intervalKey)
        let incoming = 0
        data.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => incoming += Number(el.Incoming))
        return incoming
      }
    }
  },
  actions: {
    getGoodProfits (req: GetGoodProfitsRequest, done: (goodProfits: Array<GoodProfit>, error:boolean) => void) {
      doActionWithError<GetGoodProfitsRequest, GetGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetGoodProfitsResponse): void => {
          this.GoodProfits.GoodProfits.push(...resp.Infos)
          this.GoodProfits.Total = resp.Total
          done(resp.Infos, false)
        },
        () => {
          done([] as Array<GoodProfit>, true)
        }
      )
    },
    getIntervalProfits (req: GetIntervalProfitsRequest, intervalKey: string, done: (intervalProfits: Array<Profit>, error:boolean) => void) {
      doActionWithError<GetIntervalProfitsRequest, GetIntervalProfitsResponse>(
        API.GET_INTERVALPROFITS,
        req,
        req.Message,
        (resp: GetIntervalProfitsResponse): void => {
          const data = this.getIntervalProfitsByKey(intervalKey)
          data.push(...resp.Infos)
          this.IntervalProfits.IntervalProfits.set(intervalKey, data)
          done(resp.Infos, false)
        },
        () => {
          done([] as Array<Profit>, true)
        }
      )
    }
  }
})
