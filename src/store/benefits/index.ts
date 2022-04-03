import { AxiosInstance } from 'axios'
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
    Benefits: [],
    APIInstance: undefined as unknown as AxiosInstance
  }),
  getters: {},
  actions: {
    getBenefits (req: GetBenefitsRequest) {
      doAction<GetBenefitsRequest, GetBenefitsResponse>(
        this.APIInstance,
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
