import { defineStore } from 'pinia'
import { Contact } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { CreateContactRequest, CreateContactResponse, GetContactsRequest, GetContactsResponse, UpdateContactRequest, UpdateContactResponse } from './types'


export const useAdminContactStore = defineStore('admin-contact-v4', {
  state: () => ({
    Contacts: {
      Contacts: [] as Array<Contact>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    createContact (req: CreateContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<CreateContactRequest, CreateContactResponse>(
        API.CREATE_CONTACT,
        req,
        req.Message,
        (resp: CreateContactResponse): void => {
          this.Contacts.Contacts.push(resp.Info)
          this.Contacts.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
      })
    },
    getContacts (req: GetContactsRequest, done: (contacts: Array<Contact>, error: boolean) => void) {
      doActionWithError<GetContactsRequest, GetContactsResponse>(
        API.GET_CONTACTS,
        req,
        req.Message,
        (resp: GetContactsResponse): void => {
          this.Contacts.Contacts.push(...resp.Infos)
          this.Contacts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateContact (req: UpdateContactRequest, done: (contact: Contact, error: boolean) => void) {
      doActionWithError<UpdateContactRequest, UpdateContactResponse>(
        API.UPDATE_CONTACT,
        req,
        req.Message,
        (resp: UpdateContactResponse): void => {
          const index = this.Contacts.Contacts.findIndex((el) => el.ID === resp.Info.ID)
          this.Contacts.Contacts.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Contact, true)
      })
    },
  }
})