import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppMessagesRequest,
  GetAppMessagesResponse,
  CreateAppMessageRequest,
  CreateAppMessageResponse,
  DeleteAppMessageRequest,
  DeleteAppMessageResponse,
  UpdateAppMessageRequest,
  UpdateAppMessageResponse,
  CreateAppMessagesRequest,
  CreateAppMessagesResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Message } from '../../../base'

export const useChurchMessageStore = defineStore('church-message-v4', {
  state: () => ({
    Messages: {
      Messages: new Map<string, Array<Message>>(),
      Total: 0
    }
  }),
  getters: {
    getMessagesByAppID () {
      return (appID: string) => {
        const data = this.Messages.Messages.get(appID)
        return !data ? [] as Array<Message> : data
      }
    }
  },
  actions: {
    getAppMessages (req: GetAppMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<GetAppMessagesRequest, GetAppMessagesResponse>(
        API.GET_APP_MESSAGES,
        req,
        req.NotifyMessage,
        (resp: GetAppMessagesResponse): void => {
          const data = this.getMessagesByAppID(req.TargetAppID as string)
          data.push(...resp.Infos)
          this.Messages.Messages.set(req.TargetAppID as string, data)
          this.Messages.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    deleteAppMessage (req: DeleteAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<DeleteAppMessageRequest, DeleteAppMessageResponse>(
        API.DELETE_APP_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: DeleteAppMessageResponse): void => {
          const data = this.getMessagesByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index, 1)
          this.Messages.Messages.set(req.TargetAppID, data)
          this.Messages.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createAppMessage (req: CreateAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<CreateAppMessageRequest, CreateAppMessageResponse>(
        API.CREATE_APP_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: CreateAppMessageResponse): void => {
          const data = this.getMessagesByAppID(req.TargetAppID)
          data.push(resp.Info)
          this.Messages.Messages.set(req.TargetAppID, data)
          this.Messages.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    },
    createAppMessages (req: CreateAppMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<CreateAppMessagesRequest, CreateAppMessagesResponse>(
        API.CREATE_APP_MESSAGES,
        req,
        req.Message,
        (resp: CreateAppMessagesResponse): void => {
          const data = this.getMessagesByAppID(req.TargetAppID)
          resp.Infos.forEach((el) => {
            const index = data.findIndex((al) => al.ID === el.ID)
            data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, el)
          })
          this.Messages.Messages.set(req.TargetAppID, data)
          this.Messages.Total += 1
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Message>)
        }
      )
    },
    updateAppMessage (req: UpdateAppMessageRequest, done: (error: boolean, row: Message) => void) {
      doActionWithError<UpdateAppMessageRequest, UpdateAppMessageResponse>(
        API.UPDATE_APP_MESSAGE,
        req,
        req.NotifyMessage,
        (resp: UpdateAppMessageResponse): void => {
          const data = this.getMessagesByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.Messages.Messages.set(req.TargetAppID, data)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Message)
        }
      )
    }
  }
})
