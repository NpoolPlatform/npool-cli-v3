import { defineStore } from 'pinia'
import { LoginedUserState } from './types'
import { API } from './const'

const useLoginedUserStore = defineStore('logineduser', {
  state: (): LoginedUserState => ({
    LoginedUser: undefined
  }),
  getters: {
    getLogined (): boolean { return this.LoginedUser !== undefined && this.LoginedUser !== null }
  },
  actions: {}
})

export * from './types'

export {
  useLoginedUserStore,
  API as LoginedAPI
}
