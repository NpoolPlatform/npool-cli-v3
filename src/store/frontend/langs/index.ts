import { defineStore } from 'pinia'
import {
  Country,
  GetCountriesRequest,
  GetCountriesResponse,
  GetLangMessagesRequest,
  GetLangMessagesResponse,
  GetLangsRequest,
  GetLangsResponse,
  Language,
  LanguageState
} from './types'
import { doActionWithError } from '../../action'
import { API } from './const'
import { useI18n } from 'vue-i18n'
import { useLocaleStore } from '../../local/locale'

export const useLangStore = defineStore('lang', {
  state: (): LanguageState => ({
    Countries: [],
    I18n: useI18n()
  }),
  getters: {
    getCountryByID (): (id: string) => Country {
      return (id: string) => {
        for (const country of this.Countries) {
          if (country.ID === id) {
            return country
          }
        }
        return undefined as unknown as Country
      }
    }
  },
  actions: {
    getLangs (req: GetLangsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetLangsRequest, GetLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetLangsResponse): void => {
          const locale = useLocaleStore()
          locale.setLangs(Array.from(resp.Infos, (info) => info.Lang))
          this.setLang(locale.CurLang as Language)
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getLangMessages (req: GetLangMessagesRequest, done?: (error: boolean) => void) {
      doActionWithError<GetLangMessagesRequest, GetLangMessagesResponse>(
        API.GET_LANG_MESSAGES,
        req,
        req.Message,
        (resp: GetLangMessagesResponse): void => {
          const locale = useLocaleStore()
          locale.updateLocaleMessage(resp.Infos)
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getCountries (req: GetCountriesRequest, done: (error: boolean) => void) {
      doActionWithError<GetCountriesRequest, GetCountriesResponse>(
        API.GET_COUNTRIES,
        req,
        req.Message,
        (resp: GetCountriesResponse): void => {
          this.Countries = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    setLang (lang: Language) {
      const locale = useLocaleStore()
      locale.setLang(lang)
    }
  }
})

export * from './types'
