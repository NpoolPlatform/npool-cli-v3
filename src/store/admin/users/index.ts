import { defineStore } from 'pinia'
import { UsersState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { GetUsersRequest, GetUsersResponse } from './types'

export const useUsersStore = defineStore('users', {
  state: (): UsersState => ({
    Users: []
  }),
  getters: {},
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
