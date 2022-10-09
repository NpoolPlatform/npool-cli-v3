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