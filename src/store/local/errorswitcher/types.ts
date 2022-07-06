import { LocalNotification } from '../notifications'
import { SwitchTarget } from './const'

interface ErrorTarget {
  ErrorCode: number
  Target: SwitchTarget
  Error?: LocalNotification
}

interface ErrorSwitcherState {
  ErrorTargets: Array<ErrorTarget>
  ErrorTrigger: ErrorTarget
}

export {
  ErrorTarget,
  ErrorSwitcherState
}
