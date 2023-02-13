import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetNAppNotifChannelsRequest,
  GetNAppNotifChannelsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { TNotifChannel as NotifChannel } from '../../../base'

export const useChurchNotifChannelStore = defineStore('church-notifchannel-v4', {
  state: () => ({
    NotifChannels: {
      NotifChannels: new Map<string, Array<NotifChannel>>(),
      Total: 0
    }
  }),
  getters: {
    getNotifChannelByAppID () {
      return (appID: string) => {
        const rows = this.NotifChannels.NotifChannels.get(appID)
        return !rows ? [] as Array<NotifChannel> : rows
      }
    }
  },
  actions: {
    getAppNotifChannels (req: GetNAppNotifChannelsRequest, done: (error: boolean, rows: Array<NotifChannel>) => void) {
      doActionWithError<GetNAppNotifChannelsRequest, GetNAppNotifChannelsResponse>(
        API.GET_N_APP_NOTIFCHANNELS,
        req,
        req.Message,
        (resp: GetNAppNotifChannelsResponse): void => {
          const rows = this.getNotifChannelByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.NotifChannels.NotifChannels.set(req.TargetAppID, rows)
          this.NotifChannels.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<NotifChannel>)
        }
      )
    }
  }
})
