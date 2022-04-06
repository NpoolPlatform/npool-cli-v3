import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { doAction, doActionWithError } from '../action'
import { useLoginedUserStore } from '../logined'
import { API } from './const'
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
  LoginHistory
} from './types'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    SignupUser: undefined,
    PasswordUpdated: false,
    LoginHistories: [] as Array<LoginHistory>,
    GoogleOTPAuth: '',
    GoogleSecret: ''
  }),
  getters: {},
  actions: {
    signup (req: SignupRequest) {
      doAction<SignupRequest, SignupResponse>(
        API.SIGNUP,
        req,
        req.Message,
        (resp: SignupResponse): void => {
          this.SignupUser = resp.Info
        })
    },
    signin (req: LoginRequest) {
      doAction<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          Cookies.set('X-User-ID', resp.Info.User?.ID as string, { expires: '4h', secure: true })
          Cookies.set('X-App-Login-Token', resp.Token, { expires: '4h', secure: true })

          const logined = useLoginedUserStore()
          logined.LoginedUser = resp.Info
        })
    },
    resetPassword (req: ResetPasswordRequest) {
      this.PasswordUpdated = false
      doAction<ResetPasswordRequest, ResetPasswordResponse>(
        API.RESET_PASSWORD,
        req,
        req.Message,
        (): void => {
          this.PasswordUpdated = true
        })
    },
    updatePassword (req: UpdatePasswordRequest) {
      doAction<UpdatePasswordRequest, UpdatePasswordResponse>(
        API.UPDATE_PASSWORD,
        req,
        req.Message,
        (): void => {
          this.PasswordUpdated = true
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
          const user = logined.LoginedUser as UserInfo
          user.Extra = resp.Info
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
          const user = logined.LoginedUser as UserInfo
          user.Extra = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
