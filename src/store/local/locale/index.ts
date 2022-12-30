import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { useI18n } from 'vue-i18n'
import { Message, AppLang } from '../../base'

export const useLocaleStore = defineStore('locale-lang-v4', {
  state: () => ({
    AppLang: undefined as unknown as AppLang,
    I18n: useI18n()
  }),
  getters: {

  },
  actions: {
    setLang (lang: AppLang) {
      if (!lang) {
        return
      }
      this.AppLang = lang
      Cookies.set('X-Lang-ID', lang.LangID, { expires: '4h', secure: true })
      this.I18n.locale = lang.Lang
    },
    setLangs (langs: Array<AppLang>) {
      let flag = false
      langs.forEach((el) => {
        if (el.Main) {
          flag = true
          this.setLang(el)
        }
      })
      if (!flag && langs.length > 0) {
        this.setLang(langs[0])
      }
    },
    setLocaleMessages (messages: Array<Message>) {
      const olds = this.I18n.getLocaleMessage(this.AppLang?.Lang)
      messages.forEach((el) => {
        olds[el.MessageID] = el.Message
      })
      this.I18n.setLocaleMessage(this.AppLang?.Lang, olds)
    }
  }
})
