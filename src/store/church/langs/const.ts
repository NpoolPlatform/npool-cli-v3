enum API {
  CREATE_LANG = '/internationalization/v1/add/lang',
  CREATE_LANGS = '/internationalization/v1/add/langs',
  UPDATE_LANG = '/internationalization/v1/update/lang',

  CREATE_COUNTRY = '/internationalization/v1/create/country',
  CREATE_COUNTRIES = '/internationalization/v1/create/countries',
  UPDATE_COUNTRY = '/internationalization/v1/update/country',

  GET_APP_LANGS = '/internationalization/v1/get/app/lang/infos/by/other/app',
  CREATE_APP_LANG = '/internationalization/v1/create/app/lang/for/other/app',
  GET_MESSAGES = '/internationalization/v1/get/messages/by/other/app/lang',
  CREATE_MESSAGE = '/internationalization/v1/create/message/for/other/app',
  CREATE_MESSAGES = '/internationalization/v1/create/messages/for/other/app'
}

export {
  API
}
