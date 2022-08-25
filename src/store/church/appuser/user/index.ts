import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { User } from '../../../base'
import { API } from './const'
import {
  ChurchUserState,
  GetAppUsersRequest,
  GetAppUsersResponse
} from './types'

export const useChurchUserStore = defineStore('church-user-v3', {
  state: (): ChurchUserState => ({
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
          let users = this.Users.get(req.TargetAppID)
          if (!users) {
            users = []
          }
          users.push(...resp.Infos)
          this.Users.set(req.TargetAppID, users)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
