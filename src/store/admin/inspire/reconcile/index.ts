import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  ReconcileRequest,
  ReconcileResponse
} from './types'

export const useAdminReconcileStore = defineStore('admin-reconcile-v4', {
  state: () => ({}),
  getters: {
  },
  actions: {
    reconcile (req: ReconcileRequest, done: (error: boolean) => void) {
      doActionWithError<ReconcileRequest, ReconcileResponse>(
        API.RECONCILE,
        req,
        req.Message,
        (): void => {
          done(false)
        },
        () => {
          done(true)
        }
      )
    }
  }
})
