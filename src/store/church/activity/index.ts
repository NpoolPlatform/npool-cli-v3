import { defineStore } from 'pinia'
import {
  Activity,
  UpdateActivityRequest,
  UpdateActivityResponse
} from '../../admin'
import { API as ActivityAPI } from '../../admin/activity/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { ActivityState } from './state'
import {
  CreateAppActivityRequest,
  CreateAppActivityResponse,
  GetAppActivitiesRequest,
  GetAppActivitiesResponse
} from './types'

export const useChurchActivityStore = defineStore('churchactivity', {
  state: (): ActivityState => ({
    Activities: new Map<string, Array<Activity>>()
  }),
  getters: {
    getActivityByAppID (): (appID: string, id: string) => Activity {
      return (appID: string, id: string) => {
        const activities = this.Activities.get(appID)
        if (!activities) {
          return undefined as unknown as Activity
        }
        const index = activities.findIndex((el) => el.ID === id)
        return index < 0 ? undefined as unknown as Activity : activities[index]
      }
    }
  },
  actions: {
    getActivities (req: GetAppActivitiesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppActivitiesRequest, GetAppActivitiesResponse>(
        API.GET_ACTIVITIES,
        req,
        req.Message,
        (resp: GetAppActivitiesResponse): void => {
          this.Activities.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createActivity (req: CreateAppActivityRequest, done: () => void) {
      doAction<CreateAppActivityRequest, CreateAppActivityResponse>(
        API.CREATE_ACTIVITY,
        req,
        req.Message,
        (resp: CreateAppActivityResponse): void => {
          let amounts = this.Activities.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.Activities.set(req.TargetAppID, amounts)
          done()
        })
    },
    updateActivity (req: UpdateActivityRequest, done: () => void) {
      doAction<UpdateActivityRequest, UpdateActivityResponse>(
        ActivityAPI.UPDATE_ACTIVITY,
        req,
        req.Message,
        (resp: UpdateActivityResponse): void => {
          for (const [k, v] of this.Activities) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1, resp.Info)
            this.Activities.set(k, v)
          }
          done()
        })
    }
  }
})

export * from './types'
