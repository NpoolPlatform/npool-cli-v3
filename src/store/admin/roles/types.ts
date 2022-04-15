import { BaseRequest } from '../../base'
import { AppRole } from '../../frontend'

interface GetRolesRequest extends BaseRequest {
}

interface GetRolesResponse {
  Infos: Array<AppRole>
}

interface AppRoleUser {
  ID?: string
  RoleID: string
  UserID?: string
}

interface GetRoleUsersRequest extends BaseRequest {
}

interface GetRoleUsersResponse {
  Infos: Array<AppRoleUser>
}

interface CreateRoleUserRequest extends BaseRequest {
  TargetUserID: string
  Info: AppRoleUser
}

interface CreateRoleUserResponse {
  Info: AppRoleUser
}

interface DeleteRoleUserRequest extends BaseRequest {
  ID: string
}

interface DeleteRoleUserResponse {
  Info: AppRoleUser
}

interface RoleState {
  Roles: Array<AppRole>
  RoleUsers: Array<AppRoleUser>
}

export {
  GetRolesRequest,
  GetRolesResponse,
  AppRoleUser,
  GetRoleUsersRequest,
  GetRoleUsersResponse,
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  RoleState
}
