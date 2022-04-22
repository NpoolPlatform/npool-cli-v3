import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CommissionState } from './state'
import {
  CommissionSetting,
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse
} from './types'

export const useCommissionStore = defineStore('commission', {
  state: (): CommissionState => ({
    CommissionSetting: undefined as unknown as CommissionSetting,
    CommissionCoinSettings: []
  }),
  getters: {},
  actions: {
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
