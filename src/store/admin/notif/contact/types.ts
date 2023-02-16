import { UsedFor, SignMethodType, BaseRequest, Contact } from '../../../base'

export interface CreateContactRequest extends BaseRequest {
  UsedFor: UsedFor;
  Account: string;
  AccountType: SignMethodType;
  Sender: string;
}

export interface CreateContactResponse {
  Info: Contact;
}

export interface GetContactRequest extends BaseRequest {
  ID: string;
}

export interface GetContactResponse {
  Info: Contact;
}

export interface GetContactsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetContactsResponse {
  Infos: Array<Contact>;
  Total: number;
}

export interface UpdateContactRequest extends BaseRequest {
  ID: string;
  Account: string;
  AccountType: SignMethodType;
  Sender: string;
}

export interface UpdateContactResponse {
  Info: Contact;
}

export interface ContactViaEmailRequest extends BaseRequest {
  UsedFor: UsedFor;
  Sender: string;
  Subject: string;
  Body: string;
  SenderName: string;
}