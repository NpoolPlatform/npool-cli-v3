import { defineStore } from 'pinia'
import { User } from '../../base'

export const useLocalUserStore = defineStore('localuser-v3', {
  state: () => ({
    User: undefined as unknown as User
  }),
  getters: {
    logined (): boolean {
      return this.User !== undefined
    }
  },
  actions: {}
})
