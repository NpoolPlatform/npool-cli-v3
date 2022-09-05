import { defineStore } from 'pinia'
import { User } from './types'

export const useBaseUserStore = defineStore('base-user-v4', {
  state: () => ({}),
  getters: {
    displayName (): (user: User, locale: string) => string {
      return (user: User, locale: string) => {
        let username = user.EmailAddress
        let username1 = ''
        switch (locale) {
          case 'ja-JP':
            username1 =  user.FirstName + ' ' + user.LastName
            break
          default:
            username1 = user.LastName + ' ' + user.FirstName
            break
        }
        if (username1.replace(/ /g, '').length) {
          username = username1
        }
        if (!username?.length) {
            username = user.PhoneNO
        }
        return username
      }
    },

    displayName1 (): (emailAddress: string, phoneNO: string, firstName: string, lastName: string, locale: string) => string {
      return (emailAddress: string, phoneNO: string, firstName: string, lastName: string, locale: string) => {
        let username = emailAddress
        let username1 = ''
        switch (locale) {
          case 'ja-JP':
            username1 =  firstName + ' ' + lastName
            break
          default:
            username1 = lastName + ' ' + firstName
            break
        }
        if (username1.replace(/ /g, '').length) {
          username = username1
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
