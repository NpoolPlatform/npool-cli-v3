import { defineStore } from 'pinia'
import {
  CreateAppMessageRequest,
  CreateAppMessageResponse,
  CreateAppMessagesRequest,
  CreateAppMessagesResponse,
  CreateCountriesRequest,
  CreateCountriesResponse,
  CreateCountryRequest,
  CreateCountryResponse,
  CreateLangRequest,
  CreateLangResponse,
  CreateLangsRequest,
  CreateLangsResponse,
  CreateTargetAppLangRequest,
  CreateTargetAppLangResponse,
  GetAppLangsRequest,
  GetAppLangsResponse,
  GetAppMessagesRequest,
  GetAppMessagesResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  UpdateLangRequest,
  UpdateLangResponse
} from './types'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { LanguageState } from './state'
import { AppLanguage, Language, Message, useLangStore } from '../../frontend'
import { useAdminLangStore } from '../../admin'

export const useChurchLangStore = defineStore('churchlang', {
  state: (): LanguageState => ({
    Languages: new Map<string, Array<Language>>(),
    Messages: new Map<string, Map<string, Array<Message>>>(),
    AppLangs: new Map<string, Array<AppLanguage>>()
  }),
  getters: {},
  actions: {
    createLang (req: CreateLangRequest, done: () => void) {
      doAction<CreateLangRequest, CreateLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateLangResponse): void => {
          const alang = useAdminLangStore()
          alang.Languages.push(resp.Info)
          done()
        })
    },
    createLangs (req: CreateLangsRequest, done: () => void) {
      doAction<CreateLangsRequest, CreateLangsResponse>(
        API.CREATE_LANGS,
        req,
        req.Message,
        (resp: CreateLangsResponse): void => {
          const alang = useAdminLangStore()
          alang.Languages = resp.Infos
          done()
        })
    },
    updateLang (req: UpdateLangRequest, done: () => void) {
      doAction<UpdateLangRequest, UpdateLangResponse>(
        API.UPDATE_LANG,
        req,
        req.Message,
        (resp: UpdateLangResponse): void => {
          const alang = useAdminLangStore()
          const index = alang.Languages.findIndex((el) => el.ID === resp.Info.ID)
          alang.Languages.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
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
    },
    getLangs (req: GetAppLangsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppLangsRequest, GetAppLangsResponse>(
        API.GET_APP_LANGS,
        req,
        req.Message,
        (resp: GetAppLangsResponse): void => {
          this.Languages.set(req.TargetAppID, Array.from(resp.Infos).map((el) => el.Lang))
          this.AppLangs.set(req.TargetAppID, Array.from(resp.Infos).map((el) => el.AppLang))
          done(false)
        }, () => {
          done(true)
        })
    },
    createAppLang (req: CreateTargetAppLangRequest, done: () => void) {
      doAction<CreateTargetAppLangRequest, CreateTargetAppLangResponse>(
        API.CREATE_APP_LANG,
        req,
        req.Message,
        (resp: CreateTargetAppLangResponse): void => {
          const alang = useAdminLangStore()
          const index = alang.Languages.findIndex((el) => el.ID === resp.Info.LangID)
          if (index >= 0) {
            let appLangs = this.AppLangs.get(req.TargetAppID)
            if (!appLangs) {
              appLangs = []
            }
            appLangs.push(resp.Info)
            this.AppLangs.set(req.TargetAppID, appLangs)
            let langs = this.Languages.get(req.TargetAppID)
            if (!langs) {
              langs = []
            }
            langs.push(alang.Languages[index])
            this.Languages.set(req.TargetAppID, langs)
          }
          done()
        })
    },
    getMessages (req: GetAppMessagesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppMessagesRequest, GetAppMessagesResponse>(
        API.GET_MESSAGES,
        req,
        req.Message,
        (resp: GetAppMessagesResponse): void => {
          let appMsgs = this.Messages.get(req.TargetAppID)
          if (!appMsgs) {
            appMsgs = new Map<string, Array<Message>>()
          }
          appMsgs.set(req.TargetLangID as string, resp.Infos)
          this.Messages.set(req.TargetAppID, appMsgs)
          done(false)
        }, () => {
          done(true)
        })
    },
    createMessage (req: CreateAppMessageRequest, done: () => void) {
      doAction<CreateAppMessageRequest, CreateAppMessageResponse>(
        API.CREATE_MESSAGE,
        req,
        req.Message,
        (resp: CreateAppMessageResponse): void => {
          let appMsgs = this.Messages.get(req.TargetAppID)
          if (!appMsgs) {
            appMsgs = new Map<string, Array<Message>>()
          }
          let langMsgs = appMsgs.get(req.TargetLangID)
          if (!langMsgs) {
            langMsgs = []
          }

          langMsgs.push(resp.Info)
          appMsgs.set(req.TargetLangID, langMsgs)
          this.Messages.set(req.TargetAppID, appMsgs)
          done()
        })
    },
    createMessages (req: CreateAppMessagesRequest, done: (error: boolean) => void) {
      doActionWithError<CreateAppMessagesRequest, CreateAppMessagesResponse>(
        API.CREATE_MESSAGES,
        req,
        req.Message,
        (resp: CreateAppMessagesResponse): void => {
          let appMsgs = this.Messages.get(req.TargetAppID)
          if (!appMsgs) {
            appMsgs = new Map<string, Array<Message>>()
          }
          appMsgs.set(req.TargetLangID as string, resp.Infos)
          this.Messages.set(req.TargetAppID, appMsgs)
          done(false)
        }, () => {
          done(true)
        })
    },
  }
})

export * from './types'
