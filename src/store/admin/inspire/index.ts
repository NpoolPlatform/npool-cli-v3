import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { InspireState } from './state'
import {
  CommissionSetting,
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse,
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse
} from './types'

export const useAdminInspireStore = defineStore('admininspire', {
  state: (): InspireState => ({
    InvitationCodes: [],
    PurchaseAmountSettings: [],
    CommissionSetting: undefined as unknown as CommissionSetting,
    CommissionCoinSettings: []
  }),
  getters: {},
  actions: {
    getInvitationCodes (req: GetInvitationCodesRequest, done: (error: boolean) => void) {
      doActionWithError<GetInvitationCodesRequest, GetInvitationCodesResponse>(
        API.GET_INVITATION_CODES,
        req,
        req.Message,
        (resp: GetInvitationCodesResponse): void => {
          this.InvitationCodes = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createInvitationCode (req: CreateInvitationCodeRequest, done: () => void) {
      doAction<CreateInvitationCodeRequest, CreateInvitationCodeResponse>(
        API.CREATE_INVITATION_CODE,
        req,
        req.Message,
        (resp: CreateInvitationCodeResponse): void => {
          this.InvitationCodes.push(resp.Info)
          done()
        })
    },
    getCommissionSetting (req: GetCommissionSettingRequest, done: (error: boolean) => void) {
      doActionWithError<GetCommissionSettingRequest, GetCommissionSettingResponse>(
        API.GET_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: GetCommissionSettingResponse): void => {
          this.CommissionSetting = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    },
    createCommissionSetting (req: CreateCommissionSettingRequest, done: () => void) {
      doAction<CreateCommissionSettingRequest, CreateCommissionSettingResponse>(
        API.CREATE_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: CreateCommissionSettingResponse): void => {
          this.CommissionSetting = resp.Info
          done()
        })
    },
    updateCommissionSetting (req: UpdateCommissionSettingRequest, done: () => void) {
      doAction<UpdateCommissionSettingRequest, UpdateCommissionSettingResponse>(
        API.UPDATE_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: UpdateCommissionSettingResponse): void => {
          this.CommissionSetting = resp.Info
          done()
        })
    },
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
