import { Role, AppRoleUser, BaseRequest, RoleUserRelation } from '../../../base'

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
  RoleID: string
}

export interface GetRoleUsersResponse {
  Infos: Array<AppRoleUser>
  Total: number
}

export interface CreateRoleUserRequest extends BaseRequest{
  TargetUserID: string
  RoleID: string
}

export interface CreateRoleUserResponse {
  Info: AppRoleUser
}

export interface DeleteRoleUserRequest extends BaseRequest{
  RoleUserID: string
}

export interface DeleteRoleUserResponse {
  Info: RoleUserRelation
}
