import { App, BaseRequest, RecaptchaType, SignMethodType } from '../../../base'

export interface GetAppsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetAppsResponse {
  Infos: Array<App>;
  Total: number;
}

export interface UpdateAppRequest extends BaseRequest {
  ID:                 string;
  CreatedBy?:          string;
  Name:               string;
  Logo:               string;
  Description:        string;
  Banned?:             boolean;
  BanMessage?:         string;
  SignupMethods?:      Array<SignMethodType>;
  ExtSigninMethods?:   Array<SignMethodType>;
  RecaptchaMethod:    RecaptchaType;
  KycEnable:          boolean;
  SigninVerifyEnable: boolean;
  InvitationCodeMust: boolean;
}
export interface UpdateAppResponse {
  Info: App;
}

export interface CreateAppRequest extends BaseRequest {
  CreatedBy?:          string;
  Name:               string;
  Logo:               string;
  Description:        string;
  Banned?:             boolean;
  BanMessage?:         string;
  SignupMethods?:      Array<SignMethodType>;
  ExtSigninMethods?:   Array<SignMethodType>;
  RecaptchaMethod:    RecaptchaType;
  KycEnable:          boolean;
  SigninVerifyEnable: boolean;
  InvitationCodeMust: boolean;
}
export interface CreateAppResponse {
  Info: App;
}