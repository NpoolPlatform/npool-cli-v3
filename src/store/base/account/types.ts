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