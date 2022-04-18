import { AppRole } from '../../frontend'
import { AppRoleUser } from './types'

interface UsersState {
  RoleUsers: Map<string, Array<AppRoleUser>>
  Roles: Map<string, Array<AppRole>>
}

export {
  UsersState
}
