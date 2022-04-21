import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  GetWithdrawSettingsRequest,
  GetWithdrawSettingsResponse,
  CreateWithdrawSettingRequest,
  CreateWithdrawSettingResponse,
  UpdateWithdrawSettingRequest,
  UpdateWithdrawSettingResponse,
  WithdrawSettingState
} from './types'

export const useWithdrawSettingStore = defineStore('withdrawsetting', {
  state: (): WithdrawSettingState => ({
    WithdrawSettings: []
  }),
  getters: {},
  actions: {
    getWithdrawSetting (req: GetWithdrawSettingsRequest, done: () => void) {
      doAction<GetWithdrawSettingsRequest, GetWithdrawSettingsResponse>(
        API.GET_WITHDRAW_SETTINGS,
        req,
        req.Message,
        (resp: GetWithdrawSettingsResponse): void => {
          this.WithdrawSettings = resp.Infos
          done()
        })
    },
    createWithdrawSetting (req: CreateWithdrawSettingRequest, done: () => void) {
      doAction<CreateWithdrawSettingRequest, CreateWithdrawSettingResponse>(
        API.CREATE_WITHDRAW_SETTING,
        req,
        req.Message,
        (resp: CreateWithdrawSettingResponse): void => {
          this.WithdrawSettings.push(resp.Info)
          done()
        })
    },
    updateWithdrawSetting (req: UpdateWithdrawSettingRequest, done: () => void) {
      doAction<UpdateWithdrawSettingRequest, UpdateWithdrawSettingResponse>(
        API.UPDATE_WITHDRAW_SETTING,
        req,
        req.Message,
        (resp: UpdateWithdrawSettingResponse): void => {
          const index = this.WithdrawSettings.findIndex((el) => el.ID === resp.Info.ID)
          this.WithdrawSettings.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
