import { UsedFor } from '../third'
import { AnnouncementType, EventType, NotifChannel } from './const'

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
  Channels: NotifChannel[];
  AnnouncementType: AnnouncementType
  /** @format int64 */
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
  EventType: EventType;
  UseTemplate: boolean;
  Title: string;
  Content: string;
  Channels: NotifChannel[];
  AlreadyRead: boolean;
  CreatedAt: number;
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
  AnnouncementType: AnnouncementType;
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