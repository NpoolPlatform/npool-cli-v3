import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { ActivityState } from './state'
import {
  CreateActivityRequest,
  CreateActivityResponse,
  GetActivitiesRequest,
  GetActivitiesResponse,
  UpdateActivityRequest,
  UpdateActivityResponse
} from './types'

export const useChurchActivityStore = defineStore('churchactivity', {
  state: (): ActivityState => ({
    Activities: []
  }),
  getters: {},
  actions: {
    getActivities (req: GetActivitiesRequest, done: (error: boolean) => void) {
      doActionWithError<GetActivitiesRequest, GetActivitiesResponse>(
        API.GET_ACTIVITIES,
        req,
        req.Message,
        (resp: GetActivitiesResponse): void => {
          this.Activities = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createActivity (req: CreateActivityRequest, done: () => void) {
      doAction<CreateActivityRequest, CreateActivityResponse>(
        API.CREATE_ACTIVITY,
        req,
        req.Message,
        (resp: CreateActivityResponse): void => {
          this.Activities.push(resp.Info)
          done()
        })
    },
    updateActivity (req: UpdateActivityRequest, done: () => void) {
      doAction<UpdateActivityRequest, UpdateActivityResponse>(
        API.UPDATE_ACTIVITY,
        req,
        req.Message,
        (resp: UpdateActivityResponse): void => {
          const index = this.Activities.findIndex((el) => el.ID === resp.Info.ID)
          this.Activities.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
