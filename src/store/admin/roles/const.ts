enum API {
  CREATE_ROLE = '/appuser-manager/v1/create/app/role',
  UPDATE_ROLE = '/appuser-manager/v1/update/app/role',
  GET_ROLES = '/appuser-manager/v1/get/app/roles/by/app',
  GET_ROLE_USERS = '/appuser-manager/v1/get/app/role/users/by/app',
  CREATE_ROLE_USER = '/appuser-manager/v1/create/app/role/user/for/app/other/user',
  DELETE_ROLE_USER = '/appuser-manager/v1/delete/app/role/user'
}

export {
  API
}
