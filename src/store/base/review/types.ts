import { Account, Address } from '../account';
import { User } from '../appuser';
import { ReviewState, WithdrawTrigger } from './const';

export interface WithdrawReview {
  WithdrawID: string;
  WithdrawState: string;
  ReviewID: string;
  UserID: string;
  KycState: string;
  EmailAddress: string;
  PhoneNO: string;
  Reviewer: string;
  ObjectType: string;
  Domain: string;
  CreatedAt: number;
  UpdatedAt: number;
  Message: string;
  State: ReviewState;
  Trigger: WithdrawTrigger;
  Amount: string;
  FeeAmount: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Address: string;
  PlatformTransactionID: string;
  ChainTransactionID: string;
}


export interface Review {
  ID: string
  AppID: string
  ObjectType: string
  ReviewerID: string
  State: string
  Message: string
  ObjectID: string
  Domain: string
  CreateAt: number
}

export interface WithdrawAddressReview {
  Address: Address
  Account: Account
  Review: Review
  User: User
}