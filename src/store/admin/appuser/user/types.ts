import { User, Role, AppRoleUser, BaseRequest } from '../../../base'

export interface GetUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetUsersResponse {
  Infos: Array<User>
  Total: number
}

export interface GetRolesRequest extends BaseRequest{
  Offset: number
  Limit: number
}
export interface GetRolesResponse {
  Infos: Array<Role>
  Total: number
}

export interface GetRoleUsersRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetRoleUsersResponse {
  Infos: Array<AppRoleUser>
  Total: number
}

export interface UpdateAppUserRequest extends BaseRequest {
  TargetUserID: string
  Kol?:  boolean
  EmailAddress?: string
}

export interface UpdateAppUserResponse {
  Info: User
}