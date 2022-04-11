import { ReqMessage } from '../notifications/types'

interface AppUser {
  ID?: string
  AppID?: string
  EmailAddress?: string
  PhoneNO?: string
  ImportedFromApp?: string
  CreateAt?: number
}

interface AppRole {
  ID: string
  AppID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
}

interface AppUserExtra {
  ID?: string
  AppID?: string
  UserID?: string
  Username?: string
  FirstName?: string
  LastName?: string
  AddressFields?: Array<string>
  Gender?: string
  PostalCode?: string
  Age?: number
  Birthday?: number
  Avatar?: string
  Organization?: string
  IDNumber: string
}

interface AppUserControl {
  ID?: string
  AppID?: string
  UserID?: string
  SigninVerifyByGoogleAuthentication?: boolean
  GoogleAuthenticationVerified?: boolean
}

interface BanAppUser {
  ID: string
  AppID: string
  UserID: string
  Message: string
}

interface UserInfo {
  User: AppUser
  Extra: AppUserExtra
  Ctrl: AppUserControl
  Ban?: BanAppUser
  Roles?: Array<AppRole>
}

interface LoginRequest {
  Account: string
  PasswordHash: string
  AccountType: string
  // google recaptcha response
  ManMachineSpec: string
  Message: ReqMessage
}

interface LoginResponse {
  Info: UserInfo
  Token: string
}

interface LogoutRequest {
  Message: ReqMessage
}

interface LogoutResponse {
  Info: UserInfo
}

interface SignupRequest {
  PasswordHash: string
  Account: string
  AccountType: string
  VerificationCode: string
  InvitationCode: string
  Message: ReqMessage
}

interface SignupResponse {
  Info: AppUser
}

interface UpdatePasswordRequest {
  Account: string
  AccountType: string
  OldPasswordHash: string
  PasswordHash: string
  VerificationCode : string
  Message: ReqMessage
}

interface UpdatePasswordResponse {
  Info: unknown
}

interface ResetPasswordRequest {
  Account: string
  AccountType: string
  PasswordHash: string
  VerificationCode : string
  Message: ReqMessage
}

interface ResetPasswordResponse {
  Info: unknown
}

interface LoginHistory {
  ID: string
  ClientIP: string
  UserAgent: string
  CreateAt: number
  Location: string
}

interface GetLoginHistoriesRequest {
  Message: ReqMessage
}

interface GetLoginHistoriesResponse {
  Infos: Array<LoginHistory>
}

interface SetupGoogleAuthenticationRequest {
  Message: ReqMessage
}

interface SetupGoogleAuthenticationResponse {
  OTPAuth: string
  Secret: string
}

interface VerificationCode {
  Account?: string
  AccountType: string
  VerificationCode: string
}

interface UpdateAccountRequest extends VerificationCode {
  VerificationCodes: Array<VerificationCode>
  Message: ReqMessage
}

interface UpdateAccountResponse {
  Info: UserInfo
}

interface CreateAppUserExtraRequest {
  Info: AppUserExtra
  Message: ReqMessage
}

interface CreateAppUserExtraResponse {
  Info: AppUserExtra
}

interface UpdateAppUserExtraRequest {
  Info: AppUserExtra
  Message: ReqMessage
}

interface UpdateAppUserExtraResponse {
  Info: AppUserExtra
}

interface CreateAppUserCtrlRequest {
  Info: AppUserControl
  Message: ReqMessage
}

interface CreateAppUserCtrlResponse {
  Info: AppUserControl
}

interface UpdateAppUserCtrlRequest {
  Info: AppUserControl
  Message: ReqMessage
}

interface UpdateAppUserCtrlResponse {
  Info: AppUserControl
}

interface UpdateEmailRequest {
  OldVerificationCode: string
  OldAccount: string
  OldAccountType: string
  NewEmailAddress: string
  NewEmailVerificationCode: string
  Message: ReqMessage
}

interface UpdateEmailResponse {
  Info: UserInfo
}

interface UpdatePhoneRequest {
  OldVerificationCode: string
  OldAccount: string
  OldAccountType: string
  NewPhoneNO: string
  NewPhoneVerificationCode: string
  Message: ReqMessage
}

interface UpdatePhoneResponse {
  Info: UserInfo
}

interface UserState {
  LoginHistories: Array<LoginHistory>
  GoogleOTPAuth: string
  GoogleSecret: string
}

export {
  AppUser,
  UserInfo,
  AppUserExtra,
  AppUserControl,
  UserState,
  LoginRequest,
  LoginResponse,
  LogoutRequest,
  LogoutResponse,
  SignupRequest,
  SignupResponse,
  UpdatePasswordRequest,
  UpdatePasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  LoginHistory,
  GetLoginHistoriesRequest,
  GetLoginHistoriesResponse,
  VerificationCode,
  SetupGoogleAuthenticationRequest,
  SetupGoogleAuthenticationResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  CreateAppUserExtraRequest,
  CreateAppUserExtraResponse,
  UpdateAppUserExtraRequest,
  UpdateAppUserExtraResponse,
  CreateAppUserCtrlRequest,
  CreateAppUserCtrlResponse,
  UpdateAppUserCtrlRequest,
  UpdateAppUserCtrlResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse
}
