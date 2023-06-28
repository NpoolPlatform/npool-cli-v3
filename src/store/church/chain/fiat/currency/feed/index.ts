import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFiatFeedRequest,
  CreateFiatFeedResponse,
  FiatFeed,
  GetFiatFeedsRequest,
  GetFiatFeedsResponse,
  UpdateFiatFeedRequest,
  UpdateFiatFeedResponse
} from './types'
import { doActionWithError } from '../../../../../action'

export const useFiatFeedStore = defineStore('fiatfeed-v4', {
  state: () => ({
    Feeds: {
      Feeds: [] as Array<FiatFeed>,
      Total: 0
    }
  }),
  getters: {
    feeds () {
      return () => this.Feeds.Feeds.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getFeeds (req: GetFiatFeedsRequest, done: (error: boolean, rows: Array<FiatFeed>) => void) {
      doActionWithError<GetFiatFeedsRequest, GetFiatFeedsResponse>(
        API.GET_FEEDS,
        req,
        req.Message,
        (resp: GetFiatFeedsResponse): void => {
          this.Feeds.Feeds.push(...resp.Infos)
          this.Feeds.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FiatFeed>)
        }
      )
    },
    createFeed (req: CreateFiatFeedRequest, done: (error: boolean, row: FiatFeed) => void) {
      doActionWithError<CreateFiatFeedRequest, CreateFiatFeedResponse>(
        API.CREATE_FEED,
        req,
        req.Message,
        (resp: CreateFiatFeedResponse): void => {
          this.Feeds.Feeds.push(resp.Info)
          this.Feeds.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatFeed)
        }
      )
    },
    updateFeed (req: UpdateFiatFeedRequest, done: (error: boolean, row: FiatFeed) => void) {
      doActionWithError<UpdateFiatFeedRequest, UpdateFiatFeedResponse>(
        API.UPDATE_FEED,
        req,
        req.Message,
        (resp: UpdateFiatFeedResponse): void => {
          const index = this.Feeds.Feeds.findIndex((el) => el.ID === resp.Info.ID)
          this.Feeds.Feeds.splice(index, 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FiatFeed)
        }
      )
    }
  }
})

export * from './types'