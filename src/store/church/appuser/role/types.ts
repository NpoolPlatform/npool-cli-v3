import { Role, AppRoleUser } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface GetAppRolesRequest extends BaseRequest{
  TargetAppID: string
  Offset: number
  Limit: number
}

export interface GetAppRolesResponse {
  Infos: Array<Role>
}

export interface ChurchRoleState {
  Roles: Map<string, Array<Role>>
  AppRoleUsers: Map<string, Array<AppRoleUser>>
}

export interface CreateAppRoleRequest  extends BaseRequest {
  TargetAppID: string
  RoleName: string
  Default?: boolean
  Description?: string
}

export interface CreateAppRoleResponse {
  Info: Role;
}

export interface GetAppRoleUsersRequest extends BaseRequest {
  TargetAppID: string
  RoleID: string
  Offset: number
  Limit: number
}

export interface GetAppRoleUsersResponse {
  Infos: Array<AppRoleUser>
}

export interface CreateAppRoleUserRequest extends BaseRequest{
  TargetAppID: string
  TargetUserID: string
  RoleID: string
}

export interface CreateAppRoleUserResponse{
  Info: AppRoleUser
}