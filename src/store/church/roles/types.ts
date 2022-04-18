import { BaseRequest } from '../../base'
import { RoleUser, GetRoleUsersRequest, GetRolesRequest } from '../../admin'
import { AppRole } from '../../frontend'

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

interface GetAppRolesRequest extends GetRolesRequest {
  TargetAppID: string
}

interface GetAppRolesResponse {
  Infos: Array<AppRole>
}

export {
  AppRoleUser,
  CreateAppRoleUserRequest,
  CreateAppRoleUserResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse,
  GetAppRolesRequest,
  GetAppRolesResponse
}
