import { BaseRequest } from '../../base'

interface Announcement {
  ID: string
  Title: string
  Content: string
  CreateAt: number
}

interface GetAnnouncementsRequest extends BaseRequest {
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

interface GetNotificationsRequest extends BaseRequest {
}

interface GetNotificationsResponse {
  Infos: Array<Notification>
}

interface Mail {
  ID: string
  FromUserID: string
  ToUserID: string
  Title: string
  Content: string
  AlreadyRead: boolean
  CreateAt: number
}

interface CreateMailRequest extends BaseRequest {
  Info: Mail
}

interface CreateMailResponse {
  Info: Mail
}

interface GetMailsRequest extends BaseRequest {
}

interface GetMailsResponse {
  Infos: Array<Mail>
}

interface MailboxState {
  Announcements: Array<Announcement>
  Notifications: Array<Notification>
  Mails: Array<Mail>
}

export {
  Announcement,
  GetAnnouncementsRequest,
  GetAnnouncementsResponse,
  Notification,
  GetNotificationsRequest,
  GetNotificationsResponse,
  Mail,
  CreateMailRequest,
  CreateMailResponse,
  GetMailsRequest,
  GetMailsResponse,
  MailboxState
}
