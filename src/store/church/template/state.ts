import { Contact, EmailTemplate, SMSTemplate } from '../../admin'

interface TemplateState {
  Contacts: Map<string, Array<Contact>>
  EmailTemplates: Map<string, Array<EmailTemplate>>
  SMSTemplates: Map<string, Array<SMSTemplate>>
}

export {
  TemplateState
}
