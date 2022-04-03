import { defineStore } from 'pinia'
import { Notification, NotificationState } from './types'
import { Type as NotificationType } from './const'

const useNotificationStore = defineStore('notification', {
  state: (): NotificationState => ({
    Notifications: []
  }),
  getters: {},
  actions: {
    pushNotification (notification: Notification) {
      this.Notifications.push(notification)
    },
    popNotification (): Notification | undefined {
      if (this.Notifications.length > 0) {
        const notification = this.Notifications[0]
        this.Notifications = this.Notifications.splice(0, 1)
        return notification
      }
      return undefined
    }
  }
})

export * from './helper'

export {
  useNotificationStore,
  NotificationType
}
