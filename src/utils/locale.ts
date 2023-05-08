import { defineStore } from 'pinia'

export const useLocaleStringStore = defineStore('local-localestring-v4', {
  getters: {
    getLocaleString () {
      return (num: number | string, round?: boolean) => {
        let _num = Number(num)
        if (round) {
          _num = Math.round(_num)
        }
        return _num.toLocaleString("en-US", {maximumFractionDigits: 4 })
      }
    }
  }
})
