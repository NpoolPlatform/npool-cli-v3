import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { SendCodeResponse, SendCodeRequest } from './types'


export const useFrontendVerifyStore = defineStore('frontend-verify-v4', {
  state: () => ({}),
  getters: {},
  actions: {
    sendCode (req: SendCodeRequest, done: (error: boolean) => void) {
      doActionWithError<SendCodeRequest, SendCodeResponse>(
        API.SEND_CODE,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
      })
    },
  }
})