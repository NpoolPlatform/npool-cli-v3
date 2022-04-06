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
import { doAction } from '../action'
import { API } from './const'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import { NotificationType } from '../notifications'

export const useLangStore = defineStore('lang', {
  state: (): LanguageState => ({
    Languages: [],
    Messages: {},
    CurLang: undefined,
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
          this.Languages = []
          resp.Infos.forEach((lang) => {
            if (!this.CurLang) {
              this.setLang(lang.Lang)
            }
            this.Languages.push(lang.Lang)
          })
        })
    },
    getLangMessages (req: GetLangMessagesRequest) {
      doAction<GetLangMessagesRequest, GetLangMessagesResponse>(
        API.GET_LANG_MESSAGES,
        req,
        req.Message,
        (resp: GetLangMessagesResponse): void => {
          let messages = this.Messages[this.CurLang?.Lang as string]
          if (!messages) {
            messages = {}
          }
          resp.Infos.forEach((msg) => {
            messages[msg.MessageID] = msg.Message
          })
          this.Messages[this.CurLang?.Lang as string] = messages
          this.updateLocaleMessage()
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
      this.CurLang = lang
      Cookies.set('X-Lang-ID', lang.ID, { expires: '4h', secure: true })
      this.I18n.locale = lang.Lang
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
    },
    updateLocaleMessage () {
      const oldMessages = this.I18n.getLocaleMessage(this.CurLang?.Lang as string)
      const newMessages = this.Messages[this.CurLang?.Lang as string]
    
      if (!newMessages) {
        return
      }
    
      Object.keys(newMessages).forEach((key) => {
        oldMessages[key] = newMessages[key]
      })
    
      this.I18n.setLocaleMessage(this.CurLang?.Lang as string, oldMessages)
    }
  }
})

export * from './types'
