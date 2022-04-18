import { defineStore } from 'pinia'
import {
  CreateAppLangRequest,
  CreateAppLangResponse,
  CreateMessageRequset,
  CreateMessageResponse,
  CreateMessagesRequest,
  CreateMessagesResponse,
  GetAllLangsRequest,
  GetAllLangsResponse,
  UpdateMessageRequset,
  UpdateMessageResponse
} from './types'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { useLocaleStore } from '../../local'
import { LanguageState } from './state'

export const useAdminLangStore = defineStore('adminlang', {
  state: (): LanguageState => ({
    Languages: []
  }),
  getters: {},
  actions: {
    getLangs (req: GetAllLangsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAllLangsRequest, GetAllLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetAllLangsResponse): void => {
          this.Languages = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createLang (req: CreateAppLangRequest, done: () => void) {
      doAction<CreateAppLangRequest, CreateAppLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateAppLangResponse): void => {
          const locale = useLocaleStore()
          this.Languages.forEach((lang) => {
            if (lang.ID !== resp.Info.LangID) {
              locale.Languages.push(lang)
            }
          })
          done()
        })
    },
    createMessage (req: CreateMessageRequset, done: () => void) {
      doAction<CreateMessageRequset, CreateMessageResponse>(
        API.CREATE_MESSAGE,
        req,
        req.Message,
        (resp: CreateMessageResponse): void => {
          const locale = useLocaleStore()
          locale.updateLocaleMessage([resp.Info])
          done()
        })
    },
    createMessages (req: CreateMessagesRequest, done: () => void) {
      doAction<CreateMessagesRequest, CreateMessagesResponse>(
        API.CREATE_MESSAGES,
        req,
        req.Message,
        (resp: CreateMessagesResponse): void => {
          const locale = useLocaleStore()
          locale.updateLocaleMessage(resp.Infos)
          done()
        })
    },
    updateMessage (req: UpdateMessageRequset, done: () => void) {
      doAction<UpdateMessageRequset, UpdateMessageResponse>(
        API.UPDATE_MESSAGE,
        req,
        req.Message,
        (resp: UpdateMessageResponse): void => {
          const locale = useLocaleStore()
          locale.updateLocaleMessage([resp.Info])
          done()
        })
    }
  }
})

export * from './types'
