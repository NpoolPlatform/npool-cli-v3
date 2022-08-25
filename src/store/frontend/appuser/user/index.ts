import { defineStore } from 'pinia'
import { useLocalUserStore } from '../../../local'
import { doAction, doActionWithError } from '../../../action'
import { API } from './const'
import { 
  GetLoginHistoriesRequest, 
  GetLoginHistoriesRequestContinuously, 
  GetLoginHistoriesResponse, 
  LoginRequest, 
  LoginResponse,
  LoginVerifyRequest, 
  LoginVerifyResponse, 
  LogoutRequest, 
  LogoutResponse, 
  SignupRequest, 
  SignupResponse 
} from './types'
import { LoginHistory, User } from '../../../base'

export const useFrontendUserStore = defineStore('frontend-user-v4', {
  state: () => ({
    LoginHistories: [] as Array<LoginHistory>,
  }),
  getters: {
    loginHistories(): Array<LoginHistory>  {
      return this.LoginHistories.sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
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
    getLoginHistories(req: GetLoginHistoriesRequest, done: (histories: Array<LoginHistory>, error: boolean) => void) {
      doActionWithError<GetLoginHistoriesRequest, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.LoginHistories.push(...resp.Infos)
          done(resp.Infos,false)
        }, () => {
          done(undefined as unknown as Array<LoginHistory>, true)
        }
      )
    },
    getLoginHistoriesContinuously(req: GetLoginHistoriesRequestContinuously) {
      doActionWithError<GetLoginHistoriesRequestContinuously, GetLoginHistoriesResponse>(
        API.GET_LOGIN_HISTORIES,
        req,
        req.Message,
        (resp: GetLoginHistoriesResponse): void => {
          this.LoginHistories.push(...resp.Infos)
          if (resp.Infos.length < req.limit) {
            return
          }
          req.offset = req.offset + req.limit
          this.getLoginHistoriesContinuously(req)
        }, () => {
          // NOTHING TODO
        }
      )
    }
  }
})
