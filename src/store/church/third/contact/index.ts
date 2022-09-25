import { defineStore } from 'pinia'
import { Contact } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { CreateAppContactRequest, CreateAppContactResponse, GetAppContactsRequest, GetAppContactsResponse, UpdateAppContactRequest, UpdateAppContactResponse} from './types'


export const useChurchContactStore = defineStore('church-contact-v4', {
  state: () => ({
    Contacts: {
      Contacts: new Map<string, Array<Contact>>(),
      Total: 0
    }
  }),
  getters: {
    getContactsByAppID() : (targetAppID: string) => Array<Contact> {
      return (targetAppID: string) => {
        const data = this.Contacts.Contacts.get(targetAppID)
        return !data ? [] as Array<Contact> : data
      }
    }
  },
  actions: {
    createAppContact (req: CreateAppContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<CreateAppContactRequest, CreateAppContactResponse>(
        API.CREATE_APP_CONTACT,
        req,
        req.Message,
        (resp: CreateAppContactResponse): void => {
          const contacts = this.getContactsByAppID(req.TargetAppID)
          contacts.push(resp.Info)
          this.Contacts.Contacts.set(req.TargetAppID, contacts)
          this.Contacts.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
      })
    },
    getAppContacts (req: GetAppContactsRequest, done: (contacts: Array<Contact>, error: boolean) => void) {
      doActionWithError<GetAppContactsRequest, GetAppContactsResponse>(
        API.GET_APP_CONTACTS,
        req,
        req.Message,
        (resp: GetAppContactsResponse): void => {
          const contacts = this.getContactsByAppID(req.TargetAppID)
          contacts.push(...resp.Infos)
          this.Contacts.Contacts.set(req.TargetAppID, contacts)
          this.Contacts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateAppContact (req: UpdateAppContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<UpdateAppContactRequest, UpdateAppContactResponse>(
        API.UPDATE_APP_CONTACT,
        req,
        req.Message,
        (resp: UpdateAppContactResponse): void => {
          const contacts = this.getContactsByAppID(req.TargetAppID)
          const index = contacts.findIndex((el) => el.ID === resp.Info.ID)
          contacts.splice(index, 1, resp.Info)
          this.Contacts.Contacts.set(req.TargetAppID, contacts)
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
      })
    },
  }
})