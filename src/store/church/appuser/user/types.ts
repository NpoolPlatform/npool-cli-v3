import { User } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface GetAppUsersRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppUsersResponse {
  Infos: Array<User>
}

export interface ChurchUserState {
  Users: Map<string, Array<User>>
}
