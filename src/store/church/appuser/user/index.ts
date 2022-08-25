import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { User } from '../../../base'
import { API } from './const'
import { GetAppUsersRequest, GetAppUsersResponse } from './types'

export const useChurchUserStore = defineStore('church-user-v3', {
  state: () => ({
    Users: new Map<string, Array<User>>()
  }),
  getters: {},
  actions: {
    getAppUsers (req: GetAppUsersRequest, done: (users: Array<User>, error: boolean) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          this.Users.set(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
