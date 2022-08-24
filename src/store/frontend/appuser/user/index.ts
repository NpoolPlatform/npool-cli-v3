import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { doAction } from 'src/store/action'
import { User } from 'src/store/base/appuser'
import { API } from './const'
import { LoginRequest, LoginResponse } from './types'

export const useFrontendUserStore = defineStore('frontend-user-v3', {
  state: () => ({
    LoginedUser: {} as User
  }),
  getters: {
    getLogined (): boolean {
      return this.LoginedUser !== null && this.LoginedUser.LoginVerified
    }
  },
  actions: {
    login (req: LoginRequest, done: () => void) {
      doAction<LoginRequest, LoginResponse>(
        API.LOGIN,
        req,
        req.Message,
        (resp: LoginResponse): void => {
          Cookies.set('X-User-ID', resp.Info.ID, { expires: '4h', secure: true })
          Cookies.set('X-App-Login-Token', resp.Info.LoginToken, { expires: '4h', secure: true })
          this.LoginedUser = resp.Info
          done()
        })
    }
  }
})
