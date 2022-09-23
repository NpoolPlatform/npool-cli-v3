import { defineStore } from 'pinia'
import { doAction } from '../../../action'
import { API } from './const'
import { SendCodeResponse, SendCodeRequest, GetGoogleTokenRequest } from './types'
import { AccountType, NotifyType, UsedFor } from '../../../base'
import { useI18n } from 'vue-i18n'
import { useNotificationStore } from '../../../local'

export const useFrontendVerifyStore = defineStore('frontend-verify-v4', {
  state: () => ({
    GoogleToken: new Map<string, string>(),
    I18n: useI18n()
  }),
  getters: {},
  actions: {
    sendVerificationCode (account: string, accountType: AccountType, usedFor: UsedFor, toUsername: string) {
      switch(accountType) {
        case AccountType.Email:
          this.sendCode({
            Account: account, 
            AccountType: accountType, 
            UsedFor: usedFor, 
            ToUsername: toUsername, 
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_EMAIL_CODE'),
                Message: this.I18n.t('MSG_SEND_EMAIL_CODE_FAIL'),
                Popup: true,
                Type: NotifyType.Error
              }
            }
          })
          break
        case AccountType.Mobile: 
          this.sendCode({
            Account: account, 
            AccountType: accountType, 
            UsedFor: usedFor, 
            ToUsername: toUsername, 
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_SMS_CODE'),
                Message: this.I18n.t('MSG_SEND_SMS_CODE_FAIL'),
                Popup: true,
                Type: NotifyType.Error
              }
            }
          })
          break
      }
    },
    sendCode (req: SendCodeRequest) {
      doAction<SendCodeRequest, SendCodeResponse>(
        API.SEND_CODE,
        req,
        req.Message,
        (): void => {
          // TODO
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
    },
  }
})