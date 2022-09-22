import { SignMethodType } from '../appuser'
import { UsedFor } from './const'

export interface Contact {
  ID: string;
  AppID: string;
  Account: string;
  AccountType: SignMethodType;
  UsedFor: UsedFor;
  Sender: string;
}