import { ReqMessage } from '../notifications/types'

interface Announcement {
  ID: string
  Title: string
  Content: string
  CreateAt: number
}

interface GetAnnouncementsRequest {
  Message: ReqMessage
}

interface GetAnnouncementsResponse {
  Infos: Array<Announcement>
}

interface Notification {
  ID: string
  Title: string
  Content: string
  AlreadyRead: boolean
  CreateAt: number
}

interface GetNotificationsRequest {
  Message: ReqMessage
}

interface GetNotificationsResponse {
  Infos: Array<Notification>
}

interface MailboxState {
  Announcements: Array<Announcement>
  Notifications: Array<Notification>
}

export {
  Announcement,
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  Notification,
  GetNotificationsRequest,
  GetNotificationsResponse,
  MailboxState
}
