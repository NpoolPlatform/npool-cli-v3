import { AccountType, BaseRequest, ReqMessage, SignMethodType, UsedFor } from '../../../base'
import { IReCaptchaComposition } from 'vue-recaptcha-v3'
import { GoogleTokenType } from '../../../../const'
export interface SendCodeRequest extends BaseRequest {
  Account: string;
  AccountType: SignMethodType | AccountType;
  UsedFor: UsedFor;
  ToUsername: string;
}

export interface SendCodeResponse{
}

export interface GetGoogleTokenRequest {
  Recaptcha: IReCaptchaComposition | undefined;
  Req: GoogleTokenType;
  Message: ReqMessage;
}

export interface GoogleToken {
  Req: GoogleTokenType;
  Token: string;
}