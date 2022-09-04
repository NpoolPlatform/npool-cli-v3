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
    },

    displayName1 (): (emailAddress: string, phoneNO: string, firstName: string, lastName: string, locale: string) => string {
      return (emailAddress: string, phoneNO: string, firstName: string, lastName: string, locale: string) => {
        let username = emailAddress;
        switch (locale) {
          case 'ja-JP':
            username =  firstName + ' ' + lastName
            break
          default:
            username = lastName + ' ' + firstName
            break
        }
        if (!username?.length) {
            username = phoneNO
        }
        return username
      }
    }
  },
  actions: {}
})


export * from './const'
export * from './types'
