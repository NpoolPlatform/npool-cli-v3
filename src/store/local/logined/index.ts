import { defineStore } from 'pinia'
import { LoginedUserState } from './types'

const useLoginedUserStore = defineStore('logineduser-v3', {
  state: (): LoginedUserState => ({
    LoginedUser: undefined
  }),
  getters: {
    getLogined (): boolean { 
      return this.LoginedUser !== undefined && this.LoginedUser !== null 
    }
  },
  actions: {}
})

export {
  useLoginedUserStore
}
