import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { SendCodeResponse, SendCodeRequest } from './types'


export const useFrontendVerifyStore = defineStore('frontend-verify-v4', {
  state: () => ({}),
  getters: {},
  actions: {
    createTransfer (req: SendCodeRequest, done: (code: null, error: boolean) => void) {
      doActionWithError<SendCodeRequest, SendCodeResponse>(
        API.SEND_CODE,
        req,
        req.Message,
        (): void => {
          done(null, false)
        }, () => {
          done(null, true)
      })
    },
  }
})