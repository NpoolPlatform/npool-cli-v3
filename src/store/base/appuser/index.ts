import { defineStore } from 'pinia'
import { User } from './types'

export const useBaseUserStore = defineStore('base-user-v4', {
  state: () => ({}),
  getters: {
    displayName (): (user: User, locale: string) => string {
      return (user: User, locale: string) => {
        let username = user.EmailAddress;
        switch (locale) {
          case 'ja-JP':
            username =  user.FirstName + ' ' + user.LastName
            break
          default:
            username = user.LastName + ' ' + user.FirstName
            break
        }
        if (!username?.length) {
            username = user.PhoneNO
        }
        return username
      }
    }
  },
  actions: {}
})


export * from './const'
export * from './types'
