import { defineStore } from 'pinia'
import { SwitchTarget } from './const'
import { ErrorSwitcherState, ErrorTarget } from './types'

const useErrorSwitcherStore = defineStore('errorswitcher', {
  state: (): ErrorSwitcherState => ({
    ErrorTargets: [
      {
        ErrorCode: 403,
        Target: SwitchTarget.LOGIN
      }
    ],
    ErrorTrigger: undefined as unknown as ErrorTarget
  }),
  getters: {},
  actions: {}
})

export * from './const'

export {
  useErrorSwitcherStore
}
