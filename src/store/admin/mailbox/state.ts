import { Notification, Mail } from '../../frontend'

interface MailboxState {
  Notifications: Array<Notification>
  Mails: Array<Mail>
}

export {
  MailboxState
}