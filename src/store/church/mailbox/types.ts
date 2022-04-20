import {
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  GetAppNotificationsRequest,
  GetAppNotificationsResponse,
  CreateUserMailRequest,
  CreateUserMailResponse,
  GetUserMailsRequest,
  GetUserMailsResponse
} from '../../admin'
import {
  GetAnnouncementsRequest,
  GetAnnouncementsResponse
} from '../../frontend'

interface CreateAppAnnouncementRequest extends CreateAnnouncementRequest {
  TargetAppID: string
}

interface CreateAppAnnouncementResponse extends CreateAnnouncementResponse {
}

interface GetAppAnnouncementsRequest extends GetAnnouncementsRequest {
  TargetAppID: string
}

interface GetAppAnnouncementsResponse extends GetAnnouncementsResponse {
}

interface CreateAppNotificationRequest extends CreateNotificationRequest {
  TargetAppID: string
}

interface CreateAppNotificationResponse extends CreateNotificationResponse {
}

interface GetTargetAppNotificationsRequest extends GetAppNotificationsRequest {
  TargetAppID: string
}

interface GetTargetAppNotificationsResponse extends GetAppNotificationsResponse {
}

interface CreateAppUserMailRequest extends CreateUserMailRequest {
  TargetAppID: string
}

interface CreateAppUserMailResponse extends CreateUserMailResponse {
}

interface GetAppUserMailsRequest extends GetUserMailsRequest {
  TargetAppID: string
}

interface GetAppUserMailsResponse extends GetUserMailsResponse {
}

export {
  CreateAppAnnouncementRequest,
  CreateAppAnnouncementResponse,
  GetAppAnnouncementsRequest,
  GetAppAnnouncementsResponse,
  CreateAppNotificationRequest,
  CreateAppNotificationResponse,
  GetTargetAppNotificationsRequest,
  GetTargetAppNotificationsResponse,
  CreateAppUserMailRequest,
  CreateAppUserMailResponse,
  GetAppUserMailsRequest,
  GetAppUserMailsResponse
}
