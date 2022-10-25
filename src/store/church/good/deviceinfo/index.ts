
import { defineStore } from 'pinia'
import { API } from './const'
import { DeviceInfo } from '../../../base'
import { doActionWithError } from '../../../action'
import { CreateDeviceInfoRequest, CreateDeviceInfoResponse, GetDeviceInfoRequest, GetDeviceInfoResponse, GetDeviceInfosRequest, GetDeviceInfosResponse, UpdateDeviceInfoRequest, UpdateDeviceInfoResponse } from './types'

export const useChurchDeviceInfoStore = defineStore('church-deviceinfo-v4', {
  state: () => ({
    DeviceInfos: {
      DeviceInfos: [] as Array<DeviceInfo>,
      Total: 0
    }
  }),
  getters: {
    getDeviceByID () {
      return (ID: string) => {
        return this.DeviceInfos.DeviceInfos.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getDeviceInfo (req: GetDeviceInfoRequest, done: (device: DeviceInfo, error: boolean) => void) {
      doActionWithError<GetDeviceInfoRequest, GetDeviceInfoResponse>(
        API.GET_DEVICEINFO,
        req,
        req.Message,
        (resp: GetDeviceInfoResponse): void => {
          const index = this.DeviceInfos.DeviceInfos.findIndex((el) => el.ID === resp.Info.ID)
          this.DeviceInfos.DeviceInfos.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as DeviceInfo, true)
        })
    },
    getDeviceInfos (req: GetDeviceInfosRequest, done: (devices: Array<DeviceInfo>, error: boolean) => void) {
      doActionWithError<GetDeviceInfosRequest, GetDeviceInfosResponse>(
        API.GET_DEVICEINFOS,
        req,
        req.Message,
        (resp: GetDeviceInfosResponse): void => {
          this.DeviceInfos.DeviceInfos.push(...resp.Infos)
          this.DeviceInfos.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([] as Array<DeviceInfo>, true)
        })
    },
    updateDeviceInfo (req: UpdateDeviceInfoRequest, done: (device: DeviceInfo, error: boolean) => void) {
      doActionWithError<UpdateDeviceInfoRequest, UpdateDeviceInfoResponse>(
        API.UPDATE_DEVICEINFO,
        req,
        req.Message,
        (resp: UpdateDeviceInfoResponse): void => {
          const index = this.DeviceInfos.DeviceInfos.findIndex((el) => el.ID === resp.Info.ID)
          this.DeviceInfos.DeviceInfos.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as DeviceInfo, true)
        })
    },
    createDeviceInfo (req: CreateDeviceInfoRequest, done: (device: DeviceInfo, error: boolean) => void) {
      doActionWithError<CreateDeviceInfoRequest, CreateDeviceInfoResponse>(
        API.CREATE_DEVICEINFO,
        req,
        req.Message,
        (resp: CreateDeviceInfoResponse): void => {
          this.DeviceInfos.DeviceInfos.push(resp.Info)
          this.DeviceInfos.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as DeviceInfo, true)
        })
    }
  }
})
