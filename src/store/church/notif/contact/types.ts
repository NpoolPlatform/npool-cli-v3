import { UsedFor, SignMethodType, BaseRequest, Contact } from '../../../base'

export interface CreateAppContactRequest extends BaseRequest {
  TargetAppID: string;
  UsedFor: UsedFor;
  Account: string;
  AccountType: SignMethodType;
  Sender: string;
}

export interface CreateAppContactResponse {
  Info: Contact;
}

export interface GetAppContactsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppContactsResponse {
  Infos: Array<Contact>;
  Total: number;
}

export interface UpdateAppContactRequest extends BaseRequest {
  TargetAppID: string;
  ID: string;
  UsedFor: UsedFor;
  Account: string;
  AccountType: SignMethodType;
  Sender: string;
  AppID: string;
}

export interface UpdateAppContactResponse {
  Info: Contact;
}