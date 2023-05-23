import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { User } from '../../base'
import { useAdminAppLangStore } from '../../admin'
import { useLocaleStore } from '../locale'
const lang = useAdminAppLangStore()
const locale = useLocaleStore()

export const useLocalUserStore = defineStore('local-user-v4', {
  state: () => ({
    User: undefined as unknown as User
  }),
  getters: {
    logined (): boolean {
      return this.User && this.User.Logined && this.User.LoginVerified
    },
    findInvitationCode () : boolean {
      return this.User && this.User.InvitationCode?.length > 0
    },
    findEmailAddress () : boolean {
      return this.User && this.User.EmailAddress?.length > 0
    },
    findPhoneNO () : boolean {
      return this.User && this.User.PhoneNO?.length > 0
    },
    isKol () : boolean {
      return this.User && this.User?.Kol
    }
  },
  actions: {
    setUser(user: User) {
      this.User = user
      
      if (user) {
        Cookies.set('X-User-ID', user.ID, { expires: '4h', secure: true })
        Cookies.set('X-App-Login-Token', user.LoginToken, { expires: '4h', secure: true })
        
        if(user?.SelectedLangID?.length > 0) {
          const _lang = lang.AppLangs.AppLangs.find((el) => el.LangID === user?.SelectedLangID)
          if(!_lang) {
            console.log('LangID Not Found', user?.SelectedLangID)
            return
          }
          locale.setLang(_lang)
        }
      }
    },
    restUser() {
      Cookies.remove('X-User-ID')
      Cookies.remove('X-AppLogin-Token')
      this.User = undefined as unknown as User
    }
  }
})
