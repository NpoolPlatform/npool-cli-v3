import { defineStore } from 'pinia'
import { API } from './const'
import { doActionWithError } from '../../../action'
import { GetGoodProfitsRequest, GetGoodProfitsResponse, GetIntervalGoodProfitsRequest, GetIntervalGoodProfitsResponse, GetIntervalProfitsRequest, GetIntervalProfitsResponse, GetProfitsRequest, GetProfitsResponse } from './types'
import { GoodProfit, Profit } from '../../../base'

export const useFrontendProfitStore = defineStore('frontend-profit-v4', {
  state: () => ({
    GoodProfits: {
      GoodProfits: [] as Array<GoodProfit>,
      Total: 0
    },
    IntervalGoodProfits: {
      IntervalGoodProfits: new Map<string, Array<GoodProfit>>(),
      Total: 0
    },
    Profits: {
      Profits: [] as Array<Profit>,
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
    getIntervalGoodProfitsByKey() {
      return (intervalKey: string) => {
        const data = this.IntervalGoodProfits.IntervalGoodProfits.get(intervalKey)
        return !data ? [] as Array<GoodProfit> : data
      }
    },
    getIntervalProfitInComing() {
      return (intervalKey: string, coinTypeID: string) => {
        const data = this.getIntervalProfitsByKey(intervalKey)
        let incoming = 0
        data.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => incoming += Number(el.Incoming))
        return incoming
      }
    },
    getIntervalGoodProfitInComing() {
      return (intervalKey: string, coinTypeID: string) => {
        const data = this.getIntervalGoodProfitsByKey(intervalKey)
        let incoming = 0
        data.filter((el) => el.CoinTypeID === coinTypeID).forEach((el) => incoming += Number(el.Incoming))
        return incoming
      }
    },
    getGoodIntervalGoodProfitInComing() {
      return (intervalKey: string, coinTypeID: string, goodID:string) => {
        const data = this.getIntervalGoodProfitsByKey(intervalKey)
        let incoming = 0
        data.filter((el) => el.GoodID === goodID && el.CoinTypeID === coinTypeID).forEach((el) => incoming += Number(el.Incoming))
        return incoming
      }
    },
    getPurchaseUnits() {
      return (coinTypeID: string) => {
        let units = 0
        this.GoodProfits.GoodProfits.filter((el) => el.CoinTypeID === coinTypeID).filter((el) => units += Number(el.Units))
        return units
      }
    },
    getTotalIncoming () {
      return (coinTypeID: string) => {
        let incoming = 0
        this.GoodProfits.GoodProfits.filter((el) => el.CoinTypeID === coinTypeID).filter((el) => incoming += Number(el.Incoming))
        return incoming
      }
    },
    getGoodPurchaseUnits() {
      return (coinTypeID: string, goodID: string) => {
        let units = 0
        this.GoodProfits.GoodProfits.filter((el) => el.GoodID === goodID && el.CoinTypeID === coinTypeID).filter((el) => units += Number(el.Units))
        return units
      }
    },
    getGoodTotalIncoming () {
      return (coinTypeID: string, goodID: string) => {
        let incoming = 0
        this.GoodProfits.GoodProfits.filter((el) => el.GoodID === goodID && el.CoinTypeID === coinTypeID).filter((el) => incoming += Number(el.Incoming))
        return incoming
      }
    }
  },
  actions: {
    getGoodProfits (req: GetGoodProfitsRequest, done: (error: boolean, rows: Array<GoodProfit>) => void) {
      doActionWithError<GetGoodProfitsRequest, GetGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetGoodProfitsResponse): void => {
          this.GoodProfits.GoodProfits.push(...resp.Infos)
          this.GoodProfits.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<GoodProfit>)
        }
      )
    },
    getIntervalGoodProfits (req: GetIntervalGoodProfitsRequest, intervalKey: string, done: (error:boolean, rows: Array<GoodProfit>) => void) {
      doActionWithError<GetIntervalGoodProfitsRequest, GetIntervalGoodProfitsResponse>(
        API.GET_GOODPROFITS,
        req,
        req.Message,
        (resp: GetIntervalGoodProfitsResponse): void => {
          const data = this.getIntervalGoodProfitsByKey(intervalKey)
          data.push(...resp.Infos)
          this.IntervalGoodProfits.IntervalGoodProfits.set(intervalKey, data)
          this.IntervalGoodProfits.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<GoodProfit>)
        }
      )
    },
    getProfits (req: GetProfitsRequest, done: (error: boolean, rows: Array<Profit>) => void) {
      doActionWithError<GetProfitsRequest, GetProfitsResponse>(
        API.GET_PROFITS,
        req,
        req.Message,
        (resp: GetProfitsResponse): void => {
          this.Profits.Profits.push(...resp.Infos)
          this.Profits.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Profit>)
        }
      )
    },
    getIntervalProfits (req: GetIntervalProfitsRequest, intervalKey: string, done: (error: boolean, rows: Array<Profit>) => void) {
      doActionWithError<GetIntervalProfitsRequest, GetIntervalProfitsResponse>(
        API.GET_INTERVALPROFITS,
        req,
        req.Message,
        (resp: GetIntervalProfitsResponse): void => {
          const data = this.getIntervalProfitsByKey(intervalKey)
          data.push(...resp.Infos)
          this.IntervalProfits.IntervalProfits.set(intervalKey, data)
          this.IntervalProfits.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Profit>)
        }
      )
    }
  }
})
