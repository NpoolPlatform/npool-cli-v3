import { defineStore } from 'pinia'
import { Cookies } from 'quasar'
import { User } from '../../base'

export const useLocalUserStore = defineStore('local-user-v3', {
  state: () => ({
    User: undefined as unknown as User
  }),
  getters: {
    logined (): boolean {
      return this.User !== undefined
    }
  },
  actions: {
    setUser(user: User) {
      this.User = user
      if (user.LoginVerified) {
        Cookies.set('X-User-ID', user.ID, { expires: '4h', secure: true })
        Cookies.set('X-App-Login-Token', user.LoginToken, { expires: '4h', secure: true })
      }
    },
    restUser() {
      Cookies.remove('X-User-ID')
      Cookies.remove('X-AppLogin-Token')
      this.User = undefined as unknown as User
      this.$reset()
    }
  }
})
