import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { SubscriberState } from './state'
import {
  GetEmailSubscribersRequest,
  GetEmailSubscribersResponse
} from './types'

export const useAdminSubscriberStore = defineStore('adminsubscriber', {
  state: (): SubscriberState => ({
    EmailSubscribers: []
  }),
  getters: {},
  actions: {
    getEmailSubscribers (req: GetEmailSubscribersRequest, done: (error: boolean) => void) {
      doActionWithError<GetEmailSubscribersRequest, GetEmailSubscribersResponse>(
        API.GET_EMAIL_SUBSCRIBERS,
        req,
        req.Message,
        (resp: GetEmailSubscribersResponse): void => {
          this.EmailSubscribers = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
