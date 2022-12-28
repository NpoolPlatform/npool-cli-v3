import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCountriesRequest,
  GetCountriesResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  CreateCountryRequest,
  CreateCountryResponse,
  CreateCountriesRequest,
  CreateCountriesResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Country } from '../../../base'

export const useChurchCountryStore = defineStore('church-country-v4', {
  state: () => ({
    Countries: {
      Countries: [] as Array<Country>,
      Total: 0
    }
  }),
  getters: {
    getCountryByID () {
      return (ID: string) => {
        return this.Countries.Countries.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getCountries (req: GetCountriesRequest, done: (error: boolean, countries: Array<Country>) => void) {
      doActionWithError<GetCountriesRequest, GetCountriesResponse>(
        API.GET_COUNTRIES,
        req,
        req.Message,
        (resp: GetCountriesResponse): void => {
          this.Countries.Countries.push(...resp.Infos)
          this.Countries.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    updateCountry (req: UpdateCountryRequest, done: (error: boolean, country: Country) => void) {
      doActionWithError<UpdateCountryRequest, UpdateCountryResponse>(
        API.UPDATE_COUNTRY,
        req,
        req.Message,
        (resp: UpdateCountryResponse): void => {
          const index = this.Countries.Countries.findIndex((el) => el.ID === resp.Info.ID)
          this.Countries.Countries.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Country)
        }
      )
    },
    createCountry (req: CreateCountryRequest, done: (error: boolean, country: Country) => void) {
      doActionWithError<CreateCountryRequest, CreateCountryResponse>(
        API.CREATE_COUNTRY,
        req,
        req.Message,
        (resp: CreateCountryResponse): void => {
          const index = this.Countries.Countries.findIndex((el) => el.ID === resp.Info.ID)
          this.Countries.Countries.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Country)
        }
      )
    },
    createCountries (req: CreateCountriesRequest, done: (error: boolean, countries: Array<Country>) => void) {
      doActionWithError<CreateCountriesRequest, CreateCountriesResponse>(
        API.CREATE_COUNTRIES,
        req,
        req.Message,
        (resp: CreateCountriesResponse): void => {
          resp.Infos.forEach((al) => {
            const index = this.Countries.Countries.findIndex((el) => el.ID === al.ID)
            this.Countries.Countries.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, al)
          })
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Country>)
        }
      )
    }
  }
})
