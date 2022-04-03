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

export const useMailboxStore = defineStore('mailbox', {
  state: (): MailboxState => ({
    Announcements: [],
    Notifications: [],
    APIInstance: undefined as unknown as AxiosInstance
  }),
  getters: {},
  actions: {
    getAnnouncements (req: GetAnnouncementsRequest) {
      doAction<GetAnnouncementsRequest, GetAnnouncementsResponse>(
        this.APIInstance,
        API.GET_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAnnouncementsResponse): void => {
          this.Announcements = resp.Infos
        })
    },
    getNotifications (req: GetNotificationsRequest) {
      doAction<GetNotificationsRequest, GetNotificationsResponse>(
        this.APIInstance,
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
