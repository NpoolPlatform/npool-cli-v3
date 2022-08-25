import { defineStore } from 'pinia'
import { useLocalUserStore } from '../../../local'
import { doAction, doActionWithError } from '../../../action'
import { API } from './const'
import { LoginRequest, LoginResponse, LoginVerifyRequest, LoginVerifyResponse, LogoutRequest, LogoutResponse, SignupRequest, SignupResponse } from './types'
import { User } from '../../../base'

export const useFrontendUserStore = defineStore('frontend-user-v4', {
  state: () => ({}),
  getters: {},
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
    logout (req: LogoutRequest, done: () => void) {
      doAction<LogoutRequest, LogoutResponse>(
        API.LOGOUT,
        req,
        req.Message,
        (): void => {
          const user = useLocalUserStore()
          user.restUser()
          done()
        })
    },
  }
})
