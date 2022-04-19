import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateDeviceRequest,
  CreateDeviceResponse,
  DeviceState,
  GetDevicesRequest,
  GetDevicesResponse,
  UpdateDeviceRequest,
  UpdateDeviceResponse
} from './types'

export const useDeviceStore = defineStore('device', {
  state: (): DeviceState => ({
    Devices: []
  }),
  getters: {},
  actions: {
    getDevice (req: GetDevicesRequest, done: (error: boolean) => void) {
      doActionWithError<GetDevicesRequest, GetDevicesResponse>(
        API.GET_DEVICES,
        req,
        req.Message,
        (resp: GetDevicesResponse): void => {
          this.Devices = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createDevice (req: CreateDeviceRequest, done: () => void) {
      doAction<CreateDeviceRequest, CreateDeviceResponse>(
        API.CREATE_DEVICE,
        req,
        req.Message,
        (resp: CreateDeviceResponse): void => {
          this.Devices.splice(0, 0, resp.Info)
          done()
        })
    },
    updateDevice (req: UpdateDeviceRequest, done: () => void) {
      doAction<UpdateDeviceRequest, UpdateDeviceResponse>(
        API.UPDATE_DEVICE,
        req,
        req.Message,
        (resp: UpdateDeviceResponse): void => {
          const index = this.Devices.findIndex((el) => el.ID === resp.Info.ID)
          this.Devices.splice(index< 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
