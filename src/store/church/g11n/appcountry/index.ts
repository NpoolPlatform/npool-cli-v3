import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppCountriesRequest,
  GetAppCountriesResponse,
  CreateAppCountryRequest,
  CreateAppCountryResponse,
  DeleteAppCountryRequest,
  DeleteAppCountryResponse
} from './types'
import { doActionWithError } from '../../../action'
import { AppCountry } from '../../../base'

export const useChurchAppCountryStore = defineStore('church-appcountry-v4', {
  state: () => ({
    AppCountries: {
      AppCountries: new Map<string, Array<AppCountry>>(),
      Total: 0
    }
  }),
  getters: {
    getCountriesByAppID () {
      return (appID: string) => {
        const data = this.AppCountries.AppCountries.get(appID)
        return !data ? [] as Array<AppCountry> : data
      }
    }
  },
  actions: {
    getAppCountries (req: GetAppCountriesRequest, done: (error: boolean, countries: Array<AppCountry>) => void) {
      doActionWithError<GetAppCountriesRequest, GetAppCountriesResponse>(
        API.GET_APP_APPCOUNTRIES,
        req,
        req.Message,
        (resp: GetAppCountriesResponse): void => {
          const data = this.getCountriesByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.AppCountries.AppCountries.set(req.TargetAppID, data)
          this.AppCountries.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppCountry (req: DeleteAppCountryRequest, done: (error: boolean, country: AppCountry) => void) {
      doActionWithError<DeleteAppCountryRequest, DeleteAppCountryResponse>(
        API.DELETE_APPCOUNTRY,
        req,
        req.Message,
        (resp: DeleteAppCountryResponse): void => {
          const data = this.getCountriesByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index, 1)
          this.AppCountries.AppCountries.set(req.TargetAppID, data)
          this.AppCountries.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCountry)
        }
      )
    },
    createAppCountry (req: CreateAppCountryRequest, done: (error: boolean, country: AppCountry) => void) {
      doActionWithError<CreateAppCountryRequest, CreateAppCountryResponse>(
        API.CREATE_APPCOUNTRY,
        req,
        req.Message,
        (resp: CreateAppCountryResponse): void => {
          const data = this.getCountriesByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.AppCountries.AppCountries.set(req.TargetAppID, data)
          this.AppCountries.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as AppCountry)
        }
      )
    }
  }
})
