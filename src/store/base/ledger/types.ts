import { WithdrawState } from '../review';
import { IOSubType, IOType } from './const'

export interface Detail {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  IOType: IOType;
  IOSubType: IOSubType;
  CreatedAt: number;
  Amount: string;
  IOExtra: string;
  UserID: string;
  PhoneNO: string;
  EmailAddress: string;
}

export interface General {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Incoming: string;
  Locked: string;
  Outcoming: string;
  Spendable: string;
  UserID: string;
  PhoneNO: string;
  EmailAddress: string;
  CoinDisabled: boolean;
}

export interface GoodProfit {
  GoodID:                string;
  GoodName:              string;
  GoodUnit:              string;
  GoodServicePeriodDays: number;
  Units:                 number;
  CoinTypeID:            string;
  CoinName:              string;
  CoinLogo:              string;
  CoinUnit:              string;
  Incoming:              string;
}

export interface Profit {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Incoming: string;
}

export interface Withdraw {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Amount: string;
  CreatedAt: number;
  Address: string;
  AddressLabels: string;
  State: WithdrawState;
  Message: string;
}