import { defineStore } from 'pinia'
import { API } from './const'
import { TNotifChannel as NotifChannel } from '../../../base'
import {
  GetAppNotifChannelsRequest,
  GetAppNotifChannelsResponse,
  CreateNotifChannelRequest,
  CreateNotifChannelResponse,
  DeleteNotifChannelRequest,
  DeleteNotifChannelResponse,
} from './types'
import { doActionWithError } from '../../../action'

export const useAdminNotifChannelStore = defineStore('admin-notifchannel-v4', {
  state: () => ({
    NotifChannels: {
      NotifChannels: [] as Array<NotifChannel>,
      Total: 0
    }
  }),
  getters: {
    getNotifChannelByID () {
      return (id: string) => {
        return this.NotifChannels.NotifChannels.find((el) => el.ID === id)
      }
    },
    channels: (state) : Array<NotifChannel> => {
      return state.NotifChannels.NotifChannels.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0)
    } 
  },
  actions: {
    getAppNotifChannels (req: GetAppNotifChannelsRequest, done: (error: boolean, rows: Array<NotifChannel>) => void) {
      doActionWithError<GetAppNotifChannelsRequest, GetAppNotifChannelsResponse>(
        API.GET_APP_NOTIFCHANNELS,
        req,
        req.Message,
        (resp: GetAppNotifChannelsResponse): void => {
          this.NotifChannels.NotifChannels.push(...resp.Infos)
          this.NotifChannels.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<NotifChannel>)
        }
      )
    },
    deleteNotifChannel (req: DeleteNotifChannelRequest, done: (error: boolean, row: NotifChannel) => void) {
      doActionWithError<DeleteNotifChannelRequest, DeleteNotifChannelResponse>(
        API.DELETE_NOTIFCHANNEL,
        req,
        req.Message,
        (resp: DeleteNotifChannelResponse): void => {
          const index = this.NotifChannels.NotifChannels.findIndex((el) => el.ID === resp.Info.ID)
          this.NotifChannels.NotifChannels.splice(index, 1)
          this.NotifChannels.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifChannel)
        }
      )
    },
    createNotifChannel (req: CreateNotifChannelRequest, done: (error: boolean, rows: NotifChannel[]) => void) {
      doActionWithError<CreateNotifChannelRequest, CreateNotifChannelResponse>(
        API.CREATE_NOTIFCHANNEL,
        req,
        req.Message,
        (resp: CreateNotifChannelResponse): void => {
          this.NotifChannels.NotifChannels.push(...resp.Infos)
          this.NotifChannels.Total += 1
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<NotifChannel>)
        }
      )
    }
  }
})
