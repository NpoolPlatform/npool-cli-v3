import { defineStore } from 'pinia'
import { API } from './const'
import { VendorLocation } from '../../../base'
import { doActionWithError } from '../../../action'
import { 
  CreateVendorLocationRequest,
  CreateVendorLocationResponse, 
  GetVendorLocationRequest,
  GetVendorLocationResponse,
  GetVendorLocationsRequest, 
  GetVendorLocationsResponse,
  UpdateVendorLocationRequest, 
  UpdateVendorLocationResponse
} from './types'

export const useChurchVendorLocationStore = defineStore('church-vendorlocation-v4', {
  state: () => ({
    VendorLocations: {
      VendorLocations: [] as Array<VendorLocation>,
      Total: 0
    }
  }),
  getters: {
    getVendorLocationByID () {
      return (ID: string) => {
        return this.VendorLocations.VendorLocations.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getVendorLocation (req: GetVendorLocationRequest, done: (vendor: VendorLocation, error: boolean) => void) {
      doActionWithError<GetVendorLocationRequest, GetVendorLocationResponse>(
        API.GET_VENDORLOCATION,
        req,
        req.Message,
        (resp: GetVendorLocationResponse): void => {
          const index = this.VendorLocations.VendorLocations.findIndex((el) => el.ID === resp.Info.ID)
          this.VendorLocations.VendorLocations.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as VendorLocation, true)
        })
    },
    getVendorLocations (req: GetVendorLocationsRequest, done: (vendors: Array<VendorLocation>, error: boolean) => void) {
      doActionWithError<GetVendorLocationsRequest, GetVendorLocationsResponse>(
        API.GET_VENDORLOCATIONS,
        req,
        req.Message,
        (resp: GetVendorLocationsResponse): void => {
          this.VendorLocations.VendorLocations.push(...resp.Infos)
          this.VendorLocations.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([] as Array<VendorLocation>, true)
        })
    },
    updateVendorLocation (req: UpdateVendorLocationRequest, done: (vendor: VendorLocation, error: boolean) => void) {
      doActionWithError<UpdateVendorLocationRequest, UpdateVendorLocationResponse>(
        API.UPDATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: UpdateVendorLocationResponse): void => {
          const index = this.VendorLocations.VendorLocations.findIndex((el) => el.ID === resp.Info.ID)
          this.VendorLocations.VendorLocations.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as VendorLocation, true)
        })
    },
    createVendorLocation (req: CreateVendorLocationRequest, done: (vendor: VendorLocation, error: boolean) => void) {
      doActionWithError<CreateVendorLocationRequest, CreateVendorLocationResponse>(
        API.CREATE_VENDORLOCATION,
        req,
        req.Message,
        (resp: CreateVendorLocationResponse): void => {
          this.VendorLocations.VendorLocations.push(resp.Info)
          this.VendorLocations.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as VendorLocation, true)
        })
    }
  }
})
