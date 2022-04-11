import { ReqMessage } from '../notifications/types'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { GoogleTokenType } from '../../const'
import { Composer } from 'vue-i18n'

interface SendEmailCodeRequest {
  LangID: string
  EmailAddress: string
  UsedFor: string
  ToUsername?: string
  Message: ReqMessage
}

interface SendEmailCodeResponse {
  Code: number
  Message: string
}

interface SendSMSCodeRequest {
  LangID: string
  UsedFor: string
  PhoneNO: string
  Message: ReqMessage
}

interface SendSMSCodeResponse {
  Code: number
  Message: string
}

interface GetGoogleTokenRequest {
  Recaptcha: IReCaptchaComposition | undefined
  Req: GoogleTokenType
  Message: ReqMessage
}

interface GoogleToken {
  Req: GoogleTokenType
  Token: string
}

interface VerifyGoogleAuthenticationCodeRequest {
  Code: string
  NotifyMessage: ReqMessage
}

interface VerifyGoogleAuthenticationCodeResponse {
  Code: number
  Message: string
}

interface VerifyEmailCodeRequest {
  UsedFor: string
  Code: string
  Message: ReqMessage
}

interface VerifyEmailCodeResponse {
  Code: number
  Message: string
}

interface VerifySMSCodeRequest {
  UsedFor: string
  Code: string
  Message: ReqMessage
}

interface VerifySMSCodeResponse {
  Code: number
  Message: string
}

interface ContactByEmailRequest {
  UsedFor: string
  Sender: string
  Subject: string
  Body: string
  SenderName: string
}

interface ContactByEmailResponse {
  Info: string
}

interface CodeRepoState {
  GoogleToken: Map<string, string>
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  GetGoogleTokenRequest,
  GoogleToken,
  SendSMSCodeRequest,
  SendSMSCodeResponse,
  VerifyGoogleAuthenticationCodeRequest,
  VerifyGoogleAuthenticationCodeResponse,
  VerifyEmailCodeRequest,
  VerifyEmailCodeResponse,
  VerifySMSCodeRequest,
  VerifySMSCodeResponse,
  ContactByEmailRequest,
  ContactByEmailResponse,
  CodeRepoState
}
