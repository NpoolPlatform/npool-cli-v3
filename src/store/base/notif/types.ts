import { UsedFor } from '../third'
import { NotifType, NotifChannel } from './const'

export interface Announcement {
  ID: string;
  AppID: string;
  AppName: string;
  LangID: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  Title: string;
  Content: string;
  AlreadyRead: boolean;
  AlreadySend: boolean;
  /** @format int64 */
  CreatedAt: number;
  /** if AlreadySend = true SendChannel valid */
  SendChannel: NotifChannel;
  Channel: NotifChannel;
  AnnouncementType: NotifType
  /** @format int64 */
  StartAt: number;
  EndAt: number;
}

export interface Notif {
  ID: string;
  AppID: string;
  AppName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  EventType: UsedFor;
  UseTemplate: boolean;
  Title: string;
  Content: string;
  Channel: NotifChannel;
  Notified: boolean;
  CreatedAt: number;
  UpdatedAt: number;
  LangID: string;
  Lang: string;
}

export interface ReadState {
  AnnouncementID: string;
  AppID: string;
  AppName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  Title: string;
  Content: string;
  /** @format int64 */
  CreatedAt: number;
}

export interface SendState {
  AnnouncementID: string;
  AppID: string;
  AppName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  Title: string;
  Content: string;
  Channel: NotifChannel;
  /** @format int64 */
  CreatedAt: number;
}

export interface AnnouncementUser {
  ID: string;
  AnnouncementID: string;
  AppID: string;
  AppName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  Title: string;
  Content: string;
  AnnouncementType: NotifType;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}

export interface TNotifChannel {
  AppID: string;
  ID: string;
  AppName: string;
  EventType: UsedFor;
  Channel: NotifChannel;
  /** @format int64 */
  CreatedAt: number;
}

export interface NotifUser {
  ID: string;
  EventType: UsedFor;
  AppID: string;
  AppName: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  Title: string;
  Content: string;
  NotifType: NotifType;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}