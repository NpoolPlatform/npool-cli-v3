import { defineStore } from 'pinia'
import { doAction, doActionWithError } from 'src/store/action'
import { Contact, EmailTemplate, SMSTemplate, UpdateContactRequest, UpdateContactResponse, UpdateEmailTemplateRequest, UpdateEmailTemplateResponse, UpdateSMSTemplateRequest, UpdateSMSTemplateResponse } from '../../admin'
import { API } from './const'
import { TemplateState } from './state'
import {
  CreateAppContactRequest,
  CreateAppContactResponse,
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse,
  GetAppContactsRequest,
  GetAppContactsResponse,
  GetAppEmailTempatesRequest,
  GetAppEmailTemplatesResponse,
  GetAppSMSTempatesRequest,
  GetAppSMSTemplatesResponse
} from './types'
import { API as AdminTemplateAPI } from '../../admin/template/const'

export const useChurchTemplateStore = defineStore('churchtemplate', {
  state: (): TemplateState => ({
    Contacts: new Map<string, Array<Contact>>(),
    EmailTemplates: new Map<string, Array<EmailTemplate>>(),
    SMSTemplates: new Map<string, Array<SMSTemplate>>()
  }),
  getters: {},
  actions: {
    getContacts (req: GetAppContactsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppContactsRequest, GetAppContactsResponse>(
        API.GET_CONTACTS,
        req,
        req.Message,
        (resp: GetAppContactsResponse): void => {
          this.Contacts.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createContact (req: CreateAppContactRequest, done: () => void) {
      doAction<CreateAppContactRequest, CreateAppContactResponse>(
        API.CREATE_CONTACT,
        req,
        req.Message,
        (resp: CreateAppContactResponse): void => {
          let contacts = this.Contacts.get(req.TargetAppID)
          if (!contacts) {
            contacts = []
          }
          contacts.push(resp.Info)
          this.Contacts.set(req.TargetAppID, contacts)
          done()
        })
    },
    updateContact (req: UpdateContactRequest, done: () => void) {
      doAction<UpdateContactRequest, UpdateContactResponse>(
        AdminTemplateAPI.UPDATE_CONTACT,
        req,
        req.Message,
        (resp: UpdateContactResponse): void => {
          for (const [k, v] of this.Contacts) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              return
            }
            v.splice(index, 1, resp.Info)
            this.Contacts.set(k, v)
          }
          done()
        })
    },

    getEmailTemplates (req: GetAppEmailTempatesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppEmailTempatesRequest, GetAppEmailTemplatesResponse>(
        API.GET_EMAIL_TEMPALTES,
        req,
        req.Message,
        (resp: GetAppEmailTemplatesResponse): void => {
          this.EmailTemplates.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createEmailTemplate (req: CreateAppEmailTemplateRequest, done: () => void) {
      doAction<CreateAppEmailTemplateRequest, CreateAppEmailTemplateResponse>(
        API.CREATE_EMAIL_TEMPLATE,
        req,
        req.Message,
        (resp: CreateAppEmailTemplateResponse): void => {
          let templates = this.EmailTemplates.get(req.TargetAppID)
          if (!templates) {
            templates = []
          }
          templates.push(resp.Info)
          this.EmailTemplates.set(req.TargetAppID, templates)
          done()
        })
    },
    updateEmailTemplate (req: UpdateEmailTemplateRequest, done: () => void) {
      doAction<UpdateEmailTemplateRequest, UpdateEmailTemplateResponse>(
        AdminTemplateAPI.UPDATE_EMAIL_TEMPLATE,
        req,
        req.Message,
        (resp: UpdateEmailTemplateResponse): void => {
          for (const [k, v] of this.EmailTemplates) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              return
            }
            v.splice(index, 1, resp.Info)
            this.EmailTemplates.set(k, v)
          }
          done()
        })
    },

    getSMSTemplates (req: GetAppSMSTempatesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppSMSTempatesRequest, GetAppSMSTemplatesResponse>(
        API.GET_SMS_TEMPALTES,
        req,
        req.Message,
        (resp: GetAppSMSTemplatesResponse): void => {
          this.SMSTemplates.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createSMSTemplate (req: CreateAppSMSTemplateRequest, done: () => void) {
      doAction<CreateAppSMSTemplateRequest, CreateAppSMSTemplateResponse>(
        API.CREATE_SMS_TEMPLATE,
        req,
        req.Message,
        (resp: CreateAppSMSTemplateResponse): void => {
          let templates = this.SMSTemplates.get(req.TargetAppID)
          if (!templates) {
            templates = []
          }
          templates.push(resp.Info)
          this.SMSTemplates.set(req.TargetAppID, templates)
          done()
        })
    },
    updateSMSTemplate (req: UpdateSMSTemplateRequest, done: () => void) {
      doAction<UpdateSMSTemplateRequest, UpdateSMSTemplateResponse>(
        AdminTemplateAPI.UPDATE_SMS_TEMPLATE,
        req,
        req.Message,
        (resp: UpdateSMSTemplateResponse): void => {
          for (const [k, v] of this.SMSTemplates) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              return
            }
            v.splice(index, 1, resp.Info)
            this.SMSTemplates.set(k, v)
          }
          done()
        })
    }
  }
})
