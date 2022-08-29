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
  getters: {},
  actions: {
    getUsers (req: GetUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetUsersRequest, GetUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetUsersResponse): void => {
          this.Users.Users.push(...resp.Infos)
          this.Users.Total = resp.Total
          if (resp.Infos.length < req.Limit) {
            done(false)
            return
          }
          req.Offset = req.Limit + req.Offset
          this.getUsers(req, done)
        }, () => {
          done(true)
        })
    }
  }
})