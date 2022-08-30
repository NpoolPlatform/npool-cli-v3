import { defineStore } from 'pinia'
import { API } from './const'
import { GetUsersRequest, GetUsersResponse } from './types'
import { User } from '../../../base'
import { doActionWithError } from '../../../action'

export const useAdminUserStore = defineStore('admin-user-v3', {
  state: () => ({
    Users: {
      Users: [] as Array<User>,
      Total: 0
    }
  }),
  getters: {
    getUserByID (): (ID:string) => User {
      return (ID:string) => {
        const index = this.Users.Users.findIndex((el) => el.ID === ID)
        return index < 0 ? undefined as unknown as User : this.Users.Users[index]
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
          this.Users.Users.push(...resp.Infos)
          this.Users.Total = resp.Total
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})
