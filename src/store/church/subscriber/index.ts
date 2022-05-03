import { defineStore } from 'pinia'
import { EmailSubscriber } from '../../frontend'
import { doActionWithError } from '../../action'
import { API } from './const'
import { SubscriberState } from './state'
import {
  GetAppEmailSubscribersRequest,
  GetAppEmailSubscribersResponse
} from './types'

export const useChurchSubscriberStore = defineStore('churchsubscriber', {
  state: (): SubscriberState => ({
    EmailSubscribers: new Map<string, Array<EmailSubscriber>>()
  }),
  getters: {},
  actions: {
    getEmailSubscribers (req: GetAppEmailSubscribersRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppEmailSubscribersRequest, GetAppEmailSubscribersResponse>(
        API.GET_EMAIL_SUBSCRIBERS,
        req,
        req.Message,
        (resp: GetAppEmailSubscribersResponse): void => {
          this.EmailSubscribers.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
