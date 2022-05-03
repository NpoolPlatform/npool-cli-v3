import { Notification } from './types'
import { Type } from './const'
import { Notify } from 'quasar'

const mergeMessage = (notification: Notification) => {
  if (notification.Message) {
    if (notification.Description) {
      return notification.Message + '(' + notification.Description + ')'
    }
    return notification.Message
  }
  return notification.Description
}

const success = (notification: Notification): void => {
  Notify.create({
    type: 'positive',
    message: notification.Title,
    caption: mergeMessage(notification)
  })
}

const fail = (notification: Notification): void => {
  Notify.create({
    type: 'negative',
    message: notification.Title,
    caption: mergeMessage(notification)
  })
}

const warning = (notification: Notification): void => {
  Notify.create({
    type: 'warning',
    message: notification.Title,
    caption: mergeMessage(notification)
  })
}

const info = (notification: Notification): void => {
  Notify.create({
    type: 'info',
    message: notification.Title,
    caption: mergeMessage(notification)
  })
}

const notify = (notification: Notification) => {
  if (!notification.Popup) {
    return
  }
  switch (notification.Type) {
    case Type.Success:
      success(notification)
      break
    case Type.Error:
      fail(notification)
      break
    case Type.Info:
      info(notification)
      break
    case Type.Warning:
      warning(notification)
      break
    case Type.Waiting:
      return Notify.create({
        type: 'ongoing',
        message: notification.Message
      })
  }
}

export {
  notify
}
