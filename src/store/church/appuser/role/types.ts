import { Role } from '../../../base/appuser'
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
}

export interface CreateAppRoleRequest  extends BaseRequest {
  TargetAppID: string;
  RoleName: string;
  Default?: boolean;
  Description?: string;
}

export interface CreateAppRoleResponse {
  Info: Role;
}