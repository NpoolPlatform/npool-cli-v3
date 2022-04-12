import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse,
  GetCommissionRequest,
  GetCommissionResponse
} from './types'

export const useBenefitStore = defineStore('benefit', {
  state: (): BenefitState => ({
    Benefits: [],
    Commission: {
      Total: 0,
      Balance: 0
    }
  }),
  getters: {},
  actions: {
    getBenefits (req: GetBenefitsRequest, done: () => void) {
      doAction<GetBenefitsRequest, GetBenefitsResponse>(
        API.GET_BENEFITS,
        req,
        req.Message,
        (resp: GetBenefitsResponse): void => {
          this.Benefits = resp.Infos
          done()
        })
    },
    getCommission (req: GetCommissionRequest, done: () => void) {
      doAction<GetCommissionRequest, GetCommissionResponse>(
        API.GET_COMMISSION,
        req,
        req.Message,
        (resp: GetCommissionResponse): void => {
          this.Commission = resp.Info
          done()
        })
    }
  }
})

export * from './types'
