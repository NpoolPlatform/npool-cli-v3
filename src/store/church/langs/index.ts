import { defineStore } from 'pinia'
import {
  CreateCountriesRequest,
  CreateCountriesResponse,
  CreateCountryRequest,
  CreateCountryResponse,
  CreateLangRequest,
  CreateLangResponse,
  CreateLangsRequest,
  CreateLangsResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  UpdateLangRequest,
  UpdateLangResponse
} from './types'
import { doAction } from '../../action'
import { API } from './const'
import { LanguageState } from './state'
import { useLangStore } from '../../frontend'

export const useChurchLangStore = defineStore('churchlang', {
  state: (): LanguageState => ({
    Languages: []
  }),
  getters: {},
  actions: {
    createLang (req: CreateLangRequest, done: () => void) {
      doAction<CreateLangRequest, CreateLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateLangResponse): void => {
          this.Languages.push(resp.Info)
          done()
        })
    },
    createLangs (req: CreateLangsRequest, done: () => void) {
      doAction<CreateLangsRequest, CreateLangsResponse>(
        API.CREATE_LANGS,
        req,
        req.Message,
        (resp: CreateLangsResponse): void => {
          this.Languages = resp.Infos
          done()
        })
    },
    updateLang (req: UpdateLangRequest, done: () => void) {
      doAction<UpdateLangRequest, UpdateLangResponse>(
        API.UPDATE_LANG,
        req,
        req.Message,
        (resp: UpdateLangResponse): void => {
          const index = this.Languages.findIndex((el) => el.ID === resp.Info.ID)
          this.Languages.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    createCountry (req: CreateCountryRequest, done: () => void) {
      doAction<CreateCountryRequest, CreateCountryResponse>(
        API.CREATE_COUNTRY,
        req,
        req.Message,
        (resp: CreateCountryResponse): void => {
          const flang = useLangStore()
          flang.Countries.push(resp.Info)
          done()
        })
    },
    createCountries (req: CreateCountriesRequest, done: () => void) {
      doAction<CreateCountriesRequest, CreateCountriesResponse>(
        API.CREATE_COUNTRIES,
        req,
        req.Message,
        (resp: CreateCountriesResponse): void => {
          const flang = useLangStore()
          flang.Countries = resp.Infos
          done()
        })
    },
    updateCountry (req: UpdateCountryRequest, done: () => void) {
      doAction<UpdateCountryRequest, UpdateCountryResponse>(
        API.UPDATE_COUNTRY,
        req,
        req.Message,
        (resp: UpdateCountryResponse): void => {
          const flang = useLangStore()
          const index = flang.Countries.findIndex((el) => el.ID === resp.Info.ID)
          flang.Countries.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
