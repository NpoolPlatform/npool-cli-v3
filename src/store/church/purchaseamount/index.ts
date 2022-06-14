import { defineStore } from 'pinia'
import {
  PurchaseAmountSetting
} from '../../admin'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { PurchaseAmountSettingState } from './state'
import {
  CreateAppPurchaseAmountSettingRequest,
  CreateAppPurchaseAmountSettingResponse,
  CreateAppUserPurchaseAmountSettingRequest,
  CreateAppUserPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  UpdateAppPurchaseAmountSettingRequest,
  UpdateAppPurchaseAmountSettingResponse
} from './types'

export const useChurchPurchaseAmountSettingStore = defineStore('churchpurchaseamountsetting', {
  state: (): PurchaseAmountSettingState => ({
    PurchaseAmountSettings: new Map<string, Array<PurchaseAmountSetting>>()
  }),
  getters: {},
  actions: {
    getPurchaseAmountSettings (req: GetAppPurchaseAmountSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppPurchaseAmountSettingsRequest, GetAppPurchaseAmountSettingsResponse>(
        API.GET_PURCHASE_AMOUNT_SETTINGS,
        req,
        req.Message,
        (resp: GetAppPurchaseAmountSettingsResponse): void => {
          this.PurchaseAmountSettings.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createPurchaseAmountSetting (req: CreateAppPurchaseAmountSettingRequest, done: () => void) {
      doAction<CreateAppPurchaseAmountSettingRequest, CreateAppPurchaseAmountSettingResponse>(
        API.CREATE_PURCHASE_AMOUNT_SETTING,
        req,
        req.Message,
        (resp: CreateAppPurchaseAmountSettingResponse): void => {
          let amounts = this.PurchaseAmountSettings.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.PurchaseAmountSettings.set(req.TargetAppID, amounts)
          done()
        })
    },
    createUserPurchaseAmountSetting (req: CreateAppUserPurchaseAmountSettingRequest, done: () => void) {
      doAction<CreateAppUserPurchaseAmountSettingRequest, CreateAppUserPurchaseAmountSettingResponse>(
        API.CREATE_USER_PURCHASE_AMOUNT_SETTING,
        req,
        req.Message,
        (resp: CreateAppUserPurchaseAmountSettingResponse): void => {
          let amounts = this.PurchaseAmountSettings.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.PurchaseAmountSettings.set(req.TargetAppID, amounts)
          done()
        })
    },
    updatePurchaseAmountSetting (req: UpdateAppPurchaseAmountSettingRequest, done: () => void) {
      doAction<UpdateAppPurchaseAmountSettingRequest, UpdateAppPurchaseAmountSettingResponse>(
        API.UPDATE_PURCHASE_AMOUNT_SETTING,
        req,
        req.Message,
        (resp: UpdateAppPurchaseAmountSettingResponse): void => {
          let amounts = this.PurchaseAmountSettings.get(req.Info.AppID)
          if (!amounts) {
            amounts = []
          }
          const index = amounts.findIndex((el) => el.ID === req.Info.ID)
          amounts.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.PurchaseAmountSettings.set(req.Info.AppID, amounts)
          done()
        })
    },
  }
})

export * from './types'
