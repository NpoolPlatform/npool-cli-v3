import { BaseRequest } from '../../base'
import {
  Announcement,
  Notification,
  GetMailsRequest,
  GetMailsResponse,
  GetNotificationsResponse
} from '../../frontend'

interface CreateAnnouncementRequest extends BaseRequest {
  Info: Announcement
}

interface CreateAnnouncementResponse {
  Info: Announcement
}

interface UpdateAnnouncementRequest extends BaseRequest {
  Info: Announcement
}

interface UpdateAnnouncementResponse {
  Info: Announcement
}

interface CreateNotificationRequest extends BaseRequest {
  Info: Notification
}

interface CreateNotificationResponse {
  Info: Notification
}

interface UpdateNotificationRequest extends BaseRequest {
  Info: Notification
}

interface UpdateNotificationResponse {
  Info: Notification
}

interface GetAppNotificationsRequest extends BaseRequest {
}

interface GetAppNotificationsResponse extends GetNotificationsResponse {
}

interface GetUserMailsRequest extends GetMailsRequest {
} 

interface GetUserMailsResponse extends GetMailsResponse {
}

export {
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  UpdateAnnouncementRequest,
  UpdateAnnouncementResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  UpdateNotificationRequest,
  UpdateNotificationResponse,
  GetAppNotificationsRequest,
  GetAppNotificationsResponse,
  GetUserMailsRequest,
  GetUserMailsResponse
}
