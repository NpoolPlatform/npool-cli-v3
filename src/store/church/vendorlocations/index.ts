import { defineStore } from 'pinia'
import { VendorLocation } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  VendorLocationState,
  GetVendorLocationsRequest,
  GetVendorLocationsResponse,
  UpdateVendorLocationRequest,
  UpdateVendorLocationResponse
} from './types'

export const useVendorLocationStore = defineStore('vendorlocation', {
  state: (): VendorLocationState => ({
    VendorLocations: []
  }),
  getters: {
    getVendorLocationByID (): (locationID: string) => VendorLocation {
      return (locationID: string) => {
        const index = this.VendorLocations.findIndex((loc) => loc.ID === locationID)
        if (index < 0) {
          return undefined as unknown as VendorLocation
        }
        return this.VendorLocations[index]
      }
    }
  },
  actions: {
    getVendorLocations (req: GetVendorLocationsRequest, done: (error: boolean) => void) {
      doActionWithError<GetVendorLocationsRequest, GetVendorLocationsResponse>(
        API.GET_VENDOR_LOCATIONS,
        req,
        req.Message,
        (resp: GetVendorLocationsResponse): void => {
          this.VendorLocations = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createVendorLocation (req: CreateVendorLocationRequest, done: () => void) {
      doAction<CreateVendorLocationRequest, CreateVendorLocationResponse>(
        API.CREATE_VENDOR_LOCATION,
        req,
        req.Message,
        (resp: CreateVendorLocationResponse): void => {
          this.VendorLocations.splice(0, 0, resp.Info)
          done()
        })
    },
    updateVendorLocation (req: UpdateVendorLocationRequest, done: () => void) {
      doAction<UpdateVendorLocationRequest, UpdateVendorLocationResponse>(
        API.UPDATE_VENDOR_LOCATION,
        req,
        req.Message,
        (resp: UpdateVendorLocationResponse): void => {
          const index = this.VendorLocations.findIndex((el) => el.ID === resp.Info.ID)
          this.VendorLocations.splice(index< 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
