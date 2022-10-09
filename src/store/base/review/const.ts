export enum WithdrawState {
  DefaultWithdrawReviewState = 'DefaultWithdrawReviewState',
  Reviewing = 'Reviewing',
  Transferring = 'Transferring',
  Rejected = 'Rejected',
  TransactionFail = 'TransactionFail',
  Successful = 'Successful',
}
export enum KycState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait = 'Wait',
  Rejected ='Rejected'
}
export enum ReviewState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'Approved',
  Wait = 'Wait',
  Rejected ='Rejected'
}
export enum WithdrawTrigger {
  DefaultTriggerType = 'DefaultTriggerType',
  AutoReviewed = 'AutoReviewed',
  LargeAmount = 'LargeAmount',
  InsufficientFunds = 'InsufficientFunds',
  InsufficientGas = 'InsufficientGas'
}