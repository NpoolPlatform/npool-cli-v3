import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import { Message, Language } from '../../frontend/langs/types'
import { LocaleState } from './types'

export const useLocaleStore = defineStore('locale', {
  state: (): LocaleState => ({
    Languages: [],
    CurLang: undefined,
    LangMessages: new Map<string, Array<Message>>(),
    I18n: useI18n()
  }),
  getters: {
    getLangMessages (): (langID: string) => Array<Message> {
      return (langID: string) => {
        return this.LangMessages.get(langID) as Array<Message>
      }
    }
  },
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
      if (messages.length === 0) {
        return
      }

      let langMsgs = this.LangMessages.get(messages[0].LangID) as Array<Message>
      if (!langMsgs) {
        langMsgs = [] as Array<Message>
      }

      const oldMessages = this.I18n.getLocaleMessage(this.CurLang?.Lang as string)

      messages.forEach((msg) => {
        const index = langMsgs.findIndex((el: Message) => el.ID === msg.ID)
        langMsgs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, msg)
        oldMessages[msg.MessageID] = msg.Message
      })

      this.LangMessages.set(messages[0].LangID, langMsgs)
      this.I18n.setLocaleMessage(this.CurLang?.Lang as string, oldMessages)
    }
  }
})

export * from './types'
