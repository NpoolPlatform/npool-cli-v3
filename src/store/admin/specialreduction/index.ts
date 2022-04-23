import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { SpecialOfferState } from './state'
import {
  CreateSpecialOfferRequest,
  CreateSpecialOfferResponse,
  GetUserSpecialOffersRequest, GetUserSpecialOffersResponse, UpdateSpecialOfferRequest, UpdateSpecialOfferResponse, UserSpecialOffer
} from './types'

export const useSpecialOfferStore = defineStore('specialoffer', {
  state: (): SpecialOfferState => ({
    SpecialOffers: []
  }),
  getters: {
    getSpecialOfferByID (): (id: string) => UserSpecialOffer {
      return (id: string) => {
        const index = this.SpecialOffers.findIndex((el) => el.ID === id)
        return index < 0 ? undefined as unknown as UserSpecialOffer : this.SpecialOffers[index]
      }
    }
  },
  actions: {
    getSpecialOffers (req: GetUserSpecialOffersRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserSpecialOffersRequest, GetUserSpecialOffersResponse>(
        API.GET_USER_SPECIAL_OFFERS,
        req,
        req.Message,
        (resp: GetUserSpecialOffersResponse): void => {
          this.SpecialOffers = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createSpecialOffer (req: CreateSpecialOfferRequest, done: () => void) {
      doAction<CreateSpecialOfferRequest, CreateSpecialOfferResponse>(
        API.CREATE_USER_SPECIAL_OFFER,
        req,
        req.Message,
        (resp: CreateSpecialOfferResponse): void => {
          this.SpecialOffers.push(resp.Info)
          done()
        })
    },
    updateSpecialOffer (req: UpdateSpecialOfferRequest, done: () => void) {
      doAction<UpdateSpecialOfferRequest, UpdateSpecialOfferResponse>(
        API.UPDATE_USER_SPECIAL_OFFER,
        req,
        req.Message,
        (resp: UpdateSpecialOfferResponse): void => {
          const index = this.SpecialOffers.findIndex((el) => el.ID === resp.Info.ID)
          this.SpecialOffers.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
