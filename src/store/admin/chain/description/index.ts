import { defineStore } from 'pinia'
import { API } from './const'
import { 
  CreateCoinDescriptionRequest,
  CreateCoinDescriptionResponse,
  GetCoinDescriptionsRequest,
  GetCoinDescriptionsResponse,
  UpdateCoinDescriptionRequest, 
  UpdateCoinDescriptionResponse 
} from './types'
import { CoinDescription, CoinDescriptionUsedFor } from '../../../base'
import { doActionWithError } from '../../../action'

export const useAdminCoinDescriptionStore = defineStore('admin-coindescription-v4', {
  state: () => ({
    CoinDescriptions: {
      CoinDescriptions: [] as Array<CoinDescription>,
      Total: 0
    }
  }),
  getters: {
    getCoinDescriptionByID () {
      return (id: string) => {
        return this.CoinDescriptions.CoinDescriptions.find((el) => el.ID === id)
      }
    },
    getCoinDescriptionsByCoinTypeID () {
      return (coinTypeID: string) => {
        return this.CoinDescriptions.CoinDescriptions.filter((el) => el.CoinTypeID === coinTypeID)
      }
    },
    getCoinDescriptionByCoinUsedFor() {
      return (coinTypeID: string, usedFor: CoinDescriptionUsedFor) => {
        const descriptions =  this.getCoinDescriptionsByCoinTypeID(coinTypeID)
        return descriptions.find((el) => el.UsedFor === usedFor)
      }
    }
  },
  actions: {
    getCoinDescriptions (req: GetCoinDescriptionsRequest, done: (error: boolean, descriptions: Array<CoinDescription>) => void) {
      doActionWithError<GetCoinDescriptionsRequest, GetCoinDescriptionsResponse>(
        API.GET_COINDESCRIPTIONS,
        req,
        req.Message,
        (resp: GetCoinDescriptionsResponse): void => {
          this.CoinDescriptions.CoinDescriptions.push(...resp.Infos)
          this.CoinDescriptions.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    },
    updateCoinDescription (req: UpdateCoinDescriptionRequest, done: (error: boolean, description: CoinDescription) => void) {
      doActionWithError<UpdateCoinDescriptionRequest, UpdateCoinDescriptionResponse>(
        API.UPDATE_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: UpdateCoinDescriptionResponse): void => {
          const index = this.CoinDescriptions.CoinDescriptions.findIndex((el) => el.ID === resp.Info.ID)
          this.CoinDescriptions.CoinDescriptions.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinDescription)
        })
    },
    createCoinDescription (req: CreateCoinDescriptionRequest, done: (error: boolean, description: CoinDescription) => void) {
      doActionWithError<CreateCoinDescriptionRequest, CreateCoinDescriptionResponse>(
        API.CREATE_COINDESCRIPTION,
        req,
        req.NotifyMessage,
        (resp: CreateCoinDescriptionResponse): void => {
          this.CoinDescriptions.CoinDescriptions.push(resp.Info)
          this.CoinDescriptions.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinDescription)
        })
    }
  }
})
