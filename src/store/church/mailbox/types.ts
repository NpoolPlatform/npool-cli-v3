import {
  CreateAnnouncementRequest,
  CreateAnnouncementResponse,
  CreateNotificationRequest,
  CreateNotificationResponse,
  GetAppNotificationsRequest,
  GetAppNotificationsResponse,
  GetUserMailsRequest,
  GetUserMailsResponse
} from '../../admin'
import {
  CreateMailRequest,
  CreateMailResponse,
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

interface CreateAppUserMailRequest extends CreateMailRequest {
  TargetAppID: string
  TargetUserID: string
}

interface CreateAppUserMailResponse extends CreateMailResponse {
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
