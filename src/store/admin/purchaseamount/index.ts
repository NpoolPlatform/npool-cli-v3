import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { PurchaseAmountSettingState } from './state'
import {
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse
} from './types'

export const usePurchaseAmountSettingStore = defineStore('purchaseamountsetting', {
  state: (): PurchaseAmountSettingState => ({
    PurchaseAmountSettings: []
  }),
  getters: {},
  actions: {
    getPurchaseAmountSettings (req: GetPurchaseAmountSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetPurchaseAmountSettingsRequest, GetPurchaseAmountSettingsResponse>(
        API.GET_PURCHASE_AMOUNT_SETTINGS,
        req,
        req.Message,
        (resp: GetPurchaseAmountSettingsResponse): void => {
          this.PurchaseAmountSettings = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createPurchaseAmountSetting (req: CreatePurchaseAmountSettingRequest, done: () => void) {
      doAction<CreatePurchaseAmountSettingRequest, CreatePurchaseAmountSettingResponse>(
        API.CREATE_PURCHASE_AMOUNT_SETTING,
        req,
        req.Message,
        (resp: CreatePurchaseAmountSettingResponse): void => {
          this.PurchaseAmountSettings.push(resp.Info)
          done()
        })
    }
  }
})

export * from './types'
