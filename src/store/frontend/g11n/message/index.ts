import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetMessagesRequest,
  GetMessagesResponse,
} from './types'
import { doActionWithError } from '../../../action'
import { Message } from '../../../base'
import { useLocaleStore } from '../../../local/locale'

export const useFrontendMessageStore = defineStore('frontend-message-v4', {
  state: () => ({
    Messages: {
      Messages: new Map<string, Array<Message>>(),
      Total: 0
    }
  }),
  getters: {
    getMessagesByLangID () {
      return (langID: string) => {
        const data = this.Messages.Messages.get(langID)
        return !data ? [] : data
      }
    }
  },
  actions: {
    getMessages (req: GetMessagesRequest, done: (error: boolean, rows: Array<Message>) => void) {
      doActionWithError<GetMessagesRequest, GetMessagesResponse>(
        API.GET_MESSAGES,
        req,
        req.NotifyMessage,
        (resp: GetMessagesResponse): void => {
          const data = this.getMessagesByLangID(req.LangID)
          data.push(...resp.Infos)
          this.Messages.Messages.set(req.LangID, data)

          const locale = useLocaleStore()
          locale.setLocaleMessages(data)
          this.Messages.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    }
  }
})
