import { defineStore } from 'pinia'
import { useMailboxStore } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { MailboxState } from './state'
import {
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  GetAppNotificationsRequest,
  GetAppNotificationsResponse,
  GetUserMailsRequest,
  GetUserMailsResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
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
    createAnnouncement (req: CreateAnnouncementRequest, done: () => void) {
      doAction<CreateAnnouncementRequest, CreateAnnouncementResponse>(
        API.CREATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: CreateAnnouncementResponse): void => {
          const mailbox = useMailboxStore()
          mailbox.Announcements.push(resp.Info)
          done()
        })
    },
    updateAnnouncement (req: UpdateAnnouncementRequest, done: () => void) {
      doAction<UpdateAnnouncementRequest, UpdateAnnouncementResponse>(
        API.UPDATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: UpdateAnnouncementResponse): void => {
          const mailbox = useMailboxStore()
          const index = mailbox.Announcements.findIndex((el) => el.ID === resp.Info.ID)
          mailbox.Announcements.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    },
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
