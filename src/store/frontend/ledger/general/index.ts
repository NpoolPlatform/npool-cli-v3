import { defineStore } from 'pinia'
import { doActionWithError } from 'src/store/action'
import { API } from './const'
import {
  General,
  GetGeneralsRequest,
  GetGeneralsResponse,
  GetIntervalGeneralsRequest,
  GetIntervalGeneralsResponse,
  IntervalGeneral
} from './types'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    Generals: {
      Generals: [] as Array<General>,
      Total: 0
    } as IntervalGeneral,
    IntervalGenerals: new Map<string, IntervalGeneral>()
  }),
  getters: {
    getCoinBalance (): (coinTypeID: string) => number {
      return (coinTypeID: string) => {
        let total = 0
        this.Generals.Generals.filter((el) => el.CoinTypeID === coinTypeID).forEach((sl) => { total += Number(sl.Spendable) })
        return total
      }
    },
    getUSDTBalance (): number {
      return 0
    }
  },
  actions: {
    getGenerals (req: GetGeneralsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetGeneralsRequest, GetGeneralsResponse>(
        API.GET_GENERALS,
        req,
        req.Message,
        (resp: GetGeneralsResponse): void => {
          resp.Infos.forEach((el) => {
            const index = this.Generals.Generals.findIndex((gel) => gel.CoinTypeID === el.CoinTypeID)
            if (index >= 0) {
              return
            }
            this.Generals.Generals.push(el)
          })
          this.Generals.Generals = this.Generals.Generals.sort((a, b) => a.Spendable > b.Spendable ? -1 : 1)
          this.Generals.Total = resp.Total
          done(false, resp.Infos.length)
        },
        () => {
          done(true)
        }
      )
    },
    getIntervalGenerals (req: GetIntervalGeneralsRequest, intervalKey: string, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetIntervalGeneralsRequest, GetIntervalGeneralsResponse>(
        API.GET_INTERVAL_GENERALS,
        req,
        req.Message,
        (resp: GetIntervalGeneralsResponse): void => {
          if (resp.Infos.length === 0) {
            done(false, 0)
            return
          }

          let generals = this.IntervalGenerals.get(intervalKey)
          if (!generals) {
            generals = {
              Generals: [] as Array<General>,
              Total: 0
            } as IntervalGeneral
          }
          generals.Generals.push(...resp.Infos)
          generals.Total = resp.Total

          this.IntervalGenerals.set(intervalKey, generals)
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
