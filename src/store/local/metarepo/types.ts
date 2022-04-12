import { Type as MessageType } from '../notifications/const'

interface TipMessage {
  Type?: MessageType
  Content?: string
}

interface MetaRepoState {
  TopTip?: TipMessage,
  MenuUserCenter: string,
  TabOrder: string,
  BaseURL: string,
  AppID: string
}

export {
  TipMessage,
  MetaRepoState
}
