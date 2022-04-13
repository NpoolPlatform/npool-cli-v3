import { AccountType } from '../../../const'

enum API {
  GET_EMAIL_TEMPALTES = '/third-gateway/v1/get/app/email/templates/by/app',
  CREATE_EMAIL_TEMPLATE = '/third-gateway/v1/create/app/email/template',
  UPDATE_EMAIL_TEMPLATE = '/third-gateway/v1/update/app/email/template',

  GET_SMS_TEMPALTES = '/third-gateway/v1/get/app/sms/templates/by/app',
  CREATE_SMS_TEMPLATE = '/third-gateway/v1/create/app/sms/template',
  UPDATE_SMS_TEMPLATE = '/third-gateway/v1/update/app/sms/template',

  GET_CONTACTS = '/third-gateway/v1/get/app/contacts/by/app',
  CREATE_CONTACT = '/third-gateway/v1/create/app/contact',
  UPDATE_CONTACT = '/third-gateway/v1/update/app/contact'
}

const ContactType = [
  AccountType.Mobile,
  AccountType.Email
]

export {
  API,
  ContactType
}
