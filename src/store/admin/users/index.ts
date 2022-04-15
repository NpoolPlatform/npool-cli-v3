import { defineStore } from 'pinia'
import { UsersState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { GetUsersRequest, GetUsersResponse } from './types'
import { UserInfo } from '../../frontend'

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    Users: []
  }),
  getters: {
    getUserByID (): (userID: string) => UserInfo {
      return (userID: string) => {
        const index = this.Users.findIndex((el) => el.User.ID === userID)
        return index < 0 ? undefined as unknown as UserInfo : this.Users[index]
      }
    }
  },
  actions: {
    getUsers (req: GetUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetUsersRequest, GetUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetUsersResponse): void => {
          this.Users = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
