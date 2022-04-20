enum API {
  CREATE_ANNOUNCEMENT = '/notification/v1/create/announcement/for/other/app',
  GET_ANNOUNCEMENTS = '/notification/v1/get/announcements/by/other/app',

  CREATE_NOTIFICATION = '/notification/v1/create/notification/for/other/app/user',
  GET_NOTIFICATIONS = '/notification/v1/get/notifications/by/other/app',

  CREATE_MAIL = '/notification/v1/create/mail/for/other/app/user',
  GET_MAILS = '/notification/v1/get/mails/by/other/app'
}

export {
  API
}
