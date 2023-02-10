import { defineStore } from 'pinia'
import { API } from './const'
import { Announcement } from '../../../base'
import {
  GetAppAnnouncementsRequest,
  GetAppAnnouncementsResponse,
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  DeleteAnnouncementRequest,
  DeleteAnnouncementResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
  
} from './types'
import { doActionWithError } from '../../../action'

export const useAdminAnnouncementStore = defineStore('admin-announcement-v4', {
  state: () => ({
    Announcements: {
      Announcements: [] as Array<Announcement>,
      Total: 0
    }
  }),
  getters: {
    getAnnouncementByID () {
      return (id: string) => {
        return this.Announcements.Announcements.find((el) => el.ID === id)
      }
    }
  },
  actions: {
    getAppAnnouncements (req: GetAppAnnouncementsRequest, done: (error: boolean, rows: Array<Announcement>) => void) {
      doActionWithError<GetAppAnnouncementsRequest, GetAppAnnouncementsResponse>(
        API.GET_APP_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetAppAnnouncementsResponse): void => {
          this.Announcements.Announcements.push(...resp.Infos)
          this.Announcements.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Announcement>)
        }
      )
    },
    deleteAnnouncement (req: DeleteAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<DeleteAnnouncementRequest, DeleteAnnouncementResponse>(
        API.DELETE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: DeleteAnnouncementResponse): void => {
          const index = this.Announcements.Announcements.findIndex((el) => el.ID === resp.Info.ID)
          this.Announcements.Announcements.splice(index, 1)
          this.Announcements.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    },
    createAnnouncement (req: CreateAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<CreateAnnouncementRequest, CreateAnnouncementResponse>(
        API.CREATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: CreateAnnouncementResponse): void => {
          this.Announcements.Announcements.push(resp.Info)
          this.Announcements.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    },
    updateAnnouncement (req: UpdateAnnouncementRequest, done: (error: boolean, row: Announcement) => void) {
      doActionWithError<UpdateAnnouncementRequest, UpdateAnnouncementResponse>(
        API.UPDATE_ANNOUNCEMENT,
        req,
        req.Message,
        (resp: UpdateAnnouncementResponse): void => {
          const index = this.Announcements.Announcements.findIndex((el) => el.ID === resp.Info.ID)
          this.Announcements.Announcements.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Announcement)
        }
      )
    }
  }
})
