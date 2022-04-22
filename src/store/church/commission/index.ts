import { defineStore } from 'pinia'
import {
  CommissionSetting,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse
} from '../../admin'
import { API as CommissionAPI } from '../../admin/commission/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CommissionState } from './state'
import {
  CreateAppCommissionSettingRequest,
  CreateAppCommissionSettingResponse,
  GetAppCommissionSettingRequest,
  GetAppCommissionSettingResponse
} from './types'

export const useChurchCommissionStore = defineStore('churchcommission', {
  state: (): CommissionState => ({
    CommissionSetting: new Map<string, CommissionSetting>()
  }),
  getters: {},
  actions: {
    getCommissionSetting (req: GetAppCommissionSettingRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppCommissionSettingRequest, GetAppCommissionSettingResponse>(
        API.GET_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: GetAppCommissionSettingResponse): void => {
          this.CommissionSetting.set(req.TargetAppID, resp.Info)
          done(false)
        }, () => {
          done(true)
        })
    },
    createCommissionSetting (req: CreateAppCommissionSettingRequest, done: () => void) {
      doAction<CreateAppCommissionSettingRequest, CreateAppCommissionSettingResponse>(
        API.CREATE_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: CreateAppCommissionSettingResponse): void => {
          this.CommissionSetting.set(req.TargetAppID, resp.Info)
          done()
        })
    },
    updateCommissionSetting (req: UpdateCommissionSettingRequest, done: () => void) {
      doAction<UpdateCommissionSettingRequest, UpdateCommissionSettingResponse>(
        CommissionAPI.UPDATE_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: UpdateCommissionSettingResponse): void => {
          this.CommissionSetting.set(req.Info.AppID, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
