import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import { Message, Language } from '../../frontend/langs/types'
import { LocaleState } from './types'

export const useLocaleStore = defineStore('locale', {
  state: (): LocaleState => ({
    Languages: [],
    Messages: {},
    CurLang: undefined,
    I18n: useI18n()
  }),
  getters: {},
  actions: {
    setLangs (langs: Array<Language>) {
      this.Languages = []
      this.Languages = langs
      if (langs.length > 0 && !this.CurLang) {
        this.setLang(langs[0].Lang)
      }
    },
    setLang (lang: Language) {
      this.CurLang = lang
      Cookies.set('X-Lang-ID', lang.ID, { expires: '4h', secure: true })
      this.I18n.locale = lang.Lang
    },
    updateLocaleMessage (messages: Array<Message>) {
      let msgs = this.Messages[this.CurLang?.Lang as string]
      if (!msgs) {
        msgs = {}
      }
      messages.forEach((msg) => {
        msgs[msg.MessageID] = msg.Message
      })

      const oldMessages = this.I18n.getLocaleMessage(this.CurLang?.Lang as string)
      const newMessages = this.Messages[this.CurLang?.Lang as string]
    
      if (!newMessages) {
        return
      }
    
      Object.keys(newMessages).forEach((key) => {
        oldMessages[key] = newMessages[key]
      })
    
      this.I18n.setLocaleMessage(this.CurLang?.Lang as string, oldMessages)
    }
  }
})

export * from './types'
