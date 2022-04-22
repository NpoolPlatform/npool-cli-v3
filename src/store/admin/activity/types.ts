import { BaseRequest } from '../../base'

interface Activity {
  ID?: string
  AppID: string
  CreatedBy: string
  Name: string
  Start: number
  End: number
  SystemActivity: boolean
}

interface CreateActivityRequest extends BaseRequest {
  Info: Activity
}

interface CreateActivityResponse {
  Info: Activity
}

interface UpdateActivityRequest extends BaseRequest {
  Info: Activity
}

interface UpdateActivityResponse {
  Info: Activity
}

interface GetActivitiesRequest extends BaseRequest {
}

interface GetActivitiesResponse {
  Infos: Array<Activity>
}

export {
  Activity,
  CreateActivityRequest,
  CreateActivityResponse,
  UpdateActivityRequest,
  UpdateActivityResponse,
  GetActivitiesRequest,
  GetActivitiesResponse
}
