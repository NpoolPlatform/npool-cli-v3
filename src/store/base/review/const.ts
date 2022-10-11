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
// NEED RESTRUCTURE
export enum ReviewState {
  DefaultReviewState = 'DefaultReviewState',
  Approved = 'approved',
  Wait = 'wait',
  Rejected ='rejected'
}

export enum WithdrawTrigger {
  DefaultTriggerType = 'DefaultTriggerType',
  AutoReviewed = 'AutoReviewed',
  LargeAmount = 'LargeAmount',
  InsufficientFunds = 'InsufficientFunds',
  InsufficientGas = 'InsufficientGas'
}