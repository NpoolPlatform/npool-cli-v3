import { defineStore } from 'pinia'
import { useLocalUserStore } from '../../../local'
import { doAction, doActionWithError } from '../../../action'
import { API } from './const'
import { 
  GetLoginHistoriesRequest,
  GetLoginHistoriesResponse, 
  LoginRequest, 
  LoginResponse,
  LoginVerifyRequest, 
  LoginVerifyResponse, 
  LogoutRequest, 
  LogoutResponse, 
  ResetUserRequest, 
  ResetUserResponse, 
  SignupRequest, 
  SignupResponse, 
  UpdateUserKolRequest, 
  UpdateUserKolResponse, 
  UpdateUserRequest,
  UpdateUserResponse
} from './types'
import { LoginHistory, User } from '../../../base'

export const useFrontendUserStore = defineStore('frontend-user-v4', {
  state: () => ({
    History: {
      LoginHistories: [] as Array<LoginHistory>,
      Total: 0
    }
  }),
  getters: {
    loginHistories(): Array<LoginHistory>  {
      return this.History.LoginHistories.sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    login (req: LoginRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },
    loginVerify (req: LoginVerifyRequest, done: (resp: User, error: boolean) => void) {
      doActionWithError<LoginVerifyRequest, LoginVerifyResponse>(
        API.LOGIN_VERIFY,
        req,
        req.Message,
        (resp: LoginVerifyResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },
    signup (req: SignupRequest, done: () => void) {
      doAction<SignupRequest, SignupResponse>(
        API.SIGNUP,
        req,
        req.Message,
        (): void => {
          done()
        })
    },
    logout (req: LogoutRequest, done: (error: boolean) => void) {
      doActionWithError<LogoutRequest, LogoutResponse>(
        API.LOGOUT,
        req,
        req.Message,
        (): void => {
          const user = useLocalUserStore()
          user.restUser()
          done(false)
        }, () => {
          done(true)
        })
    },
    updateUser (req: UpdateUserRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<UpdateUserRequest, UpdateUserResponse>(
        API.UPDATE_USER,
        req,
        req.Message,
        (resp: UpdateUserResponse): void => {
          const user = useLocalUserStore()
          user.setUser(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },
    resetUser (req: ResetUserRequest, done: (error: boolean) => void) {
      doActionWithError<ResetUserRequest, ResetUserResponse>(
        API.RESET_USER,
        req,
        req.Message,
        (): void => {
          done(false)
        }, () => {
          done(true)
        })
    },
    getLoginHistories(req: GetLoginHistoriesRequest, done: (histories: Array<LoginHistory>, error: boolean) => void) {
      doActionWithError<GetLoginHistoriesRequest, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.History.LoginHistories.push(...resp.Infos)
          this.History.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done(undefined as unknown as Array<LoginHistory>, true)
        }
      )
    },
    updateUserKol(req: UpdateUserKolRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<UpdateUserKolRequest, UpdateUserKolResponse>(
        API.UPDATE_USERKOL,
        req,
        req.Message,
        (resp: UpdateUserKolResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    },
  }
})
