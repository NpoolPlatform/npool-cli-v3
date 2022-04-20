import { defineStore } from 'pinia'
import { Announcement, Notification, Mail } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { MailboxState } from './state'
import {
  CreateAppAnnouncementRequest,
  CreateAppAnnouncementResponse, 
  CreateAppNotificationRequest, 
  CreateAppNotificationResponse, 
  CreateAppUserMailRequest, 
  CreateAppUserMailResponse, 
  GetAppAnnouncementsRequest,
  GetAppAnnouncementsResponse,
  GetAppUserMailsRequest,
  GetAppUserMailsResponse,
  GetTargetAppNotificationsRequest,
  GetTargetAppNotificationsResponse
} from './types'

export const useChurchMailboxStore = defineStore('churchmailbox', {
  state: (): MailboxState => ({
    Announcements: new Map<string, Array<Announcement>>(),
    Notifications: new Map<string, Array<Notification>>(),
    Mails: new Map<string, Array<Mail>>()
  }),
  getters: {},
  actions: {
    getAnnouncements (req: GetAppAnnouncementsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppAnnouncementsRequest, GetAppAnnouncementsResponse>(
        API.GET_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAppAnnouncementsResponse): void => {
          this.Announcements.set(req.TargetAppID, resp.Infos)
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    createAnnouncement (req: CreateAppAnnouncementRequest, done: () => void) {
      doAction<CreateAppAnnouncementRequest, CreateAppAnnouncementResponse>(
        API.CREATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: CreateAppAnnouncementResponse): void => {
          let announcements = this.Announcements.get(req.TargetAppID)
          if (!announcements) {
            announcements = []
          }
          announcements.push(resp.Info)
          this.Announcements.set(req.TargetAppID, announcements)
          done()
        })
    },
    getNotifications (req: GetTargetAppNotificationsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetTargetAppNotificationsRequest, GetTargetAppNotificationsResponse>(
        API.GET_NOTIFICATIONS,
        req,
        req.Message,
        (resp: GetTargetAppNotificationsResponse): void => {
          this.Notifications.set(req.TargetAppID, resp.Infos)
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    createNotification (req: CreateAppNotificationRequest, done: () => void) {
      doAction<CreateAppNotificationRequest, CreateAppNotificationResponse>(
        API.CREATE_NOTIFICATION,
        req,
        req.Message,
        (resp: CreateAppNotificationResponse): void => {
          let notifications = this.Notifications.get(req.TargetAppID)
          if (!notifications) {
            notifications = []
          }
          notifications.push(resp.Info)
          this.Notifications.set(req.TargetAppID, notifications)
          done()
        })
    },
    getMails (req: GetAppUserMailsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppUserMailsRequest, GetAppUserMailsResponse>(
        API.GET_MAILS,
        req,
        req.Message,
        (resp: GetAppUserMailsResponse): void => {
          this.Mails.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createMail (req: CreateAppUserMailRequest, done: () => void) {
      doAction<CreateAppUserMailRequest, CreateAppUserMailResponse>(
        API.CREATE_MAIL,
        req,
        req.Message,
        (resp: CreateAppUserMailResponse): void => {
          let mails = this.Mails.get(req.TargetAppID)
          if (!mails) {
            mails = []
          }
          mails.push(resp.Info)
          this.Mails.set(req.TargetAppID, mails)
          done()
        })
    }
  }
})

export * from './types'
