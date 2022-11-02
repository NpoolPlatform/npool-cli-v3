import { AccountUsedFor, Account, BaseRequest, SignMethodType } from '../../../base';

export interface CreateUserAccountRequest extends BaseRequest {
  /**
   * Only could be withdraw or direct benefit address
   * Deposit address will be created by platform
   * Direct benefit address will be set with order
   */
  CoinTypeID: string;
  Address: string;
  UsedFor: AccountUsedFor;
  Labels?: string[];
  Account: string;
  AccountType: SignMethodType;
  VerificationCode: string;
}

export interface CreateUserAccountResponse {
  Info: Account;
}

export interface DeleteUserAccountRequest extends BaseRequest {
  ID: string;
  AppID?: string;
  UserID?: string;
}

export interface DeleteUserAccountResponse {
  Info: Account;
}

export interface UpdateUserAccountRequest extends BaseRequest {
  ID: string;
  AppID?: string;
  UserID?: string;
  Labels: string[];
}

export interface UpdateUserAccountResponse {
  Info: Account;
}

export interface GetUserAccountsRequest extends BaseRequest {
  UsedFor: AccountUsedFor;
  Offset: number;
  Limit: number;
}

export interface GetUserAccountsResponse {
  Infos: Account[];
  Total: number;
}

export interface GetDepositAccountRequest extends BaseRequest {
  AppID?: string;
  UserID?: string;
  CoinTypeID: string;
}

export interface GetDepositAccountResponse {
  Info: Account;
}