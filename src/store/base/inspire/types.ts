import { SettleInterval, SettleMode, SettleType } from '../good';

export interface Commission {
  ID: string;
  UserID: string;
  Username: string;
  EmailAddress: string;
  PhoneNO: string;
  FirstName: string;
  LastName: string;
  Kol: boolean;
  SettleType: SettleType;
  SettleMode: SettleMode;
  SettleInterval: SettleInterval;
  GoodID: string;
  GoodName: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  Percent: string;
  Amount: string;
  Threshold: string;
  /** @format int64 */
  StartAt: number;
  /** @format int64 */
  EndAt: number;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}

export interface Registration {
  ID: string;
  AppID: string;
  InviterID: string;
  InviterEmailAddress: string;
  InviterPhoneNO: string;
  InviterUsername: string;
  InviteeID: string;
  InviteeEmailAddress: string;
  InviteePhoneNO: string;
  InviteeUsername: string;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}

export interface InvitationCode {
  AppID: string;
  UserID: string;
  EmailAddress: string;
  PhoneNO: string;
  Username: string;
  InvitationCode: string;
  Confirmed: boolean;
  Disabled: boolean;
  /** @format int64 */
  CreatedAt: number;
  /** @format int64 */
  UpdatedAt: number;
}