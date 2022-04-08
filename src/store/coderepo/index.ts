import { defineStore } from 'pinia'
import { doAction } from '../action'
import { useNotificationStore } from '../notifications'
import {
  CodeRepoState,
  GetGoogleTokenRequest,
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  SendSMSCodeRequest,
  SendSMSCodeResponse
} from './types'
import { API } from './const'
import { GoogleTokenType } from '../../const'

export const useCodeRepoStore = defineStore('coderepo', {
  state: (): CodeRepoState => ({
    GoogleToken: new Map<string, string>()
  }),
  getters: {
    getGoogleTokenByType (): (tokenType: GoogleTokenType) => string | undefined {
      return (tokenType: GoogleTokenType) => {
        return this.GoogleToken.get(tokenType)
      }
    }
  },
  actions: {
    sendEmailCode (req: SendEmailCodeRequest) {
      doAction<SendEmailCodeRequest, SendEmailCodeResponse>(
        API.SEND_EMAIL_CODE,
        req,
        req.Message,
        (resp: SendEmailCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
          }
        })
    },
    sendSMSCode (req: SendSMSCodeRequest) {
      doAction<SendSMSCodeRequest, SendSMSCodeResponse>(
        API.SEND_SMS_CODE,
        req,
        req.Message,
        (resp: SendSMSCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
          }
        })
    },
    getGoogleToken (req: GetGoogleTokenRequest, done: (token: string) => void) {
      const recaptcha = req.Recaptcha
      const notification = useNotificationStore()
      if (recaptcha) {
        const { executeRecaptcha, recaptchaLoaded } = recaptcha
        recaptchaLoaded()
          .then((loaded: boolean) => {
            if (loaded) {
              void executeRecaptcha(req.Req)
                .then((token: string) => {
                  this.GoogleToken.set(req.Req, token)
                  done(token)
                })
                .catch((err: Error) => {
                  if (req.Message.Error) {
                    req.Message.Error.Description = err.message
                    notification.Notifications.push(req.Message.Error)
                  }
                })
            }
          })
          .catch((err: Error) => {
            if (req.Message.Error) {
              req.Message.Error.Description = err.message
              notification.Notifications.push(req.Message.Error)
            }
          })
      }
    }
  }
})

export * from './types'
export {
  MessageUsedFor
} from './const'
