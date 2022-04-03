import { defineStore } from 'pinia'
import { LoginedUserState } from './types'

export const useLoginedUserStore = defineStore('logineduser', {
  state: (): LoginedUserState => ({
    LoginedUser: undefined
  }),
  getters: {
    getLogined (): boolean { return this.LoginedUser !== undefined && this.LoginedUser !== null }
  },
  actions: {}
})
