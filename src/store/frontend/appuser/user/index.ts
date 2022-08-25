import { defineStore } from 'pinia'
import { useLocalUserStore } from '../../../local'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { LoginRequest, LoginResponse } from './types'
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
    }
  }
})
