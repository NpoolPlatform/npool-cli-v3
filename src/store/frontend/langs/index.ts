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
import { doAction } from '../../action'
import { API } from './const'
import { useI18n } from 'vue-i18n'
import { NotificationType } from '../../local/notifications'
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
    getLangs (req: GetLangsRequest) {
      doAction<GetLangsRequest, GetLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetLangsResponse): void => {
          const locale = useLocaleStore()
          locale.setLangs(Array.from(resp.Infos, (info) => info.Lang))
          this.setLang(locale.CurLang)
        })
    },
    getLangMessages (req: GetLangMessagesRequest) {
      doAction<GetLangMessagesRequest, GetLangMessagesResponse>(
        API.GET_LANG_MESSAGES,
        req,
        req.Message,
        (resp: GetLangMessagesResponse): void => {
          const locale = useLocaleStore()
          locale.updateLocaleMessage(resp.Infos)
        })
    },
    getCountries (req: GetCountriesRequest, done: () => void) {
      doAction<GetCountriesRequest, GetCountriesResponse>(
        API.GET_COUNTRIES,
        req,
        req.Message,
        (resp: GetCountriesResponse): void => {
          this.Countries = resp.Infos
          done()
        })
    },
    setLang (lang: Language) {
      const locale = useLocaleStore()
      locale.setLang(lang)

      this.getLangMessages({
        LangID: lang.ID,
        Message: {
          Error: {
            Title: this.I18n.t('MSG_GET_LANG_MESSAGES'),
            Message: this.I18n.t('MSG_GET_LANG_MESSAGES_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
    }
  }
})

export * from './types'
