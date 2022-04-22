import { defineStore } from 'pinia'
import {
  UserSpecialOffer,
  UpdateSpecialOfferRequest,
  UpdateSpecialOfferResponse
} from '../../admin'
import { API as SpecialOfferAPI } from '../../admin/specialreduction/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { SpecialOfferState } from './state'
import {
  CreateAppSpecialOfferRequest,
  CreateAppSpecialOfferResponse,
  GetAppSpecialOffersRequest,
  GetAppSpecialOffersResponse
} from './types'

export const useChurchSpecialOfferStore = defineStore('churchspecialoffer', {
  state: (): SpecialOfferState => ({
    SpecialOffers: new Map<string, Array<UserSpecialOffer>>()
  }),
  getters: {},
  actions: {
    getSpecialOffers (req: GetAppSpecialOffersRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppSpecialOffersRequest, GetAppSpecialOffersResponse>(
        API.GET_USER_SPECIAL_OFFERS,
        req,
        req.Message,
        (resp: GetAppSpecialOffersResponse): void => {
          this.SpecialOffers.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createSpecialOffer (req: CreateAppSpecialOfferRequest, done: () => void) {
      doAction<CreateAppSpecialOfferRequest, CreateAppSpecialOfferResponse>(
        API.CREATE_USER_SPECIAL_OFFER,
        req,
        req.Message,
        (resp: CreateAppSpecialOfferResponse): void => {
          let amounts = this.SpecialOffers.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.SpecialOffers.set(req.TargetAppID, amounts)
          done()
        })
    },
    updateSpecialOffer (req: UpdateSpecialOfferRequest, done: () => void) {
      doAction<UpdateSpecialOfferRequest, UpdateSpecialOfferResponse>(
        SpecialOfferAPI.UPDATE_USER_SPECIAL_OFFER,
        req,
        req.Message,
        (resp: UpdateSpecialOfferResponse): void => {
          for (const [k, v] of this.SpecialOffers) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1, resp.Info)
            this.SpecialOffers.set(k, v)
          }
          done()
        })
    }
  }
})

export * from './types'
