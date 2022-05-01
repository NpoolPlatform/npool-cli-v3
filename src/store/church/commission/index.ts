import { defineStore } from 'pinia'
import {
  CommissionSetting,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse,
  useCommissionStore
} from '../../admin'
import { API as CommissionAPI } from '../../admin/commission/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { CommissionState } from './state'
import {
  CreateAppCommissionSettingRequest,
  CreateAppCommissionSettingResponse,
  CreateCommissionCoinSettingResponse,
  GetAppCommissionSettingRequest,
  GetAppCommissionSettingResponse,
  UpdateCommissionCoinSettingRequest,
  UpdateCommissionCoinSettingResponse
} from './types'
import { CreateCommissionCoinSettingRequest } from '..'

export const useChurchCommissionStore = defineStore('churchcommission', {
  state: (): CommissionState => ({
    CommissionSettings: new Map<string, CommissionSetting>()
  }),
  getters: {},
  actions: {
    getCommissionSetting (req: GetAppCommissionSettingRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppCommissionSettingRequest, GetAppCommissionSettingResponse>(
        API.GET_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: GetAppCommissionSettingResponse): void => {
          this.CommissionSettings.set(req.TargetAppID, resp.Info)
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
          this.CommissionSettings.set(req.TargetAppID, resp.Info)
          done()
        })
    },
    updateCommissionSetting (req: UpdateCommissionSettingRequest, done: () => void) {
      doAction<UpdateCommissionSettingRequest, UpdateCommissionSettingResponse>(
        CommissionAPI.UPDATE_COMMISSION_SETTING,
        req,
        req.Message,
        (resp: UpdateCommissionSettingResponse): void => {
          this.CommissionSettings.set(req.Info.AppID, resp.Info)
          done()
        })
    },
    createCommissionCoinSetting (req: CreateCommissionCoinSettingRequest, done: () => void) {
      doAction<CreateCommissionCoinSettingRequest, CreateCommissionCoinSettingResponse>(
        API.CREATE_COMMISSION_COIN_SETTING,
        req,
        req.Message,
        (resp: CreateCommissionCoinSettingResponse): void => {
          const c = useCommissionStore()
          c.CommissionCoinSettings.splice(0, 0, resp.Info)
          done()
        })
    },
    updateCommissionCoinSetting (req: UpdateCommissionCoinSettingRequest, done: () => void) {
      doAction<UpdateCommissionCoinSettingRequest, UpdateCommissionCoinSettingResponse>(
        API.UPDATE_COMMISSION_COIN_SETTING,
        req,
        req.Message,
        (resp: UpdateCommissionCoinSettingResponse): void => {
          const c = useCommissionStore()
          const index = c.CommissionCoinSettings.findIndex((el) => el.ID === resp.Info.ID)
          c.CommissionCoinSettings.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
