import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFeedRequest,
  CreateFeedResponse,
  Feed,
  GetFeedsRequest,
  GetFeedsResponse,
  UpdateFeedRequest,
  UpdateFeedResponse
} from './types'
import { doActionWithError } from '../../../../action'

export const useCoinFeedStore = defineStore('coinfeed-v4', {
  state: () => ({
    Feeds: {
      Feeds: [] as Array<Feed>,
      Total: 0
    }
  }),
  getters: {
    feeds () {
      return () => this.Feeds.Feeds.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getFeeds (req: GetFeedsRequest, done: (error: boolean, rows: Array<Feed>) => void) {
      doActionWithError<GetFeedsRequest, GetFeedsResponse>(
        API.GET_FEEDS,
        req,
        req.Message,
        (resp: GetFeedsResponse): void => {
          this.Feeds.Feeds.push(...resp.Infos)
          this.Feeds.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Feed>)
        }
      )
    },
    createFeed (req: CreateFeedRequest, done: (error: boolean, row: Feed) => void) {
      doActionWithError<CreateFeedRequest, CreateFeedResponse>(
        API.CREATE_FEED,
        req,
        req.Message,
        (resp: CreateFeedResponse): void => {
          this.Feeds.Feeds.push(resp.Info)
          this.Feeds.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Feed)
        }
      )
    },
    updateFeed (req: UpdateFeedRequest, done: (error: boolean, row: Feed) => void) {
      doActionWithError<UpdateFeedRequest, UpdateFeedResponse>(
        API.UPDATE_FEED,
        req,
        req.Message,
        (resp: UpdateFeedResponse): void => {
          const index = this.Feeds.Feeds.findIndex((el) => el.ID === resp.Info.ID)
          this.Feeds.Feeds.splice(index, 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Feed)
        }
      )
    }
  }
})
