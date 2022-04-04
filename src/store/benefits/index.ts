import { defineStore } from 'pinia'
import { doAction } from '../action'
import { API } from './const'
import {
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse
} from './types'

export const useBenefitStore = defineStore('benefit', {
  state: (): BenefitState => ({
    Benefits: []
  }),
  getters: {},
  actions: {
    getBenefits (req: GetBenefitsRequest) {
      doAction<GetBenefitsRequest, GetBenefitsResponse>(
        API.GET_BENEFITS,
        req,
        req.Message,
        (resp: GetBenefitsResponse): void => {
          this.Benefits = resp.Infos
        })
    }
  }
})

export * from './types'
