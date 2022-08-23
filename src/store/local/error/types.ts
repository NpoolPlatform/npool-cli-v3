import { Notification } from '../../base'
import { SwitchTarget } from './const'

interface ErrorTarget {
  ErrorCode: number
  Target: SwitchTarget
  Error?: Notification
}

interface ErrorSwitcherState {
  ErrorTargets: Array<ErrorTarget>
  ErrorTrigger: ErrorTarget
}

export {
  ErrorTarget,
  ErrorSwitcherState
}
