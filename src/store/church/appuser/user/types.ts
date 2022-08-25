import { Auth, Role, User } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface GetAppUsersRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppUsersResponse {
  Infos: Array<User>
}

export interface GetAppRolesRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppRolesResponse {
  Infos: Array<Role>
}

export interface GetAppAuthsRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppAuthsResponse {
  Infos: Array<Auth>
}

export interface ChurchUserState {
  Users: Map<string, Array<User>>
  Roles: Map<string, Array<Role>>
  Auths: Map<string, Array<Auth>>
}
