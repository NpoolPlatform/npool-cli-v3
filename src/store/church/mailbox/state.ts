import { Notification, Mail, Announcement } from '../../frontend'

interface MailboxState {
  Announcements: Map<string, Array<Announcement>>
  Notifications: Map<string, Array<Notification>>
  Mails: Map<string, Array<Mail>>
}

export {
  MailboxState
}