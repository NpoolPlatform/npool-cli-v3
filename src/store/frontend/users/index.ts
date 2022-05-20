import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { doAction, doActionWithError } from '../../action'
import { useLoginedUserStore } from '../../local/logined'
import { API, PredefineRole } from './const'
import {
  SignupRequest,
  SignupResponse,
  LoginRequest,
  UserState,
  LoginResponse,
  ResetPasswordRequest,
  UpdatePasswordRequest,
  ResetPasswordResponse,
  UpdatePasswordResponse,
  GetLoginHistoriesRequest,
  GetLoginHistoriesResponse,
  SetupGoogleAuthenticationRequest,
  SetupGoogleAuthenticationResponse,
  UpdateAccountRequest,
  UpdateAccountResponse,
  CreateAppUserExtraRequest,
  CreateAppUserExtraResponse,
  UserInfo,
  UpdateAppUserExtraRequest,
  UpdateAppUserExtraResponse,
  LoginHistory,
  CreateAppUserCtrlRequest,
  CreateAppUserCtrlResponse,
  UpdateAppUserCtrlRequest,
  UpdateAppUserCtrlResponse,
  UpdateEmailRequest,
  UpdateEmailResponse,
  UpdatePhoneRequest,
  UpdatePhoneResponse,
  LogoutRequest,
  LogoutResponse
} from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    LoginHistories: [] as Array<LoginHistory>,
    GoogleOTPAuth: '',
    GoogleSecret: ''
  }),
  getters: {
    buyer (): boolean {
      const logined = useLoginedUserStore()
      const index = logined.LoginedUser?.Roles?.findIndex((el) => el.Role === PredefineRole.Buyer)
      return index !== undefined && index >= 0
    }
  },
  actions: {
    signup (req: SignupRequest, done: () => void) {
      doAction<SignupRequest, SignupResponse>(
        API.SIGNUP,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    signin (req: LoginRequest, done: () => void) {
      doAction<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          Cookies.set('X-User-ID', resp.Info.User?.ID as string, { expires: '4h', secure: true })
          Cookies.set('X-App-Login-Token', resp.Token, { expires: '4h', secure: true })

          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info

          done()
        })
    },
    logout (req: LogoutRequest) {
      doAction<LogoutRequest, LogoutResponse>(
        API.LOGOUT,
        req,
        req.Message,
        (): void => {
          Cookies.remove('X-User-ID')
          Cookies.remove('X-AppLogin-Token')
          const logined = useLoginedUserStore()
          logined.LoginedUser = undefined as unknown as UserInfo
        })
    },
    resetPassword (req: ResetPasswordRequest, done: () => void) {
      doAction<ResetPasswordRequest, ResetPasswordResponse>(
        API.RESET_PASSWORD,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    updatePassword (req: UpdatePasswordRequest, done: () => void) {
      doAction<UpdatePasswordRequest, UpdatePasswordResponse>(
        API.UPDATE_PASSWORD,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    getLoginHistories (req: GetLoginHistoriesRequest) {
      doAction<GetLoginHistoriesRequest, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.LoginHistories = resp.Infos
        })
    },
    setupGoogleAuthentication (req: SetupGoogleAuthenticationRequest) {
      doAction<SetupGoogleAuthenticationRequest, SetupGoogleAuthenticationResponse>(
        API.SETUP_GOOGLE_AUTHENTICATION,
        req,
        req.Message,
        (resp: SetupGoogleAuthenticationResponse): void => {
          this.GoogleOTPAuth = resp.OTPAuth
          this.GoogleSecret = resp.Secret
        })
    },
    updateAccount (req: UpdateAccountRequest, done: () => void) {
      doAction<UpdateAccountRequest, UpdateAccountResponse>(
        API.UPDATE_ACCOUNT,
        req,
        req.Message,
        (resp: UpdateAccountResponse): void => {
          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
          done()
        })
    },
    createExtra (req: CreateAppUserExtraRequest, done: (error: boolean) => void) {
      doActionWithError<CreateAppUserExtraRequest, CreateAppUserExtraResponse>(
        API.CREATE_EXTRA,
        req,
        req.Message,
        (resp: CreateAppUserExtraResponse): void => {
          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    },
    updateExtra (req: UpdateAppUserExtraRequest, done: (error: boolean) => void) {
      doActionWithError<UpdateAppUserExtraRequest, UpdateAppUserExtraResponse>(
        API.UPDATE_EXTRA,
        req,
        req.Message,
        (resp: UpdateAppUserExtraResponse): void => {
          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    },
    createCtrl (req: CreateAppUserCtrlRequest, done: () => void) {
      doAction<CreateAppUserCtrlRequest, CreateAppUserCtrlResponse>(
        API.CREATE_CONTROL,
        req,
        req.Message,
        (resp: CreateAppUserCtrlResponse): void => {
          const logined = useLoginedUserStore()
          if (logined.LoginedUser) {
            logined.LoginedUser = resp.Info
          }
          done()
        })
    },
    updateCtrl (req: UpdateAppUserCtrlRequest, done: () => void) {
      doAction<UpdateAppUserCtrlRequest, UpdateAppUserCtrlResponse>(
        API.UPDATE_CONTROL,
        req,
        req.Message,
        (resp: UpdateAppUserCtrlResponse): void => {
          const logined = useLoginedUserStore()
          if (logined.LoginedUser) {
            logined.LoginedUser = resp.Info
          }
          done()
        })
    },
    updateEmail (req: UpdateEmailRequest, done: () => void) {
      doAction<UpdateEmailRequest, UpdateEmailResponse>(
        API.UPDATE_EMAIL,
        req,
        req.Message,
        (resp: UpdateEmailResponse): void => {
          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
          done()
        })
    },
    updateMobile (req: UpdatePhoneRequest, done: () => void) {
      doAction<UpdatePhoneRequest, UpdatePhoneResponse>(
        API.UPDATE_PHONE,
        req,
        req.Message,
        (resp: UpdatePhoneResponse): void => {
          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
          done()
        })
    }
  }
})

export * from './types'
