import { BaseRequest } from '../../base'
import { RoleUser, GetRoleUsersRequest } from '../../admin'

interface Role {
  ID: string
  AppID: string
  CreatedBy: string
  Role: string
  Description: string
  Default: boolean
}

interface AppRoleUser extends RoleUser {
  AppID: string
}

interface CreateAppRoleUserRequest extends BaseRequest {
  TargetAppID: string
  Info: AppRoleUser
}

interface CreateAppRoleUserResponse {
  Info: AppRoleUser
}

interface GetAppRoleUsersRequest extends GetRoleUsersRequest {
  TargetAppID: string
}

interface GetAppRoleUsersResponse {
  Infos: Array<AppRoleUser>
}

export {
  Role,
  AppRoleUser,
  CreateAppRoleUserRequest,
  CreateAppRoleUserResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse
}
