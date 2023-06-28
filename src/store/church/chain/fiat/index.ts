import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFiatRequest,
  CreateFiatResponse,
  Fiat,
  GetFiatsRequest,
  GetFiatsResponse,
  UpdateFiatRequest,
  UpdateFiatResponse
} from './types'
import { doActionWithError } from '../../../action'

export const useFiatStore = defineStore('fiat-v4', {
  state: () => ({
    Fiats: {
      Fiats: [] as Array<Fiat>,
      Total: 0
    }
  }),
  getters: {
    fiats () {
      return () => this.Fiats.Fiats.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getFiats (req: GetFiatsRequest, done: (error: boolean, rows: Array<Fiat>) => void) {
      doActionWithError<GetFiatsRequest, GetFiatsResponse>(
        API.GET_FIATS,
        req,
        req.Message,
        (resp: GetFiatsResponse): void => {
          this.Fiats.Fiats.push(...resp.Infos)
          this.Fiats.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Fiat>)
        }
      )
    },
    createFiat (req: CreateFiatRequest, done: (error: boolean, row: Fiat) => void) {
      doActionWithError<CreateFiatRequest, CreateFiatResponse>(
        API.CREATE_FIAT,
        req,
        req.Message,
        (resp: CreateFiatResponse): void => {
          this.Fiats.Fiats.push(resp.Info)
          this.Fiats.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Fiat)
        }
      )
    },
    updateFiat (req: UpdateFiatRequest, done: (error: boolean, row: Fiat) => void) {
      doActionWithError<UpdateFiatRequest, UpdateFiatResponse>(
        API.UPDATE_FIAT,
        req,
        req.Message,
        (resp: UpdateFiatResponse): void => {
          const index = this.Fiats.Fiats.findIndex((el) => el.ID === resp.Info.ID)
          this.Fiats.Fiats.splice(index, 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Fiat)
        }
      )
    }
  }
})

export * from './currency/feed'
export * from './currency/history'
export * from './types'