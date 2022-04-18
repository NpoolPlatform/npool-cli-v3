import { BaseRequest } from '../../base'
import { AppRole } from '../../frontend'

interface GetRolesRequest extends BaseRequest {
}

interface GetRolesResponse {
  Infos: Array<AppRole>
}

interface RoleUser {
  ID?: string
  RoleID: string
  UserID?: string
}

interface GetRoleUsersRequest extends BaseRequest {
}

interface GetRoleUsersResponse {
  Infos: Array<RoleUser>
}

interface CreateRoleUserRequest extends BaseRequest {
  TargetUserID: string
  Info: RoleUser
}

interface CreateRoleUserResponse {
  Info: RoleUser
}

interface DeleteRoleUserRequest extends BaseRequest {
  ID: string
}

interface DeleteRoleUserResponse {
  Info: RoleUser
}

interface RoleState {
  Roles: Array<AppRole>
  RoleUsers: Array<RoleUser>
}

export {
  GetRolesRequest,
  GetRolesResponse,
  RoleUser,
  GetRoleUsersRequest,
  GetRoleUsersResponse,
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  RoleState
}
