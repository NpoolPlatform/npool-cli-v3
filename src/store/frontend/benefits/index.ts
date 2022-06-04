import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse,
  GetCommissionRequest,
  GetCommissionResponse
} from './types'

export const useBenefitStore = defineStore('benefit', {
  state: (): BenefitState => ({
    Benefits: [],
    Commission: {
      Total: 0,
      Balance: 0
    },
    CommissionCoinSettings: []
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
    },
    getCommissionCoinSettings (req: GetCommissionCoinSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetCommissionCoinSettingsRequest, GetCommissionCoinSettingsResponse>(
        API.GET_COMMISSION_COINS_SETTINGS,
        req,
        req.Message,
        (resp: GetCommissionCoinSettingsResponse): void => {
          this.CommissionCoinSettings = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
