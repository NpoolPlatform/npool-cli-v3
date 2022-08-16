import { defineStore } from 'pinia'
import { doActionWithError } from 'src/store/action'
import { API } from './const'
import {
  GetProfitsRequest,
  GetProfitsResponse,
  GetIntervalProfitsRequest,
  GetIntervalProfitsResponse,
  GetGoodProfitsRequest,
  GetGoodProfitsResponse,
  IntervalGoodProfits,
  IntervalProfits,
  Profit,
  GoodProfit
} from './types'

export const useProfitStore = defineStore('profit', {
  state: () => ({
    Profits: {
      Profits: [] as Array<Profit>,
      Total: 0
    } as IntervalProfits,
    CoinProfits: new Map<string, IntervalProfits>(),
    GoodProfits: new Map<string, IntervalGoodProfits>()
  }),
  getters: {},
  actions: {
    getProfits (req: GetProfitsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetProfitsRequest, GetProfitsResponse>(
        API.GET_PROFITS,
        req,
        req.Message,
        (resp: GetProfitsResponse): void => {
          this.Profits.Profits.push(...resp.Infos)
          this.Profits.Total = resp.Total
          done(false, resp.Infos.length)
        },
        () => {
          done(true)
        }
      )
    },
    getIntervalProfits (req: GetIntervalProfitsRequest, intervalKey: string, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetIntervalProfitsRequest, GetIntervalProfitsResponse>(
        API.GET_INTERVAL_PROFITS,
        req,
        req.Message,
        (resp: GetIntervalProfitsResponse): void => {
          if (resp.Infos.length === 0) {
            done(false, 0)
            return
          }

          let profits = this.CoinProfits.get(intervalKey)
          if (!profits) {
            profits = {
              Profits: [] as Array<Profit>,
              Total: 0
            } as IntervalProfits
          }

          profits.Profits.push(...resp.Infos)
          profits.Total = resp.Total

          this.CoinProfits.set(intervalKey, profits)
          done(false, resp.Infos.length)
        }, () => {
          done(true)
        }
      )
    },
    getGoodProfits (req: GetGoodProfitsRequest, intervalKey: string, done: (error:boolean, count?: number) => void) {
      doActionWithError<GetGoodProfitsRequest, GetGoodProfitsResponse>(
        API.GET_GOOD_PROFITS,
        req,
        req.Message,
        (resp: GetGoodProfitsResponse): void => {
          if (resp.Infos.length === 0) {
            done(false, 0)
            return
          }

          let profits = this.GoodProfits.get(intervalKey)
          if (!profits) {
            profits = {
              Profits: [] as Array<GoodProfit>,
              Total: 0
            } as IntervalGoodProfits
          }

          profits.Profits.push(...resp.Infos)
          profits.Total = resp.Total

          this.GoodProfits.set(intervalKey, profits)
          done(false, resp.Infos.length)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
