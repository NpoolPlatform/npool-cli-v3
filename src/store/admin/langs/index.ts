import { defineStore } from 'pinia'
import {
  CreateLangRequest,
  CreateLangResponse,
  GetLangsRequest,
  GetLangsResponse,
  LanguageState
} from './types'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { useLocaleStore } from '../../local'

export const useAdminLangStore = defineStore('adminlang', {
  state: (): LanguageState => ({
    Languages: []
  }),
  getters: {},
  actions: {
    getLangs (req: GetLangsRequest, done: (error: boolean) => void) {
      doActionWithError<GetLangsRequest, GetLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetLangsResponse): void => {
          this.Languages = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createLang (req: CreateLangRequest, done: () => void) {
      doAction<CreateLangRequest, CreateLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateLangResponse): void => {
          const locale = useLocaleStore()
          this.Languages.forEach((lang) => {
            if (lang.ID !== resp.Info.LangID) {
              locale.Languages.push(lang)
            }
          })
          done()
        })
    }
  }
})

export {
  GetLangsRequest as AdminGetLangsRequest,
  GetLangsResponse as AdminGetLangsResponse,
  CreateLangRequest,
  CreateLangResponse
} from './types'
