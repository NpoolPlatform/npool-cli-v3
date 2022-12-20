import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetFiatCurrencyTypesRequest,
  GetFiatCurrencyTypesResponse,
  UpdateFiatCurrencyTypeRequest,
  UpdateFiatCurrencyTypeResponse,
  CreateFiatCurrencyTypeRequest,
  CreateFiatCurrencyTypeResponse
} from './types'
import { doActionWithError } from '../../../action'
import { FiatCurrencyType } from '../../../base'

export const useChurchFiatCurrencyStore = defineStore('church-fiatcurrency-v4', {
  state: () => ({
    FiatCurrencyTypes: {
      FiatCurrencyTypes: [] as Array<FiatCurrencyType>,
      Total: 0
    }
  }),
  getters: {
    getFiatCurrencyTypeByName () {
      return (name: string) => {
        return this.FiatCurrencyTypes.FiatCurrencyTypes.find((el) => el.Name === name)
      }
    }
  },
  actions: {
    getFiatCurrencyTypes (req: GetFiatCurrencyTypesRequest, done: (error: boolean, rows: Array<FiatCurrencyType>) => void) {
      doActionWithError<GetFiatCurrencyTypesRequest, GetFiatCurrencyTypesResponse>(
        API.GET_FIATCURRENCYTYPES,
        req,
        req.Message,
        (resp: GetFiatCurrencyTypesResponse): void => {
          this.FiatCurrencyTypes.FiatCurrencyTypes.push(...resp.Infos)
          this.FiatCurrencyTypes.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatCurrencyType>)
        }
      )
    },
    updateFiatCurrencyType (req: UpdateFiatCurrencyTypeRequest, done: (error: boolean, row: FiatCurrencyType) => void) {
      doActionWithError<UpdateFiatCurrencyTypeRequest, UpdateFiatCurrencyTypeResponse>(
        API.UPDATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: UpdateFiatCurrencyTypeResponse): void => {
          const index = this.FiatCurrencyTypes.FiatCurrencyTypes.findIndex((el) => el.ID === resp.Info.ID)
          this.FiatCurrencyTypes.FiatCurrencyTypes.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatCurrencyType)
        }
      )
    },
    createFiatCurrencyType (req: CreateFiatCurrencyTypeRequest, done: (error: boolean, row: FiatCurrencyType) => void) {
      doActionWithError<CreateFiatCurrencyTypeRequest, CreateFiatCurrencyTypeResponse>(
        API.CREATE_FIATCURRENCYTYPE,
        req,
        req.Message,
        (resp: CreateFiatCurrencyTypeResponse): void => {
          this.FiatCurrencyTypes.FiatCurrencyTypes.push(resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatCurrencyType)
        }
      )
    }
  }
})
