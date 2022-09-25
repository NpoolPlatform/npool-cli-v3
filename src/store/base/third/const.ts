export enum UsedFor {
  DefaultUsedFor = "DefaultUsedFor",
  Signup = "Signup",
  Signin = "Signin",
  Update = "Update",
  Contact = "Contact",
  SetWithdrawAddress = "SetWithdrawAddress",
  Withdraw = "Withdraw",
  CreateInvitationCode = "CreateInvitationCode",
  SetCommission = "SetCommission",
  SetTransferTargetUser = "SetTransferTargetUser",
  Transfer = "Transfer",
}
export const UsedFors = [
  UsedFor.Contact,
  UsedFor.SetWithdrawAddress,
  UsedFor.Signin,
  UsedFor.Signup,
  UsedFor.Update,
  UsedFor.Withdraw,
  UsedFor.CreateInvitationCode,
  UsedFor.SetCommission,
  UsedFor.SetTransferTargetUser,
  UsedFor.Transfer
]