import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CreateGoodBenefitRequest, CreateGoodBenefitResponse, GetGoodBenefitsRequest, GetGoodBenefitsResponse, GoodSettingState, UpdateGoodBenefitRequest, UpdateGoodBenefitResponse } from './types'

export const useGoodSettingStore = defineStore('goodsetting', {
  state: (): GoodSettingState => ({
    GoodBenefits: []
  }),
  getters: {},
  actions: {
    getGoodBenefits (req: GetGoodBenefitsRequest, done: (error: boolean) => void) {
      doActionWithError<GetGoodBenefitsRequest, GetGoodBenefitsResponse>(
        API.GET_GOOD_BENEFITS,
        req,
        req.Message,
        (resp: GetGoodBenefitsResponse): void => {
          this.GoodBenefits = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createGoodBenefit (req: CreateGoodBenefitRequest, done: () => void) {
      doAction<CreateGoodBenefitRequest, CreateGoodBenefitResponse>(
        API.CREATE_GOOD_BENEFIT,
        req,
        req.Message,
        (resp: CreateGoodBenefitResponse): void => {
          this.GoodBenefits.push(resp.Info)
          done()
        })
    },
    updateGoodBenefit (req: UpdateGoodBenefitRequest, done: () => void) {
      doAction<UpdateGoodBenefitRequest, UpdateGoodBenefitResponse>(
        API.UPDATE_GOOD_BENEFIT,
        req,
        req.Message,
        (resp: UpdateGoodBenefitResponse): void => {
          const index = this.GoodBenefits.findIndex((el) => el.ID === resp.Info.ID)
          this.GoodBenefits.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
