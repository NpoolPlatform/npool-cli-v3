import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CoinSettingState,
  CreaetCoinSettingResponse,
  CreateCoinSettingRequest,
  GetCoinSettingsRequest,
  GetCoinSettingsResponse,
  UpdateCoinSettingRequest,
  UpdateCoinSettingResponse
} from './types'

export const useCoinSettingStore = defineStore('coinsetting', {
  state: (): CoinSettingState => ({
    CoinSettings: []
  }),
  getters: {},
  actions: {
    getGCoinSetting (req: GetCoinSettingsRequest, done: (error: boolean) => void) {
      doActionWithError<GetCoinSettingsRequest, GetCoinSettingsResponse>(
        API.GET_COIN_SETTINGS,
        req,
        req.Message,
        (resp: GetCoinSettingsResponse): void => {
          this.CoinSettings = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createCoinSetting (req: CreateCoinSettingRequest, done: () => void) {
      doAction<CreateCoinSettingRequest, CreaetCoinSettingResponse>(
        API.CREATE_COIN_SETTING,
        req,
        req.Message,
        (resp: CreaetCoinSettingResponse): void => {
          this.CoinSettings.push(resp.Info)
          done()
        })
    },
    updateCoinSetting (req: UpdateCoinSettingRequest, done: () => void) {
      doAction<UpdateCoinSettingRequest, UpdateCoinSettingResponse>(
        API.UPDATE_COIN_SETTING,
        req,
        req.Message,
        (resp: UpdateCoinSettingResponse): void => {
          const index = this.CoinSettings.findIndex((el) => el.ID === resp.Info.ID)
          this.CoinSettings.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
