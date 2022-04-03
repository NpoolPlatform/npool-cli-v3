import { ReqMessage } from '../notifications/types'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { GoogleTokenType } from './const'

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

interface CodeRepoState {
  GoogleToken: Map<string, string>
}

export {
  SendEmailCodeRequest,
  SendEmailCodeResponse,
  GetGoogleTokenRequest,
  GoogleToken,
  SendSMSCodeRequest,
  SendSMSCodeResponse,
  CodeRepoState
}
