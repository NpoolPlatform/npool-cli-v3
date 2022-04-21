import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  PlatformSetting,
  PlatformSettingState,
  UpdatePlatformSettingRequest,
  UpdatePlatformSettingResponse
} from './types'

export const usePlatformSettingStore = defineStore('platformsetting', {
  state: (): PlatformSettingState => ({
    PlatformSetting: undefined as unknown as PlatformSetting
  }),
  getters: {},
  actions: {
    getPlatformSetting (req: GetPlatformSettingRequest, done: () => void) {
      doAction<GetPlatformSettingRequest, GetPlatformSettingResponse>(
        API.GET_PLATFORM_SETTING,
        req,
        req.Message,
        (resp: GetPlatformSettingResponse): void => {
          this.PlatformSetting = resp.Info
          done()
        })
    },
    createPlatformSetting (req: CreatePlatformSettingRequest, done: () => void) {
      doAction<CreatePlatformSettingRequest, CreatePlatformSettingResponse>(
        API.CREATE_PLATFORM_SETTING,
        req,
        req.Message,
        (resp: CreatePlatformSettingResponse): void => {
          this.PlatformSetting = resp.Info
          done()
        })
    },
    updatePlatformSetting (req: UpdatePlatformSettingRequest, done: () => void) {
      doAction<UpdatePlatformSettingRequest, UpdatePlatformSettingResponse>(
        API.UPDATE_PLATFORM_SETTING,
        req,
        req.Message,
        (resp: UpdatePlatformSettingResponse): void => {
          this.PlatformSetting = resp.Info
          done()
        })
    }
  }
})

export * from './types'
