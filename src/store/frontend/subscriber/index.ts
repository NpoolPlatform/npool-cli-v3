import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  CreateEmailSubscriberRequest,
  CreateEmailSubscriberResponse,
  SubscriberState
} from './types'

export const useSubscriberStore = defineStore('subscriber', {
  state: (): SubscriberState => ({
  }),
  getters: {},
  actions: {
    createEmailSubscriber (req: CreateEmailSubscriberRequest, done: () => void) {
      doAction<CreateEmailSubscriberRequest, CreateEmailSubscriberResponse>(
        API.CREATE_EMAIL_SUBSCRIBER,
        req,
        req.Message,
        (): void => {
          done()
        })
    }
  }
})

export * from './types'
