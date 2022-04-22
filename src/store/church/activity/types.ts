import {
  CreateActivityRequest,
  CreateActivityResponse,
  GetActivitiesRequest,
  GetActivitiesResponse
} from '../../admin'

interface CreateAppActivityRequest extends CreateActivityRequest {
  TargetAppID: string
}

interface CreateAppActivityResponse extends CreateActivityResponse {
}

interface GetAppActivitiesRequest extends GetActivitiesRequest {
  TargetAppID: string
}

interface GetAppActivitiesResponse extends GetActivitiesResponse {
}

export {
  CreateAppActivityRequest,
  CreateAppActivityResponse,
  GetAppActivitiesRequest,
  GetAppActivitiesResponse
}
