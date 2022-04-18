enum API {
  GET_AUTHS = '/authing-gateway/v1/get/auths/by/other/app',
  CREATE_APP_AUTH = '/authing-gateway/v1/create/app/auth/for/other/app',
  CREATE_APP_USER_AUTH = '/authing-gateway/v1/create/app/user/auth/for/other/app',
  CREATE_APP_ROLE_AUTH = '/authing-gateway/v1/create/app/role/auth/for/other/app',
  DELETE_APP_AUTH = '/authing-gateway/v1/delete/app/auth',
  DELETE_APP_USER_AUTH = '/authing-gateway/v1/delete/app/user/auth',
  DELETE_APP_ROLE_AUTH = '/authing-gateway/v1/delete/app/role/auth',
  GET_AUTH_HISTORIES = '/authing-gateway/v1/get/auth/histories/by/other/app'
}

export {
  API
}
