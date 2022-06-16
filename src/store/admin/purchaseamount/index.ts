import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { PurchaseAmountSettingState } from './state'
import {
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse
} from './types'

export const usePurchaseAmountSettingStore = defineStore('purchaseamountsetting', {
  state: (): PurchaseAmountSettingState => ({
    PurchaseAmountSettings: []
  }),
  getters: {},
  actions: {
    getPurchaseAmountSettings (req: GetAppPurchaseAmountSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppPurchaseAmountSettingsRequest, GetAppPurchaseAmountSettingsResponse>(
        API.GET_PURCHASE_AMOUNT_SETTINGS,
        req,
        req.Message,
        (resp: GetAppPurchaseAmountSettingsResponse): void => {
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
    },
    createUserPurchaseAmountSetting (req: CreateUserPurchaseAmountSettingRequest, done: () => void) {
      doAction<CreateUserPurchaseAmountSettingRequest, CreateUserPurchaseAmountSettingResponse>(
        API.CREATE_USER_PURCHASE_AMOUNT_SETTING,
        req,
        req.Message,
        (resp: CreateUserPurchaseAmountSettingResponse): void => {
          this.PurchaseAmountSettings.push(resp.Info)
          done()
        })
    }
  }
})

export * from './types'
