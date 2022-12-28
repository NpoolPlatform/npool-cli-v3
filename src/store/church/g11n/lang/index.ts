import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetLangsRequest,
  GetLangsResponse,
  UpdateLangRequest,
  UpdateLangResponse,
  CreateLangRequest,
  CreateLangResponse,
  CreateLangsRequest,
  CreateLangsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Lang } from '../../../base'

export const useChurchLangStore = defineStore('church-lang-v4', {
  state: () => ({
    Langs: {
      Langs: [] as Array<Lang>,
      Total: 0
    }
  }),
  getters: {
    getLangByID () {
      return (ID: string) => {
        return this.Langs.Langs.find((el) => el.ID === ID)
      }
    }
  },
  actions: {
    getLangs (req: GetLangsRequest, done: (error: boolean, rows: Array<Lang>) => void) {
      doActionWithError<GetLangsRequest, GetLangsResponse>(
        API.GET_LANGS,
        req,
        req.Message,
        (resp: GetLangsResponse): void => {
          this.Langs.Langs.push(...resp.Infos)
          this.Langs.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    updateLang (req: UpdateLangRequest, done: (error: boolean, row: Lang) => void) {
      doActionWithError<UpdateLangRequest, UpdateLangResponse>(
        API.UPDATE_LANG,
        req,
        req.Message,
        (resp: UpdateLangResponse): void => {
          const index = this.Langs.Langs.findIndex((el) => el.ID === resp.Info.ID)
          this.Langs.Langs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Lang)
        }
      )
    },
    createLang (req: CreateLangRequest, done: (error: boolean, row: Lang) => void) {
      doActionWithError<CreateLangRequest, CreateLangResponse>(
        API.CREATE_LANG,
        req,
        req.Message,
        (resp: CreateLangResponse): void => {
          const index = this.Langs.Langs.findIndex((el) => el.ID === resp.Info.ID)
          this.Langs.Langs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Lang)
        }
      )
    },
    createLangs (req: CreateLangsRequest, done: (error: boolean, row: Array<Lang>) => void) {
      doActionWithError<CreateLangsRequest, CreateLangsResponse>(
        API.CREATE_LANGS,
        req,
        req.Message,
        (resp: CreateLangsResponse): void => {
          resp.Infos.forEach((al) => {
            const index = this.Langs.Langs.findIndex((el) => el.ID === al.ID)
            this.Langs.Langs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, al)
          })
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Lang>)
        }
      )
    }
  }
})
