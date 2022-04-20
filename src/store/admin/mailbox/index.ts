import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { MailboxState } from './state'
import {
  CreateNotificationRequest,
  CreateNotificationResponse,
  CreateUserMailRequest,
  CreateUserMailResponse,
  GetAppNotificationsRequest,
  GetAppNotificationsResponse,
  GetUserMailsRequest,
  GetUserMailsResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse
} from './types'

export const useAdminMailboxStore = defineStore('adminmailbox', {
  state: (): MailboxState => ({
    Notifications: [],
    Mails: []
  }),
  getters: {},
  actions: {
    getNotifications (req: GetAppNotificationsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetAppNotificationsRequest, GetAppNotificationsResponse>(
        API.GET_NOTIFICATIONS,
        req,
        req.Message,
        (resp: GetAppNotificationsResponse): void => {
          this.Notifications = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    createNotification (req: CreateNotificationRequest, done: () => void) {
      doAction<CreateNotificationRequest, CreateNotificationResponse>(
        API.CREATE_NOTIFICATION,
        req,
        req.Message,
        (resp: CreateNotificationResponse): void => {
          this.Notifications.push(resp.Info)
          done()
        })
    },
    updateNotification (req: UpdateNotificationRequest, done: () => void) {
      doAction<UpdateNotificationRequest, UpdateNotificationResponse>(
        API.UPDATE_NOTIFICATION,
        req,
        req.Message,
        (resp: UpdateNotificationResponse): void => {
          const index = this.Notifications.findIndex((el) => el.ID === resp.Info.ID)
          this.Notifications.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
    createMail (req: CreateUserMailRequest, done: () => void) {
      doAction<CreateUserMailRequest, CreateUserMailResponse>(
        API.CREATE_MAIL,
        req,
        req.Message,
        (resp: CreateUserMailResponse): void => {
          this.Mails.push(resp.Info)
          done()
        })
    },
    getMails (req: GetUserMailsRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserMailsRequest, GetUserMailsResponse>(
        API.GET_MAILS,
        req,
        req.Message,
        (resp: GetUserMailsResponse): void => {
          this.Mails = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
