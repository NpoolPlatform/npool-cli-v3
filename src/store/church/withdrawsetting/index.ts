import { defineStore } from 'pinia'
import { WithdrawSetting, UpdateWithdrawSettingRequest, UpdateWithdrawSettingResponse } from '../../admin'
import { API as WithdrawSettingAPI } from '../../admin/withdrawsetting/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { WithdrawSettingState } from './state'
import {
  CreateAppWithdrawSettingRequest,
  CreateAppWithdrawSettingResponse,
  GetAppWithdrawSettingsRequest,
  GetAppWithdrawSettingsResponse
} from './types'

export const useChurchWithdrawettingStore = defineStore('churchwithdrawsetting', {
  state: (): WithdrawSettingState => ({
    WithdrawSettings: new Map<string, Array<WithdrawSetting>>()
  }),
  getters: {},
  actions: {
    getWithdrawSettings (req: GetAppWithdrawSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppWithdrawSettingsRequest, GetAppWithdrawSettingsResponse>(
        API.GET_WITHDRAW_SETTINGS,
        req,
        req.Message,
        (resp: GetAppWithdrawSettingsResponse): void => {
          this.WithdrawSettings.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createWithdrawSetting (req: CreateAppWithdrawSettingRequest, done: () => void) {
      doAction<CreateAppWithdrawSettingRequest, CreateAppWithdrawSettingResponse>(
        API.CREATE_WITHDRAW_SETTING,
        req,
        req.Message,
        (resp: CreateAppWithdrawSettingResponse): void => {
          let settings = this.WithdrawSettings.get(req.TargetAppID)
          if (!settings) {
            settings = []
          }
          settings.push(resp.Info)
          this.WithdrawSettings.set(req.TargetAppID, settings)
          done()
        })
    },
    updateWithdrawSetting (req: UpdateWithdrawSettingRequest, done: () => void) {
      doAction<UpdateWithdrawSettingRequest, UpdateWithdrawSettingResponse>(
        WithdrawSettingAPI.UPDATE_WITHDRAW_SETTING,
        req,
        req.Message,
        (resp: UpdateWithdrawSettingResponse): void => {
          for (const [k, v] of this.WithdrawSettings) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1, resp.Info)
            this.WithdrawSettings.set(k, v)
            break
          }
          done()
        })
    }
  }
})

export * from './types'
