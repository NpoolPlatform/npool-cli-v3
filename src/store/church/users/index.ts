import { defineStore } from 'pinia'
import { UsersState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { UserInfo } from '../../frontend'
import {
  GetAppUsersRequest,
  GetAppUsersResponse
} from './types'

export const useChurchUsersStore = defineStore('churchusers', {
  state: (): UsersState => ({
    Users: new Map<string, Array<UserInfo>>()
  }),
  getters: {
    getUserByAppUserID (): (appID: string, userID: string) => UserInfo {
      return (appID: string, userID: string) => {
        const index = this.Users.get(appID)?.findIndex((el) => el.User.ID === userID)
        const users = this.Users.get(appID) as Array<UserInfo>
        return (index === undefined || index < 0) ? undefined as unknown as UserInfo : users[index]
      }
    }
  },
  actions: {
    getUsers (req: GetAppUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          this.Users.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
