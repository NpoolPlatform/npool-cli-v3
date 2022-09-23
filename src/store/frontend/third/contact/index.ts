import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { ContactViaEmailRequest, ContactViaEmailResponse } from './types'


export const useAdminContactStore = defineStore('admin-contact-v4', {
  state: () => ({}),
  getters: {},
  actions: {
    contactVIAEmail (req: ContactViaEmailRequest, done: (error: boolean) => void) {
      doActionWithError<ContactViaEmailRequest, ContactViaEmailResponse>(
        API.CONTACT_VIAEMAIL,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
      })
    }
  }
})