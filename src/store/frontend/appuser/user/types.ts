import { AccountType, User, LoginHistory } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface SignupRequest extends BaseRequest{
  Account: string;
  PasswordHash: string;
  AccountType: AccountType;
  VerificationCode: string;
  InvitationCode: string;
}

export interface SignupResponse {
  Info: User
}

export interface LoginRequest extends BaseRequest {
  Account: string;
  PasswordHash: string;
  AccountType: AccountType;
  ManMachineSpec: string;
  EnvironmentSpec?: string;
}

export interface LoginResponse {
  Info: User;
}

export interface LoginVerifyRequest extends BaseRequest {
  Token: string;
  VerificationCode: string;
}

export interface LoginVerifyResponse {
  Info: User;
}

export interface LogoutRequest extends BaseRequest {
  Token: string;
}

export interface LogoutResponse {
  Info: User;
}

export interface UpdateUserRequest extends BaseRequest {
  Account?: string;
  AccountType?: string;
  VerificationCode?: string;
  EmailAddress?: string;
  PhoneNO?: string;
  Username?: string;
  AddressFields?: string[];
  Gender?: string;
  PostalCode?: string;
  Age?: number;
  Birthday?: number;
  Avatar?: string;
  Organization?: string;
  FirstName?: string;
  LastName?: string;
  IDNumber?: string;
  SigninVerifyType?: string;
  PasswordHash?: string;
}

export interface UpdateUserResponse {
  Info: User;
}

export interface GetLoginHistoriesRequest extends BaseRequest{

}
export interface GetLoginHistoriesRequestContinuously extends BaseRequest{
  offset: number
  limit: number
}
export interface GetLoginHistoriesResponse {
  Infos: Array<LoginHistory>
}