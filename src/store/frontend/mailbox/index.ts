import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateMailRequest,
  CreateMailResponse,
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  GetMailsRequest,
  GetMailsResponse,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MailboxState
} from './types'

export const useMailboxStore = defineStore('mailbox', {
  state: (): MailboxState => ({
    Announcements: [],
    Notifications: [],
    Mails: []
  }),
  getters: {},
  actions: {
    getAnnouncements (req: GetAnnouncementsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetAnnouncementsRequest, GetAnnouncementsResponse>(
        API.GET_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAnnouncementsResponse): void => {
          this.Announcements = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getNotifications (req: GetNotificationsRequest, done?: (error: boolean) => void) {
      doActionWithError<GetNotificationsRequest, GetNotificationsResponse>(
        API.GET_NOTIFICATIONS,
        req,
        req.Message,
        (resp: GetNotificationsResponse): void => {
          this.Notifications = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    createMail (req: CreateMailRequest, done: () => void) {
      doAction<CreateMailRequest, CreateMailResponse>(
        API.CREATE_MAIL,
        req,
        req.Message,
        (resp: CreateMailResponse): void => {
          this.Mails.push(resp.Info)
          done()
        })
    },
    getMails (req: GetMailsRequest, done: (error: boolean) => void) {
      doActionWithError<GetMailsRequest, GetMailsResponse>(
        API.GET_MAILS,
        req,
        req.Message,
        (resp: GetMailsResponse): void => {
          this.Mails = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
