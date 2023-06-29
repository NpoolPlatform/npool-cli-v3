import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppNotifUsersRequest,
  GetAppNotifUsersResponse,
  CreateNotifUserRequest,
  CreateNotifUserResponse,
  DeleteNotifUserRequest,
  DeleteNotifUserResponse,
} from './types'
import { doActionWithError } from '../../../action'
import { NotifUser } from '../../../base'

export const useAdminNotifUserStore = defineStore('admin-notifuser-v4', {
  state: () => ({
    NotifUsers: {
      NotifUsers: [] as Array<NotifUser>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getAppNotifUsers (req: GetAppNotifUsersRequest, done: (error: boolean, rows: Array<NotifUser>) => void) {
      doActionWithError<GetAppNotifUsersRequest, GetAppNotifUsersResponse>(
        API.GET_NOTIFUSERS,
        req,
        req.Message,
        (resp: GetAppNotifUsersResponse): void => {
          this.NotifUsers.NotifUsers.push(...resp.Infos)
          this.NotifUsers.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<NotifUser>)
        }
      )
    },
    deleteNotifUser (req: DeleteNotifUserRequest, done: (error: boolean, row: NotifUser) => void) {
      doActionWithError<DeleteNotifUserRequest, DeleteNotifUserResponse>(
        API.DELETE_NOTIFUSER,
        req,
        req.Message,
        (resp: DeleteNotifUserResponse): void => {
          const index = this.NotifUsers.NotifUsers.findIndex((el) => el.ID === resp.Info.ID)
          this.NotifUsers.NotifUsers.splice(index, 1)
          this.NotifUsers.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifUser)
        }
      )
    },
    createNotifUser (req: CreateNotifUserRequest, done: (error: boolean, row?: NotifUser) => void) {
      doActionWithError<CreateNotifUserRequest, CreateNotifUserResponse>(
        API.CREATE_NOTIFUSER,
        req,
        req.Message,
        (resp: CreateNotifUserResponse): void => {
          this.NotifUsers.NotifUsers.push(resp.Info)
          this.NotifUsers.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true)
        }
      )
    }
  }
})
