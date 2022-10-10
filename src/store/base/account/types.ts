export interface TransferAccount {
  ID:                 string;
  AppID:              string;
  UserID:             string;
  TargetUserID:       string;
  TargetEmailAddress: string;
  TargetPhoneNO:      string;
  CreatedAt:          number;
  TargetUsername:     string;
  TargetFirstName:    string;
  TargetLastName:     string;
}
export interface Transfer {
  CoinTypeID:         string;
  CoinName:           string;
  CoinLogo:           string;
  CoinUnit:           string;
  Amount:             string;
  CreatedAt:          number;
  TargetUserID:       string;
  TargetEmailAddress: string;
  TargetPhoneNO:      string;
  TargetUsername:     string;
  TargetFirstName:    string;
  TargetLastName:     string;
}

export interface Account {
  ID: string;
  AppID: string;
  UserID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinUnit: string;
  CoinEnv: string;
  CoinLogo: string;
  AccountID: string;
  Address: string;
  UsedFor: string;
  Labels: string[];
  CreatedAt: number;
  PhoneNO: string;
  EmailAddress: string;
}

export interface Address {
  ID: string;
  CoinTypeID: string;
  AccountID: string;
  Name: string;
  Message: string;
  CreatedAt: number;
  Labels: string[];
  DeletedAt: number;
}

export interface Account {
  ID: string;
  CoinTypeID: string;
  Address: string;
  CreateAt: number;
  PlatformHoldPrivateKey: boolean;
}

export interface WithdrawAddress {
  Address: Address;
  State: string;
  Message: string;
  Account: Account;
}