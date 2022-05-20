import {
  RoleUser,
  GetRoleUsersRequest,
  GetRolesRequest,
  CreateRoleUserRequest,
  CreateRoleRequest,
  CreateRoleResponse
} from '../../admin'
import { AppRole } from '../../frontend'

interface AppRoleUser extends RoleUser {
  AppID: string
}

interface CreateAppRoleUserRequest extends CreateRoleUserRequest {
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

interface CreateAppRoleRequest extends CreateRoleRequest {
  TargetAppID: string
}

interface CreateAppRoleResponse extends CreateRoleResponse {
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
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  GetAppRolesRequest,
  GetAppRolesResponse
}
