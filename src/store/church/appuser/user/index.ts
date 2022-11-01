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
  getters: {
    getUserByAppUserID (): (appID: string, userID: string) => User {
      return (appID: string, userID: string) => {
        const index = this.Users.get(appID)?.findIndex((el) => el.ID === userID)
        const users = this.Users.get(appID) as Array<User>
        return (index === undefined || index < 0) ? undefined as unknown as User : users[index]
      }
    },
    getUsersByAppID () {
      return (appID: string) => {
        const data = this.Users.get(appID)
        return !data? [] : data
      }
    }
  },
  actions: {
    getAppUsers (req: GetAppUsersRequest, done: (users: Array<User>, error: boolean) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          const data = this.getUsersByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.Users.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
