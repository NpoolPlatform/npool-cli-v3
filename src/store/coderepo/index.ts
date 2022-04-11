import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../action'
import { NotificationType, useNotificationStore } from '../notifications'
import {
  CodeRepoState,
  GetGoogleTokenRequest,
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  SendSMSCodeRequest,
  SendSMSCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  VerifyGoogleAuthenticationCodeRequest,
  VerifyGoogleAuthenticationCodeResponse,
  VerifySMSCodeRequest,
  VerifySMSCodeResponse
} from './types'
import { API, MessageUsedFor } from './const'
import { AccountType, GoogleTokenType } from '../../const'
import { useLangStore } from '../langs'
import { useI18n } from 'vue-i18n'

export const useCodeRepoStore = defineStore('coderepo', {
  state: (): CodeRepoState => ({
    GoogleToken: new Map<string, string>(),
    I18n: useI18n()
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
    sendVerificationCode (account: string, accountType: AccountType, usedFor: MessageUsedFor, toUsername: string) {
      const lang = useLangStore()
      switch (accountType) {
        case AccountType.Email:
          this.sendEmailCode({
            LangID: lang.CurLang?.ID as string,
            EmailAddress: account,
            UsedFor: usedFor,
            ToUsername: toUsername,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_EMAIL_CODE'),
                Message: this.I18n.t('MSG_SEND_EMAIL_CODE_FAIL'),
                Popup: true,
                Type: NotificationType.Error
              }
            }
          })
          break
        case AccountType.Mobile:
          this.sendSMSCode({
            LangID: lang.CurLang?.ID as string,
            PhoneNO: account,
            UsedFor: usedFor,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_SEND_SMS_CODE'),
                Message: this.I18n.t('MSG_SEND_SMS_CODE_FAIL'),
                Popup: true,
                Type: NotificationType.Error
              }
            }
          })
          break
      }
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
    verifyGoogleAuthenticationCode (req: VerifyGoogleAuthenticationCodeRequest, done: (error: boolean) => void) {
      doActionWithError<VerifyGoogleAuthenticationCodeRequest, VerifyGoogleAuthenticationCodeResponse>(
        API.VERIFY_GOOGLE_AUTHENTICATION,
        req,
        req.NotifyMessage,
        (resp: VerifyGoogleAuthenticationCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.NotifyMessage.Error) {
              req.NotifyMessage.Error.Description = resp.Message
              notification.Notifications.push(req.NotifyMessage.Error)
            }
            done(true)
          } else {
            done(false)
          }
        }, () => {
          done(true)
        })
    },
    verifyEmailCode (req: VerifyEmailCodeRequest, done: (error: boolean) => void) {
      doActionWithError<VerifyEmailCodeRequest, VerifyEmailCodeResponse>(
        API.VERIFY_EMAIL_CODE,
        req,
        req.Message,
        (resp: VerifyEmailCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
            done(true)
          } else {
            done(false)
          }
        }, () => {
          done(true)
        })
    },
    verifySMSCode (req: VerifySMSCodeRequest, done: (error: boolean) => void) {
      doActionWithError<VerifySMSCodeRequest, VerifySMSCodeResponse>(
        API.VERIFY_SMS_CODE,
        req,
        req.Message,
        (resp: VerifySMSCodeResponse): void => {
          const notification = useNotificationStore()
          if (resp.Code < 0) {
            if (req.Message.Error) {
              req.Message.Error.Description = resp.Message
              notification.Notifications.push(req.Message.Error)
            }
            done(true)
          } else {
            done(false)
          }
        }, () => {
          done(true)
        })
    },
    verifyCode (accountType: AccountType, usedFor: MessageUsedFor, code: string, done: (error: boolean) => void) {
      switch (accountType) {
        case AccountType.Email:
          this.verifyEmailCode({
            Code: code,
            usedFor: usedFor,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_VERIFY_CODE_FAIL'),
                Popup: true,
                Type: NotificationType.Error
              }
            }
          }, done)
          break
        case AccountType.Mobile:
          this.verifySMSCode({
            Code: code,
            usedFor: usedFor,
            Message: {
              Error: {
                Title: this.I18n.t('MSG_VERIFY_CODE_FAIL'),
                Popup: true,
                Type: NotificationType.Error
              }
            }
          }, done)
          break
        case AccountType.Google:
          this.verifyGoogleAuthenticationCode({
            Code: code,
            NotifyMessage: {
              Error: {
                Title: this.I18n.t('MSG_VERIFY_CODE_FAIL'),
                Popup: true,
                Type: NotificationType.Error
              }
            }
          }, done)
          break
      }
    }
  }
})

export * from './types'
export {
  MessageUsedFor
} from './const'
