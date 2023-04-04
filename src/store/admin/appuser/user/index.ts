import { defineStore } from 'pinia'
import { API } from './const'
import { GetUsersRequest, GetUsersResponse, UpdateAppUserKolRequest, UpdateAppUserKolResponse } from './types'
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
      return (ID: string) => {
        const index = this.Users.Users.findIndex((el) => el.ID === ID)
        return index < 0 ? undefined as unknown as User : this.Users.Users[index]
      }
    },
    getUsersByName (): (name: string) => Array<User> {
      return (name: string) => this.Users.Users.filter((el) => el.ID?.toLowerCase()?.includes(name.toLowerCase()) || 
                                                            el.EmailAddress?.toLowerCase()?.includes(name.toLowerCase()) || 
                                                            el.PhoneNO?.toLowerCase()?.includes(name.toLocaleLowerCase()))
    }
  },
  actions: {
    getUsers (req: GetUsersRequest, done: (user: Array<User>, error: boolean) => void) {
      doActionWithError<GetUsersRequest, GetUsersResponse>(
        API.GET_USERS,
        req,
        req.Message,
        (resp: GetUsersResponse): void => {
          this.Users.Users.push(...resp.Infos)
          this.Users.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppUserKol(req: UpdateAppUserKolRequest, done: (error: boolean, row: User) => void) {
      doActionWithError<UpdateAppUserKolRequest, UpdateAppUserKolResponse>(
        API.UPDATE_APP_USER_KOL,
        req,
        req.Message,
        (resp: UpdateAppUserKolResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as User)
        }
      )
    }
  }
})
