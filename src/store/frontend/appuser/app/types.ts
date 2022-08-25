import { BaseRequest } from '../../../base/notify'

export interface App {
  ID: string;
  CreatedBy: string;
  Name: string;
  Logo: string;
  Description: string;
  BanAppID: string;
  Banned: boolean;
  BanMessage: string;
  SignupMethods: string[];
  ExtSigninMethods: string[];
  RecaptchaMethod: string;
  KycEnable: boolean;
  SigninVerifyEnable: boolean;
  InvitationCodeMust: boolean;
  CreatedAt: number;
}
export interface GetAppRequest extends BaseRequest {
  AppID: string;
}
export interface GetAppResponse {
  Info: App;
}
