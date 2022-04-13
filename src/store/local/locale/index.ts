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
    LangMessages: [],
    I18n: useI18n()
  }),
  getters: {},
  actions: {
    setLangs (langs: Array<Language>) {
      this.Languages = []
      this.Languages = langs

      const oldLangID = Cookies.get('X-Lang-ID')
      for (const lang of langs) {
        if (oldLangID === lang.ID) {
          this.setLang(lang)
          return
        }
      }

      if (langs.length > 0 && !this.CurLang) {
        this.setLang(langs[0])
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

      this.LangMessages = messages
      this.Messages[this.CurLang?.Lang as string] = msgs

      const oldMessages = this.I18n.getLocaleMessage(this.CurLang?.Lang as string)
    
      Object.keys(msgs).forEach((key) => {
        oldMessages[key] = msgs[key]
      })
    
      this.I18n.setLocaleMessage(this.CurLang?.Lang as string, oldMessages)
    }
  }
})

export * from './types'
