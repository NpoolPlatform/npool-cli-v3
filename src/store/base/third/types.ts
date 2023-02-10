import { SignMethodType } from '../appuser'
import { EventType } from '../notif';
import { UsedFor } from './const'

export interface Contact {
  ID: string;
  AppID: string;
  Account: string;
  AccountType: SignMethodType;
  UsedFor: UsedFor;
  Sender: string;
}

export interface EmailTemplate {
  ID: string;
  AppID: string;
  LangID: string;
  UsedFor: UsedFor;
  Sender: string;
  ReplyTos: string[];
  CCTos: string[];
  Subject: string;
  Body: string;
  DefaultToUsername: string;
}

export interface SMSTemplate {
  ID: string;
  AppID: string;
  LangID: string;
  UsedFor: UsedFor;
  Subject: string;
  Message: string;
}


export interface NotifTemplate {
  ID: string;
  AppID: string;
  LangID: string;
  UsedFor: EventType;
  Title: string;
  Content: string;
  Sender: string;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}
