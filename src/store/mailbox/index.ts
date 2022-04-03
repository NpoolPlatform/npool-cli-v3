import { AxiosInstance } from 'axios'
import { defineStore } from 'pinia'
import { doAction } from '../action'
import { API } from './const'
import {
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MailboxState
} from './types'

export const useMailboxStore = (api: AxiosInstance) => defineStore('mailbox', {
  state: (): MailboxState => ({
    Announcements: [],
    Notifications: []
  }),
  getters: {},
  actions: {
    getAnnouncements (req: GetAnnouncementsRequest) {
      doAction<GetAnnouncementsRequest, GetAnnouncementsResponse>(
        api,
        API.GET_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAnnouncementsResponse): void => {
          this.Announcements = resp.Infos
        })
    },
    getNotifications (req: GetNotificationsRequest) {
      doAction<GetNotificationsRequest, GetNotificationsResponse>(
        api,
        API.GET_NOTIFICATIONS,
        req,
        req.Message,
        (resp: GetNotificationsResponse): void => {
          this.Notifications = resp.Infos
        })
    }
  }
})

export * from './types'
