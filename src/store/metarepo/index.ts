import { defineStore } from 'pinia'
import { Type as NotificationType } from '../notifications/const'
import { MetaRepoState } from './types'

export const useMetaRepoStore = defineStore('metarepo', {
  state: (): MetaRepoState => ({
    TopTip: {
      Type: NotificationType.Info,
      Content: ''
    },
    MenuUserCenter: '',
    TabOrder: '',
    BaseURL: '',
    AppID: ''
  }),
  getters: {},
  actions: {}
})
